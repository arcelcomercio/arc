import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'
import FacebookLive from './_children/facebook-live'
import { createMarkup } from '../../../utilities/helpers'
import { featuredStoryFields } from '../../../utilities/included-fields'
import { getResizedUrl } from '../../../utilities/resizer'

const PHOTO_SOURCE = 'photo-resizer'

const CardFeaturedStoryAdvanced = props => {
  const {
    customFields: {
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      titleField,
      categoryField,
      imgField,
      flagLive,
      urlVideoFacebook,
      adsSpace,
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      isLazyLoadActivate = true,
    } = {},
  } = props

  const {
    editableField,
    arcSite,
    isAdmin,
    contextPath,
    deployment,
  } = useFusionContext()

  const { siteName } = getProperties(arcSite)

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

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets,
        includedFields,
      }),
      filter: schema,
    }) || {}

  const adsSpaces =
    useContent(
      adsSpace && adsSpace !== 'none'
        ? {
            source: 'get-ads-spaces',
            query: { space: adsSpace },
          }
        : {}
    ) || {}

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

  const getAdsSpace = () => {
    const toDate = dateStr => {
      const [date, time] = dateStr.split(' ')
      const [day, month, year] = date.split('/')
      return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
    }

    if (adsSpaces[adsSpace]) {
      const [currentSpace] = adsSpaces[adsSpace] || []
      const {
        fec_inicio: fecInicio,
        fec_fin: fecFin,
        des_html: desHtml,
      } = currentSpace
      const currentDate = new Date()
      const initDate = toDate(fecInicio)
      const endDate = toDate(fecFin)

      return currentDate > initDate && endDate > currentDate ? desHtml : false
    }

    return false
  }

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

  const paramsFeaturedStory = {
    title,
    category,
    author,
    ...imageUrls,
    multimediaLazyDefault,
    imageSize,
    headband,
    size,
    hightlightOnMobile,
    editableField,
    titleField,
    categoryField,
    arcSite,
    multimediaType,
    isAdmin,
    siteName,
    multimediaSubtitle,
    multimediaCaption,
    isLazyLoadActivate,
  }

  const paramsFacebook = {
    arcSite,
    contextPath,
    deployment,
    urlVideoFacebook,
  }

  return (
    <>
      {(() => {
        if (getAdsSpace())
          return (
            <div
              className={size === 'twoCol' ? 'col-2 row-1' : 'col-1 row-1'}
              dangerouslySetInnerHTML={createMarkup(getAdsSpace())}
            />
          )
        if (flagLive) return <FacebookLive {...paramsFacebook} />
        return <FeaturedStory {...paramsFeaturedStory} />
      })()}
    </>
  )
}

CardFeaturedStoryAdvanced.propTypes = {
  customFields,
}

CardFeaturedStoryAdvanced.label = 'Destaque Avanzado'
CardFeaturedStoryAdvanced.static = true

export default CardFeaturedStoryAdvanced
