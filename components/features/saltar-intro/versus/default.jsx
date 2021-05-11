/* eslint-disable arrow-body-style */
/* eslint-disable simple-import-sort/imports */
import * as React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import customFields from './_dependencies/custom-fields'
import Content from './_children/content'
import schemaFilter from './_dependencies/schema-filter'
import {
  includeCredits,
  separatorBasicFields,
  includeContentBasic,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'

const SaltarIntroVersus = (props) => {
  const {
    customFields: {
      seeMoreLink,
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      storyTwoConfig: {
        contentService: contentServiceTwo = '',
        contentConfigValues: contentConfigValuesTwo = {},
      } = {},
    },
  } = props
  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()
  const includedFields = `${separatorBasicFields},${includeCredits},${includeContentBasic}`
  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: 'landscape_s:296x158',
        includedFields,
      }),
      filter: schemaFilter(arcSite),
    }) || {}

  const data2 =
    useContent({
      source: contentServiceTwo,
      query: Object.assign(contentConfigValuesTwo, {
        presets: 'landscape_s:296x158',
        includedFields,
      }),
      filter: schemaFilter(arcSite),
    }) || {}

  const dataClass = new StoryData({
    deployment,
    contextPath,
    arcSite,
  })

  dataClass.__data = data
  const {
    title,
    websiteLink,
    author,
    authorLink,
    multimediaLandscapeS,
    multimediaLazyDefault,
    dataSaltarIntro: { embed: { config: { chapter = '' } = {} } = {} },
  } = dataClass
  const params = {
    title,
    author,
    authorLink,
    link: websiteLink,
    image: multimediaLandscapeS,
    lazyImage: multimediaLazyDefault,
    chapter,
  }
  dataClass.__data = data2
  const {
    title: title2,
    websiteLink: websiteLink2,
    author: author2,
    authorLink: authorLink2,
    multimediaLandscapeS: multimediaLandscapeS2,
    multimediaLazyDefault: multimediaLazyDefault2,
    dataSaltarIntro: {
      embed: { config: { chapter: chapter2 = '' } = {} } = {},
    },
  } = dataClass
  const params2 = {
    title: title2,
    author: author2,
    authorLink: authorLink2,
    link: websiteLink2,
    image: multimediaLandscapeS2,
    lazyImage: multimediaLazyDefault2,
    chapter: chapter2,
  }
  return (
    <Content
      seeMoreLink={seeMoreLink}
      isAdmin={isAdmin}
      data={params}
      data2={params2}
    />
  )
}

SaltarIntroVersus.propTypes = {
  customFields,
}

SaltarIntroVersus.label = 'Versus - Saltar Intro'
SaltarIntroVersus.static = true
export default SaltarIntroVersus
