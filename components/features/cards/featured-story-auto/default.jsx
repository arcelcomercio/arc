import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'
import { featuredStoryFields } from '../../../utilities/included-fields'
import { getResizedUrl } from '../../../utilities/resizer'

const PHOTO_SOURCE = 'photo-resizer'

const CardFeaturedStoryAuto = () => {
  const {
    arcSite,
    deployment,
    contextPath,
    isAdmin,
    customFields: {
      imgField,
      section,
      storyNumber,
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      titleField,
      categoryField,
    } = {},
  } = useFusionContext()

  const { siteName = '' } = getProperties(arcSite)

  const storyFormatter = new StoryFormatter({
    deployment,
    contextPath,
    arcSite,
  })

  const { schema } = storyFormatter
  const presets = isAdmin
    ? 'landscape_l:648x374,landscape_md:314x157,portrait_md:314x374,square_s:150x150'
    : 'no-presets'
  const includedFields = featuredStoryFields

  const data = useContent({
    source: 'story-by-section',
    query: {
      website: arcSite,
      section,
      feedOffset: storyNumber || 0,
      presets,
      includedFields,
    },
    filter: schema,
  })

  const customPhoto =
    useContent(
      imgField && isAdmin
        ? {
            source: PHOTO_SOURCE,
            query: {
              url: imgField,
              presets,
            },
          }
        : {}
    ) || {}

  const formattedData = storyFormatter.formatStory(data, imgField, customPhoto)

  const {
    category,
    title,
    author,
    multimediaLandscapeL,
    multimediaLandscapeMD,
    multimediaPortraitMD,
    multimediaSquareS,
    multimediaLazyDefault,
    multimediaType,
    multimediaSubtitle,
    multimediaCaption,
    multimedia,
  } = formattedData

  const getImageUrls = () => {
    const {
      landscape_l: customLandscapeL,
      landscape_md: customLandscapeMD,
      portrait_md: customPortraitMD,
      square_s: customSquareS,
    } = imgField
      ? getResizedUrl({
          url: imgField,
          presets:
            'landscape_l:648x374,landscape_md:314x157,portrait_md:314x374,square_s:150x150',
          arcSite,
        }) || {}
      : {}

    const {
      landscape_l: landscapeL,
      landscape_md: landscapeMD,
      portrait_md: portraitMD,
      square_s: squareS,
    } =
      getResizedUrl({
        url: multimedia,
        presets:
          'landscape_l:648x374,landscape_md:314x157,portrait_md:314x374,square_s:150x150',
        arcSite,
      }) || {}

    return {
      multimediaLandscapeL: customLandscapeL || imgField || landscapeL,
      multimediaLandscapeMD: customLandscapeMD || imgField || landscapeMD,
      multimediaPortraitMD: customPortraitMD || imgField || portraitMD,
      multimediaSquareS: customSquareS || imgField || squareS,
    }
  }

  const imageUrls = isAdmin
    ? {
        multimediaLandscapeL,
        multimediaLandscapeMD,
        multimediaPortraitMD,
        multimediaSquareS,
      }
    : getImageUrls()

  const params = {
    title,
    category,
    author,
    ...imageUrls,
    multimediaLazyDefault,
    imageSize,
    headband,
    size,
    hightlightOnMobile,
    titleField,
    categoryField,
    arcSite,
    multimediaType,
    isAdmin,
    siteName,
    multimediaSubtitle,
    multimediaCaption,
  }
  return <FeaturedStory {...params} />
}

CardFeaturedStoryAuto.propTypes = {
  customFields,
}

CardFeaturedStoryAuto.label = 'Destaque por Sección'
CardFeaturedStoryAuto.static = true

export default CardFeaturedStoryAuto
