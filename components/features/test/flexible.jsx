import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'

@Consumer
class FlexibleBox extends Component {
  render() {
    const {
      customFields: { customWidth = 'col-1', customHeight = 'row-1' } = {},
    } = this.props

    return <div className={`q ${customWidth} ${customHeight}`} />
  }
}

FlexibleBox.propTypes = {
  customFields: PropTypes.shape({
    customWidth: PropTypes.oneOf(['col-1', 'col-2', 'col-3']).tag({
      name: 'Ancho del contenedor',
      labels: {
        'col-1': '1 columna',
        'col-2': '2 columnas',
        'col-3': '3 columnas',
      },
      defaultValue: 'col-1',
    }),
    customHeight: PropTypes.oneOf(['row-1', 'row-2', 'row-3', 'row-4']).tag({
      name: 'Alto del contenedor',
      labels: {
        'row-1': '1 fila',
        'row-2': '2 filas',
        'row-3': '3 filas',
        'row-4': '4 filas',
      },
      defaultValue: 'row-1',
    }),
  }),
}

export default FlexibleBox
