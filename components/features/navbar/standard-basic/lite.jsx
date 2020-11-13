import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import NavbarStandardLite from './_children/standard-lite'
import Formatter from './_dependencies/formatter'

const LayoutNavbar = props => {
  const {
    contextPath,
    arcSite,
    deployment,
    siteProperties: {
      assets: { nav },
    },
  } = useFusionContext()

  const formatter = new Formatter({
    deployment,
    contextPath,
    nav,
    arcSite,
  })

  const navbarData =
    useContent({
      source: 'navigation-by-hierarchy',
      query: { hierarchy: 'navbar-default' },
      filter: formatter.getSchema(),
    }) || []

  const {
    customFields: {
      showInDesktop = true,
      showInTablet = true,
      showInMobile = true,
      hideMenu,
    } = {},
  } = props

  return (
    <NavbarStandardLite
      deviceList={{ showInDesktop, showInTablet, showInMobile }}
      navbarData={navbarData}
      hideMenu={hideMenu}
      {...formatter.main().initParams()}
    />
  )
}

LayoutNavbar.propTypes = {
  customFields: PropTypes.shape({
    hideMenu: PropTypes.bool.tag({
      name: 'Ocultar menu',
      defaultValue: true,
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

LayoutNavbar.label = 'Barra de Navegación - básico'
LayoutNavbar.static = true

export default LayoutNavbar
