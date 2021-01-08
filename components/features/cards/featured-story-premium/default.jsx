/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import Notify from '../../../global-components/notify/notify'
import buildDatesErrorMessage from '../../../global-components/notify/utils'

import StoryData from '../../../utilities/story-data'
import { featuredStoryPremiumFields } from '../../../utilities/included-fields'
import { getAssetsPath } from '../../../utilities/assets'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import LiveStreaming from './_children/streaming-live'
import FeaturedStoryPremiumChild from './_children/feature-premium'
import FeaturedStoryPremiumOpt from './_children/featured-premium-opt'

const FeaturedStoryPremium = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
  } = useAppContext()
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

  const presets = 'no-presets'
  const includedFields = featuredStoryPremiumFields

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

  const ad = getAdsSpace()

  if (ad)
    return (
      <div
        className="col-1 row-1"
        dangerouslySetInnerHTML={{ __html: ad }}
      />
    )

  if (flagLive) {
    return <LiveStreaming
      arcSite={arcSite}
      contextPath={contextPath}
      deployment={deployment}
      platformLive={platformLive}
      urlVideo={urlVideo}
    />
  }

  if (arcSite === 'elcomercio') {
    return (
      <>
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
        />
        {isAdmin && errorList.length > 0 ? (
          <Notify message={buildDatesErrorMessage(errorList)} />
        ) : null}
      </>
    )
  }

  return (
    <>
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
      {isAdmin && errorList.length > 0 ? (
        <Notify message={buildDatesErrorMessage(errorList)} />
      ) : null}
    </>
  )
}

FeaturedStoryPremium.propTypes = {
  customFields,
}

FeaturedStoryPremium.label = 'Destaque Premium'
FeaturedStoryPremium.static = true

export default FeaturedStoryPremium
