import PropTypes from 'prop-types'
import { customFieldsAdsList } from '../../_dependencies/custom-fields'

const customFields = PropTypes.shape({
  initialStory: PropTypes.number.tag({
    name: 'Iniciar desde la historia:',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
    description:
      'Indique el número de la historia desde la que quiere empezar a imprimir. La primera historia corresponde al número 0',
  }),
  storiesQty: PropTypes.number.tag({
    name: 'Cantidad de historias',
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 50,
    description: 'Indique el número de historias que deben ser listadas.',
  }),
  ...customFieldsAdsList,
})

export default customFields
