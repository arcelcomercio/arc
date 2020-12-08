import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import NavbarStandardLite from './_lite/_children/standard-lite'
import schemaFilter from './_dependencies/schema-filter'
import { getAssetsPath } from '../../../utilities/assets'

// TODO: Agregar un customfield para activar o desactivar el stiky al hacer scroll (por defecto activado)
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
      disableSticky = false,
    } = {},
  } = props

  const data =
    useContent(
      hideMenu
        ? {}
        : {
            source: 'navigation-by-hierarchy',
            query: {
              hierarchy: 'menu-default',
            },
            filter: schemaFilter,
          }
    ) || []

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

  const formatData = (datas = {}) => {
    const LINK = 'link'
    const { children = [] } = datas || {}
    return children.map(child => {
      let name = child.node_type === LINK ? child.display_name : child.name
      const rawMatch = name.match(/\[#.*\]/g)
      const match =
        rawMatch === null
          ? []
          : rawMatch[0]
              .replace('[', '')
              .replace(']', '')
              .split(',')
      if (match) {
        name = name.replace(/\[#.*\]/g, '')
      }
      return {
        name,
        url: child.node_type === LINK ? child.url : child._id,
        styles: match,

        children: child.children,
        _id: child._id,
        display_name: child.display_name,
      }
    })
  }

  const dataFormat = {
    children: formatData(data),
  }

  return (
    <NavbarStandardLite
      deviceList={{ showInDesktop, showInTablet, showInMobile }}
      navbarData={navbarData}
      hideMenu={hideMenu}
      disableSticky={disableSticky}
      primaryLogo={primaryLogos[arcSite] || getReourceImgPath('white-logo.png')}
      secondaryLogo={secondaryLogos[arcSite] || getReourceImgPath('logo.png')}
      logoLeft={{
        src: getReourceImgPath('otorongo.png'),
        alt: arcSite,
      }}
      data={dataFormat}
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
    disableSticky: PropTypes.bool.tag({
      name: 'Deshabilitar menú fijo',
      defaultValue: false,
    }),
  }),
}

LayoutNavbar.label = 'Barra de Navegación - básico'
LayoutNavbar.static = true

export default LayoutNavbar
