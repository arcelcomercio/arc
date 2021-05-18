/* eslint-disable arrow-body-style */
/* eslint-disable simple-import-sort/imports */
import * as React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext, useAppContext } from 'fusion:context'
import customFields from './_dependencies/custom-fields'
import Content from './_children/content'
import schemaFilter from './_dependencies/schema-filter'
import {
  featuredStoryFields,
  includeCredits,
  separatorBasicFields,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'

const SaltarIntroEntrevista = (props) => {
  const {
    customFields: {
      image = null,
      title: titleCF = null,
      actor = '',
      rol = '',
      seeMoreLink,
      storiesConfig: { contentService = '', contentConfigValues = {} } = {},
    },
  } = props
  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()
  // const { arcSite, contextPath, deployment } = useAppContext()
  const includedFields = `${separatorBasicFields},${includeCredits}` // `${featuredStoryFields}`
  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: 'portrait_s:296x441',
        includedFields,
      }),
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    // primarySection,
    // primarySectionLink,
    title,
    websiteLink,
    author,
    // authorLink,
    multimediaPortraitS,
    // multimediaLandscapeS,
    multimediaLazyDefault,
  } = new StoryData({
    data,
    deployment,
    contextPath,
    arcSite,
  })
  return (
    <Content
      title={titleCF || title}
      author={author}
      image={image || multimediaPortraitS}
      lazyImage={multimediaLazyDefault}
      link={websiteLink}
      actor={actor}
      rol={rol}
      isAdmin={isAdmin}
      seeMoreLink={seeMoreLink}
    />
  )
}

SaltarIntroEntrevista.propTypes = {
  customFields,
}

SaltarIntroEntrevista.label = 'Entrevista - Saltar Intro'
SaltarIntroEntrevista.static = true
export default SaltarIntroEntrevista
