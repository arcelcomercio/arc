export function decodeValue(val) {
  if (typeof val === 'string') {
    try {
      return JSON.parse(val)
    } catch (e) {
      window.console.error('(decodeValue) not_parse_value')
    }
  }
  return val
}

export function encodeValue(val) {
  if (typeof val === 'string') {
    return val
  }
  return JSON.stringify(val)
}

export const createExternalScript = (content, defer = false) => {
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  if (defer) script.setAttribute('defer', 'true')
  script.textContent = content
  document.body.appendChild(script)
}

export const checkUndefined = (name, alias) => {
  if (name && (name !== undefined || name !== null)) {
    const nameLowerCase = name.toLowerCase()
    if (nameLowerCase === 'undefined' || nameLowerCase === 'null') {
      return alias || ''
    }
  }
  return name || alias
}

export const checkFbEmail = email => {
  return email && email.indexOf('facebook.com') >= 0 ? '' : email
}

export const Capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const checkFormatPhone = string => {
  if (!string) return ''
  return checkUndefined(string).replace(/\+|\s|-|\(|\)/g, '')
}

export const clearUrlAPI = urlDefault => {
  if (typeof window !== 'undefined') {
    const rg = new RegExp(/((DNI|CDI|CEX)\/([\w-]+)\/([\w]+)\/)|((fia)\/)/g)
    const queryMatch = window.location.href.match(rg)
    const newUrl = window.location.href.split(queryMatch)
    const UrlComplete = `${newUrl[0] || urlDefault}${newUrl[1] || ''}`
    window.history.pushState(null, null, UrlComplete)
  }
}

export const titleCase = string => {
  const wordsArray = string.toLowerCase().split(/_/)
  const upperCased = wordsArray.map(word => {
    return word.charAt(0).toUpperCase() + word.substr(1)
  })
  return upperCased.join('_')
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

export const setLocaleStorage = (key, data) => {
  if (typeof window !== 'undefined') {
    if (process.browser) {
      return window.localStorage.setItem(key, encodeValue(data))
    }
    return false
  }
  return null
}

export const getFullNameFormat = (firstName, lastName, secondLastName) => {
  const lowerSecLastName = secondLastName && secondLastName.toLowerCase()
  const fullName = `${firstName} ${lastName} ${
    lowerSecLastName === 'undefined' || lowerSecLastName === 'null'
      ? ''
      : secondLastName || ''
  }`
  return fullName.length >= 77 ? `${fullName.substring(0, 80)}...` : fullName
}

export const isFbBrowser = () => {
  return (
    typeof window !== 'undefined' &&
    (window.navigator.userAgent.indexOf('FBAN') > -1 ||
      window.navigator.userAgent.indexOf('FBAV') > -1)
  )
}

export const getSessionStorage = key => {
  if (typeof window !== 'undefined') {
    if (process.browser) {
      return window.sessionStorage.getItem(key)
    }
    return false
  }
  return null
}
