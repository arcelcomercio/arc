import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  urlVideo: PropTypes.string.tag({
    name: 'URL del live',
    description:
      'Url del video en vivo que facebook ofrece desde la plataforma',
  }),
})

export default customFields
