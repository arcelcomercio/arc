import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import HeaderChildSomos from './_children/somos'
import Formatter from './_dependencies/formatter'
import customFields from './_dependencies/custom-fields'

const DEFAULT_HIERARCHY = 'header-default'

const LayoutHeader = props => {
  const {
    customFields: {
      hierarchyConfig,
      customLogo,
      customLogoLink,
      tags,
      showDate,
      isSlider,
      showInDesktop = true,
      showInTablet = true,
      showInMobile = true,
    },
  } = props

  const { contextPath, arcSite, deployment } = useFusionContext()

  const {
    siteDomain,
    assets: { header: headerProperties },
  } = getProperties(arcSite)

  const formater = new Formatter(
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
  const source = isHierarchyReady ? contentService : 'navigation-by-hierarchy'

  const data =
    useContent({
      source,
      query: isHierarchyReady
        ? contentConfigValues
        : {
            website: arcSite,
            hierarchy: DEFAULT_HIERARCHY,
          },
      filter: formater.getSchema(),
    }) || {}

  formater.setData(data)
  const params = { ...formater.getParams(), isSlider }

  return (
    <HeaderChildSomos
      {...params}
      deviceList={{ showInDesktop, showInTablet, showInMobile }}
    />
  )
}

LayoutHeader.label = 'Cabecera - Somos'

LayoutHeader.propTypes = {
  customFields,
}

export default LayoutHeader
