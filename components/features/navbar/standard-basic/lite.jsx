import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import NavbarStandardLite from './_children/standard-lite'
import schemaFilter from './_dependencies/schema-filter'
import { getAssetsPath } from '../../../utilities/assets'

const LayoutNavbar = props => {
  const { contextPath, arcSite, deployment } = useFusionContext()

  const navbarData =
    useContent({
      source: 'navigation-by-hierarchy',
      query: { hierarchy: 'navbar-default' },
      filter: schemaFilter,
    }) || []

  const {
    customFields: {
      showInDesktop = true,
      showInTablet = true,
      showInMobile = true,
      hideMenu,
    } = {},
  } = props

  const getReourceImgPath = img => {
    return deployment(
      `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/${img}`
    )
  }

  const primaryLogos = {}

  const secondaryLogos = {
    elcomerciomag: getReourceImgPath('logo-143x60.png'),
  }

  return (
    <NavbarStandardLite
      deviceList={{ showInDesktop, showInTablet, showInMobile }}
      navbarData={navbarData}
      hideMenu={hideMenu}
      primaryLogo={primaryLogos[arcSite] || getReourceImgPath('white-logo.png')}
      secondaryLogo={secondaryLogos[arcSite] || getReourceImgPath('logo.png')}
      logoLeft={{
        src: getReourceImgPath('otorongo.png'),
        alt: arcSite,
      }}
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
