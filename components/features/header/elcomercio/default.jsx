import React from 'react'

import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'

import Formatter from './_dependencies/formatter'
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import HeaderChildElComercio from './_children/header'

const BAND_HIERARCHY = 'header-default'
const MENU_HIERARCHY = 'navbar-default'
const CONTENT_SOURCE = 'navigation-by-hierarchy'

const HeaderStandard = props => {
  const {
    customFields: {
      hierarchyConfig,
      customLogo,
      customLogoLink,
      tags,
      showDate,
    },
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const {
    siteDomain,
    assets: { header: headerProperties },
  } = getProperties(arcSite)

  const formatter = new Formatter(
    deployment,
    contextPath,
    siteDomain,
    headerProperties,
    arcSite,
    {},
    customLogo,
    customLogoLink,
    tags,
    showDate
  )

  const { contentService = '', contentConfigValues = {} } =
    hierarchyConfig || {}

  const isHierarchyReady = !!contentConfigValues.hierarchy
  const bandSource = isHierarchyReady ? contentService : CONTENT_SOURCE
  const params = isHierarchyReady
    ? contentConfigValues
    : {
        website: arcSite,
        hierarchy: BAND_HIERARCHY,
      }

  const bandData = useContent({
    source: bandSource,
    query: params,
    filter: schemaFilter,
  })
  const menuData = {} /* useContent({
    source: MENU_HIERARCHY,
    query: params,
    filter: schemaFilter,
  }) */

  formatter.setBandData(bandData)
  formatter.setMenuData(menuData)

  return <HeaderChildElComercio {...formatter.getParams()} />
}

HeaderStandard.label = 'Cabecera - El Comercio'
HeaderStandard.static = true

HeaderStandard.propTypes = {
  customFields,
}

export default HeaderStandard
