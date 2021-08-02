import Identity from '@arc-publishing/sdk-identity'
import {
  isUserIdentity,
  UserIdentity,
} from '@arc-publishing/sdk-identity/lib/sdk/userIdentity'
import {
  isUserProfile,
  UserProfile,
} from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import * as Sentry from '@sentry/browser'

import { isStorageAvailable } from '../client/storage'
import { reduceWord } from '../parse/strings'

const isClientSide = typeof window !== 'undefined'
const USER_INFO_KEY = 'ArcId.USER_INFO'
const USER_PROFILE_KEY = 'ArcId.USER_PROFILE'

async function getUserProfile(): Promise<UserProfile | undefined> {
  let userProfile: UserProfile | undefined

  try {
    const { userProfile: localProfile } = Identity

    if (localProfile) {
      userProfile = localProfile
    } else if (await Identity.isLoggedIn()) {
      const userProfileResponse = await Identity.getUserProfile()
      userProfile = isUserProfile(userProfileResponse)
        ? userProfileResponse
        : undefined
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

async function getUserIdentity(): Promise<UserIdentity | undefined> {
  let userIdentity: UserIdentity | undefined

  try {
    const { userIdentity: localIdentity } = Identity

    if (localIdentity) {
      userIdentity = localIdentity
    } else if (await Identity.isLoggedIn()) {
      const heartbeat = await Identity.heartbeat()
      userIdentity = isUserIdentity(heartbeat) ? heartbeat : undefined
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

/**
 * @param username Nombre del usuario completo
 * @param length Cantidad de caracteres máxima (80 por defecto)
 * @returns Nombre del usuario completo, sin `null|undefined` o espacios de más
 * @example ```
 * formatUsername(`Carlos undefined Fernández`, 10)
 * // Carlos Fer...
 * formatUsername(`null Carlos Fernández`)
 * // Carlos Fernández
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
 * // Carlos
 *
 * await getUsername(`William Esternocleidomastoideo`)
 * // William Esternocl...
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

export {
  formatUsername,
  getUserIdentity,
  getUsername,
  getUserProfile,
  isLoggedIn,
}
