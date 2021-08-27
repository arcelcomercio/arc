interface QueryOptions {
  return?: boolean
  url?: string
}

/**
 * @param url url con query parameters
 * @returns url sin query parameters
 */
export function deleteQueryString(url: string): string {
  const onlyUrl = url.split('?')[0]
  return onlyUrl.split('#')[0]
}

/**
 * @param url url con query parameters
 * @returns query parameters parseado como objeto
 */
export function parseQueryString(str: string): Record<string, any> {
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
 * @returns valor de la query, si existe
 */
export function getQuery(
  query: string,
  defaultUrl?: string
): string | undefined {
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
 * @param options opciones de la función
 */
export function deleteQuery<Options extends QueryOptions>(
  query: string,
  options?: Options
): Options['return'] extends true ? string : void
export function deleteQuery(
  query: string,
  options?: QueryOptions
): void | string {
  const url = options?.url || window.location.href
  const regex = RegExp(`([?&])${query}=.+?(?:&|$)`)
  const newUrl = url.replace(regex, '$1').replace(/[?&]$/, '')

  if (options?.return === true) return newUrl
  return window.history.pushState(null, document.title, newUrl)
}

/**
 * Recibe la key y value de un query parameter,
 * reemplaza ese query parameter de `window.location.href`,
 * y hace un `window.history.pushState(...)` con la url resultante.
 * @param query key de la query que se quiere reemplazar
 * @param value valor de la query que se quiere reemplazar
 * @param options opciones de la función
 */
export function replaceQuery<Options extends QueryOptions>(
  query: string,
  value: string,
  options?: Options
): Options['return'] extends true ? string : void
export function replaceQuery(
  query: string,
  value: string,
  options?: QueryOptions
): void | string {
  const url = options?.url || window.location.href
  const regex = RegExp(`([?&])${query}=.+?(?=&|$)`)
  const newUrl = url.replace(regex, `$1${query}=${value}`)

  if (options?.return) return newUrl
  return window.history.pushState(null, document.title, newUrl)
}

/**
 * Añade un query parameter a la url actual en caso de que no exista
 * o reemplaza el value del query si existe
 * y hace un `window.history.pushState(...)` con la url resultante.
 * @param query key de la query que se quiere añadir
 * @param value valor de la query que se quiere añadir
 * @param options opciones de la función
 */
export function addQuery<Options extends QueryOptions>(
  query: string,
  value: string,
  options?: Options
): Options['return'] extends true ? string : void
export function addQuery(
  query: string,
  value: string,
  options?: QueryOptions
): void | string {
  const url = options?.url || window.location.href
  if (getQuery(query, url)) return replaceQuery(query, value, options)

  const separator = url.indexOf('?') === -1 ? '?' : '&'
  const newUrl = `${url}${separator}${query}=${value}`

  if (options?.return) return newUrl
  return window.history.pushState(
    null,
    document.title,
    `${url}${separator}${query}=${value}`
  )
}
