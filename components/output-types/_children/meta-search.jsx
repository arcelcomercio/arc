import React, { Fragment, Component } from 'react'

class MetaSearch extends Component {
  render() {
    const { globalContent, siteName } = this.props
    const { next, previous } = globalContent

    const querys = window.location.search
    const currentPage = querys.match('&page=[0-9]+')
      ? parseInt(querys.match('&page=[0-9]+')[0].split('=')[1], 10)
      : null

    let pathOrigin = window.location.pathname.match(/\D+/)
    pathOrigin =
      pathOrigin[0].charAt(pathOrigin[0].length - 1) === '/'
        ? pathOrigin[0].slice(0, -1)
        : pathOrigin[0]

    const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
    const prevPage = currentPage - 1

    const therePagination = next !== undefined || previous !== undefined
    const thereNext = next !== undefined
    const therePrev = previous !== undefined
    let urlNextPage = ''
    let urlPrevPage = ''

    if (querys) {
      urlPrevPage =
        querys.match(/page=[0-9]+/) !== null
          ? querys.replace(/&page=[0-9]+/, `&page=${prevPage}`)
          : `${pathOrigin}${querys}&page=${prevPage}`
      urlNextPage =
        querys.match(/page=[0-9]+/) !== null
          ? querys.replace(/&page=[0-9]+/, `&page=${nextPage}`)
          : `${pathOrigin}${querys}&page=${nextPage}`
    } else {
      urlPrevPage = `${pathOrigin}?page=${prevPage}`
      urlNextPage = `${pathOrigin}?page=${nextPage}`
    }

    console.log(
      '___________________________________________________________________************',
      this.props,
      this.state
    )

    return (
      <Fragment>
        <title>Buscar | {siteName}</title>
        <meta name="robots" content="noindex,follow" />
        {therePagination && therePrev && <link rel="prev" href={urlPrevPage} />}
        {therePagination && thereNext && <link rel="next" href={urlNextPage} />}
      </Fragment>
    )
  }
}

export default MetaSearch
