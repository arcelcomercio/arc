import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from './../../../resources/components/listado-noticias'
// import Publicidad from './../global/publicidad/default'
// import MasLeidas from './../global/mas-leidas/default'

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
      arcSite,contextPath
    } = this.props
    const params = {
      data: contentElements || [],
      arcSite,
    }
    //section
    debugger
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
              <a href={`${contextPath}/archivo${''}?_website=${arcSite}`}>
                Ver más
              </a>
            </div>
          </div>
        </div>
        <div className=" col-1">
          <div className="col-3">Publcidad</div>
          <div className="col-3">Mas leidas</div>

          <div className="col-3">publicidad</div>
        </div>
      </Fragment>
    )
  }
}

export default Default
