import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  sectionName: PropTypes.string.tag({
    name: 'Nombre de la sección',
    description:
      'Si no se define el nombre personalizado, tomará automáticamente el nombre de la sección del elemento que se muestra. Ejemplo: Impresa',
  }),
  feedOffset: PropTypes.number.tag({
    name: 'Mostrar impresa número:',
    min: 0,
    max: 365,
    step: 1,
    defaultValue: 0,
    description:
      'Indique el número de la versión impresa que quiere mostrar. La más reciente corresponde al número 0',
  }),
})

export default customFields
