import Identity from '@arc-publishing/sdk-identity'
import { isAPIErrorResponse } from '@arc-publishing/sdk-identity/lib/serviceHelpers/APIErrorResponse'
import * as Sentry from '@sentry/browser'

import { isStorageAvailable } from '../client/storage'
import { reduceWord } from '../parse/strings'

const isClientSide = typeof window !== 'undefined'
const USER_INFO_KEY = 'ArcId.USER_INFO'
// const USER_PROFILE_KEY = 'ArcId.USER_PROFILE'

async function getUserProfile(): Promise<typeof Identity.userProfile> {
  let userProfile: typeof Identity.userProfile = null

  try {
    const { userProfile: localProfile } = Identity

    if (localProfile) {
      userProfile = localProfile
    } else if (await Identity.isLoggedIn()) {
      const userProfileResponse = await Identity.getUserProfile()

      if (isAPIErrorResponse(userProfileResponse)) {
        Sentry.captureEvent({
          message: 'Error obtener perfil del usuario - getUserProfile()',
          level: Sentry.Severity.Error,
          extra: userProfileResponse || {},
        })
      } else {
        userProfile = userProfileResponse
      }
    }
  } catch (error) {
    Sentry.captureEvent({
      message: 'Error obtener perfil del usuario - getUserProfile()',
      level: Sentry.Severity.Error,
      extra: error || {},
    })
  }
  return userProfile
}

async function getUserIdentity(): Promise<typeof Identity.userIdentity | null> {
  let userIdentity: typeof Identity.userIdentity | null = null

  try {
    const { userIdentity: localIdentity } = Identity

    if (localIdentity) {
      userIdentity = localIdentity
    } else if (await Identity.isLoggedIn()) {
      const heartbeat = await Identity.heartbeat()

      if (isAPIErrorResponse(heartbeat)) {
        Sentry.captureEvent({
          message: 'Error obtener identidad del usuario - getUserIdentity()',
          level: Sentry.Severity.Error,
          extra: heartbeat || {},
        })
      } else {
        userIdentity = heartbeat
      }
    }
  } catch (error) {
    Sentry.captureEvent({
      message: 'Error obtener identidad del usuario - getUserIdentity()',
      level: Sentry.Severity.Error,
      extra: error || {},
    })
  }
  return userIdentity
}

/**
 * Esta función verifica cuidadosamente si existe información
 * del usuario en `localStorage` y `sessionStorage`, para determinar
 * si el usuario ha iniciado sesión o no.
 *
 * Esta función es diferente a `await Identity.isLoggedIn()` porque esta
 * última no es confiable si el usuario ha cerrado sesión en otra pestaña.
 */
function isLoggedIn(): boolean {
  if (isClientSide) {
    if (
      isStorageAvailable('localStorage') &&
      isStorageAvailable('sessionStorage')
    ) {
      const localUserInfo = window.localStorage.getItem(USER_INFO_KEY)
      const sessionUserInfo = window.sessionStorage.getItem(USER_INFO_KEY)
      const userInfo = localUserInfo || sessionUserInfo
      return !!(userInfo && userInfo !== '{}')
    }
  }
  return false
}

// @deprecated Usar `isLoggedIn()` en su lugar
// function checkSession(): boolean {
//   if (isClientSide) {
//     const userProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
//     const userInfo = window.localStorage.getItem('ArcId.USER_INFO')
//     if (userProfile) {
//       return !(userProfile === 'null' || userInfo === '{}') || false
//     }
//   }
//   return false
// }

/**
 * @param username Nombre del usuario completo
 * @param length Cantidad de caracteres máxima (80 por defecto)
 * @returns Nombre del usuario completo, sin `null|undefined` o espacios de más
 * @example ```
 * formatUsername(`Carlos undefined Fernández`, 10)
 * // "Carlos Fer..."
 * formatUsername(`null Carlos Fernández`)
 * // "Carlos Fernández"
 * ```
 */
function formatUsername(username: string, length = 80): string {
  const cleanUsername = username
    .replace(/null|undefined/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
  return reduceWord(cleanUsername, length)
}

/**
 * @returns Promesa que resuelve el nombre del usuario completo,
 * sin `null|undefined` o espacios de más, con un máximo de 20 catacteres
 * @example ```
 * await getUsername(`Carlos undefined`)
 * // "Carlos"
 *
 * await getUsername(`William Esternocleidomastoideo`)
 * // "William Esternocl..."
 * ```
 */
async function getUsername(): Promise<string> {
  let username = ''
  const userProfile = await getUserProfile()
  const { firstName, lastName } = userProfile || {}

  if (firstName || lastName) {
    username = formatUsername(`${firstName} ${lastName}`, 17)
  }
  return username
}

/**
 * @param username Nombre del usuario completo
 * @returns La letra inicial de las primeras dos palabras
 * del parámetro `username`
 * @example ```
 * getUsernameInitials(`José Huamaní Salazar`)
 * // "JH"
 * getUsernameInitials(`José`)
 * // "J"
 * ```
 */
function getUsernameInitials(username: string): string {
  const names = username.split(' ')
  const initials = names.map((name) => name.charAt(0))
  return initials.slice(0, 2).join('').toUpperCase()
}

function extendSession(): Promise<typeof Identity.userIdentity> {
  const notifyError = (error: any) => {
    Sentry.captureEvent({
      message: 'Error al extender la sesión - Identity.extendSession()',
      level: Sentry.Severity.Error,
      extra: error || {},
    })
  }

  return new Promise((resolve, reject) => {
    if (Identity.userIdentity?.refreshToken) {
      Identity.extendSession()
        .then((response) => {
          if (isAPIErrorResponse(response)) {
            notifyError(response)
            reject(response)
          } else {
            resolve(response)
          }
        })
        .catch((error) => {
          notifyError(error)
          reject(error)
        })
    } else if (!Identity.isLoggedIn()) {
      window.location.href = '/signwall/?outputType=subscriptions&reloginHash=1'
      const message = 'Usuario sin sesión activa. Redirigiendo a /signwall'
      Sentry.captureEvent({
        message,
        level: Sentry.Severity.Info,
      })
      reject(new Error(message))
    } else {
      resolve(Identity.userIdentity)
    }
  })
}

export {
  extendSession,
  formatUsername,
  getUserIdentity,
  getUsername,
  getUsernameInitials,
  getUserProfile,
  isLoggedIn,
}
