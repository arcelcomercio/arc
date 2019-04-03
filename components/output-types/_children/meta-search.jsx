import React, { Fragment, Component } from 'react'

class MetaSearch extends Component {
  buildUrlPagination(numpage) {
    const { siteProperties, requestUri } = this.props
    const pathOrigin = siteProperties.siteUrl

    const url =
      requestUri.match(/page=[0-9]+/) !== null
        ? `${pathOrigin}${requestUri.replace(
            /&page=[0-9]+/,
            `&page=${numpage}`
          )}`
        : `${pathOrigin}${requestUri}&page=${numpage}`

    return url
  }

  render() {
    const { globalContent, siteProperties, requestUri } = this.props
    const { next, previous } = globalContent

    const currentPage = requestUri.match('&page=[0-9]+')
      ? parseInt(requestUri.match('&page=[0-9]+')[0].split('=')[1], 10)
      : 1

    const pathOrigin = siteProperties.siteUrl
    const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
    const prevPage = currentPage - 1

    const therePagination = next !== undefined || previous !== undefined
    const thereNext = next !== undefined
    const therePrev = previous !== undefined
    const urlNextPage = requestUri
      ? this.buildUrlPagination(nextPage)
      : `${pathOrigin}?page=${nextPage}`
    const urlPrevPage = requestUri
      ? this.buildUrlPagination(prevPage)
      : `${pathOrigin}?page=${prevPage}`

    return (
      <Fragment>
        <meta name="robots" content="noindex,follow" />
        {therePagination && therePrev && (
          <Fragment>
            <link rel="prev" href={urlPrevPage} />
            <link rel="prefetch" href={urlPrevPage} />
          </Fragment>
        )}
        {therePagination && thereNext && (
          <Fragment>
            <link rel="next" href={urlNextPage} />
            <link rel="prefetch" href={urlNextPage} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default MetaSearch
