import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { isIE } from '../utilities/helpers'

/* **************** SIN USO ****************** */

const OrderedStories = ({ children, customFields }) => {
  // let { initialStory: storyNumber } = customFields
  const { paddingConfig, backgroundChain } = customFields
  /* storyNumber = storyNumber || 1
  storyNumber -= 1 */

  const renderBackground = bg => {
    const colors = {
      white: 'bg-white',
      primary: 'bg-primary',
      base: 'bg-base-200',
      gray: 'bg-gray-200',
      transparent: '',
      default: '',
    }
    return colors[bg] || colors.transparent
  }

  /**
   *    Recorre los hijos para clonarlos agregando como propiedad
   *    el número de la historia que le corresponde imprimir.
   */
  /**
   *    Sólo agrega la propiedad "storyNumber" cuando el hijo
   *    es de los tipos que aceptan la propiedad.
   */
  /* const AutoChildren = React.Children.map(children, child => {
    if (child.props.type === 'grilla-seccion/destaque') {
      const newChild = React.cloneElement(child, {
        storyNumber,
      })
      storyNumber += 1
      return newChild
    }
    return child
  }) */

  const [gridClass, setGridClass] = useState('grid')
  useEffect(() => {
    if (isIE()) setGridClass('ie-flex')
  }, [])

  return (
    <div
      className={`${gridClass} grid--content grid--col-3 grid--col-2 grid--col-1 w-full mt-20 col-3 ${paddingConfig &&
        'pl-20 pr-20 pb-20'} ${renderBackground(
        backgroundChain
      )} chain-ordered-stories`}>
      {children}
    </div>
  )
}

OrderedStories.propTypes = {
  customFields: PropTypes.shape({
    /* initialStory: PropTypes.number.tag({
      name: 'Iniciar desde la historia:',
      defaultValue: 1,
      description:
        'Indique el número de la historia desde la que quiere empezar a imprimir. La primera historia corresponde al número 1',
    }), */
    backgroundChain: PropTypes.oneOf([
      'white',
      'primary',
      'base',
      'gray',
      'transparent',
    ]).tag({
      name: 'Color de fondo',
      labels: {
        white: 'Blanco',
        primary: 'Principal',
        base: 'Base',
        gray: 'Gris',
        transparent: 'Transparente',
      },
      defaultValue: 'transparent',
      group: 'Configuración',
    }),
    paddingConfig: PropTypes.bool.tag({
      group: 'Configuración',
      name: 'Margen Interno',
      description: 'Agrega un pequeño margen interno para que se vean bordes',
      defaultValue: false,
    }),
  }),
}

OrderedStories.label = 'Grilla de historias ordenadas'
// OrderedStories.static = true

export default OrderedStories
