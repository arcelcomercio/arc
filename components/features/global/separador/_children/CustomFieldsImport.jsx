import PropTypes from 'prop-types'

const customFieldsImport = PropTypes.shape({
  titleSeparator: PropTypes.string.tag({ name: 'Titulo del separador' }),
  numLineTitle: PropTypes.oneOf([1, 2,3]).tag(
    {
      name: 'Numero de lineas para el título de las noticias: ',
      labels: {
        1: 'Una inea',
        2: 'Dos ineas',
        3: 'Tres ineas',
      },
      defaultValue: 1,
    }
  ),
  titleLink: PropTypes.string.tag({ name: 'Enlace del separador' }),
  section: PropTypes.string.isRequired.tag({ name: 'Sección' }),
  htmlCode: PropTypes.richtext.tag({ name: 'Código HTML' }),
})

export default customFieldsImport
