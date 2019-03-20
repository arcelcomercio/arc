import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import DataStory from '../../../../resources/components/utils/data-story'
import AperturaExtraordinaria from '../../../../resources/components/apertura-extraordinaria'
import Ads from '../../../../resources/components/ads'
import MasLeidas from '../../../../resources/components/listado-leidas'
import CardNotice from '../../../../resources/components/listado-noticias'

const classes = {
  aperturaExtraordinaria: 'content-grid-base content--1col col-3',
  mainContent:
    'content-grid-base content-layout content--1col content--2col content--3col margin-top',
  main: 'content-grid-base content--1col col-2',
  sidebar: 'col-1',
  titleListado: 'text-center text-uppercase listado-destacado__title',
  btnSeeMore: 'text-center text-uppercase listado-destacado__btn-more',
}

@Consumer
class ListadoDestacado extends Component {
  render() {
    const { globalContent, arcSite, requestUri } = this.props
    const paramsMasLeidas = {
      viewImage: true,
      numNotes: 5,
      arcSite,
      requestUri,
    }
    const data = globalContent.content_elements || []
    const dataApertura = new DataStory(data[0], arcSite)
    const dataList = data.slice(1)

    return (
      <Fragment>
        <AperturaExtraordinaria
          data={dataApertura}
          multimediaOrientation="right"
        />
        <div className={classes.mainContent}>
          <div className={classes.main}>
            <h4 className={classes.titleListado}>Ultimas Noticias</h4>
            {dataList &&
              data.map(el => {
                const paramsItem = { key: el.id, data: el, arcSite }
                return <CardNotice {...paramsItem} />
              })}
            <a href="/#" className={classes.btnSeeMore}>
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
