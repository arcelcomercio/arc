import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

import {
  featuredStoryFields,
  includeContentBasic,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
// import FeaturedStory from '../../../global-components/featured-story'
import FeaturedStory from './_children/destaque'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const CardFeaturedStoryAdvanced = (props) => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      starField,
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useAppContext()

  const { siteName } = getProperties(arcSite)
  const includedFields = `${featuredStoryFields},${includeContentBasic},content_elements.subtype,content_elements.embed,content_elements.embed.config`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: 'no-presets',
        includedFields,
      }),
      filter: schemaFilter(arcSite),
    }) || {}

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
    dataSaltarIntro: { embed: { config: { plataform, score } = {} } = {} },
  } = new StoryData({
    data,
    deployment,
    contextPath,
    arcSite,
  })

  return (
    <>
      {(() => (
        <FeaturedStory
          primarySection={primarySection}
          primarySectionLink={primarySectionLink}
          title={title}
          websiteLink={websiteLink}
          author={author}
          authorLink={authorLink}
          multimediaType={multimediaType}
          multimediaCaption={multimediaCaption}
          multimedia={multimedia}
          arcSite={arcSite}
          siteName={siteName}
          starField={starField}
          plataform={plataform}
          score={score}
        />
      ))()}
    </>
  )
}

CardFeaturedStoryAdvanced.propTypes = {
  customFields,
}

CardFeaturedStoryAdvanced.label = 'Destaque - Saltar Intro'
CardFeaturedStoryAdvanced.static = true

export default CardFeaturedStoryAdvanced
