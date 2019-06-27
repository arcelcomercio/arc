import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { createMarkup } from '../../utilities/helpers'
import AdsChild from '../../global-components/ads'

const classes = {
  adsBox: 'flex items-center justify-center flex-col overflow-hidden',
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

    const hideClass = () => {
      let classDevice = ''

      if (isDesktop && !isMobile) classDevice = 'no-mobile'
      else if (!isDesktop && isMobile) classDevice = 'no-desktop'
      if (freeHtml) classDevice = ''

      return classDevice
    }

    return (
      <div
        className={`${columns} ${rows === 'empty' ? '' : rows} ${hideClass()} ${
          classes.adsBox
        }`}>
        <AdsChild {...params} />
        {freeHtml && <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />}
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
      name: 'Código HTML Adicional',
      group: 'Agregar bloque de HTML',
      description:
        'HTML a renderizar en el espacio disponible junto al módulo de publicidad.',
    }),
    columns: PropTypes.oneOf(['w-full', 'col-1', 'col-2', 'col-3']).tag({
      name: 'Ancho de la publicidad',
      labels: {
        'w-full': 'auto',
        'col-1': '1 columna',
        'col-2': '2 columnas',
        'col-3': '3 columnas',
      },
      defaultValue: 'w-full',
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

export default Ads
