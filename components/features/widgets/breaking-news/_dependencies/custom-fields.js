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
  backgroundColor: PropTypes.oneOf(['color-1', 'color-2', 'color-3']).tag({
    name: 'Color de fondo',
    labels: {
      'color-1': 'Principal',
      'color-2': 'Secundario',
      'color-3': 'Terciario',
    },
    defaultValue: 'color-1',
  }),
  showIcon: PropTypes.bool.tag({
    name: 'Visualizar Icono',
    description: 'Por Defecto es falso, no muestra el icono de en vivo',
    defaultValue: false,
  }),
  subTitle: PropTypes.string.tag({
    name: 'Descripción',
    hidden: true,
  }),
})

export default customFields
