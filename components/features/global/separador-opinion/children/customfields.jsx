/* eslint-disable import/prefer-default-export */

import PropTypes from 'prop-types'

export const customFields = PropTypes.shape({
  content: PropTypes.label.tag({
    name: 'Separador opinion Peru21',
  }),
  section: PropTypes.string.isRequired.tag({
    name: 'URL de la seccion',
    description: 'Es necesario ingresar la URL de la seccion',
  }),
  titleSection: PropTypes.string.tag({
    name: 'Titulo de la seccion',
    description:
      'Este campo puede ser editado manualmente, no es necesario ingresarlo',
  }),
  htmlCode: PropTypes.richtext.tag({
    name: 'Código HTML',
  }),
})
