import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import { getAssetsPath } from '../../../utilities/assets'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_lite/_dependencies/schema-filter'
import HeaderBasicChildren from './_lite/_children/header'

const HeaderBasic = props => {
  const {
    arcSite,
    contextPath,
    globalContent,
    siteProperties,
    requestUri,
    metaValue,
  } = useFusionContext()
  const {
    customFields: { hideMenu },
  } = props

  const {
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    taxonomy: { primary_section: { path: sectionPath = '' } = {} } = {},
  } = globalContent || {}

  const storyTitleRe = StoryMetaTitle || storyTitle

  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')

  const {siteTitle = ''} = siteProperties

  const title = `${seoTitle}: ${
    storyTitleRe ? storyTitleRe.substring(0, 70) : ''
  } | ${siteTitle.toUpperCase()}`

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

  const isSomos = requestUri.includes('/somos/')
  const mainImage = isSomos
    ? 'https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HJJOUB5ZYJDCZLCVEKSSBBWXPE.png'
    : `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/elcomercio/images/logo.png?d=1`

  const params = {
    hideMenu,
    menuSections,
    arcSite,
    contextPath,
    sectionPath,
    mainImage,
    title,
    isSomos,
  }

  return <HeaderBasicChildren {...params} />
}

HeaderBasic.static = true

HeaderBasic.propTypes = {
  customFields,
}

export default HeaderBasic
