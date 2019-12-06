import PropTypes from 'prop-types'
import { spacesAdsId, spacesAdsName } from '../../../utilities/config-params'

const customFields = PropTypes.shape({
  freeHtml: PropTypes.richtext.tag({
    name: 'Código HTML',
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
