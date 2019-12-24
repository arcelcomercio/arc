import React from 'react'
import PropTypes from 'prop-types'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import TVHighlightChild from './_children/tv-highlight'
import StoryData from '../../utilities/story-data'
import {
  includePromoItems,
  includePrimarySection,
  includePromoItemsCaptions,
  includeCredits,
  includeTags,
} from '../../utilities/included-fields'

const CONTENT_SOURCE = 'story-by-section'

const TVHighlight = () => {
  const {
    arcSite,
    deployment,
    contextPath,
    customFields: { section } = {},
  } = useFusionContext()

  const story = useContent({
    source: CONTENT_SOURCE,
    query: {
      section,
      feedOffset: 0,
      presets: 'landscape_xl:980x528',
      includedFields: `websites.${arcSite}.website_url,${includePromoItems},${includePromoItemsCaptions},${includePrimarySection},${includeTags},${includeCredits},canonical_url,headlines.basic,subheadlines.basic`,
    },
    filter: schemaFilter(arcSite),
    transform: data => {
      const storyData = new StoryData({
        data,
        deployment,
        contextPath,
        arcSite,
        defaultImgSize: 'lg',
      })
      return {
        category: {
          nameSection: storyData.primarySection,
          urlSection: storyData.primarySectionLink,
        },
        title: {
          nameTitle: storyData.title,
          urlTitle: storyData.websiteLink,
        },
        multimedia: {
          multimediaType: storyData.multimediaType,
          multimediaImg: storyData.multimediaLandscapeXL,
        },
        tags: storyData.tags,
        multimediaSubtitle: storyData.multimediaSubtitle,
        multimediaCaption: storyData.multimediaCaption,
      }
    },
  })

  return story && <TVHighlightChild {...story} />
}

TVHighlight.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'Path de la sección',
      description:
        'Si no se coloca el path de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
    }),
  }),
}

TVHighlight.label = 'Destaque TV'
TVHighlight.static = true

export default TVHighlight
