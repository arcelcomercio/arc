import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeaturedStoryPremiumChild from './_children/feature-premium'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

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
      bgColor,
      note1,
      date1,
      note2,
      date2,
      note3,
      date3,
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
      note1 !== ''
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
      note2 !== ''
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
      note3 !== ''
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
      console.log(auxNote1)
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

  const errorList = isAdmin ? validateScheduledNotes() : []

  const sourceFetch =
    scheduledNotes.length > 0 ? 'story-by-url' : contentService
  const queryFetch =
    scheduledNotes.length > 0
      ? { website_url: currentNotePath }
      : contentConfigValues
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
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const params = {
    isPremium,
    model,
    bgColor,
    websiteLink,
    multimediaSquareMD,
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
    isAdmin,
    errorList,
    logo: deployment(`${contextPath}/resources/dist/${arcSite}/images/${logo}`),
  }
  return <FeaturedStoryPremiumChild {...params} />
}

FeaturedStoryPremium.propTypes = {
  customFields,
}

FeaturedStoryPremium.label = 'Destaque Premium'
FeaturedStoryPremium.static = true

export default FeaturedStoryPremium
