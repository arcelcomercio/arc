import React from 'react'
import {
  metaPaginationUrl,
  getMetaPagesPagination,
} from '../../utilities/helpers'

export default props => {
  const { globalContent, siteUrl = '', requestUri = '' } = props
  const patternPagination = /\/[0-9]+\/?(?=\?|$)/

  const pages = getMetaPagesPagination(
    requestUri,
    globalContent,
    patternPagination
  )

  const urlNextPage = metaPaginationUrl(
    pages.next,
    patternPagination,
    requestUri,
    siteUrl
  )
  const urlPrevPage = metaPaginationUrl(
    pages.prev,
    patternPagination,
    requestUri,
    siteUrl
  )

  return (
    <>
      <meta name="robots" content="noindex,follow" />
      {pages.prev && (
        <>
          <link rel="prev" href={urlPrevPage} />
          {/* <link rel="prefetch" href={urlPrevPage} /> */}
        </>
      )}
      {pages.next && (
        <>
          <link rel="next" href={urlNextPage} />
          {/* <link rel="prefetch" href={urlNextPage} /> */}
        </>
      )}
    </>
  )
}
