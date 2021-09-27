export const reduceWord = (
  word: string,
  len = 145,
  finalText = '...'
): string => (word.length > len ? word.slice(0, len).concat(finalText) : word)

export const formatSlugToText = (text: string, length = 0): string | null => {
  if (!text) return null
  const splitText = text.slice(1).includes('/')
    ? text.slice(1).split('/')
    : text.split('/')
  const lastSection = length
    ? splitText[length - 1]
    : splitText[splitText.length - 1]
  return length
    ? lastSection
    : lastSection
        .charAt(0)
        .toUpperCase()
        .concat(lastSection.slice(1))
        .replace(/-/, ' ')
}

export const formatHtmlToText = (html = ''): string => {
  const htmlData = html.toString()
  return htmlData
    .replace(/"(.+?)"/g, '“$1”')
    .replace(/<[^>]*>/g, '')
    .replace(/"/g, '“')
    .replace(/\\/g, '')
    .replace(/"/g, '“')
}

export const getUrlFromHtml = (html = ''): string[] => {
  const regexp = /<(?:a|img)[^>]+(?:href|src)=['"]?([^'" >]+)/gi
  const data = html.match(regexp) || []
  const urls: string[] = []

  data.forEach((el) => {
    urls.push(el.replace(/(<(?:a|img)[^>]+(?:href|src)=['"]?)/g, ''))
  })

  return urls
}

export const removeLastSlash = (url = ''): string => {
  if (url === '/' || !url.endsWith('/')) return url
  return url && url.endsWith('/') ? url.slice(0, url.length - 1) : url
}

export const addSlashToEnd = (url = ''): string => {
  const urlString = `${url}`
  if (url && urlString.trim() === '/') return url
  return url && !urlString.endsWith('/') ? `${url}/` : url
}

type Gsss = {
  post: {
    tags: { slug: string }[]
  }
}

export const ifblogType = (globalContent: Gsss): string => {
  const { post: { tags = [] } = {} } = globalContent || {}
  const slugArray = tags.map((el) => el.slug)
  let urls = 'metered'
  urls = slugArray.indexOf('locked') !== -1 ? 'locked' : urls
  urls = slugArray.indexOf('free') !== -1 ? 'free' : urls

  return urls
}

export const addParamToEndPath = (path: string, param: string): string => {
  const getPathAndString = (pathData: string, symbol = '?') => {
    const index = pathData.indexOf(symbol)
    let onlyPath = pathData
    let queryString = ''
    let haveQueryString = false
    if (index !== -1) {
      onlyPath = pathData.substr(0, index)
      queryString = pathData.substr(index)
      haveQueryString = true
    }
    return {
      onlyPath,
      queryString,
      haveQueryString,
    }
  }
  const addParam = (onlyPath: string, variable: string, queryString = '') =>
    `${addSlashToEnd(onlyPath)}${addSlashToEnd(variable)}${queryString}`

  let data = getPathAndString(path)
  if (data.haveQueryString)
    return addParam(data.onlyPath, param, data.queryString)
  data = getPathAndString(path, '#')
  if (data.haveQueryString)
    return addParam(data.onlyPath, param, data.queryString)
  data = getPathAndString(path, '&')
  if (data.haveQueryString)
    return addParam(data.onlyPath, param, data.queryString)
  return addParam(path, param)
}

export const nbspToSpace = (text: string): string =>
  text.replace(/&nbsp;/gi, ' ')
