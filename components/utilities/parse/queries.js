export const deleteQueryString = url => {
  const onlyUrl = url.split('?')[0]
  return onlyUrl.split('#')[0]
}

export function parseQueryString(str) {
  if (typeof str !== 'string' || str.length === 0) return {}
  const s = str.replace(/^.*\?/, '').split('&')
  const sLength = s.length
  let bit
  const query = {}
  let first
  let second
  for (let i = 0; i < sLength; i++) {
    bit = s[i].split('=')
    first = decodeURIComponent(bit[0])
    // eslint-disable-next-line no-continue
    if (first.length === 0) continue
    second = decodeURIComponent(bit[1])
    if (typeof query[first] === 'undefined') query[first] = second
    else if (query[first] instanceof Array) query[first].push(second)
    else query[first] = [query[first], second]
  }
  return query
}
