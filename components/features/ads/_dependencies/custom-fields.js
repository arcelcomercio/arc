import PropTypes from 'prop-types'
import { spacesAdsId, spacesAdsName } from '../../../utilities/config-params'

const customFields = PropTypes.shape({
  adElement: PropTypes.string.isRequired.tag({
    name: 'Nombre',
    description:
      'El nombre definido en este campo formará parte del "id" (Ej. ads_d_[nombre]).',
  }),
  isDesktop: PropTypes.bool.tag({
    name: 'Mostrar en "desktop" y "tablet"',
  }),
  isMobile: PropTypes.bool.tag({
    name: 'Mostrar en "mobile"',
  }),
  freeHtml: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'Agregar bloque de HTML',
    description:
      'HTML a renderizar en el espacio disponible junto al módulo de publicidad. El HTML siempre se mostrará en "desktop", "tablet" y "mobile".',
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

  adsSpace: PropTypes.oneOf(spacesAdsId()).tag({
    name: 'Espacio',
    group: 'Publicidad',
    labels: spacesAdsName(),
    defaultValue: 'none',
  }),
  adsBorder: PropTypes.oneOf(['border', 'containerp']).tag({
    name: 'Borde',
    group: 'Publicidad',
    labels: {
      border: 'ConBorde',
      containerp: 'SinBorde',
    },
    defaultValue: false,
  }),
})

export default customFields
