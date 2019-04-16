/* eslint-disable import/prefer-default-export */

import PropTypes from 'prop-types'

export const customFields = PropTypes.shape({
  content: PropTypes.label.tag({
    name: 'Separador Opinión21',
  }),
  section: PropTypes.string.isRequired.tag({
    name: 'URL de la sección',
    description: 'Ingrese el nombre de la sección',
  }),
  titleSection: PropTypes.string.tag({
    name: 'Título de la sección',
    description:
      'Este campo puede ser editado manualmente, no es necesario ingresarlo',
  }),
  numLineTitle: PropTypes.oneOf([1, 2,3]).tag(
    {
      name: 'Numero de lineas para el título: ',
      labels: {
        1: 'Una linea',
        2: 'Dos lineas',
        3: 'Tres lineas',
      },
      defaultValue: 1,
    }
  ),
  htmlCode: PropTypes.richtext.tag({
    name: 'Código HTML',
  }),
})
