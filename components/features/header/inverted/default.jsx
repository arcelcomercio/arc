import React from 'react'

import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'
import { socialMediaUrlShareList } from '../../../utilities/helpers'
import ConfigParams from '../../../utilities/config-params'

import Formatter from './_dependencies/formatter'
import { bandFilter, menuFilter } from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import HeaderChildInverted from './_children/header'

const BAND_HIERARCHY = 'header-default'
const MENU_HIERARCHY = 'navbar-default'
const CONTENT_SOURCE = 'navigation-by-hierarchy'

const HeaderInverted = props => {
  const {
    customFields: {
      hierarchyConfig,
      customLogo,
      customLogoLink,
      tags,
      showDate,
    },
  } = props

  const {
    arcSite,
    contextPath,
    deployment,
    globalContent: {
      type,
      website_url: postPermaLink,
      headlines: { basic: postTitle } = {},
    },
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

  const formatter = new Formatter(
    deployment,
    contextPath,
    siteDomain,
    headerProperties,
    arcSite,
    {},
    {},
    customLogo,
    customLogoLink,
    tags,
    showDate
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
  const menuData = useContent({
    source: CONTENT_SOURCE,
    query: {
      website: arcSite,
      hierarchy: MENU_HIERARCHY,
    },
    filter: menuFilter,
  })

  formatter.setBandData(bandData)
  formatter.setMenuData(menuData)

  const params = {
    search,
    isStory,
    shareButtons,
  }

  return <HeaderChildInverted {...formatter.getParams()} {...params} />
}

HeaderInverted.label = 'Cabecera - Banda superior'

HeaderInverted.propTypes = {
  customFields,
}

export default HeaderInverted
