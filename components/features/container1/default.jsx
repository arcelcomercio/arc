import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from './../../../resources/components/listado-noticias'

import Ads from './../../../resources/components/ads'
import ListadoLeidas from './../../../resources/components/listado-leidas'

const classes = {
  col1: 'col-1',
  col2: 'col-2',
  col3: 'col-3',
  base: 'content-grid-base',
  container: 'container',
  title: 'container__title',
  flex:'flex',
  flexJustifyCenter:'flex--justify-center',
  marginTop:'margin-top',


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
      globalContentConfig,
    } = this.props

    let sec = globalContentConfig.query ? globalContentConfig.query.section : ''
    const params = {
      data: contentElements || [],
      arcSite,
    }

    return (
      <Fragment>

        <div className={`${classes.container}  ${classes.base} ${classes.col2}`}>
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
          <div className={`${classes.flex} ${classes.flexJustifyCenter} ${classes.marginTop}`} >
            <a href={`${contextPath}/archivo${sec}?_website=${arcSite}`}>
              Ver más
            </a>
          </div>
        </div>
        <div className={`${classes.col1} ${classes.container}`}>
          <div className={classes.col3}>
            <Ads adElement="isright1" isDesktop={true} isMobile={true} />
          </div>
          <div className={classes.col3}>
            <ListadoLeidas numNotes={5} viewImage={true} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Default
