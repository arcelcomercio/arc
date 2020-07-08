import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_lite/_dependencies/schema-filter'
import HeaderBasicChildren from './_lite/_children/header'

const HeaderBasic = props => {
  const {
    arcSite,
    contextPath,
    globalContent,
    siteProperties,
    metaValue,
  } = useFusionContext()
  const {
    customFields: { hideMenu },
  } = props

  const {
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
  } = globalContent || {}

  const storyTitleRe = StoryMetaTitle || storyTitle

  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')

  const title = `${seoTitle}: ${
    storyTitleRe ? storyTitleRe.substring(0, 70) : ''
  } | ${siteProperties.siteTitle.toUpperCase()}`

  const menuSections = useContent({
    source: 'navigation-by-hierarchy',
    query: {
      website: arcSite,
      hierarchy: 'menu-default',
    },
    filter: schemaFilter,
    transform: data => {
      const { children: sections = [] } = data || {}
      return sections
    },
  })

  const params = {
    hideMenu,
    menuSections,
    arcSite,
    contextPath,
    globalContent,
    title,
  }

  return <HeaderBasicChildren {...params} />
}

HeaderBasic.static = true

HeaderBasic.propTypes = {
  customFields,
}

export default HeaderBasic
