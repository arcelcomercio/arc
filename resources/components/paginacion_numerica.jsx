import React, { Component } from 'react'

const classes = {
  paginacion: 'flex flex--justify-between paginacion',
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
      pos: parseInt(currentPage) + 3,
    }
    let init = 0
    let end = 0

    if (adyacentes.pre <= 1) init = 1
    else
      init =
        currentPage > totalPages - 6 && currentPage <= totalPages
          ? totalPages - 6
          : adyacentes.pre

    if (init == 1) end = 7
    else end = adyacentes.pos > totalPages ? totalPages : adyacentes.pos

    for (let i = init; i <= end; i++) {
      if (i == init && init > 2) pages.push('...')
      pages.push(i)
      if (i == end && end < totalPages - 1) pages.push('...')
    }
    this.setState({
      pages,
    })
    console.log(currentPage, init, end, adyacentes, pages, totalPages)
  }

  render() {
    const { currentPage } = this.props
    const { pages, totalPages } = this.state
    const pathOrigin = window.location.pathname.match(/\D+/)
    const querys = window.location.search

    return (
      <div className={classes.paginacion}>
        <a
          className={`${classes.page} ${
            currentPage == 1 || currentPage == 0
              ? 'paginacion__page--disabled'
              : ''
          }`}
          href={`${pathOrigin}${currentPage - 1}${querys}`}
        >
          anterior
        </a>
        {currentPage > 4 && (
          <a className={classes.page} href={`${pathOrigin}1${querys}`}>
            1
          </a>
        )}
        {pages.map(page => {
          let tag = null
          if (page != '...') {
            tag = (
              <a
                className={`${classes.page} ${
                  currentPage == page || (currentPage == 0 && page == 1)
                    ? 'paginacion__page--current'
                    : ''
                }`}
                href={`${pathOrigin}${page}${querys}`}
              >
                {page}
              </a>
            )
          } else tag = <span className={classes.page}>{page}</span>
          return tag
        })}
        {currentPage < totalPages - 3 && (
          <a
            className={classes.page}
            href={`${pathOrigin}${totalPages}${querys}`}
          >
            {totalPages}
          </a>
        )}
        <a
          className={`${classes.page} ${
            currentPage == totalPages ? 'paginacion__page--disabled' : ''
          }`}
          href={`${pathOrigin}${parseInt(currentPage) + 1}${querys}`}
        >
          siguiente
        </a>
      </div>
    )
  }
}
