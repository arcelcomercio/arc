import * as React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'

import { socialMediaUrlShareList } from '../../../utilities/social-media'
import { ELEMENT_STORY } from '../../../utilities/constants/element-types'

import Formatter from './_dependencies/formatter'
import { bandFilter, menuFilter } from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import HeaderChildInverted from './_children/header'

import { getAssetsPath } from '../../../utilities/assets'
import { SITE_DEPOR } from '../../../utilities/constants/sitenames'

const BAND_HIERARCHY = 'header-default'
const MENU_HIERARCHY = 'menu-default'
const CONTENT_SOURCE = 'navigation-by-hierarchy'

const HeaderInvertedFeatured = (props) => {
  const {
    customFields: {
      hierarchyConfig,
      customLogo,
      customLogoLink,
      tags,
      hideMenu,
      invertedMenu,
    },
  } = props

  let { customFields: { customLogoTitle } = {} } = props

  const {
    arcSite,
    contextPath,
    deployment,
    requestUri,
    metaValue,
    siteProperties,
    globalContent: {
      type,
      website_url: postPermaLink,
      headlines: { basic: postTitle, meta_title: StoryMetaTitle = '' } = {},
    } = {},
    globalContentConfig: { query = {} } = {},
  } = useFusionContext()

  const {
    siteDomain,
    assets: { header: headerProperties },
    social: {
      twitter: { user: siteNameRedSocial },
    },
    siteUrl,
  } = getProperties(arcSite)

  const search = decodeURIComponent(query.query || '').replace(/\+/g, ' ')
  const isStory = type === ELEMENT_STORY

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
      icon: 'icon-facebook',
      link: urlsShareList.facebook,
    },

    {
      name: 'twitter',
      icon: 'icon-twitter',
      link: urlsShareList.twitter,
    },
    {
      name: 'linkedin',
      icon: 'icon-linkedin',
      link: urlsShareList.linkedin,
    },
    {
      name: 'whatsapp',
      icon: 'icon-whatsapp',
      link: urlsShareList.whatsapp,
    },
  ]

  const formatter = new Formatter(
    deployment,
    contextPath,
    siteDomain,
    headerProperties,
    arcSite,
    {},
    {},
    customLogoTitle,
    customLogo,
    customLogoLink,
    tags
  )

  const { contentService = '', contentConfigValues = {} } =
    hierarchyConfig || {}

  const isHierarchyReady = !!contentConfigValues.hierarchy
  const bandSource = isHierarchyReady ? contentService : CONTENT_SOURCE
  const sourceQuery = isHierarchyReady
    ? contentConfigValues
    : {
        website: arcSite,
        hierarchy: BAND_HIERARCHY,
      }

  const bandData = useContent({
    source: bandSource,
    query: sourceQuery,
    filter: bandFilter,
  })
  const menuData =
    useContent({
      source: CONTENT_SOURCE,
      query: {
        website: arcSite,
        hierarchy: MENU_HIERARCHY,
      },
      filter: menuFilter,
    }) || {}

  formatter.setBandData(bandData)
  formatter.setMenuData(menuData)

  const logoImg =
    arcSite === SITE_DEPOR
      ? 'https://d1r08wok4169a5.cloudfront.net/iframes/depor_logo.svg'
      : `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/alternate-logo.png?d=1`

  const winningCallLogo =
    arcSite === 'trome'
      ? `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/super_llamada_ganadora_trome.png?d=1`
      : ''

  return (
    <HeaderChildInverted
      {...formatter.getParams()}
      search={search}
      isStory={isStory}
      shareButtons={shareButtons}
      logoImg={logoImg}
      winningCallLogo={winningCallLogo}
      hideMenu={hideMenu}
      invertedMenu={invertedMenu}
    />
  )
}

HeaderInvertedFeatured.propTypes = {
  customFields,
}

HeaderInvertedFeatured.label = 'Cabecera - Banda superior features debajo'

export default HeaderInvertedFeatured
