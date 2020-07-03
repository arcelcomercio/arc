export const metaPaginationUrl = (
  pageNumber,
  patternPagination,
  requestUri,
  siteUrl
) => {
  return requestUri.match(patternPagination) !== null
    ? `${siteUrl}${requestUri.replace(patternPagination, `/${pageNumber}/`)}`
    : `${siteUrl}${requestUri.split('?')[0]}${pageNumber}/${
        requestUri.split('?')[1] ? `?${requestUri.split('?')[1]}` : ''
      }`
}

export const getMetaPagesPagination = (
  requestUri,
  globalContent,
  patternPagination
) => {
  const { next, previous } = globalContent || {}
  const pages = {
    current: requestUri.match(patternPagination)
      ? parseInt(requestUri.match(patternPagination)[0].split('/')[1], 10)
      : 1,
    next: false,
    prev: false,
  }

  if (next !== undefined)
    pages.next = pages.current === 0 ? pages.current + 2 : pages.current + 1
  if (previous !== undefined) pages.prev = pages.current - 1

  return pages
}
