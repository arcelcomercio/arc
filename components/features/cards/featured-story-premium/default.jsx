import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

// import DatepickerVisualHelp from '../../../global-components/datepicker-visual-help'
import { getAssetsPath } from '../../../utilities/assets'
import {
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIO,
} from '../../../utilities/constants/sitenames'
import { featuredStoryPremiumFields } from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import FeaturedStoryPremiumChild from './_children/feature-premium'
import FeaturedStoryPremiumOpt from './_children/featured-premium-opt'
import LiveStreaming from './_children/streaming-live'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const FeaturedStoryPremium = (props) => {
  const { arcSite, contextPath, deployment, isAdmin } = useAppContext()
  const {
    assets: {
      premium: { logo },
    },
  } = getProperties(arcSite)
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
      adsSpace,
      // dateInfo,
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
    .filter((el) => el.path && el.date)
    .filter((el) => actualDate > el.date)
    .sort((a, b) => (b.date > a.date ? 1 : -1))

  const currentNotePath =
    scheduledNotes.length > 0 ? scheduledNotes[0].path : ''

  const presets = 'no-presets'
  const includedFields = featuredStoryPremiumFields

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
  })

  const logoUrl = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/${logo}?d=1`

  const adsSpaces =
    useContent(
      adsSpace && adsSpace !== 'none'
        ? {
            source: 'get-ads-spaces',
            query: { space: adsSpace },
          }
        : {}
    ) || {}

  const getAdsSpace = () => {
    const toDate = (dateStr) => {
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

  const ad = getAdsSpace()

  if (ad)
    return (
      <div className="col-1 row-1" dangerouslySetInnerHTML={{ __html: ad }} />
    )

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
      {(() => {
        if (flagLive) {
          return (
            <LiveStreaming
              arcSite={arcSite}
              contextPath={contextPath}
              deployment={deployment}
              platformLive={platformLive}
              urlVideo={urlVideo}
            />
          )
        }
        if (arcSite === SITE_ELCOMERCIO || arcSite === SITE_DIARIOCORREO)
          return (
            <FeaturedStoryPremiumOpt
              websiteLink={websiteLink}
              title={title}
              author={author}
              authorLink={authorLink}
              primarySectionLink={primarySectionLink}
              primarySection={primarySection}
              isAdmin={isAdmin}
              multimedia={imgField || multimedia}
              multimediaType={multimediaType}
              multimediaSubtitle={multimediaSubtitle}
              multimediaCaption={multimediaCaption}
              imgType={imgType}
              isPremium={isPremium}
              model={model}
              bgColor={bgColor}
              titleField={titleField}
              categoryField={categoryField}
              arcSite={arcSite}
            />
          )
        return (
          <FeaturedStoryPremiumChild
            websiteLink={websiteLink}
            title={title}
            subTitle={subTitle}
            author={author}
            authorLink={authorLink}
            primarySectionLink={primarySectionLink}
            primarySection={primarySection}
            multimedia={imgField || multimedia}
            multimediaType={multimediaType}
            multimediaSubtitle={multimediaSubtitle}
            imgType={imgType}
            isPremium={isPremium}
            model={model}
            lastMinute={lastMinute}
            bgColor={bgColor}
            logo={logoUrl}
            titleField={titleField}
            categoryField={categoryField}
            arcSite={arcSite}
          />
        )
      })()}
    </>
  )
}

FeaturedStoryPremium.propTypes = {
  customFields,
}

FeaturedStoryPremium.label = 'Destaque Premium'
FeaturedStoryPremium.static = true

export default FeaturedStoryPremium
