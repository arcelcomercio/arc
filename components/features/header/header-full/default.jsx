import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import { filterHeader, filterMenu } from './_dependencies/schema-filter'
import { socialMediaUrlShareList } from '../../../utilities/helpers'
import ConfigParams from '../../../utilities/config-params'

import HeaderFullView from './_children/header-full'

const HeaderFull = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    siteProperties,
    globalContent: { type = '' },
    website_url: postPermaLink,
    headlines: { basic: postTitle } = {},
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

  const {
    siteDomain,
    assets: { header: headerProperties },
    social: {
      twitter: { user: siteNameRedSocial },
    },
    siteUrl,
  } = getProperties(arcSite)

  const { children: headerList = [] } = dataHeader
  const { children: menuList = [] } = dataMenu

  const isStory = type === ConfigParams.ELEMENT_STORY

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    postPermaLink,
    postTitle,
    siteNameRedSocial
  )

  const shareButtons = {
    firstList: [
      {
        icon: 'icon-facebook-circle',
        link: urlsShareList.facebook,
      },

      {
        icon: 'icon-twitter-circle',
        link: urlsShareList.twitter,
      },
      {
        icon: 'icon-linkedin-circle',
        link: urlsShareList.linkedin,
      },
      {
        icon: 'icon-whatsapp',
        link: urlsShareList.whatsapp,
      },
    ],
  }

  const params = {
    headerList,
    menuList,
    socialNetworks,
    postTitle,
    isStory,
    logo: deployment(
      `${contextPath}/resources/dist/${arcSite}/images/alternate-logo.png`
    ),
    whiteLogo: deployment(
      `${contextPath}/resources/dist/${arcSite}/images/alternate-logo-w.png`
    ),
    shareButtons,
  }
  return <HeaderFullView {...params} />
}
HeaderFull.propTypes = {
  customFields,
}
HeaderFull.label = 'Cabecera Full'
export default HeaderFull
