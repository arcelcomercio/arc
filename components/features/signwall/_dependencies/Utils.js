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

export const getLocaleStorage = key => {
  if (typeof window !== 'undefined') {
    if (process.browser) {
      const value = window.localStorage.getItem(key)
      return decodeValue(value)
    }
  }
  return null
}
