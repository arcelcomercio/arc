import React, { Fragment } from 'react'

export default props => {
  const { globalContent, siteUrl = '', requestUri = '' } = props
  const { next, previous } = globalContent || {}
  const patternPagination = /\/[0-9]+$|\/[0-9]+?(?=\?|\/$)/

  const paginationUrl = pageNumber => {
    return requestUri.match(patternPagination) !== null
      ? `${siteUrl}${requestUri.replace(patternPagination, `/${pageNumber}`)}`
      : `${siteUrl}${requestUri}`
  }

  const currentPage = requestUri.match(patternPagination)
    ? parseInt(requestUri.match(patternPagination)[0].split('/')[1], 10)
    : 1

  const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
  const prevPage = currentPage - 1

  const hasNext = next !== undefined
  const hasPrev = previous !== undefined
  const urlNextPage = paginationUrl(nextPage)
  const urlPrevPage = paginationUrl(prevPage)

  return (
    <Fragment>
      {hasPrev && (
        <Fragment>
          <link rel="prev" href={urlPrevPage} />
          <link rel="prefetch" href={urlPrevPage} />
        </Fragment>
      )}
      {hasNext && (
        <Fragment>
          <link rel="next" href={urlNextPage} />
          <link rel="prefetch" href={urlNextPage} />
        </Fragment>
      )}
    </Fragment>
  )
}
