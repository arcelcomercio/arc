/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'
import LiveStreaming from './_children/streaming-live'
import { getPhotoId } from '../../../utilities/helpers'
import {
  includeCredits,
  includePromoItems,
  includePrimarySection,
  includePromoItemsCaptions,
  includeSections,
} from '../../../utilities/included-fields'

const PHOTO_SOURCE = 'photo-resizer'

const CardFeaturedStoryManualLive = props => {
  const {
    customFields: {
      imgField,
      note1,
      date1,
      note2,
      date2,
      note3,
      date3,
      path = '',
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      titleField,
      categoryField,
      flagLive,
      platformLive,
      urlVideo,
      isLazyLoadActivate = true,
    } = {},
  } = props

  const { arcSite, isAdmin, deployment, contextPath } = useFusionContext()
  const { siteName = '' } = getProperties(arcSite)

  const storyFormatter = new StoryFormatter({
    deployment,
    contextPath,
    arcSite,
  })

  const regex = /^http/g
  const isExternalLink = regex.test(path)

  const { schema } = storyFormatter

  const source = 'story-by-url'

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
    scheduledNotes.length > 0 ? scheduledNotes[0].path : path

  const validateScheduledNotes = () => {
    const filter = '{ publish_date }'
    const includedFields = 'publish_date'

    const auxNote1 =
      useContent(
        note1 !== undefined && note1 !== ''
          ? {
              source,
              query: {
                website_url: note1,
                published: 'false',
                includedFields,
              },
              filter,
            }
          : {}
      ) || {}

    const auxNote2 =
      useContent(
        note2 !== undefined && note2 !== ''
          ? {
              source,
              query: {
                website_url: note2,
                published: 'false',
                includedFields,
              },
              filter,
            }
          : {}
      ) || {}

    const auxNote3 =
      useContent(
        note3 !== undefined && note3 !== ''
          ? {
              source,
              query: {
                website_url: note3,
                published: 'false',
                includedFields,
              },
              filter,
            }
          : {}
      ) || {}

    const dateNote1 = auxNote1.publish_date && new Date(auxNote1.publish_date)
    const dateNote2 = auxNote2.publish_date && new Date(auxNote2.publish_date)
    const dateNote3 = auxNote3.publish_date && new Date(auxNote3.publish_date)

    const arrError = []
    if (note1 !== '' && date1 < dateNote1) {
      arrError.push({
        note: 'Nota 1',
        publish_date: dateNote1,
        programate_date: date1,
      })
    }
    if (note2 !== '' && date2 < dateNote2) {
      arrError.push({
        note: 'Nota 2',
        publish_date: dateNote2,
        programate_date: date2,
      })
    }
    if (note3 !== '' && date3 < dateNote3) {
      arrError.push({
        note: 'Nota 3',
        publish_date: dateNote3,
        programate_date: date3,
      })
    }
    return arrError
  }

  const errorList = isAdmin ? validateScheduledNotes() : []
  const presets =
    'landscape_l:648x374,landscape_md:314x157,portrait_md:314x374,square_s:150x150'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includePrimarySection},${includeSections},publish_date,display_date`

  // Solo acepta custom image desde Photo Center
  const photoId = imgField ? getPhotoId(imgField) : ''
  const customPhoto =
    useContent(
      photoId
        ? {
            source: PHOTO_SOURCE,
            query: {
              url: imgField,
              presets,
            },
          }
        : {}
    ) || {}

  const data =
    useContent(
      currentNotePath.length > 0
        ? {
            source,
            query: {
              website_url: currentNotePath,
              includedFields,
            },
            filter: schema,
            // Si la nota programada no existe o no está publicada, usar la nota del campo "URL" (path)
            // Esta nota se almacenará en el estado defaultData
          }
        : {}
    ) || {}

  const defaultData = useContent(
    !data
      ? {
          source,
          query: {
            website_url: path,
            includedFields,
          },
          filter: schema,
        }
      : {}
  )

  // Si la data no existe usar el estado defaultData
  const existingData = data._id ? data : defaultData
  // //////////////////////////////////////////////
  const formattedData = storyFormatter.formatStory(
    existingData,
    imgField,
    customPhoto
  )
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
  } = formattedData

  if (isExternalLink) {
    title.url = path
    category.url = path
  }

  const params = {
    title,
    category,
    author,
    multimediaLandscapeL,
    multimediaLandscapeMD,
    multimediaPortraitMD,
    multimediaSquareS,
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
    errorList,
    multimediaSubtitle,
    multimediaCaption,
    isLazyLoadActivate,
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
      {!flagLive && <FeaturedStory {...params} />}
      {flagLive && <LiveStreaming {...paramsLive} />}
    </>
  )
}

CardFeaturedStoryManualLive.propTypes = {
  customFields,
}

CardFeaturedStoryManualLive.label = 'Destaque por URL / En Vivo'
CardFeaturedStoryManualLive.static = true

export default CardFeaturedStoryManualLive
