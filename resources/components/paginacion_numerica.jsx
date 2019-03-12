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
  }

  componentDidMount() {
    const { currentPage } = this.props
    const aux = this.createPaginator(currentPage)
    console.log(this.state, aux)
    this.setState({ pages: aux })
  }

  createPaginator(currentPage) {
    const listPages = []
    const { totalPages } = this.state
    const initPage = 1

    // eslint-disable-next-line no-param-reassign
    currentPage =
      Math.abs(currentPage) > totalPages ? totalPages : Math.abs(currentPage)

    const leftPag = currentPage - initPage >= 6
    const rightPag = totalPages - currentPage >= 6

    if (leftPag && rightPag) {
      for (let i = currentPage - 3; i <= currentPage + 3; i++) {
        listPages.push(i)
      }
    }

    if (leftPag && !rightPag) {
      for (let i = totalPages - 6; i <= totalPages; i++) {
        listPages.push(i)
      }
    }

    if (!leftPag && rightPag) {
      for (let i = initPage; i <= initPage + 6; i++) {
        listPages.push(i)
      }
    }

    if (!leftPag && !rightPag) {
      for (let i = initPage; i <= totalPages; i++) {
        listPages.push(i)
      }
    }

    if (rightPag) {
      if (totalPages - listPages.length > 1) listPages.push('...')
      if (totalPages - listPages.length >= 1) listPages.push(totalPages)
    }

    if (leftPag) {
      const aux = []
      if (listPages[0] - initPage >= 1) aux.push(initPage)
      if (listPages[0] - initPage > 1) aux.push('...')
      if (aux.length > 1) listPages.unshift(aux[0], aux[1])
      else listPages.unshift(aux[0])
    }

    return listPages
  }

  render() {
    let { currentPage } = this.props
    currentPage = parseInt(currentPage, 10)

    const { pages, totalPages } = this.state
    const querys = window.location.search
    console.log(pages)

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

    if (isBuscar !== null) {
      urlPrevPage = querys
        ? `${pathOrigin}${querys}&page=${prevPage}`
        : `${pathOrigin}?page=${prevPage}`
      urlNextPage = querys
        ? `${pathOrigin}${querys}&page=${nextPage}`
        : `${pathOrigin}?page=${nextPage}`
    } else {
      urlPrevPage = `${pathOrigin}/${prevPage}${querys}`
      urlNextPage = `${pathOrigin}/${nextPage}${querys}`
    }

    return (
      <div className={classes.paginacion}>
        <a
          className={`${classes.page} ${
            currentPage === 1 || currentPage === 0
              ? 'paginacion__page--disabled'
              : ''
          }`}
          href={urlPrevPage}>
          anterior
        </a>
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
                href={urlPage}>
                {page}
              </a>
            )
          } else tag = <span className={classes.page}>{page}</span>
          return tag
        })}
        <a
          className={`${classes.page} ${
            currentPage == totalPages ? 'paginacion__page--disabled' : ''
          }`}
          href={urlNextPage}>
          siguiente
        </a>
      </div>
    )
  }
}
