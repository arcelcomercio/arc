import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  story01: PropTypes.string.isRequired.tag({
    name: 'Nota destacada',
    description:
      'Ingrese el link de la nota con video destacada. Ejm /video/clausura-panamericanos',
  }),
  liveStory01: PropTypes.bool.tag({
    name: 'Nota destacada en vivo',
  }),

  story02: PropTypes.string.isRequired.tag({
    name: 'Nota 1',
    description:
      'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos',
  }),
  liveStory02: PropTypes.bool.tag({
    name: 'Nota 1 en vivo',
  }),

  story03: PropTypes.string.isRequired.tag({
    name: 'Nota 2',
    description:
      'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos',
  }),
  liveStory03: PropTypes.bool.tag({
    name: 'Nota 2 en vivo',
  }),

  story04: PropTypes.string.isRequired.tag({
    name: 'Nota 3',
    description:
      'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos',
  }),
  liveStory04: PropTypes.bool.tag({
    name: 'Nota 3 en vivo',
  }),

  story05: PropTypes.string.isRequired.tag({
    name: 'Nota 4',
    description:
      'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos',
  }),
  liveStory05: PropTypes.bool.tag({
    name: 'Nota 4 en vivo',
  }),
})

export default customFields
