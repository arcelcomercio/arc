/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeaturedStoryPremiumChild from './_children/feature-premium'
import FeaturedStoryPremiumOpt from './_children/featured-premium-opt'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import LiveStreaming from './_children/streaming-live'
import { featuredStoryPremiumFields } from '../../../utilities/included-fields'
import { getAssetsPath } from '../../../utilities/constants'
import { getResizedUrl } from '../../../utilities/resizer'

const PHOTO_SOURCE = 'photo-resizer'

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
      lastMinute,
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
    const presets = 'no-presets'

    const auxNote1 =
      note1 !== undefined && note1 !== ''
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          useContent({
            source,
            query: {
              website_url: note1,
              published: 'false',
              presets,
            },
            filter,
          })
        : {}

    const auxNote2 =
      note2 !== undefined && note2 !== ''
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          useContent({
            source,
            query: {
              website_url: note2,
              published: 'false',
              presets,
            },
            filter,
          })
        : {}

    const auxNote3 =
      note3 !== undefined && note3 !== ''
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          useContent({
            source,
            query: {
              website_url: note3,
              published: 'false',
              presets,
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

  const presets = isAdmin
    ? 'square_md:300x300,square_xl:900x900,landscape_l:648x374,landscape_md:314x157,portrait_md:314x374'
    : 'no-presets'
  const includedFields = featuredStoryPremiumFields

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

  const errorList = isAdmin ? validateScheduledNotes() : []

  const sourceFetch =
    scheduledNotes.length > 0 ? 'story-by-url' : contentService
  const queryFetch =
    scheduledNotes.length > 0
      ? { website_url: currentNotePath, presets }
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
    multimediaSquareXL,
    multimediaPortraitMD,
    multimediaLandscapeMD,
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
    multimedia,
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
      square_xl: squareXLCustom,
      landscape_l: landscapeLCustom,
      landscape_md: landscapeMDCustom,
      portrait_md: portraitMDCustom,
    } = {},
  } = customPhoto || {}

  const getImageUrls = () => {
    const {
      square_md: localSquareMDCustom,
      square_xl: localSquareXLCustom,
      landscape_l: localLandscapeLCustom,
      landscape_md: localLandscapeMDCustom,
      portrait_md: localPortraitMDCustom,
    } = imgField
      ? getResizedUrl({
          url: imgField,
          presets:
            'square_md:300x300,square_xl:900x900,landscape_l:648x374,landscape_md:314x157,portrait_md:314x374',
          arcSite,
        }) || {}
      : {}

    const {
      square_md: localMultimediaSquareMD,
      square_xl: localMultimediaSquareXL,
      landscape_l: localMultimediaLandscapeL,
      landscape_md: localMultimediaLandscapeMD,
      portrait_md: localMultimediaPortraitMD,
    } =
      getResizedUrl({
        url: multimedia,
        presets:
          'square_md:300x300,square_xl:900x900,landscape_l:648x374,landscape_md:314x157,portrait_md:314x374',
        arcSite,
      }) || {}

    return {
      multimediaSquareMD:
        localSquareMDCustom || imgField || localMultimediaSquareMD,
      multimediaSquareXL:
        localSquareXLCustom || imgField || localMultimediaSquareXL,
      multimediaLandscapeL:
        localLandscapeLCustom || imgField || localMultimediaLandscapeL,
      multimediaLandscapeMD:
        localLandscapeMDCustom || imgField || localMultimediaLandscapeMD,
      multimediaPortraitMD:
        localPortraitMDCustom || imgField || localMultimediaPortraitMD,
    }
  }

  const imageUrls = isAdmin
    ? {
        multimediaSquareMD: squareMDCustom || imgField || multimediaSquareMD,
        multimediaSquareXL: squareXLCustom || imgField || multimediaSquareXL,
        multimediaLandscapeMD:
          landscapeMDCustom || imgField || multimediaLandscapeMD,
        multimediaLandscapeL:
          landscapeLCustom || imgField || multimediaLandscapeL,
        multimediaPortraitMD:
          portraitMDCustom || imgField || multimediaPortraitMD,
      }
    : getImageUrls()

  const params = {
    arcSite,
    isPremium,
    model,
    imgType,
    lastMinute,
    bgColor,
    websiteLink,
    ...imageUrls,
    multimediaLazyDefault,
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
    logo: `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}?d=1`,
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

  if (flagLive) {
    return <LiveStreaming {...paramsLive} />
  }
  if (arcSite === 'elcomercio') return <FeaturedStoryPremiumOpt {...params} />
  return <FeaturedStoryPremiumChild {...params} />
}

FeaturedStoryPremium.propTypes = {
  customFields,
}

FeaturedStoryPremium.label = 'Destaque Premium'
FeaturedStoryPremium.static = true

export default FeaturedStoryPremium
