import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'

import NavBarAmp from '../../layout/navbar/_children/amp'
import HeaderAmp from './_children/header-amp'

import Formatter from '../../layout/navbar/_dependencies/formatter'
import { getAssetsPath } from '../../../utilities/constants'

const LayoutNavbar = props => {
  const { customFields } = props
  const { contextPath, arcSite, deployment } = useFusionContext()

  const { siteDomain, assets: { nav } = {} } = getProperties(arcSite)

  const formater = new Formatter(
    {
      deployment,
      contextPath,
      siteDomain,
      nav,
      arcSite,
    },
    customFields
  )

  const { params = {}, source = '' } =
    formater.main.fetch !== false ? formater.main.fetch.config : {}
  /** Solicita la data a la API y setea los resultados en "state.data" */

  const data =
    useContent(
      params && source
        ? {
            source,
            query: params,
            filter: formater.getSchema(),
          }
        : {}
    ) || {}

  const renderNavBar = () => {
    const { selectDesing } = customFields
    const NavBarType = {
      standard: <NavBarAmp data={data} {...formater.main.initParams} />,
    }
    return NavBarType[selectDesing] || NavBarType.standard
  }

  const imgLogo = deployment(
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/logo-amp.png`
  )

  return (
    <>
      {renderNavBar()}
      <HeaderAmp {...{ imgLogo, arcSite }} />
    </>
  )
}

LayoutNavbar.propTypes = {
  customFields: PropTypes.shape({
    selectDesing: PropTypes.oneOf(['standard', 'somos']).tag({
      name: 'Modelo de barra de navegación',
      labels: {
        standard: 'Barra de navegación estándar',
        somos: 'Barra de navegación somos',
      },
      defaultValue: 'standard',
    }),
    showInDesktop: PropTypes.bool.tag({
      name: 'Mostrar en desktop',
      defaultValue: true,
    }),
    showInTablet: PropTypes.bool.tag({
      name: 'Mostrar en tablet',
      defaultValue: true,
    }),
    showInMobile: PropTypes.bool.tag({
      name: 'Mostrar en móviles ',
      defaultValue: true,
    }),
  }),
}
LayoutNavbar.label = 'Barra de Navegación'
export default LayoutNavbar
