export const reduceWord = (word, len = 145, finalText = '...') => {
  return word.length > len ? word.slice(0, len).concat(finalText) : word
}

export const formatSlugToText = (text = '', length = 0) => {
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

export const formatHtmlToText = (html = '') => {
  const htmlData = html.toString()
  return htmlData
    .replace(/<[^>]*>/g, '')
    .replace(/"/g, '“')
    .replace(/\\/g, '')
}

export const getUrlFromHtml = (html = '') => {
  const regexp = /<(?:a|img)[^>]+(?:href|src)=['"]?([^'" >]+)/gi
  const data = html.match(regexp) || []
  const urls = []

  data.forEach(el => {
    urls.push(el.replace(/(<(?:a|img)[^>]+(?:href|src)=['"]?)/g, ''))
  })

  return urls
}

export const removeLastSlash = (url = '') => {
  if (url === '/' || !url.endsWith('/')) return url
  return url && url.endsWith('/') ? url.slice(0, url.length - 1) : url
}

export const addSlashToEnd = (url = '') => {
  const urlString = `${url}`
  if (url && urlString.trim() === '/') return url
  return url && !urlString.endsWith('/') ? `${url}/` : url
}

export const ifblogType = (globalContent = {}) => {
  const { post: { tags = [] } = {} } = globalContent
  let urls = tags.indexOf('metered') !== -1 ? 'metered' : 'free'
  urls = tags.indexOf('locked') !== -1 ? 'locked' : urls
  urls = tags.indexOf('free') !== -1 ? 'free' : urls
  return urls
}
export const addParamToEndPath = (path, param) => {
  const getPathAndString = (pathData, symbol = '?') => {
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
  const addParam = (onlyPath, variable, queryString = '') => {
    return `${addSlashToEnd(onlyPath)}${addSlashToEnd(variable)}${queryString}`
  }
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
