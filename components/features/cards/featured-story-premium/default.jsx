/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeaturedStoryPremiumChild from './_children/feature-premium'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import LiveStreaming from './_children/streaming-live'
import { getPhotoId } from '../../../utilities/helpers'
import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
} from '../../../utilities/included-fields'
import { getAssetsPath } from '../../../utilities/constants'

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

const FeaturedStoryPremium = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    siteProperties,
  } = useFusionContext()
  const {
    assets: {
      premium: { logo },
    },
  } = siteProperties || {}
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      model,
      imgType,
      bgColor,
      note1,
      date1,
      note2,
      date2,
      note3,
      date3,
      flagLive,
      platformLive,
      urlVideo,
      titleField,
      imgField,
      categoryField,
    } = {},
  } = props

  const actualDate = new Date().getTime()

  const scheduledNotes = [
    {
      path: note1,
      date: date1,
    },
    {
      path: note2,
      date: date2,
    },
    {
      path: note3,
      date: date3,
    },
  ]
    .filter(el => el.path && el.date)
    .filter(el => actualDate > el.date)
    .sort((a, b) => (b.date > a.date ? 1 : -1))

  const currentNotePath =
    scheduledNotes.length > 0 ? scheduledNotes[0].path : ''

  const source = 'story-by-url'

  const validateScheduledNotes = () => {
    const filter = '{ publish_date additional_properties { is_published } }'
    const auxNote1 =
      note1 !== undefined && note1 !== ''
        ? useContent({
            source,
            query: {
              website_url: note1,
              published: 'false',
            },
            filter,
          })
        : {}

    const auxNote2 =
      note2 !== undefined && note2 !== ''
        ? useContent({
            source,
            query: {
              website_url: note2,
              published: 'false',
            },
            filter,
          })
        : {}

    const auxNote3 =
      note3 !== undefined && note3 !== ''
        ? useContent({
            source,
            query: {
              website_url: note3,
              published: 'false',
            },
            filter,
          })
        : {}
    const {
      publish_date: publishDate1,
      additional_properties: { is_published: isPublished1 = false } = {},
    } = auxNote1 || {}

    const {
      publish_date: publishDate2,
      additional_properties: { is_published: isPublished2 = false } = {},
    } = auxNote2 || {}

    const {
      publish_date: publishDate3,
      additional_properties: { is_published: isPublished3 = false } = {},
    } = auxNote3 || {}
    const dateNote1 = publishDate1 && new Date(publishDate1)
    const dateNote2 = publishDate2 && new Date(publishDate2)
    const dateNote3 = publishDate3 && new Date(publishDate3)

    const arrError = []
    if (note1 !== '' && !isPublished1 && date1 < dateNote1) {
      arrError.push({
        note: 'Nota 1',
        publish_date: dateNote1,
        programate_date: date1,
      })
    }
    if (note2 !== '' && !isPublished2 && date2 < dateNote2) {
      arrError.push({
        note: 'Nota 2',
        publish_date: dateNote2,
        programate_date: date2,
      })
    }
    if (note3 !== '' && !isPublished3 && date3 < dateNote3) {
      arrError.push({
        note: 'Nota 3',
        publish_date: dateNote3,
        programate_date: date3,
      })
    }
    return arrError
  }

  const presets = 'landscape_l:648x374,landscape_md:314x157,square_md:300x300'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,subheadlines.basic,content_restrictions.content_code,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includePrimarySection}`

  // Solo acepta custom image desde Photo Center
  const photoId = imgField ? getPhotoId(imgField) : ''
  const customPhoto =
    useContent(
      photoId
        ? {
            source: PHOTO_SOURCE,
            query: {
              _id: photoId,
            },
            filter: PHOTO_SCHEMA,
          }
        : {}
    ) || {}

  const errorList = isAdmin ? validateScheduledNotes() : []

  const sourceFetch =
    scheduledNotes.length > 0 ? 'story-by-url' : contentService
  const queryFetch =
    scheduledNotes.length > 0
      ? { website_url: currentNotePath }
      : Object.assign(contentConfigValues, { presets, includedFields })
  const data =
    useContent({
      source: sourceFetch,
      query: queryFetch,
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    isPremium,
    websiteLink,
    multimediaSquareMD,
    multimediaPortraitMD,
    multimediaLandscapeL,
    multimediaLazyDefault,
    title,
    subTitle,
    author,
    authorLink,
    multimediaType,
    primarySectionLink,
    primarySection,
    multimediaSubtitle,
    multimediaCaption,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const {
    resized_urls: {
      square_md: squareMDCustom,
      lazy_default: lazyDefaultCustom,
      landscape_l: landscapeLCustom,
      portrait_md: portraitMDCustom,
    } = {},
  } = customPhoto || {}

  const params = {
    arcSite,
    isPremium,
    model,
    imgType,
    bgColor,
    websiteLink,
    multimediaSquareMD: squareMDCustom || imgField || multimediaSquareMD,
    multimediaLandscapeMD: portraitMDCustom || imgField || multimediaPortraitMD,
    multimediaLandscapeL: landscapeLCustom || imgField || multimediaLandscapeL,
    multimediaLazyDefault:
      lazyDefaultCustom || imgField || multimediaLazyDefault,
    title,
    subTitle,
    author,
    authorLink,
    multimediaType,
    primarySectionLink,
    primarySection,
    isAdmin,
    errorList,
    titleField,
    categoryField,
    logo: deployment(
      `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/${logo}`
    ),
    multimediaSubtitle,
    multimediaCaption,
  }

  const paramsLive = {
    arcSite,
    contextPath,
    deployment,
    platformLive,
    urlVideo,
  }

  return (
    <>
      {!flagLive && <FeaturedStoryPremiumChild {...params} />}
      {flagLive && <LiveStreaming {...paramsLive} />}
    </>
  )
}

FeaturedStoryPremium.propTypes = {
  customFields,
}

FeaturedStoryPremium.label = 'Destaque Premium'
FeaturedStoryPremium.static = true

export default FeaturedStoryPremium
