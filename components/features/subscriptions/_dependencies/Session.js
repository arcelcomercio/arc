/* eslint-disable import/prefer-default-export */
import { decodeValue } from './Utils'

export const isLogged = () => {
  if (typeof window !== 'undefined') {
    return (
      window.localStorage.getItem('ArcId.USER_INFO') &&
      window.localStorage.getItem('ArcId.USER_INFO') !== '{}'
    )
  }
  return null
}

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false
  const profileStorage =
    window.localStorage.getItem('ArcId.USER_PROFILE') ||
    window.sessionStorage.getItem('ArcId.USER_PROFILE')
  const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
  if (profileStorage) {
    return !(profileStorage === 'null' || sesionStorage === '{}') || false
  }
  return false
}

const attrToObject = (attributes = [], getAttributes = []) => {
  return getAttributes.reduce((prev, name) => {
    const newAttrs = prev
    const attrs = (attributes || []).find(attr => attr.name === name)
    if (attrs && attrs.value !== 'undefined') {
      newAttrs[name] = attrs.value
    }
    return newAttrs
  }, {})
}

export const conformProfile = userPorfile => {
  const { attributes, contacts = [], ...restProfile } = userPorfile
  const [phone = {}] = contacts || []

  return Object.assign(
    {},
    restProfile,
    phone,
    attrToObject(attributes, ['documentNumber', 'phone', 'documentType'])
  )
}

export const getLocaleStorage = key => {
  if (typeof window !== 'undefined') {
    if (process.browser) {
      const value = window.localStorage.getItem(key)
      return decodeValue(value)
    }
  }
  return null
}

export const getUserName = (firstName, lastName) => {
  let fullName = 'Bienvenido Usuario'
  const badName = /undefined|null/
  if (
    firstName &&
    !firstName.match(badName) &&
    lastName &&
    !lastName.match(badName)
  ) {
    fullName = `${firstName} ${lastName}`
  }
  if (
    firstName &&
    !firstName.match(badName) &&
    (!lastName || lastName.match(badName))
  ) {
    fullName = firstName
  }
  if (
    lastName &&
    !lastName.match(badName) &&
    (!firstName || firstName.match(badName))
  ) {
    fullName = lastName
  }
  return fullName.length <= 20 ? fullName : `${fullName.slice(0, 20)}...`
}
