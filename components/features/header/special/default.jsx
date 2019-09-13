import React from 'react'

import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'
import { socialMediaUrlShareList } from '../../../utilities/helpers'
import ConfigParams from '../../../utilities/config-params'
import StoryData from '../../../utilities/story-data'

import Formatter from './_dependencies/formatter'
import menuFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'

import HeaderChildSpecial from './_children/special'
import SectionTitle from '../../../global-components/independent-title'

const MENU_HIERARCHY = 'navbar-default'
const CONTENT_SOURCE = 'navigation-by-hierarchy'

const HeaderElComercio = props => {
  const {
    customFields: {
      customLogo,
      customLogoLink,
      section = '',
      sectionUrl = '',
      bgColor = '',
      fontColor = '',
    },
  } = props

  const {
    arcSite,
    contextPath,
    deployment,
    globalContent,
    globalContentConfig: { query = {} } = {},
  } = useFusionContext()

  const {
    primarySectionLink,
    primarySection,
    title,
    link,
    type,
  } = new StoryData({
    globalContent,
    contextPath,
  })

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

  const sectionTitle = section || primarySection
  const sectionLink = sectionUrl || primarySectionLink

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    link,
    title,
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
  }

  const sectionTitleParams = {
    title: sectionTitle,
    link: sectionLink,
    bgColor,
    fontColor,
  }

  return (
    <div className="w-full position-absolute">
      <HeaderChildSpecial {...formatter.getParams()} {...headerParams} />
      <SectionTitle {...sectionTitleParams} />
    </div>
  )
}

HeaderElComercio.label = 'Cabecera - Noticia Especial'

HeaderElComercio.propTypes = {
  customFields,
}

export default HeaderElComercio
