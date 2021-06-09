import { useContent } from 'fusion:content'
import { AnyObject } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'
import { ArcSite } from 'types/fusion'
import { Story } from 'types/story'

import { getQuery, getStories } from './_dependencies/functions'
import schemaFilter from './_dependencies/schema-filter'
import CardMostReadList from './_lite/_children/list'

interface FeatureProps {
  story?: Story
  arcSite?: ArcSite
  deployment?: AnyObject
  contextPath?: string
  viewImage?: boolean
  storiesQty?: number
  customTitle?: string
  customLink?: string
}

const CONTENT_SOURCE = 'story-feed-by-views'
const CardMostReadLite: FC<FeatureProps> = (props) => {
  const {
    story = [],
    deployment = {},
    contextPath = '',
    arcSite = 'elcomercio',
    viewImage = false,
    storiesQty,
    customTitle = '',
    customLink = '',
  } = props

  const presets = 'no-presets'

  const data = useContent({
    source: CONTENT_SOURCE,
    query: {
      presets,
      ...getQuery({ story, storiesQty, arcSite }),
    },
    filter: schemaFilter,
    transform: ({ content_elements: contentElements = [] } = {}) => {
      const storyItem = contentElements || []
      const response = {
        stories: [
          getStories({
            data: storyItem,
            deployment,
            contextPath,
            arcSite,
          }),
        ],
      }
      return response
    },
  })
  const { stories = [] } = data || {}

  return (
    <CardMostReadList
      viewImage={viewImage}
      stories={stories}
      customTitle={customTitle}
      customLink={customLink}
      contextPath={contextPath}
      arcSite={arcSite}
    />
  )
}

CardMostReadLite.label = 'Últimas Noticias'

export default CardMostReadLite
