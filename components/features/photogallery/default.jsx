import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../utilities/story-data'

import GalleryTitle from './_children/title'
import FullImage from './_children/full-image'

const classes = {
  boxContainer: 'photogallery col-3 pl-20 pb-20 pr-20',
}

const PhotoGallery = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      titleCustom,
      seeMoreShow,
      seeMoreLink,
      textAlign,
      textPosition,
      textOrientation,
    } = {},
  } = props

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}

  console.log(data, 'dataaaaaaaaaaa')
  const { promo_items: promoItem } = data
  console.log(promoItem, 'ephpǵh')

  const {
    primarySection,
    primarySectionLink,
    title,
    websiteLink,
    quantityGalleryItem,
    multimediaLandscapeL,
    multimediaSquareXL,
    multimediaLazyDefault,
    multimediaType,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const paramsTitle = {
    titleCustom,
    textAlign,
    seeMoreShow,
    seeMoreLink,
  }

  const paramsImage = {
    isAdmin,
    primarySection,
    primarySectionLink,
    title,
    websiteLink,
    quantityGalleryItem,
    multimediaLandscapeL,
    multimediaSquareXL,
    multimediaLazyDefault,
    multimediaType,
    textAlign,
    textPosition,
    textOrientation,
  }
  return (
    <div className={classes.boxContainer}>
      <GalleryTitle {...paramsTitle} />
      <FullImage {...paramsImage} />
    </div>
  )
}

PhotoGallery.propTypes = {
  customFields,
}

PhotoGallery.label = 'Fotogalería'
// PhotoGallery.static = true

export default PhotoGallery
