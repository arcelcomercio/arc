import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import CardNotice from './../../../../resources/components/listado-noticias'
import RenderPagination from './../../Navegacion-archivo/default'

@Consumer
class Archivo extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
  }

  render() {
    console.log('props')
    console.dir(this.props)
    const {
      globalContent: { content_elements: contentElements },
      arcSite,
    } = this.props

    const params = {
      data: contentElements || [],
      arcSite,
    }
    return <Fragment>
      <CardNotice {...params} />
      <RenderPagination /> 
    </Fragment>
  }
}

Archivo.propTypes = {
  globalContent: PropTypes.object,
}

export default Archivo
