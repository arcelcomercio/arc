import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import { ELEMENT_STORY } from '../../../utilities/constants/element-types'
import { SITE_DEPOR } from '../../../utilities/constants/sitenames'
import { socialMediaUrlShareList } from '../../../utilities/social-media'
import HeaderChildInverted from './_children/header'
import customFields from './_dependencies/custom-fields'
import Formatter from './_dependencies/formatter'
import { bandFilter, menuFilter } from './_dependencies/schema-filter'

const BAND_HIERARCHY = 'header-default'
const THEME_HIERARCHY = 'navegacion-cabecera-tema-del-dia'
const MENU_HIERARCHY = 'menu-default'
const CONTENT_SOURCE = 'navigation-by-hierarchy'

const HeaderInvertedFeatured = (props) => {
  const {
    customFields: {
      hierarchyConfig,
      customLogo,
      customLogoLink,
      tags,
      tagsTema,
      hideMenu,
      hideTema,
      invertedTema,
      hierarchyTemaConfig,
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
    {},
    customLogoTitle,
    customLogo,
    customLogoLink,
    tags,
    tagsTema
  )

  const { contentService = '', contentConfigValues = {} } =
    hierarchyConfig || {}

  const {
    contentService: contentServiceTema = '',
    contentConfigValues: contentConfigValuesTema = {},
  } = hierarchyTemaConfig || {}

  const isHierarchyReady = !!contentConfigValues.hierarchy
  const bandSource = isHierarchyReady ? contentService : CONTENT_SOURCE
  const sourceQuery = isHierarchyReady
    ? contentConfigValues
    : {
        website: arcSite,
        hierarchy: BAND_HIERARCHY,
      }

  const isHierarchyReadyTema = !!contentConfigValuesTema.hierarchy
  const bandSourceTema = isHierarchyReadyTema
    ? contentServiceTema
    : CONTENT_SOURCE
  const sourceQueryTema = isHierarchyReadyTema
    ? contentConfigValuesTema
    : {
        website: arcSite,
        hierarchy: THEME_HIERARCHY,
      }

  const bandData = useContent({
    source: bandSource,
    query: sourceQuery,
    filter: bandFilter,
  })

  const bandDataTema = useContent({
    source: bandSourceTema,
    query: sourceQueryTema,
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
  formatter.setBandDataTema(bandDataTema)
  formatter.setMenuData(menuData)

  const logoImg =
    arcSite === SITE_DEPOR
      ? 'https://d1r08wok4169a5.cloudfront.net/iframes/depor_logo.svg'
      : `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/trome-logo_5.png?d=1`

  const winningCallLogo =
    arcSite === 'trome'
      ? `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/super_llamada_ganadora_trome_2x.png?d=1`
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
      invertedTema={invertedTema}
      hideTema={hideTema}
    />
  )
}

HeaderInvertedFeatured.propTypes = {
  customFields,
}

HeaderInvertedFeatured.label = 'Cabecera - Banda superior features debajo'

export default HeaderInvertedFeatured
