import React, { PureComponent } from 'react'

const classes = {
  pagination:
    'pagination flex justify-center w-full flex-wrap mb-15 m-0 mx-auto md:justify-between md:pt-30 md:pb-30 md:pr-0 md:pl-0',
  page: 'pagination__page uppercase h-full text-md text-gray-300',
}

export default class Pagination extends PureComponent {
  constructor(props) {
    super(props)
    const { totalElements, storiesQty } = props // retorna cantidad de noticias a mostrar y total de noticias relacionadas
    this.state = {
      pages: [],
      totalPages: Math.ceil(totalElements / (storiesQty || 50)),
    }
  }

  componentDidMount() {
    const { currentPage } = this.props
    const aux = this.createPaginator(currentPage || 1)
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
    let { currentPage } = this.props // contiene la pagina actual normalmente es 1 en cadena
    currentPage = parseInt(currentPage || 1, 10) // transforma en entero y en base 10 el valor de currentpage

    const { pages, totalPages } = this.state //toma los valores de pages(array vacio al inicio) y total entradas
    const querys = window.location.search // captura ->  /?page=1 

    let pathOrigin = window.location.pathname.match(/\D+/) //devuelve -> un arreglo de pathname 
    pathOrigin =
      pathOrigin[0].charAt(pathOrigin[0].length - 1) === '/' // compara el ultimo caracter con /
        ? pathOrigin[0].slice(0, -1)
        : pathOrigin[0] // elimina el / si es verdadero

    const isBuscar = window.location.pathname.match(/buscar/) // devuelve buscar como elemento 0 de un array
    
    const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
    // si current vale 0 entonces la sgte pagina sera 2
    // si current es diferente de 0 entonces sumale 1
    const prevPage = currentPage - 1
    // la pagina previa tendra un valor de menos uno segun donde este

    let urlPrevPage
    let urlNextPage


    //preguntar en que casos debe aplicarse estos cambios de url
    if (isBuscar !== null) { // si existe buscar ... true
      if (querys) { // si ?page=1 existe  
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
    } else {
      urlPrevPage = `${pathOrigin}/${prevPage}${querys}` // no entiendo bien
      urlNextPage = `${pathOrigin}/${nextPage}${querys}`
    }

    return (
      <div className={classes.pagination}>
        <a
          className={`${classes.page} ${
            currentPage === 1 || currentPage === 0
              ? 'pagination__page--disabled'
              : ''
          }`}
          href={urlPrevPage}>
          anterior
        </a>
        {pages.map((page, i) => {
          let tag = null
          let urlPage
          const key = `pagination-${i}-${page || ''}`

          if (isBuscar !== null)
            if (querys) {
              urlPage =
                querys.match(/page=[0-9]+/) !== null
                  ? querys.replace(/&page=[0-9]+/, `&page=${page}`)
                  : `${pathOrigin}${querys}&page=${page}`
            } else urlPage = `${pathOrigin}?page=${page}`
          else urlPage = `${pathOrigin}/${page}${querys}`

          if (page !== '...') {
            tag = (
              <a
                key={key}
                className={`${classes.page} ${
                  currentPage === page || (currentPage === 0 && page === 1)
                    ? 'pagination__page--current'
                    : ''
                }`}
                href={urlPage}>
                {page}
              </a>
            )
          } else {
            tag = (
              <span key={key} className={classes.page}>
                {page}
              </span>
            )
          }
          return tag
        })}
        <a
          className={`${classes.page} ${
            currentPage === totalPages ? 'pagination__page--disabled' : ''
          }`}
          href={urlNextPage}>
          siguiente
        </a>
      </div>
    )
  }
}
