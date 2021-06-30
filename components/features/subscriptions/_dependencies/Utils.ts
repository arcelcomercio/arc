import { isStorageAvailable } from '../../../utilities/client/storage'

export function decodeValue(val: unknown): unknown {
  if (typeof val === 'string') {
    try {
      return JSON.parse(val)
    } catch (e) {
      window.console.error('(decodeValue) not_parse_value')
    }
  }
  return val
}

export function encodeValue(val: unknown): string {
  if (typeof val === 'string') {
    return val
  }
  return JSON.stringify(val)
}

export const createExternalScript = (content: string, defer = false): void => {
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  if (defer) script.setAttribute('defer', 'true')
  script.textContent = content
  document.body.appendChild(script)
}

export const checkUndefined = (
  name: string | undefined,
  alias = ''
): string => {
  if (typeof name === 'string') {
    const nameLowerCase = name.toLowerCase()
    if (nameLowerCase === 'undefined' || nameLowerCase === 'null') {
      return alias || ''
    }
  }
  return name || alias
}

export const checkFbEmail = (email: string): string =>
  email && email.indexOf('facebook.com') >= 0 ? '' : email

export const Capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const checkFormatPhone = (string: string): string => {
  if (!string) return ''
  return checkUndefined(string).replace(/\+|\s|-|\(|\)/g, '')
}

export const clearUrlAPI = (urlDefault: string): void => {
  if (typeof window !== 'undefined') {
    const rg = new RegExp(/((DNI|CDI|CEX)\/([\w-]+)\/([\w]+)\/)|((fia)\/)/g)
    const [queryMatch] = rg.exec(window.location.href) || []
    const newUrl = window.location.href.split(queryMatch)
    const isWinback = newUrl[1] && /(winback\/)/g.test(newUrl[1])

    const UrlComplete = isWinback
      ? `${newUrl[0] || urlDefault}${`eventos/${newUrl[1]}` || ''}`
      : `${newUrl[0] || urlDefault}${newUrl[1] || ''}`

    window.history.pushState(null, '', UrlComplete)
  }
}

export const titleCase = (string: string): string => {
  const wordsArray = string.toLowerCase().split(/_/)
  const upperCased = wordsArray.map(
    (word) => word.charAt(0).toUpperCase() + word.substr(1)
  )
  return upperCased.join('_')
}

export const getLocaleStorage = (key: string): unknown | null => {
  if (typeof window !== 'undefined') {
    if (isStorageAvailable('localStorage')) {
      const value = window.localStorage.getItem(key)
      return decodeValue(value)
    }
  }
  return null
}

export const setLocaleStorage = (key: string, data: unknown): void => {
  if (typeof window !== 'undefined') {
    if (isStorageAvailable('localStorage')) {
      window.localStorage.setItem(key, encodeValue(data))
    }
  }
}

export const getFullNameFormat = (
  firstName: string,
  lastName: string,
  secondLastName?: string
): string => {
  const lowerSecLastName = secondLastName && secondLastName.toLowerCase()
  const fullName = `${firstName} ${lastName} ${
    lowerSecLastName === 'undefined' || lowerSecLastName === 'null'
      ? ''
      : secondLastName || ''
  }`
  return fullName.length >= 77 ? `${fullName.substring(0, 80)}...` : fullName
}

export const isFbBrowser =
  typeof window !== 'undefined' &&
  (window.navigator.userAgent.indexOf('FBAN') > -1 ||
    window.navigator.userAgent.indexOf('FBAV') > -1)

export const getSessionStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    if (isStorageAvailable('sessionStorage')) {
      return window.sessionStorage.getItem(key)
    }
  }
  return null
}
