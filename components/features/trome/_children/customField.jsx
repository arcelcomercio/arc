import PropTypes from 'prop-types'

const customFieldsImp = PropTypes.shape({
  titleOpinion: PropTypes.string.isRequired.tag({ name: 'Título: ' }),
  numLineTitle: PropTypes.oneOf([1, 2]).tag(
    {
      name: 'Numero de lineas para el título del a nota: ',
      labels: {
        1: 'Una linea',
        2: 'Dos lineas',
      },
      defaultValue: 1,
    }
  ),
  section1: PropTypes.string.isRequired.tag({ name: 'Sección 1:' }),
  section2: PropTypes.string.isRequired.tag({ name: 'Sección 2:' }),
  section3: PropTypes.string.isRequired.tag({ name: 'Sección 3:' }),
  section4: PropTypes.string.isRequired.tag({ name: 'Sección 4:' }),
})

export default customFieldsImp
