import React, { Component } from 'react'

const classes = {
  paginacion: 'flex paginacion',
  page: 'paginacion__page',
}

export default class Paginacion extends Component {
  constructor(props) {
    super(props)
    const { totalElements, totalViews } = props
    this.state = {
      pages: [],
      totalPages: Math.ceil(totalElements / totalViews),
    }
    this.init()
  }

  init() {
    const { currentPage } = this.props
    const { pages, totalPages } = this.state

    const adyacentes = {
      pre: currentPage - 3,
      pos: parseInt(currentPage, 10) + 3,
    }
    let init = 1
    let end = 0

    if (adyacentes.pre <= 1 || totalPages - 6 === 0) init = 1
    else if (totalPages - 6 >= 1 && currentPage > totalPages - 5)
      init = totalPages - 6
    else if (currentPage < totalPages - 6) init = adyacentes.pre

    if (init === 1) {
      end = totalPages > 7 ? 7 : totalPages
    } else end = adyacentes.pos > totalPages ? totalPages : adyacentes.pos

    for (let i = init; i <= end; i++) {
      if (i === init && init > 2) pages.push('...')
      pages.push(i)
      if (i === end && end < totalPages - 1) pages.push('...')
    }
    this.setState({
      pages,
    })
  }

  render() {
    let { currentPage } = this.props
    currentPage = parseInt(currentPage, 10)

    const { pages, totalPages } = this.state
    const querys = window.location.search

    let pathOrigin = window.location.pathname.match(/\D+/)
    pathOrigin =
      pathOrigin[0].charAt(pathOrigin[0].length - 1) === '/'
        ? pathOrigin[0].slice(0, -1)
        : pathOrigin[0]

    const isBuscar = window.location.pathname.match(/buscar/)
    const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
    const prevPage = currentPage - 1

    let urlPrevPage
    let urlNextPage
    let urlLastPage
    let urlFirstPage

    if (isBuscar !== null) {
      urlFirstPage = querys
        ? `${pathOrigin}${querys}&page=1`
        : `${pathOrigin}?page=1`
      urlPrevPage = querys
        ? `${pathOrigin}${querys}&page=${prevPage}`
        : `${pathOrigin}?page=${prevPage}`
      urlNextPage = querys
        ? `${pathOrigin}${querys}&page=${nextPage}`
        : `${pathOrigin}?page=${nextPage}`
      urlLastPage = querys
        ? `${pathOrigin}${querys}&page=${totalPages}`
        : `${pathOrigin}?page=${totalPages}`
    } else {
      urlFirstPage = `${pathOrigin}/1${querys}`
      urlPrevPage = `${pathOrigin}/${prevPage}${querys}`
      urlNextPage = `${pathOrigin}/${nextPage}${querys}`
      urlLastPage = `${pathOrigin}/${totalPages}${querys}`
    }

    return (
      <div className={classes.paginacion}>
        <a
          className={`${classes.page} ${
            currentPage === 1 || currentPage === 0
              ? 'paginacion__page--disabled'
              : ''
          }`}
          href={urlPrevPage}
        >
          anterior
        </a>
        {currentPage > 4 && (
          <a className={classes.page} href={urlFirstPage}>
            1
          </a>
        )}
        {pages.map(page => {
          let tag = null
          let urlPage
          if (isBuscar !== null)
            urlPage = querys
              ? `${pathOrigin}${querys}&page=${page}`
              : `${pathOrigin}?page=${page}`
          else urlPage = `${pathOrigin}/${page}${querys}`

          if (page != '...') {
            tag = (
              <a
                className={`${classes.page} ${
                  currentPage == page || (currentPage === 0 && page == 1)
                    ? 'paginacion__page--current'
                    : ''
                }`}
                href={urlPage}
              >
                {page}
              </a>
            )
          } else tag = <span className={classes.page}>{page}</span>
          return tag
        })}
        {currentPage < totalPages - 3 && totalPages > 6 && (
          <a className={classes.page} href={urlLastPage}>
            {totalPages}
          </a>
        )}
        <a
          className={`${classes.page} ${
            currentPage == totalPages ? 'paginacion__page--disabled' : ''
          }`}
          href={urlNextPage}
        >
          siguiente
        </a>
      </div>
    )
  }
}
