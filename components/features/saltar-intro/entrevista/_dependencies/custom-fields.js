import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storiesConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  image: PropTypes.string.tag({
    name: 'Imagen',
    description:
      'Si no se llena este campo, se mostrará la imagen por defecto de la nota.',
  }),
  title: PropTypes.string.tag({
    name: 'Título',
    description:
      'Si no se llena este campo, se mostrará el título por defecto de la nota.',
  }),
  actor: PropTypes.string.isRequired.tag({ name: 'Nombre del entrevistado' }),
  rol: PropTypes.string.isRequired.tag({ name: 'Rol que desempeño' }),
  seeMoreLink: PropTypes.string.tag({ name: 'Link de Ver Mas' }),
})

export default customFields
