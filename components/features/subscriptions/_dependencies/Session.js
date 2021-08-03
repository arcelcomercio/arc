import { isStorageAvailable } from '../../../utilities/client/storage'

/**
 * Verifica si el usuario ha iniciado sesión
 * @returns {boolean}
 */
export const isLogged = () => {
  if (typeof window !== 'undefined') {
    if (isStorageAvailable('localStorage')) {
      const userInfo = window.localStorage.getItem('ArcId.USER_INFO')
      return userInfo && userInfo !== '{}'
    }
  }
  return false
}

/**
 * Verifica si el usuario existe
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    if (isStorageAvailable('localStorage')) {
      const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
      const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
      if (profileStorage && sesionStorage) {
        return !(profileStorage === 'null' || sesionStorage === '{}') || false
      }
    }
  }
  return false
}

const attrToObject = (attributes = [], getAttributes = []) =>
  getAttributes.reduce((prev, name) => {
    const newAttrs = prev
    const attrs = (attributes || []).find((attr) => attr.name === name)
    if (attrs && attrs.value !== 'undefined') {
      newAttrs[name] = attrs.value.toUpperCase()
    }
    return newAttrs
  }, {})

export const conformProfile = (userPorfile) => {
  const { attributes, contacts = [], ...restProfile } = userPorfile
  const [phone = {}] = contacts || []

  return {
    ...restProfile,
    ...phone,
    ...attrToObject(attributes, ['documentNumber', 'phone', 'documentType']),
  }
}

/**
 * @param {string|null|undefined} firstName
 * @param {string|null|undefined} lastName
 * @returns {string} Nombre y apellido del usuario | Bienvenido Usuario
 */
export const getUserName = (firstName, lastName) => {
  let fullName = ''
  const badName = /undefined|null/
  const isBadFirstName = badName.test(firstName)
  const isBadLastName = badName.test(lastName)

  if (firstName && !isBadFirstName && lastName && !isBadLastName) {
    fullName = `${firstName} ${lastName}`
  } else if (firstName && !isBadFirstName && (!lastName || isBadLastName)) {
    fullName = firstName
  } else if (lastName && !isBadLastName && (!firstName || isBadFirstName)) {
    fullName = lastName
  }

  return fullName.length <= 17 ? fullName : `${fullName.slice(0, 17)}...`
}

/**
 * @returns {object|null} Información del perful de usuario desde `localStorage`
 */
export const getStorageProfile = () => {
  if (typeof window !== 'undefined') {
    if (isStorageAvailable('localStorage')) {
      return JSON.parse(
        window.localStorage.getItem('ArcId.USER_PROFILE') || '{}'
      )
    }
  }
  return null
}

/**
 * @returns {object|null} Información de la sesión de usuario desde `localStorage`
 */
export const getStorageInfo = () => {
  if (typeof window !== 'undefined') {
    if (isStorageAvailable('localStorage')) {
      return JSON.parse(window.localStorage.getItem('ArcId.USER_INFO') || '{}')
    }
  }
  return null
}

/**
 * @returns {string|undefined} Correo electrónico del usuario
 */
export const getStorageEmailProfile = () => {
  const { email } = getStorageProfile() || {}
  return email
}
