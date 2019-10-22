import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import { filterHeader, filterMenu } from './_dependencies/schema-filter'

import HeaderFullView from './_children/header-full'

const HeaderFull = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    siteProperties,
  } = useFusionContext()

  const { footer: { socialNetworks = [] } = {} } = siteProperties

  const { customFields: { hierarchyHeader, hierarchyMenu } = {} } = props

  const {
    contentService: serviceHeader = '',
    contentConfigValues: valuesHeader = {},
  } = hierarchyHeader || {}
  const isReadyHeader = !!valuesHeader.hierarchy
  const sourceHeader = isReadyHeader ? serviceHeader : 'navigation-by-hierarchy'
  const queryHeader = isReadyHeader
    ? valuesHeader
    : {
        hierarchy: 'header-default',
      }

  const dataHeader =
    useContent({
      source: sourceHeader,
      query: queryHeader,
      filter: filterHeader,
    }) || {}

  const {
    contentService: serviceMenu = '',
    contentConfigValues: valuesMenu = {},
  } = hierarchyMenu || {}
  const isReadyMenu = !!valuesHeader.hierarchy
  const sourceMenu = isReadyMenu ? serviceMenu : 'navigation-by-hierarchy'
  const queryMenu = isReadyMenu
    ? valuesMenu
    : {
        hierarchy: 'menu-default',
      }

  const dataMenu =
    useContent({
      source: sourceMenu,
      query: queryMenu,
      filter: filterMenu,
    }) || {}

  const { children: headerList = [] } = dataHeader
  const { children: menuList = [] } = dataMenu
  const params = {
    headerList,
    menuList,
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
HeaderFull.label = 'Cabecera Full'
export default HeaderFull
