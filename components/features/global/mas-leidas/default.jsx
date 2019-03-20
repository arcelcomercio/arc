import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import ListReads from '../../../../resources/components/listado-leidas'

@Consumer
class MasLeidas extends Component {
  constructor(props) {
    super(props)
    const { customFields } = props
  }

  render() {
    const { customFields, arcSite, requestUri } = this.props
    const { viewImage, numNotes } = customFields
    const params = {
      viewImage,
      numNotes,
      arcSite,
      requestUri,
    }

    return <ListReads {...params} />
  }
}

MasLeidas.propTypes = {
  customFields: PropTypes.shape({
    viewImage: PropTypes.bool.tag({
      name: 'Imagen Visible',
    }),
    numNotes: PropTypes.number.tag({
      name: 'Número de Noticias',
      min: 1,
      defaultValue: 5,
    }),
  }),
}

export default MasLeidas
