import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AdsChild from '../../global-components/ads'

const classes = {
  flexCenterVertical: 'flex-center-vertical',
  flexColumn: 'flex--column',
  overflowHidden: 'overflow-hidden',
}
@Consumer
class Ads extends PureComponent {
  render() {
    const { customFields } = this.props

    const { adElement, isDesktop, isMobile, freeHtml, columns, rows } =
      customFields || {}

    const params = {
      adElement,
      isDesktop,
      isMobile,
    }

    /**
     * TODO: createMarkup se puede poner como un método en helpers,
     * se usa en varias partes.
     */
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
      <div
        className={`${columns} ${rows === 'empty' ? '' : rows} ${hideClass()} ${
          classes.flexCenterVertical
        } ${classes.flexColumn} ${classes.overflowHidden}`}>
        <AdsChild {...params} />
        {freeHtml && <div dangerouslySetInnerHTML={{ __html: freeHtml }} />}
      </div>
    )
  }
}

Ads.propTypes = {
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
    columns: PropTypes.oneOf(['full-width', 'col-1', 'col-2', 'col-3']).tag({
      name: 'Ancho de la publicidad',
      labels: {
        'full-width': 'auto',
        'col-1': '1 columna',
        'col-2': '2 columnas',
        'col-3': '3 columnas',
      },
      defaultValue: 'full-width',
      group: 'Tamaño de la publicidad',
    }),
    rows: PropTypes.oneOf(['empty', 'row-1', 'row-2']).tag({
      name: 'Alto de la publicidad',
      labels: {
        empty: 'auto',
        'row-1': '1 fila',
        'row-2': '2 filas',
      },
      defaultValue: 'empty',
      group: 'Tamaño de la publicidad',
    }),
  }),
}

Ads.label = 'Publicidad'
Ads.static = true

export default Ads
