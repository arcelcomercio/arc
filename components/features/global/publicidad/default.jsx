import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Ads from '../../../../resources/components/ads'

@Consumer
class Publicidad extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      customFields: { adElement, isDesktop, isMobile, freeHtml } = {},
    } = this.props

    const params = {
      adElement,
      isDesktop,
      isMobile,
    }

    const createMarkup = html => {
      return { __html: html }
    }

    return (
      <Fragment>
        <Ads {...params} />
        {freeHtml && <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />}
      </Fragment>
    )
  }
}

Publicidad.propTypes = {
  customFields: PropTypes.shape({
    adElement: PropTypes.string.isRequired.tag({
      name: 'Nombre',
    }),
    isDesktop: PropTypes.bool.tag({ name: 'Desktop', group: 'Dispositivo' }),
    isMobile: PropTypes.bool.tag({ name: 'Mobile', group: 'Dispositivo' }),
    freeHtml: PropTypes.richtext.tag({
      name: 'Código HTML',
      group: 'Agregar bloque de html',
    }),
  }),
}

export default Publicidad
