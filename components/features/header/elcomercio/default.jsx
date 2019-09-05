import React from 'react'

import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'

import Formatter from './_dependencies/formatter'
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
  const source = isHierarchyReady ? contentService : CONTENT_SOURCE
  const params = isHierarchyReady
    ? contentConfigValues
    : {
        website: arcSite,
        hierarchy: BAND_HIERARCHY,
      }

  const data = useContent({
    source,
    query: params,
    filter: formatter.getSchema(),
  })

  formatter.setData(data)

  return <HeaderChildElComercio {...formatter.getParams()} />
}

HeaderStandard.label = 'Cabecera - Estándar'
// HeaderStandard.static = true

HeaderStandard.propTypes = {
  customFields,
}

export default HeaderStandard
