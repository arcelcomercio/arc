import React, { Fragment } from 'react'

export default props => {
  const { globalContent, siteUrl = '', requestUri = '' } = props
  const { next, previous } = globalContent || {}

  const buildUrlPagination = pageNum => {
    return requestUri.match(/page=[0-9]+/) !== null
        ? `${siteUrl}${requestUri.replace(
            /&page=[0-9]+/,
            `&page=${pageNum}`
          )}`
        : `${siteUrl}${requestUri}&page=${pageNum}`
  }

  const currentPage = requestUri.match(/page=[0-9]+/)
    ? parseInt(requestUri.match(/page=[0-9]+/)[0].split('=')[1], 10)
    : 1

  const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
  const prevPage = currentPage - 1

  const hasNext = next !== undefined
  const hasPrev = previous !== undefined
  const urlNextPage = buildUrlPagination(nextPage)
  const urlPrevPage = buildUrlPagination(prevPage)

  return (
      <Fragment>
        <meta name="robots" content="noindex,follow" />
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
