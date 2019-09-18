/* eslint-disable import/prefer-default-export */
import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useFusionContext } from 'fusion:context'

/**
 * HOC que pasa al componente envuelto el tema de la aplicacion
 * seleccionado segun arcSite, e inicializado con los argumentos
 * fusionContext, y getImageDeployment
 *
 * @param {*} themes Temas de la aplicación
 */
export const withTheme = themes => Comp => {
  const ThemedComp = props => {
    const fusionContext = useFusionContext()
    const { arcSite: themeName, contextPath, deployment } = fusionContext
    const getImageDeployment = React.useRef(imageFileName =>
      deployment(
        `${contextPath}/resources/dist/${themeName}/images/${imageFileName}`
      )
    ).current
    const themeArgs = { fusionContext, getImageDeployment }
    const theme = themes[themeName](themeArgs)
    return React.createElement(Comp, { ...props, theme })
  }
  hoistNonReactStatics(ThemedComp, Comp)
  return ThemedComp
}
