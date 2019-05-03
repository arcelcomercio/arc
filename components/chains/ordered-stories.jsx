import React from 'react'
import PropTypes from 'prop-types'

/* **************** SIN USO ****************** */

const OrderedStories = ({ children, customFields }) => {
  let { initialStory: storyNumber } = customFields
  storyNumber = storyNumber || 1
  storyNumber -= 1
  /**
   *    Recorre los hijos para clonarlos agregando como propiedad
   *    el número de la historia que le corresponde imprimir.
   */
  const AutoChildren = React.Children.map(children, child => {
    /**
     *    Sólo agrega la propiedad "storyNumber" cuando el hijo
     *    es de los tipos que aceptan la propiedad.
     */

    if (child.props.type === 'grilla-seccion/destaque') {
      const newChild = React.cloneElement(child, {
        storyNumber,
      })
      storyNumber += 1
      return newChild
    }
    return child
  })
  return (
    <div className="content-grid-base content--3col content--2col content--1col full-width margin-top">
      {AutoChildren}
    </div>
  )
}

OrderedStories.propTypes = {
  customFields: PropTypes.shape({
    initialStory: PropTypes.number.tag({
      name: 'Iniciar desde la historia:',
      defaultValue: 1,
      description:
        'Indique el número de la historia desde la que quiere empezar a imprimir. La primera historia corresponde al número 1',
    }),
  }),
}

OrderedStories.label = 'Grilla de historias ordenadas'

export default OrderedStories
