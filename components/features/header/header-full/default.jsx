import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import { filterHeader, filterMenu } from './_dependencies/schema-filter'
import { socialMediaUrlShareList } from '../../../utilities/social-media'
import { ELEMENT_STORY } from '../../../utilities/constants/element-types'
import { getAssetsPath } from '../../../utilities/assets'

import Newsletter from '../../statics/newsletter-custom/default'

import HeaderFullView from './_children/header-full'

const HeaderFull = props => {
  const {
    arcSite,
    contextPath,
    requestUri,
    metaValue,
    siteProperties,
    globalContent: {
      type = '',
      website_url: postPermaLink,
      headlines: { basic: postTitle, meta_title: StoryMetaTitle = '' } = {},
    } = {},
  } = useFusionContext() || {}

  const {
    customFields: { hierarchyHeader, hierarchyMenu, hideMenu } = {},
  } = props

  let { customFields: { customLogoTitle } = {} } = props

  const {
    socialNetworks = [],
    social: { twitter: { user: siteNameRedSocial } = {} } = {},
    mobileHeaderFollowing = '',
    siteDomain = '',
    legalLinks = [],
    siteUrl,
  } = getProperties(arcSite)

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

  let isStory = type === ELEMENT_STORY
  if (
    requestUri.includes('/alineaciones/') ||
    requestUri.includes('/estadisticas/')
  ) {
    isStory = false
  }

  if (isStory) {
    const storyTitleRe = StoryMetaTitle || postTitle

    const seoTitle =
      metaValue('title') &&
      !metaValue('title').match(/content/) &&
      metaValue('title')

    customLogoTitle = `${seoTitle}: ${
      storyTitleRe ? storyTitleRe.substring(0, 70) : ''
    } | ${siteProperties.siteTitle.toUpperCase()}`
  }

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    postPermaLink,
    postTitle,
    siteNameRedSocial
  )

  const shareButtons = [
    {
      name: 'facebook',
      icon: 'icon-facebook-circle',
      link: urlsShareList.facebook,
    },

    {
      name: 'twitter',
      icon: 'icon-twitter-circle',
      link: urlsShareList.twitter,
    },
    {
      name: 'linkedin',
      icon: 'icon-linkedin-circle',
      link: urlsShareList.linkedin,
    },
    {
      name: 'whatsapp',
      icon: 'icon-whatsapp',
      link: urlsShareList.whatsapp,
    },
  ]
  const arcSiteTrome = 'trome'

  const winningCallLogo =
    arcSite === arcSiteTrome
      ? `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/super_llamada_ganadora_trome.png?d=1`
      : ''
  const paramsNews = {
    inclJS: 'FALSE',
  }
  const params = {
    headerList,
    menuList,
    socialNetworks,
    postTitle,
    isStory,
    customLogoTitle,
    logo: `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/alternate-logo.png?d=1`,
    whiteLogo: `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/alternate-logo-w.png?d=1`,
    shareButtons,
    arcSite,
    winningCallLogo,
    mobileHeaderFollowing,
    siteDomain,
    legalLinks,
    hideMenu,
    Newsle: <Newsletter {...paramsNews}></Newsletter>,
  }
  return <HeaderFullView {...params} />
}
HeaderFull.propTypes = {
  customFields,
}
HeaderFull.label = 'Cabecera Full'
// HeaderFull.static = true
export default HeaderFull
