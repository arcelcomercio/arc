import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

@Consumer
class GrillaPublicidad extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { customFields } = this.props
    const {
      adElement,
      isDesktop,
      isMobile,
      columns,
      rows,
      freeHtml,
    } = customFields

    const getSize = () => {
      let colCLass = ''
      if (columns === 'oneCol') colCLass = 'col-1'
      else if (columns === 'twoCol') colCLass = 'col-2'
      else if (columns === 'threeCol') colCLass = 'col-3'

      let rowClass = ''
      if (rows === 'oneRow') rowClass = 'row-1'
      else if (rows === 'twoRow') rowClass = 'row-2'

      if (colCLass || rowClass) return `${colCLass} ${rowClass}`
      return ''
    }
    const createMarkup = html => {
      return { __html: html }
    }

    // TODO: Corregir el nodo duplicado de html
    return (
      <Fragment>
        <div className={`no-mobile ${getSize()}`}>
          {adElement && isDesktop && <div id={`ads_d_${adElement}`} />}
          {freeHtml && <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />}
        </div>
        {adElement && isMobile && <div id={`ads_m_${adElement}`} />}
        {freeHtml && (
          <div
            className="no-desktop"
            dangerouslySetInnerHTML={createMarkup(freeHtml)}
          />
        )}
      </Fragment>
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
    freeHtml: PropTypes.richtext.tag({
      name: 'Código HTML',
      group: 'Agregar bloque de html',
    }),
  }),
}

export default GrillaPublicidad
