import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import {
  SITE_ELCOMERCIO,
  SITE_GESTION,
} from '../../../utilities/constants/sitenames'
import customFields from './_dependencies/custom-fields'
import HeaderBasicChildren from './_lite/_children/header'
import schemaFilter from './_lite/_dependencies/schema-filter'

const HeaderBasic = (props) => {
  const {
    arcSite,
    contextPath,
    globalContent,
    siteProperties,
    requestUri,
    metaValue,
  } = useAppContext()
  const {
    customFields: { hideMenu, activeSticky, customLogo, isTopNavVisible },
  } = props

  const {
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    websites = {},
  } = globalContent || {}

  const { website_section: { path: sectionPath = '' } = {} } =
    websites[arcSite] || {}

  const storyTitleRe = StoryMetaTitle || storyTitle

  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')

  const { siteTitle = '' } = siteProperties

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
    transform: (data) => {
      const { children: sections = [] } = data || {}
      return sections
    },
  })

  const navSections =
    useContent(
      arcSite === SITE_GESTION || isTopNavVisible
        ? {
            source: 'navigation-by-hierarchy',
            query: {
              website: arcSite,
              hierarchy: 'header-default',
            },
            filter: schemaFilter,
            transform: (data) => {
              const { children: sections = [] } = data || {}
              return sections
            },
          }
        : {}
    ) || []

  const imagesBySite = {
    [SITE_ELCOMERCIO]: `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/elcomercio/images/logo.png?d=1`,
    [SITE_GESTION]: `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/gestion/images/white-logo.png?d=1`,
  }

  const isSomos = requestUri.includes('/somos/')
  const mainImage =
    customLogo ||
    (isSomos
      ? 'https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HJJOUB5ZYJDCZLCVEKSSBBWXPE.png'
      : imagesBySite[arcSite])

  const isPreview = /^\/preview\//.test(requestUri)

  return (
    <HeaderBasicChildren
      hideMenu={hideMenu}
      menuSections={menuSections}
      arcSite={arcSite}
      contextPath={contextPath}
      sectionPath={sectionPath}
      mainImage={mainImage}
      title={title}
      isSomos={isSomos}
      activeSticky={activeSticky}
      disableSignwall={isPreview}
      storyTitle={storyTitle}
      navSections={navSections}
      siteProperties={siteProperties}
      isTopNavVisible={isTopNavVisible}
    />
  )
}

HeaderBasic.static = true

HeaderBasic.propTypes = {
  customFields,
}

export default HeaderBasic
