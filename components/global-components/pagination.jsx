import React from 'react'
import { addParamToEndPath } from '../utilities/helpers'

const classes = {
  pagination:
    'pagination flex justify-center w-full flex-wrap mb-15 m-0 md:pb-30 md:pr-0 md:pl-0',
  page: 'pagination__page uppercase h-full text-md text-gray-300',
}

const createPaginator = (currentPage, totalPages) => {
  const listPages = []
  const initPage = 1

  // eslint-disable-next-line no-param-reassign
  currentPage =
    Math.abs(currentPage) > totalPages ? totalPages : Math.abs(currentPage)

  const leftPag = currentPage - initPage >= 5
  const rightPag = totalPages - currentPage >= 5

  if (leftPag && rightPag) {
    for (let i = currentPage - 3; i <= currentPage + 3; i++) {
      listPages.push(i)
    }
  }

  if (leftPag && !rightPag) {
    for (let i = totalPages - 5; i <= totalPages; i++) {
      listPages.push(i)
    }
  }

  if (!leftPag && rightPag) {
    for (let i = initPage; i <= initPage + 5; i++) {
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

const testSearchPath = path => {
  let newPath = path
  let regex = /^\/buscar\/.+$/g
  if (regex.test(path)) {
    regex = /^\/buscar\/[^/]+\/[^/]+\/[^/]+\/?$/g
    if (!regex.test(path)) {
      const splittedPath = path.split('/')
      /**
       * Las URLs se arman correctamente en el CDN de prod o sandbox,
       * cuando la URL no contiene /pf/
       */
      if (splittedPath.length === 2)
        // /buscar/query
        newPath = addParamToEndPath(path, 'todas/descendiente')
      else if (splittedPath.length === 3)
        // /buscar/query/section
        newPath = addParamToEndPath(path, 'descendiente')
    }
  }
  return newPath
}

const Pagination = props => {
  const { totalElements, storiesQty, requestUri } = props
  let { currentPage } = props

  const totalPages = Math.ceil(totalElements / (storiesQty || 50))
  const pages = createPaginator(currentPage || 1, totalPages)
  currentPage = parseInt(currentPage || 1, 10)

  let pathOrigin = requestUri.replace(/\/[0-9]+\/?/, '') // .replace(/\/[0-9]*?\/?$/, '')
  pathOrigin = testSearchPath(pathOrigin)

  const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
  const prevPage = currentPage - 1

  const urlPrevPage = addParamToEndPath(pathOrigin, prevPage) // `${pathOrigin}/${prevPage}/`
  const urlNextPage = addParamToEndPath(pathOrigin, nextPage) // `${pathOrigin}/${nextPage}/`

  return (
    <div role="navigation" className={classes.pagination}>
      {currentPage === 1 || currentPage === 0 ? (
        <p
          className={`${classes.page} pagination__page--disabled`}
          href={urlPrevPage}>
          <span className="non-tablet non-desktop">&#60;</span>
          <span className="non-mobile">anterior</span>
        </p>
      ) : (
        <a className={classes.page} href={urlPrevPage}>
          <span className="non-tablet non-desktop">&#60;</span>
          <span className="non-mobile">anterior</span>
        </a>
      )}

      {pages.map((page, i) => {
        let tag = null
        const key = `pagination-${i}-${page || ''}`

        if (page !== '...') {
          const urlPage = addParamToEndPath(pathOrigin, page) // `${pathOrigin}/${page}/`
          if (currentPage === page || (currentPage === 0 && page === 1)) {
            tag = (
              <span
                key={key}
                className={`${classes.page} ${'pagination__page--current'}`}>
                {page}
              </span>
            )
          } else {
            tag = (
              <a key={key} className={classes.page} href={urlPage}>
                {page}
              </a>
            )
          }
        } else {
          tag = (
            <span key={key} className={classes.page}>
              {page}
            </span>
          )
        }
        return tag
      })}
      {currentPage === totalPages ? (
        <p
          className={`${classes.page} pagination__page--disabled`}
          href={urlNextPage}>
          <span className="non-tablet non-desktop">&#62;</span>
          <span className="non-mobile">siguiente</span>
        </p>
      ) : (
        <a className={classes.page} href={urlNextPage}>
          <span className="non-tablet non-desktop">&#62;</span>
          <span className="non-mobile">siguiente</span>
        </a>
      )}
    </div>
  )
}

export default Pagination
