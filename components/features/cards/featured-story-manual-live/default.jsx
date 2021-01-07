/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import FeaturedStory from '../../../global-components/featured-story'
import LiveStreaming from './_children/streaming-live'
import schemaFilter from '../../../global-components/featured-story/schema-filter'
import Notify from '../../../global-components/notify/notify'
import buildDatesErrorMessage from '../../../global-components/notify/utils'

import StoryData from '../../../utilities/story-data'
import { featuredStoryFields } from '../../../utilities/included-fields'

import customFields from './_dependencies/custom-fields'

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

  const regex = /^http/g
  const isExternalLink = regex.test(path)
  const schema = schemaFilter(arcSite)
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
    const presets = 'no-presets'

    const auxNote1 =
      useContent(
        note1 !== undefined && note1 !== ''
          ? {
              source,
              query: {
                website_url: note1,
                published: 'false',
                presets,
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
                presets,
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
                presets,
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
  const presets = 'no-presets'
  const includedFields = featuredStoryFields

  const data =
    useContent(
      currentNotePath.length > 0
        ? {
            source,
            query: {
              website_url: currentNotePath,
              presets,
              includedFields,
            },
            filter: schema,
            // Si la nota programada no existe o no está publicada, usar la nota del campo "URL" (path)
            // Esta nota se almacenará en el estado defaultData
          }
        : {}
    ) || {}

  const defaultData = useContent(
    !data._id
      ? {
          source,
          query: {
            website_url: path,
            presets,
            includedFields,
          },
          filter: schema,
        }
      : {}
  )

  // Si la data no existe usar el estado defaultData
  const existingData = data._id ? data : defaultData
  // //////////////////////////////////////////////

  const {
    primarySection,
    primarySectionLink,
    title,
    websiteLink,
    author,
    authorLink,
    multimediaType,
    multimediaCaption,
    multimedia,
  } = new StoryData({
    data: existingData,
    deployment,
    contextPath,
    arcSite,
  })

  return (
    <>
      {flagLive ? (
        <LiveStreaming
          arcSite={arcSite}
          contextPath={contextPath}
          deployment={deployment}
          platformLive={platformLive}
          urlVideo={urlVideo}
        />
      ) : (
        <>
          <FeaturedStory
            primarySection={primarySection}
            primarySectionLink={isExternalLink ? path : primarySectionLink}
            title={title}
            websiteLink={isExternalLink ? path : websiteLink}
            author={author}
            authorLink={authorLink}
            multimediaType={multimediaType}
            multimediaCaption={multimediaCaption}
            multimedia={imgField || multimedia}
            imageSize={imageSize}
            headband={headband}
            size={size}
            hightlightOnMobile={hightlightOnMobile}
            titleField={titleField}
            categoryField={categoryField}
            arcSite={arcSite}
            siteName={siteName}
            isLazyLoadActivate={isLazyLoadActivate}
          />
          {isAdmin && errorList.length > 0 ? (
            <Notify message={buildDatesErrorMessage(errorList)} />
          ) : null}
        </>
      )}
    </>
  )
}

CardFeaturedStoryManualLive.propTypes = {
  customFields,
}

CardFeaturedStoryManualLive.label = 'Destaque por URL / En Vivo'
CardFeaturedStoryManualLive.static = true

export default CardFeaturedStoryManualLive
