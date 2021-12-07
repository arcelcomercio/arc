import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

// import DatepickerVisualHelp from '../../../global-components/datepicker-visual-help'
import FeaturedStory from '../../../global-components/featured-story'
import schemaFilter from '../../../global-components/featured-story/schema-filter'
import { featuredStoryFields } from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import LiveStreaming from './_children/streaming-live'
import customFields from './_dependencies/custom-fields'

const CardFeaturedStoryManualLive = (props) => {
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
      // dateInfo,
    } = {},
  } = props

  const {
    arcSite,
    // isAdmin,
    deployment,
    contextPath,
  } = useAppContext()
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
    .filter((el) => el.path && el.date)
    .filter((el) => actualDate > el.date)
    .sort((a, b) => (b.date > a.date ? 1 : -1))

  const currentNotePath =
    scheduledNotes.length > 0 ? scheduledNotes[0].path : path

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
      {/* {dateInfo && isAdmin ? (
        <DatepickerVisualHelp
          note1={note1}
          note2={note2}
          note3={note3}
          date1={date1}
          date2={date2}
          date3={date3}
        />
      ) : null} */}
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
