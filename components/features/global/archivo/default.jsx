import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import CardNotice from './../../../../resources/components/listado-noticias'

@Consumer
class Archivo extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
  }

  render() {
    const {
      globalContent: { content_elements: contentElements },
      arcSite,
    } = this.props

    const params = {
      data: contentElements,
      arcSite,
    }
    return <CardNotice {...params} />
  }
}

Archivo.propTypes = {
  globalContent: PropTypes.object,
}

export default Archivo
