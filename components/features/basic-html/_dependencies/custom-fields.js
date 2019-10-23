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
})


export default customFields