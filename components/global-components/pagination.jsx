/* eslint-disable no-nested-ternary */
import React from 'react'
import { addParamToEndPath } from '../utilities/parse/strings'
import { SITE_TROME } from '../utilities/constants/sitenames'

const classes = {
  pagination: 'pagination w-full flex-wrap mb-15 m-0 md:pb-30 md:pr-0 md:pl-0',
  page:
    'pagination__page capitalize secondary-font h-full text-md text-gray-300',
  center: 'flex justify-center items-center',
  leftPag: 'pagination__left',
  rightPag: 'pagination__right',
}

const createPaginator = (currentPage, totalPages) => {
  const listPages = []
  const initPage = 1

  // eslint-disable-next-line no-param-reassign
  currentPage =
    Math.abs(currentPage) > totalPages ? totalPages : Math.abs(currentPage)

  const leftPag = currentPage - initPage >= 2
  const rightPag = totalPages - currentPage >= 2

  if (leftPag && rightPag) {
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      listPages.push(i)
    }
  }

  if (leftPag && !rightPag) {
    for (let i = totalPages - 2; i <= totalPages; i++) {
      listPages.push(i)
    }
  }

  if (!leftPag && rightPag) {
    for (let i = initPage; i <= initPage + 2; i++) {
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
  const { totalElements, storiesQty, requestUri, arcSite } = props
  let { currentPage } = props

  const totalPages = Math.ceil(totalElements / (storiesQty || 50))
  const pages = createPaginator(currentPage || 1, totalPages)
  currentPage = parseInt(currentPage || 1, 10)

  let pathOrigin = requestUri.replace(/\/[0-9]+\/?/, '/') // .replace(/\/[0-9]*?\/?$/, '/')
  pathOrigin = testSearchPath(pathOrigin)

  const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
  const prevPage = currentPage - 1

  const urlPrevPage = addParamToEndPath(pathOrigin, prevPage) // `${pathOrigin}/${prevPage}/`
  const urlNextPage = addParamToEndPath(pathOrigin, nextPage) // `${pathOrigin}/${nextPage}/`

  return (
    <div
      role="navigation"
      className={`${classes.pagination} ${classes.center}`}>
      {currentPage === 1 || currentPage === 0 ? (
        <p
          itemProp="description"
          className={`${classes.page} ${classes.center} ${classes.leftPag} pagination__page--disabled`}>
          <span className="non-mobile">anterior</span>
        </p>
      ) : currentPage === 2 ? (
        <a
          itemProp="url"
          className={`${classes.page} ${classes.center} ${classes.leftPag}`}
          href={pathOrigin}>
          {(arcSite === SITE_TROME)
            ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="angle-down"
                role="img"
                height="21px"
                width="10px"
                viewBox="0 0 320 512">
                <path
                  fill="currentColor"
                  d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <g>
                  <path
                    d="M-16.776,9.78a.8.8,0,0,0-.018,1.091.759.759,0,0,0,.536.23.78.78,0,0,0,.518-.21l4.808-4.783a.78.78,0,0,0,.222-.555A.78.78,0,0,0-10.932,5L-15.74.213a.736.736,0,0,0-1.054.019.8.8,0,0,0,.018,1.091l4.253,4.229Z"
                    transform="translate(-3 17) rotate(180)"
                  />
                  <rect fill="none" width="24" height="24" />
                </g>
              </svg>
            )}
          <span className="non-mobile">anterior</span>
        </a>
      ) : (
        <a
          itemProp="url"
          className={`${classes.page} ${classes.center} ${classes.leftPag}`}
          href={urlPrevPage}>
          {(arcSite === SITE_TROME)
            ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="angle-down"
                role="img"
                height="21px"
                width="10px"
                viewBox="0 0 320 512">
                <path
                  fill="currentColor"
                  d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <g>
                  <path
                    d="M-16.776,9.78a.8.8,0,0,0-.018,1.091.759.759,0,0,0,.536.23.78.78,0,0,0,.518-.21l4.808-4.783a.78.78,0,0,0,.222-.555A.78.78,0,0,0-10.932,5L-15.74.213a.736.736,0,0,0-1.054.019.8.8,0,0,0,.018,1.091l4.253,4.229Z"
                    transform="translate(-3 17) rotate(180)"
                  />
                  <rect fill="none" width="24" height="24" />
                </g>
              </svg>
            )}
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
          } else if (page === 1) {
            tag = (
              <a
                itemProp="url"
                key={key}
                className={classes.page}
                href={pathOrigin}>
                {page}
              </a>
            )
          } else {
            tag = (
              <a
                itemProp="url"
                key={key}
                className={classes.page}
                href={urlPage}>
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
          itemProp="description"
          className={`${classes.page} ${classes.center} ${classes.rightPag} pagination__page--disabled`}>
          <span className="non-mobile">siguiente</span>
        </p>
      ) : (
        <a
          itemProp="url"
          className={`${classes.page} ${classes.center} ${classes.rightPag}`}
          href={urlNextPage}>
          <span className="non-mobile">siguiente</span>
          {(arcSite === SITE_TROME)
            ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="angle-down"
                role="img"
                height="21px"
                width="10px"
                viewBox="0 0 320 512">
                <path
                  fill="currentColor"
                  d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <g>
                  <path
                    d="M-16.776,9.78a.8.8,0,0,0-.018,1.091.759.759,0,0,0,.536.23.78.78,0,0,0,.518-.21l4.808-4.783a.78.78,0,0,0,.222-.555A.78.78,0,0,0-10.932,5L-15.74.213a.736.736,0,0,0-1.054.019.8.8,0,0,0,.018,1.091l4.253,4.229Z"
                    transform="translate(26 6)"
                  />
                  <rect fill="none" width="24" height="24" />
                </g>
              </svg>
            )}
        </a>
      )}
    </div>
  )
}

export default Pagination
