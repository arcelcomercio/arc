import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  idLeague: PropTypes.string.isRequired.tag({
    name: 'Id de la liga',
    description: 'Identificador de la liga',
  }),
  leagueNameText: PropTypes.string.isRequired.tag({
    name: 'Nombre de la liga',
  }),
  sponsorName: PropTypes.string.isRequired.tag({
    name: 'Texto de patrocinador',
  }),
  htmlAds: PropTypes.string.isRequired.tag({
    name: 'Html',
  }),
})

export default customFields
