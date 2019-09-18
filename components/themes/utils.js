/* eslint-disable import/prefer-default-export */
import React from 'react'
import { useFusionContext } from 'fusion:context'

/**
 * HOC que pasa al componente envuelto el tema de la aplicacion
 * seleccionado segun arcSite, e inicializado con los argumentos
 * fusionContext, y getImageDeployment
 *
 * @param {*} themes Temas de la aplicación
 */
export const withTheme = themes => Comp => {
  const fusionContext = useFusionContext()
  const { arcSite: themeName, contextPath, deployment } = fusionContext
  const getImageDeployment = imageFileName =>
    deployment(
      `${contextPath}/resources/dist/${themeName}/images/${imageFileName}`
    )
  const themeArgs = { fusionContext, getImageDeployment }
  const theme = themes[themeName](themeArgs)
  const ThemedComp = props => React.createElement(Comp, { ...props, theme })
  return ThemedComp
}
