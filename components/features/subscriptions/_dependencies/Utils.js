export function decodeValue(val) {
  // Try to parse as json
  if (typeof val === 'string') {
    try {
      return JSON.parse(val)
    } catch (e) {
      window.console.error('(decodeValue) not_parse_value')
    }
  }

  // Return as is
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
    if (nameLowerCase === 'undefined') {
      return alias || ''
    }
  }

  return name || alias
}

export const checkFbEmail = email => {
  return email.indexOf('facebook.com') >= 0 ? '' : email
}

export const Capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const checkFormatPhone = string => {
  if (!string) {
    return ''
  }
  return checkUndefined(string).replace(/\s|-/g, '')
}

export const clearUrlAPI = urlDefault => {
  if (typeof window !== 'undefined') {
    const rg = new RegExp(/((DNI|CDI|CEX)\/([\w-]+)\/([\w]+)\/)/g)
    const queryMatch = window.location.href.match(rg)
    const newUrl = window.location.href.split(queryMatch)
    const UrlComplete = `${newUrl[0] || urlDefault}${newUrl[1] || ''}`
    window.history.pushState(null, null, UrlComplete)
  }
}
