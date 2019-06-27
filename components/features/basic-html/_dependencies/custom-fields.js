import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
    freeHtml: PropTypes.richtext.tag({
        name: 'Código HTML',
    }),
})


export default customFields