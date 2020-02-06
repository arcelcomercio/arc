import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import HeaderChildStandard from './_children/standard'
import Formatter from './_dependencies/formatter'
import customFields from './_dependencies/custom-fields'

const DEFAULT_HIERARCHY = 'header-default'

const HeaderStandard = props => {
  const {
    customFields: {
      customLogo,
      customLogoLink,
      tags,
      showDate,
      hierarchyConfig,
      showInDesktop = true,
      showInTablet = true,
      showInMobile = true,
      isSlider,
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
    <HeaderChildStandard
      {...params}
      deviceList={{ showInDesktop, showInTablet, showInMobile }}
    />
  )
}

HeaderStandard.label = 'Cabecera - Estándar'
// HeaderStandard.static = true

HeaderStandard.propTypes = {
  customFields,
}

export default HeaderStandard
