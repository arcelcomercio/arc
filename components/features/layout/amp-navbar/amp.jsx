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

  const NavBarType = {
    standard: <Menu data={dataFormat} {...parameters} />,
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
