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
  isDfp: PropTypes.bool.tag({
    name: 'Mostrar Publicidad DFP',
    defaultValue: true,
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
  liteAdId: PropTypes.string.tag({
    name: 'ID',
    group: 'Lite',
  }),
  liteAdName: PropTypes.string.tag({
    name: 'Nombre',
    group: 'Lite',
  }),
  liteAdDimensions: PropTypes.string.tag({
    name: 'Dimensiones para Tablet y Desktop',
    group: 'Lite',
  }),
  liteAdMobileDimensions: PropTypes.string.tag({
    name: 'Dimensiones para Mobile',
    group: 'Lite',
  }),
  liteAdInlineStyles: PropTypes.string.tag({
    name: 'Estilos inline',
    description:
      'Incluye un JSON de estilos para el contenedor de publicidad. ej. {"position":"fixed","marginTop":0}',
    group: 'Lite',
  }),
  liteAdLoadFirst: PropTypes.bool.tag({
    name: 'Carga Inmediata',
    description:
      'Si se activa, este bloque carga tan pronto como sea posible. Si se desactiva, carga sólo cuando entra en la pantalla.',
    defaultValue: false,
    group: 'Lite',
  }),
  prebidAdEnabled: PropTypes.bool.tag({
    name: 'Activar prebid para este elemento',
    defaultValue: false,
    description: `Para activar, debe existir el Campo Personalizado "Lite > Nombre"`,
    group: 'Prebid lite',
  }),
  prebidAdDimensions: PropTypes.string.tag({
    name: 'Dimensiones',
    group: 'Prebid lite',
  }),
  prebidAdLoadFirst: PropTypes.bool.tag({
    name: 'Carga Inmediata',
    description:
      'Si se activa, este bloque carga tan pronto como sea posible. Si se desactiva, carga sólo cuando entra en la pantalla.',
    defaultValue: false,
    group: 'Prebid lite',
  }),
})

export default customFields
