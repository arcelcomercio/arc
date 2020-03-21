import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'

import Menu from './_children/menu'
import Formatter from '../navbar/_dependencies/formatter'

const LayoutNavbar = props => {
  const { customFields } = props
  const { contextPath, arcSite, deployment } = useFusionContext()

  const {
    siteDomain,
    socialNetworks = [],
    assets: { nav },
    siteUrl,
  } = getProperties(arcSite)

  const formater = new Formatter(
    {
      deployment,
      contextPath,
      siteDomain,
      nav,
      arcSite,
      socialNetworks,
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

  const parameters = {
    contextPath,
    deployment,
    socialNetworks,
    arcSite,
    siteUrl,
  }

  const NavBarType = {
    standard: <Menu data={data} {...parameters} />,
  }
  return NavBarType.standard
}

LayoutNavbar.propTypes = {
  customFields: PropTypes.shape({
    selectDesing: PropTypes.oneOf(['standard']).tag({
      name: 'Modelo de barra de navegación',
      labels: {
        standard: 'Barra de navegación estándar',
        somos: 'Barra de navegación somos',
      },
      defaultValue: 'standard',
    }),
  }),
}
LayoutNavbar.label = 'Barra de Navegación'
export default LayoutNavbar
