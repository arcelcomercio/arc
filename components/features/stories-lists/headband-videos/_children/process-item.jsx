import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { LANDSCAPE_XXS } from '../../../../utilities/constants/image-sizes'
import schemaFilter from '../_dependencies/schema-filters'

function HeadBandProcessItem({ storyUrl = '', storyLive = false }) {
  const CONTENT_SOURCE = 'story-by-url'
  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  const processData = data => {
      return data
  }

  const story =
    useContent(
      storyUrl
        ? {
            source: CONTENT_SOURCE,
            query: {
              website: arcSite,
              website_url: storyUrl,
              presets: `${LANDSCAPE_XXS}:170x90`,
            },
            filter: schemaFilter,
            transform: data => processData(data),
          }
        : {}
    ) || {}

  return <div>aquí va el video</div>
}

HeadBandProcessItem.propTypes = {
  storyUrl: PropTypes.string.isRequired,
  storyLive: PropTypes.bool.isRequired,
}

export default HeadBandProcessItem
