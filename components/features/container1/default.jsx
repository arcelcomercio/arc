import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from './../../../resources/components/listado-noticias'
import Ads from './../../../resources/components/ads'
import MasLeidas from './../../features/global/mas-leidas/default'
import ListadoLeidas from './../../../resources/components/listado-leidas'

const classes = {
  container: 'container',
  title: 'container__title',
}
// eslint-disable-next-line react/require-render-return
@Consumer
export default class Default extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    const {
      globalContent: { content_elements: contentElements },
      arcSite,
    } = this.props
    const params = {
      data: contentElements || [],
      arcSite,
    }
    console.log(contentElements)
    return (
      <div className="content-grid-base col-3">
        <div className={classes.container} style={{}}>
          <h1 className={classes.title}>Economia</h1>
        </div>
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
        <div>
          <h1>sidebar aqui</h1>
          <Ads adElement="isright1" isDesktop={true} isMobile={true} />
          <ListadoLeidas numNotes={3} viewImage={true} />
        </div>
      </div>
    )
  }
}
