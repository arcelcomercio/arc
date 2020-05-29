import PropTypes from 'prop-types'

export const customWidth = PropTypes.oneOf([
  'w-full',
  'col-1',
  'col-2',
  'col-3',
]).tag({
  name: 'Ancho del contenedor',
  labels: {
    'w-full': 'Flexible',
    'col-1': '1 Columna',
    'col-2': '2 Columnas',
    'col-3': '3 Columnas',
  },
  defaultValue: 'w-full',
  group: 'Dimensiones',
})

export const customHeight = PropTypes.oneOf([
  '',
  'row-1',
  'row-2',
  'row-3',
  'row-4',
]).tag({
  name: 'Alto del contenedor',
  labels: {
    '': 'Flexible',
    'row-1': '1 Fila',
    'row-2': '2 Filas',
    'row-3': '3 Filas',
    'row-4': '4 Filas',
  },
  defaultValue: '',
  group: 'Dimensiones',
})

export const containerType = PropTypes.oneOf(['section', 'div']).tag({
  name: 'Tipo de contenedor',
  labels: {
    div: 'Contenedor simple',
    section: 'Sección',
  },
  defaultValue: 'div',
})

export const containerClass = PropTypes.oneOf(['', 'con-class']).tag({
  name: 'Contenedor con ads',
  labels: {
    '': 'Sim Ads',
    'con-class': 'Con Ads',
  },
  defaultValue: '',
  group: 'Dimensiones',
})

export const containerCustomClass = PropTypes.string.tag({
  name: 'Clase de contenedor personalizada',
  group: 'Dimensiones',
})
