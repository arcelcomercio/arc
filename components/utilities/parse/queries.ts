/**
 * @param url url con query parameters
 * @returns url sin query parameters
 */
export const deleteQueryString = (url: string): string => {
  const onlyUrl = url.split('?')[0]
  return onlyUrl.split('#')[0]
}

/**
 * @param url url con query parameters
 * @returns query parameters parseado como objeto
 */
export const parseQueryString = (str: string): Record<string, any> => {
  if (typeof str !== 'string' || str.length === 0) return {}
  const s = str.replace(/^.*\?/, '').split('&')
  const sLength = s.length
  let param: string[]
  const query: Record<string, any> = {}
  let key: string
  let value: string
  for (let i = 0; i < sLength; i++) {
    param = s[i].split('=')
    key = decodeURIComponent(param[0])
    // eslint-disable-next-line no-continue
    if (key.length === 0) continue
    value = decodeURIComponent(param[1])
    if (typeof query[key] === 'undefined') query[key] = value
    else if (query[key] instanceof Array) query[key].push(value)
    else query[key] = [query[key], value]
  }
  return query
}

/**
 *
 * @param query key de la query de la que se quiere obtener el valor
 * @param defaultUrl url con query parameters. Por defecto usa `window.location.href`
 * @returns valor de la query
 */
export const getQuery = (query: string, defaultUrl?: string): string => {
  const url = defaultUrl || window.location.href
  const regex = RegExp(`[?&]${query}=([^&]+)`)
  const [, value] = regex.exec(url) || []
  return value
}

/**
 * Esta funcion recibe la key de un query parameter,
 * eliminar ese query parameter de `window.location.href`,
 * y hace un `window.history.pushState(...)` con la url resultante.
 * @param query key de la query que se quiere eliminar
 */
export const deleteQuery = (query: string): void => {
  const url = window.location.href
  const regex = RegExp(`([?&])${query}=.+?(?:&|$)`)
  const newUrl = url.replace(regex, '$1').replace(/[?&]$/, '')
  window.history.pushState(null, document.title, newUrl)
}
