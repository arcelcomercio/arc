import React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import ColumnistPremium from './_childen/columnist-premium'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import {
  includeCredits,
  includePrimarySection,
  includeCreditsImage,
} from '../../../utilities/included-fields'
import { getAssetsPath, defaultAuthorImage } from '../../../utilities/assets'

const FeaturedStoryColumnist = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    siteProperties,
  } = useAppContext()
  const {
    assets: {
      premium: { logo },
    },
  } = siteProperties || {}
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const presets = 'no-presets'
  const includedFields = `content_restrictions.content_code,websites.${arcSite}.website_url,subheadlines.basic,${includeCredits},${includeCreditsImage},${includePrimarySection}`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    authorImage,
    author,
    authorLink,
    primarySection,
    primarySectionLink,
    subTitle,
    isPremium,
    websiteLink,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const lazyImage = defaultAuthorImage(arcSite, contextPath)

  const params = {
    lazyImage,
    authorImage,
    author,
    authorLink,
    primarySection,
    primarySectionLink,
    subTitle,
    isPremium,
    websiteLink,
    isAdmin,
    logo: `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}?d=1`,
  }
  return <ColumnistPremium {...params} />
}

FeaturedStoryColumnist.propTypes = {
  customFields,
}

FeaturedStoryColumnist.label = 'Columnista Premium'
FeaturedStoryColumnist.static = true

export default FeaturedStoryColumnist
