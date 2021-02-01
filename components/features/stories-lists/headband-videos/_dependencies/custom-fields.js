import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  story1: PropTypes.string.isRequired.tag({
    name: 'Nota 1',
    description:
      'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos',
  }),
  live1: PropTypes.bool.tag({
    name: 'Nota 1 en vivo',
  }),

  story2: PropTypes.string.isRequired.tag({
    name: 'Nota 2',
    description:
      'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos',
  }),
  live2: PropTypes.bool.tag({
    name: 'Nota 2 en vivo',
  }),

  story3: PropTypes.string.isRequired.tag({
    name: 'Nota 3',
    description:
      'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos',
  }),
  live3: PropTypes.bool.tag({
    name: 'Nota 3 en vivo',
  }),

  story4: PropTypes.string.isRequired.tag({
    name: 'Nota 4',
    description:
      'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos',
  }),
  live4: PropTypes.bool.tag({
    name: 'Nota 4 en vivo',
  }),

  story5: PropTypes.string.isRequired.tag({
    name: 'Nota 5',
    description:
      'Ingrese el link de la nota con video. Ejm /video/clausura-panamericanos',
  }),
  live5: PropTypes.bool.tag({
    name: 'Nota 5 en vivo',
  }),
})

export default customFields
