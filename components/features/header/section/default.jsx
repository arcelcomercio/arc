import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import HeaderChildSomos from './_children/section-header'

const DEFAULT_HIERARCHY = 'header-default'

const LayoutHeader = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    siteProperties,
    globalContentConfig,
  } = useFusionContext()
  const {
    assets: { header: headerProperties },
  } = siteProperties
  const { query: queryInput = {} } = globalContentConfig
  const {
    customFields: {
      showInDesktop = true,
      showInTablet = true,
      showInMobile = true,
      customLogo,
      customLogoLink,
      showIconHome,
      showVinetas,
      hierarchyConfig,
    } = {},
  } = props

  const { contentService = '', contentConfigValues = {} } =
    hierarchyConfig || {}

  const isHierarchyReady = !!contentConfigValues.hierarchy
  const source = isHierarchyReady ? contentService : 'navigation-by-hierarchy'
  const paramsFetch = isHierarchyReady
    ? contentConfigValues
    : {
        website: arcSite,
        hierarchy: DEFAULT_HIERARCHY,
      }

  const data =
    useContent({
      source,
      query: paramsFetch,
      filter: schemaFilter,
    }) || {}

  const formatSections = () => {
    const link = 'link'
    const { children = [] } = data || {}
    return children.map(el => {
      return {
        name: el.node_type === link ? el.display_name : el.name,
        url: el.node_type === link ? el.url : el._id,
      }
    })
  }

  const logo = () => {
    return (
      customLogo ||
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/${
          headerProperties.logo
        }`
      )
    )
  }

  const params = {
    sections: formatSections(),
    logo: logo(),
    queryInput,
    customLogoLink,
    showIconHome,
    showVinetas,
  }

  return (
    <HeaderChildSomos
      {...params}
      deviceList={{ showInDesktop, showInTablet, showInMobile }}
    />
  )
}

LayoutHeader.propTypes = {
  customFields,
}
LayoutHeader.label = 'Cabecera - Sección'
export default LayoutHeader
