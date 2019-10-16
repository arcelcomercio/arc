import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  /* isExternalLink: PropTypes.bool.tag({
      name: '¿Nota externa?',
      defaultValue: false,
    }), */
  showBreakingNews: PropTypes.bool.tag({
    name: 'Visualizar Cintillo',
    description: 'Por Defecto es Verdadero, falso para mantenerlo oculto',
    defaultValue: true,
  }),
  storyLink: PropTypes.string.isRequired.tag({
    name: 'URL',
    description: `Puedes ingresar cualquier URL externa, incluyendo el dominio (ejemplo: https://dominio.pe/url-externa), o la URL de una nota interna, sin el dominio (ejemplo: /url-interna-de-noticia).`,
  }),
  title: PropTypes.string.tag({
    name: 'Título',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  tags: PropTypes.string.tag({
    name: 'Etiqueta',
  }),
  backgroundColor: PropTypes.oneOf([
    'breaking-news--bgcolor-1',
    'breaking-news--bgcolor-2',
  ]).tag({
    name: 'Color de fondo',
    labels: {
      'breaking-news--bgcolor-1': 'Principal',
      'breaking-news--bgcolor-2': 'Secundario',
    },
    defaultValue: 'breaking-news--bgcolor-1',
  }),

  subTitle: PropTypes.string.tag({
    name: 'Descripción',
    hidden: true,
  }),
})

export default customFields
