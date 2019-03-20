import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Ads from '../../../../resources/components/ads'

@Consumer
class GrillaPublicidad extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { customFields } = this.props
    const { adElement, isDesktop, isMobile, columns, rows } = customFields
    const params = {
      adElement,
      isDesktop,
      isMobile,
    }

    const getSize = () => {
      let colCLass = ''
      if (columns === 'oneCol') colCLass = 'col-1'
      else if (columns === 'twoCol') colCLass = 'col-2'
      else if (columns === 'threeCol') colCLass = 'col-3'

      let rowClass = ''
      if (rows === 'oneRow') rowClass = 'row-1'
      else if (rows === 'twoRow') rowClass = 'row-2'

      if (colCLass || rowClass) return { className: `${colCLass} ${rowClass}` }
      return ''
    }

    return (
      <div {...getSize()}>
        <Ads {...params} />
      </div>
    )
  }
}

GrillaPublicidad.propTypes = {
  customFields: PropTypes.shape({
    adElement: PropTypes.string.isRequired.tag({
      name: 'Nombre',
    }),
    isDesktop: PropTypes.bool.tag({ name: 'Desktop', group: 'Dispositivo' }),
    isMobile: PropTypes.bool.tag({ name: 'Mobile', group: 'Dispositivo' }),
    columns: PropTypes.oneOf(['auto', 'oneCol', 'twoCol', 'threeCol']).tag({
      name: 'Número de columnas',
      labels: {
        oneCol: '1 columna',
        twoCol: '2 columnas',
        threeCol: '3 columnas',
      },
      defaultValue: 'auto',
      group: 'Definir tamaño',
    }),
    rows: PropTypes.oneOf(['auto', 'oneRow', 'twoRow']).tag({
      name: 'Número de filas',
      labels: {
        oneRow: '1 fila',
        twoRow: '2 filas',
      },
      defaultValue: 'auto',
      group: 'Definir tamaño',
    }),
  }),
}

export default GrillaPublicidad
