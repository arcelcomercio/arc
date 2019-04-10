import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
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
      customFields: {
        adElement,
        isDesktop,
        isMobile,
        freeHtml,
        columns,
        rows,
      } = {},
    } = this.props

    const params = {
      adElement,
      isDesktop,
      isMobile,
    }

    const createMarkup = html => {
      return { __html: html }
    }

    const colClass = () => {
      switch (columns) {
        case 'oneCol':
          return 'col-1'
        case 'twoCol':
          return 'col-2'
        case 'threeCol':
          return 'col-2'
        default:
          return 'full-width'
      }
    }

    const rowClass = () => {
      switch (rows) {
        case 'oneRow':
          return 'row-1'
        case 'twoRow':
          return 'row-2'
        default:
          return ''
      }
    }

    const hideClass = () => {
      if (freeHtml) return ''
      if (isDesktop && !isMobile) {
        return 'no-mobile'
      }
      if (!isDesktop && isMobile) {
        return 'no-desktop'
      }
      return ''
    }

    return (
      <div className={`${colClass()} ${rowClass()} ${hideClass()}`}>
        <Ads {...params} />
        {freeHtml && <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />}
      </div>
    )
  }
}

Publicidad.propTypes = {
  customFields: PropTypes.shape({
    adElement: PropTypes.string.isRequired.tag({
      name: 'Nombre',
    }),
    isDesktop: PropTypes.bool.tag({ name: 'Mostrar en "Desktop"' }),
    isMobile: PropTypes.bool.tag({ name: 'Mostrar en "Mobile"' }),
    freeHtml: PropTypes.richtext.tag({
      name: 'Código HTML',
      group: 'Agregar bloque de html',
    }),
    columns: PropTypes.oneOf(['auto', 'oneCol', 'twoCol', 'threeCol']).tag({
      name: 'Ancho de la publicidad',
      labels: {
        auto: 'auto',
        oneCol: '1 columna',
        twoCol: '2 columnas',
        threeCol: '3 columnas',
      },
      defaultValue: 'auto',
      group: 'Tamaño de la publicidad',
    }),
    rows: PropTypes.oneOf(['auto', 'oneRow', 'twoRow']).tag({
      name: 'Alto de la publicidad',
      labels: {
        auto: 'auto',
        oneRow: '1 fila',
        twoRow: '2 filas',
      },
      defaultValue: 'auto',
      group: 'Tamaño de la publicidad',
    }),
  }),
}

export default Publicidad
