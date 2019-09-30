import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeatureFullImageChild from './_children/feature-full-image'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import { getPhotoId } from '../../../utilities/helpers'

const PHOTO_SOURCE = 'photo-by-id'

const PHOTO_SCHEMA = `{
  resized_urls { 
    landscape_l 
    landscape_md
    portrait_md 
    square_s 
    lazy_default  
  }
}`

const FeatureStoryFullImage = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      crossY,
      crossX,
      model,
      categoryField,
      titleField,
      imgField,
    } = {},
  } = props

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}

  const photoId = imgField ? getPhotoId(imgField) : ''
  const customPhoto = useContent({
    source: photoId ? PHOTO_SOURCE : '',
    query: {
      _id: photoId,
    },
    filter: PHOTO_SCHEMA,
  })

  const {
    author,
    authorLink,
    primarySection,
    primarySectionLink,
    title: titleStory,
    multimediaLandscapeL,
    multimediaSquareXL,
    multimediaPortraitMD,
    multimediaLazyDefault,
    multimediaType,
    websiteLink,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const {
    resized_urls: {
      landscape_l: landscapeLCustom,
      lazy_default: lazyDefaultCustom,
      portrait_md: portraitMDCustom,
      square_s: squareXLCustom,
    } = {},
  } = customPhoto || {}

  const params = {
    author,
    authorLink,
    primarySectionLink,
    title: titleField || titleStory,
    multimediaLandscapeL: landscapeLCustom || multimediaLandscapeL, //
    multimediaPortraitMD: portraitMDCustom || multimediaPortraitMD, //
    multimediaSquareXL: squareXLCustom || multimediaSquareXL, //
    multimediaLazyDefault: lazyDefaultCustom || multimediaLazyDefault,
    multimediaType,
    websiteLink,
    crossY,
    crossX,
    model,
    section: categoryField || primarySection,
    isAdmin,
  }

  return <FeatureFullImageChild {...params} />
}

FeatureStoryFullImage.propTypes = {
  customFields,
}

FeatureStoryFullImage.label = 'Destaque Full Imagen'
FeatureStoryFullImage.static = true

export default FeatureStoryFullImage
