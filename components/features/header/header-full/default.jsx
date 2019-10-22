import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import HeaderFullView from './_children/header-full'

const HeaderFull = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    siteProperties,
  } = useFusionContext()

  const { footer: { socialNetworks = [] } = {} } = siteProperties

  const { customFields: { hierarchyConfig } = {} } = props

  const { contentService = '', contentConfigValues = {} } =
    hierarchyConfig || {}

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter,
    }) || {}

  const { children: dataList = [] } = data
  const params = {
    dataList,
    socialNetworks,
    logo: deployment(
      `${contextPath}/resources/dist/${arcSite}/images/alternate-logo.png`
    ),
    whiteLogo: deployment(
      `${contextPath}/resources/dist/${arcSite}/images/alternate-logo-w.png`
    ),
  }
  return <HeaderFullView {...params} />
}
HeaderFull.propTypes = {
  customFields,
}
HeaderFull.label = 'Cabezera Full'
export default HeaderFull
