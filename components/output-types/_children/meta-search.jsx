import React, { Fragment, Component } from 'react'

/**
 * TODO: Creo que puede tratarse como función en lugar de como clase
 *
 */

class MetaSearch extends Component {
  buildUrlPagination(numpage) {
    // TODO: yo llamaría este arg como "pageNum" (page number)

    /** TODO: Yo pasaría el pathOrigin y requestUri por proiedad a esta función.
     *  bueno, según una recomendación que está más abajo "pathOrigin" cambiaría a otra cosa.
     *  Las dos asignaciones que siguen no serían necesarias.
     */
    const { siteProperties, requestUri } = this.props
    const pathOrigin = siteProperties.siteUrl

    const url =
      requestUri.match(/page=[0-9]+/) !== null
        ? `${pathOrigin}${requestUri.replace(
            /&page=[0-9]+/,
            `&page=${numpage}`
          )}`
        : `${pathOrigin}${requestUri}&page=${numpage}`
    // TODO: Homologaría el texto que tienes en los match()

    return url
  }

  render() {
    const { globalContent, siteProperties, requestUri } = this.props
    const { next, previous } = globalContent

    const currentPage = requestUri.match('&page=[0-9]+')
      ? parseInt(requestUri.match('&page=[0-9]+')[0].split('=')[1], 10)
      : 1

    /** TODO: En lugar de asignar "const pathOrigin = siteProperties.siteUrl "
     *  usaría sólamente "siteProperties.siteUrl", de hecho desde un inicio no
     *  enviaría todo "siteProperties" a esta función porque sólo uso "siteUrl"
     *  Si quisieras asignarle otro nombre a la variable para hacerla más reconocible
     *  se lo asignaría tan pronto llega la función como argumento.
     */
    const pathOrigin = siteProperties.siteUrl
    const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
    const prevPage = currentPage - 1

    // TODO: Recuerda usar "hasXX" en lugar de "thereXX"
    const therePagination = next !== undefined || previous !== undefined // TODO: Pa'fuera
    const thereNext = next !== undefined
    const therePrev = previous !== undefined
    const urlNextPage = requestUri // TODO: Pa'fuera
      ? this.buildUrlPagination(nextPage)
      : `${pathOrigin}?page=${nextPage}`
    const urlPrevPage = requestUri // TODO: Pa'fuera
      ? this.buildUrlPagination(prevPage)
      : `${pathOrigin}?page=${prevPage}`

    return (
      <Fragment>
        <meta name="robots" content="noindex,follow" />
        {therePagination /** TODO: Pa'fuera */ && therePrev && (
          <Fragment>
            <link rel="prev" href={urlPrevPage} />
            <link rel="prefetch" href={urlPrevPage} />
          </Fragment>
        )}
        {therePagination /** TODO: Pa'fuera */ && thereNext && (
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
