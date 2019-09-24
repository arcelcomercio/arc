import PropTypes from 'prop-types'

export const customFieldsAdsList = {
  initialPositionItem: PropTypes.number.tag({
    name: 'Número de item inicial',
    description: 'Por defecto 0',
  }),
  numShowItems: PropTypes.number.tag({
    name: 'Número de items a mostrar',
    description: 'Por defecto 9',
  }),
}

export const customFields = PropTypes.shape({
  ...customFieldsAdsList,
})
