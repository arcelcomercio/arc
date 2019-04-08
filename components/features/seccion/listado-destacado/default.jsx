import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import DataStory from '../../../../resources/components/utils/data-story'
import AperturaExtraordinaria from '../../../../resources/components/apertura-extraordinaria'
import Ads from '../../../../resources/components/ads'
import CardNotice from '../../../../resources/components/listado-noticias'
import CustomTitle from '../../global/custom-title/default'

import ListadoLeidas from '../../../../resources/components/listado-leidas'
import filterSchema from '../../global/mas-leidas/_children/filterSchema'
import {
  setDataTest,
  castingData,
} from '../../global/mas-leidas/_children/castingData'
import configFetch from '../../global/mas-leidas/_children/configFetch'

const classes = {
  nameSection:
    'listado-destacado__titulo-section bg--white text-uppercase margin-top',
  aperturaExtraordinaria: 'content-grid-base content--1col col-3',
  mainContent:
    'content-grid-base content-layout content--1col content--2col content--3col padding-normal bg--white',
  main: 'content-grid-base content--1col col-2',
  sidebar: 'col-1 no-mobile',
  titleListado: 'text-center text-uppercase listado-destacado__title',
  btnSeeMore: 'text-center text-uppercase listado-destacado__btn-more',
}
@Consumer
class ListadoDestacado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
      totalElements: 5,
    }
  }

  componentDidMount() {
    this.getMoreReads()
  }

  getMoreReads() {
    const { source, params } = configFetch(this.props)
    const { fetched } = this.getContent(source, params, filterSchema())
    const { totalElements } = this.state

    fetched
      .then(response => {
        const { content_elements: contentElements = [] } = response || {}
        if (contentElements && contentElements.length > 0) {
          this.setState({
            news: castingData(contentElements, this.props),
          })
        } else {
          this.setState({
            news: setDataTest(totalElements),
          })
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({
          news: setDataTest(totalElements),
        })
      })
  }

  render() {
    const {
      globalContent,
      globalContentConfig,
      arcSite,
      requestUri,
      contextPath,
    } = this.props
    const { content_elements: contentElements } = globalContent || {}
    const { query: { section = '' } = {} } = globalContentConfig || {}

    const { news } = this.state

    const paramsMasLeidas = {
      viewImage: true,
      numNotes: 5,
      arcSite,
      requestUri,
      news,
    }

    const data = contentElements || []
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
          <CustomTitle />
        </div>
        <AperturaExtraordinaria {...paramsApertura} />
        <div className={classes.mainContent}>
          <div className={classes.main}>
            <h4 className={classes.titleListado}>Ultimas Noticias</h4>
            {dataList &&
              dataList.map(el => {
                const paramsItem = { key: el._id, data: el, arcSite }
                return <CardNotice {...paramsItem} />
              })}
            <a href={urlSeeMore} className={classes.btnSeeMore}>
              Ver Más
            </a>
          </div>
          <aside className={classes.sidebar}>
            <Ads adElement="right1" isDesktop />
            <ListadoLeidas {...paramsMasLeidas} />
            <Ads adElement="right2" isDesktop />
          </aside>
        </div>
      </Fragment>
    )
  }
}
export default ListadoDestacado
