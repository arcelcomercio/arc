import PropTypes from 'prop-types'

const customFieldsImp = PropTypes.shape({
  titleOpinion: PropTypes.string.isRequired.tag({ name: 'Título: ' }),
  section1: PropTypes.string.isRequired.tag({ name: 'Sección 1:' }),
  section2: PropTypes.string.isRequired.tag({ name: 'Sección 2:' }),
  section3: PropTypes.string.isRequired.tag({ name: 'Sección 3:' }),
  section4: PropTypes.string.isRequired.tag({ name: 'Sección 4:' }),
})

export default customFieldsImp
