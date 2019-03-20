import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from './../../../resources/components/listado-noticias'
import Ads from './../../../resources/components/ads'
//import MasLeidas from './../../features/global/mas-leidas/default'
import ListadoLeidas from './../../../resources/components/listado-leidas'

const classes = {
  container: 'container',
  title: 'container__title',
}
// eslint-disable-next-line react/require-render-return
@Consumer
class Default extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    const {
      globalContent: { content_elements: contentElements },
      arcSite,
      contextPath,
      globalContentConfig: {
        query: { section },
      },
    } = this.props
    const params = {
      data: contentElements || [],
      arcSite,
    }
    //section
    console.log(section)

    return (
      <Fragment>
        <div className="content-grid-base col-2">
          <div className={`${classes.container}content-grid-base col-2`}>
            <h1 className={classes.title}>Economia</h1>
            <div>
              {params.data.map((el, index) => (
                <CardNotice
                  key={index}
                  formato="row"
                  data={el}
                  arcSite={params.arcSite}
                />
              ))}
            </div>
            <div className="flex flex--justify-center margin-top">
              <a href={`${contextPath}/archivo${section}?_website=${arcSite}`}>
                Ver más
              </a>
            </div>
          </div>
        </div>
        <div className=" col-1">
          <div className="col-3">
            <h3>publicidad y mas leidas</h3>
          </div>
          <div className="col-3">
            <Ads adElement="isright1" isDesktop={true} isMobile={true} />
          </div>
          <div className="col-3">
            <ListadoLeidas numNotes={5} viewImage={true} />
          </div>
          <div className="col-3">
            <Ads adElement="isright2" isDesktop={true} isMobile={true} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Default
