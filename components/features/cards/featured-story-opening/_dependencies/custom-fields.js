import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  url: PropTypes.string.tag({
    name: 'URL de Nota',
    description: 'URL de la nota a destacar',
  }),
  customTitle: PropTypes.string.tag({
    name: 'Titulo',
    description: 'Este titulo reemplazara la sección',
  }),
  note1: PropTypes.string.tag({
    name: 'URL Nota',
    group: 'Relacionar Notas',
    description: 'Ej: /deportes/esta-es-noticia/',
  }),
  note2: PropTypes.string.tag({
    name: 'URL Nota',
    group: 'Relacionar Notas',
    description: 'Ej: /deportes/esta-es-noticia/',
  }),
  // bgColor: PropTypes.oneOf(['white', 'gray', 'transparent']).tag({
  //   name: 'Color de fondo',
  //   group: 'Configuración',
  //   labels: {
  //     white: 'Blanco',
  //     gray: 'Gris',
  //     transparent: 'Transparente',
  //   },
  //   defaultValue: 'transparent',
  // }),
})

export default customFields
