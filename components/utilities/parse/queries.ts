export const deleteQueryString = (url: string): string => {
  const onlyUrl = url.split('?')[0]
  return onlyUrl.split('#')[0]
}

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
