import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import DataStory from '../../../../resources/components/utils/data-story'
import AperturaExtraordinaria from '../../../../resources/components/apertura-extraordinaria'
import Ads from '../../../../resources/components/ads'
import MasLeidas from '../../../../resources/components/listado-leidas'
import CardNotice from '../../../../resources/components/listado-noticias'
import TitleSection from '../../global/título-de-seccion/default'

const classes = {
  nameSection:
    'listado-destacado__titulo-section bg--white text-uppercase margin-top',
  aperturaExtraordinaria: 'content-grid-base content--1col col-3',
  mainContent:
    'content-grid-base content-layout content--1col content--2col content--3col padding-normal bg--white',
  main: 'content-grid-base content--1col col-2',
  sidebar: 'col-1',
  titleListado: 'text-center text-uppercase listado-destacado__title',
  btnSeeMore: 'text-center text-uppercase listado-destacado__btn-more',
}
@Consumer
class ListadoDestacado extends Component {
  render() {
    const {
      globalContent,
      globalContentConfig,
      arcSite,
      requestUri,
      contextPath,
    } = this.props

    const paramsMasLeidas = {
      viewImage: true,
      numNotes: 5,
      arcSite,
      requestUri,
    }

    const { query } = globalContentConfig && globalContentConfig
    const { section } = query !== undefined ? query : '/'

    const data = globalContent.content_elements || []
    const dataApertura = new DataStory(data[0], arcSite)
    const dataList = data.slice(1)

    const paramsApertura = {
      data: dataApertura,
      multimediaOrientation: 'right',
      isSection: true,
    }

    const urlSeeMore = `${contextPath}/archivo${section}?_website=${arcSite}`

    return (
      <Fragment>
        <div className={classes.nameSection}>
          <TitleSection />
        </div>
        <AperturaExtraordinaria {...paramsApertura} />
        <div className={classes.mainContent}>
          <div className={classes.main}>
            <h4 className={classes.titleListado}>Ultimas Noticias</h4>
            {dataList &&
              dataList.map(el => {
                const paramsItem = { key: el.id, data: el, arcSite }
                return <CardNotice {...paramsItem} />
              })}
            <a href={urlSeeMore} className={classes.btnSeeMore}>
              Ver Más
            </a>
          </div>
          <aside className={classes.sidebar}>
            <Ads adElement="right1" isDesktop="true" />
            <MasLeidas {...paramsMasLeidas} />
            <Ads adElement="right2" isDesktop="true" />
          </aside>
        </div>
      </Fragment>
    )
  }
}
export default ListadoDestacado
