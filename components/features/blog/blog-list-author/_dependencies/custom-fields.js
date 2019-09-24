import PropTypes from 'prop-types'

export const customFieldsAdsList = {
  initialPositionItem: PropTypes.number.tag({
    name: 'Número de item inicial',
    description: 'Por defecto 0',
  }),
  isListByAuthor: PropTypes.bool.tag({
    name: '¿Es Listado por autor?',
    defaultValue: true,
  }),
}

export const customFields = PropTypes.shape({
  ...customFieldsAdsList,
})
