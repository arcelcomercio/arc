import PropTypes from 'prop-types'
import * as React from 'react'

/* **************** SIN USO ****************** */

const OrderedStories = ({ children, customFields }) => {
  // let { initialStory: storyNumber } = customFields
  const { paddingConfig, backgroundChain, blockColor } = customFields
  /* storyNumber = storyNumber || 1
  storyNumber -= 1 */

  const renderBackground = (bg) => {
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

  const renderBlock = (color) => {
    const colors = {
      default: 'section-default',
      celeste: 'section-opinion',
      rosado: 'section-celebrities',
      rojo: 'section-historias',
      verde: 'section-deportes',
      amarillo: 'section-virales',
    }
    return colors[color] || colors.default
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

  return (
    <div
      className={`grid grid--content grid--col-3 grid--col-2 grid--col-1 w-full mt-20 col-3 ${
        paddingConfig && 'pl-20 pr-20 pb-20'
      } ${renderBackground(backgroundChain)} ${renderBlock(
        blockColor
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
    blockColor: PropTypes.oneOf([
      'default',
      'celeste',
      'rosado',
      'verde',
      'rojo',
      'amarillo',
    ]).tag({
      name: 'Color de bloque',
      labels: {
        default: 'Por defecto',
        celeste: 'Celeste',
        rosado: 'Rosado',
        verde: 'Verde',
        rojo: 'Rojo',
        amarillo: 'Amarillo',
      },
      defaultValue: 'default',
      group: 'Configuración',
    }),
  }),
}

OrderedStories.label = 'Grilla de historias ordenadas'
OrderedStories.static = true

export default OrderedStories
