import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
    /* isExternalLink: PropTypes.bool.tag({
      name: '¿Nota externa?',
      defaultValue: false,
    }), */
    storyLink: PropTypes.string.isRequired.tag({
        name: 'URL',
    }),
    title: PropTypes.string.tag({
        name: 'Título',
        description: 'Dejar vacío para tomar el valor original de la historia.',
    }),
    tags: PropTypes.string.tag({
        name: 'Etiqueta'
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
        hidden: true
    }),
})

export default customFields