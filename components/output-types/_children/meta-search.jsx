import React, { Fragment } from 'react'
import {
  metaPaginationUrl,
  getMetaPagesPagination,
} from '../../utilities/helpers'

export default props => {
  const { globalContent, siteUrl = '', requestUri = '' } = props
  const patternPagination = /&page=[0-9]+/

  const pages = getMetaPagesPagination(
    requestUri,
    true,
    globalContent,
    patternPagination
  )

  const urlNextPage = metaPaginationUrl(
    pages.next,
    patternPagination,
    requestUri,
    siteUrl,
    true
  )
  const urlPrevPage = metaPaginationUrl(
    pages.prev,
    patternPagination,
    requestUri,
    siteUrl,
    true
  )

  return (
    <Fragment>
      <meta name="robots" content="noindex,follow" />
      {pages.prev && (
        <Fragment>
          <link rel="prev" href={urlPrevPage} />
          <link rel="prefetch" href={urlPrevPage} />
        </Fragment>
      )}
      {pages.next && (
        <Fragment>
          <link rel="next" href={urlNextPage} />
          <link rel="prefetch" href={urlNextPage} />
        </Fragment>
      )}
    </Fragment>
  )
}
