import React from 'react'

import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'
import { socialMediaUrlShareList } from '../../../utilities/social-media'
import { ELEMENT_STORY } from '../../../utilities/constants/element-types'

import Formatter from './_dependencies/formatter'
import menuFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'

import HeaderSpecialChildSpecial from './_children/special'

const MENU_HIERARCHY = 'navbar-default'
const CONTENT_SOURCE = 'navigation-by-hierarchy'

const HeaderElComercio = props => {
  const {
    customFields: { customLogoTitle, customLogo, customLogoLink, hideMenu },
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
  const isStory = type === { ELEMENT_STORY }.ELEMENT_STORY

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
    customLogoTitle,
    customLogo,
    customLogoLink
  )

  const data = useContent({
    source: CONTENT_SOURCE,
    query: {
      website: arcSite,
      hierarchy: MENU_HIERARCHY,
    },
    filter: menuFilter,
  })

  formatter.setData(data)

  const headerParams = {
    search,
    isStory,
    shareButtons,
    hideMenu,
  }

  return (
    <HeaderSpecialChildSpecial {...formatter.getParams()} {...headerParams} />
  )
}

HeaderElComercio.label = 'Cabecera - Noticia Especial'

HeaderElComercio.propTypes = {
  customFields,
}

export default HeaderElComercio
