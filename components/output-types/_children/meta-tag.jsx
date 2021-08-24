import React from 'react'

import { deleteQueryString } from '../../utilities/parse/queries'
import {
  getMetaPagesPagination,
  metaPaginationUrl,
} from '../_dependencies/pagination'

export default (props) => {
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
      {pages.prev && (
        <>
          <link rel="prev" href={deleteQueryString(urlPrevPage || '')} />
          {/* <link rel="prefetch" href={urlPrevPage} /> */}
        </>
      )}
      {pages.next && (
        <>
          <link rel="next" href={deleteQueryString(urlNextPage || '')} />
          {/* <link rel="prefetch" href={urlNextPage} /> */}
        </>
      )}
    </>
  )
}
