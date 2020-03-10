import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  idLeague: PropTypes.string.isRequired.tag({
    name: 'Id de la liga',
    description: 'Identificador de la liga',
  }),
  leagueNameText: PropTypes.string.tag({
    name: 'Nombre de la liga',
  }),
  urlLeagueNameText: PropTypes.string.tag({
    name: 'Url del nombre de la liga',
  }),
  sponsorName: PropTypes.string.isRequired.tag({
    name: 'Texto de patrocinador',
  }),
  UrlImageSponsor: PropTypes.string.isRequired.tag({
    name: 'Url de la imagen del patrocinador',
  }),
  htmlAds: PropTypes.string.tag({
    name: 'Html',
  }),
})

export default customFields
