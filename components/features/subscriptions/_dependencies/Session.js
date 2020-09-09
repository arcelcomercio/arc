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
  const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
  // || window.sessionStorage.getItem('ArcId.USER_PROFILE')
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
      newAttrs[name] = attrs.value.toUpperCase()
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

export const getStorageProfile = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(window.localStorage.getItem('ArcId.USER_PROFILE') || '{}')
  }
  return null
}

export const getStorageInfo = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(window.localStorage.getItem('ArcId.USER_INFO') || '{}')
  }
  return null
}

export const getStorageEmailProfile = () => {
  if (typeof window !== 'undefined') {
    const currentProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE') || '{}'
    )
    return currentProfile.email
  }
  return null
}
