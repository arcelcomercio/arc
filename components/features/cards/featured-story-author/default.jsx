import React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import {
  includeCredits,
  includePrimarySection,
  includeSections,
  includePromoItems,
  includePromoItemsCaptions,
  includeCreditsRole,
  includeCreditsEducation,
  includeCreditsImage,
} from '../../../utilities/included-fields'
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import FeaturedAuthor from './_children/featured-author'

const CardFeaturedStoryAuthor = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useAppContext()

  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      design = 'first',
      sectionField = '',
      titleField = '',
      subTitleField = '',
    } = {},
  } = props

  const presets =
    'landscape_l:648x374,landscape_md:314x157,portrait_md:314x374,square_s:150x150'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,subheadlines.basic,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includeCreditsRole},${includeCreditsEducation},${includeCreditsImage},${includePrimarySection},${includeSections},publish_date,display_date`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    title,
    websiteLink,
    primarySection,
    primarySectionLink,
    author,
    authorLink,
    authorImage,
    multimediaLandscapeMD,
    multimediaPortraitMD,
    multimediaLandscapeL,
    multimediaLazyDefault,
    authorOccupation,
    subTitle,
    multimediaType,
    multimediaSubtitle,
    multimediaCaption,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <FeaturedAuthor
      {...{
        title: titleField || title,
        websiteLink,
        primarySection: sectionField || primarySection,
        primarySectionLink,
        author,
        authorLink,
        authorImage,
        multimediaLandscapeMD,
        multimediaPortraitMD,
        multimediaLandscapeL,
        multimediaLazyDefault,
        authorOccupation,
        subTitle: subTitleField || subTitle,
        multimediaType,
        design,
        isAdmin,
        multimediaSubtitle,
        multimediaCaption,
      }}
    />
  )
}

CardFeaturedStoryAuthor.label = 'Destaque de autor'
CardFeaturedStoryAuthor.static = true

CardFeaturedStoryAuthor.propTypes = {
  customFields,
}

export default CardFeaturedStoryAuthor
