import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
//import Publicidad from '../../../../resources/components/ads'
import Publicidad from '../../../resources/components/ads'

const classes = {
  container: 'container',
  title: 'container__title',
}
// eslint-disable-next-line react/require-render-return
@Consumer
class seccionListado extends Component {
  render() {
    const { globalContent } = this.props

    const params = {
      data: globalContent.content_elements || [],
    }

    return (
      <div className="content-grid-base col-3">
        <div className={classes.container}>
          <h1 className={classes.title}>Economia</h1>
        </div>
        <div>Cuerpo</div>
        <div>
          <Publicidad />
        </div>
      </div>
    )
  }
}

export default seccionListado
