import { useContent } from 'fusion:content'
import { AnyObject } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'
import { ArcSite } from 'types/fusion'

import { getQuery, getStories } from './_dependencies/functions'
import schemaFilter from './_dependencies/schema-filter'
import CardMostReadChildrenList from './_lite/_children/list'

interface FeatureProps {
  primarySectionLink: string
  arcSite: ArcSite
  deployment?: (resource: string) => string | string
  contextPath?: string
  viewImage?: boolean
  storiesQty?: number
  customTitle?: string
  customLink?: string
}

const CONTENT_SOURCE = 'story-feed-by-views'
const StoryMostReadChildrenLite: FC<FeatureProps> = (props) => {
  const {
    primarySectionLink,
    deployment = {},
    contextPath = '',
    arcSite,
    viewImage = false,
    storiesQty = 10,
    customTitle = '',
    customLink = '',
  } = props

  const presets =
    arcSite === 'depor' ? 'landscape_s:314x72' : 'landscape_s:157x72'

  const data = useContent({
    source: CONTENT_SOURCE,
    query: {
      presets,
      ...getQuery({ primarySectionLink, storiesQty }),
    },
    filter: schemaFilter,
    transform: ({ content_elements: contentElements = [] } = {}) => {
      const storyItem = contentElements || []
      const response = {
        stories: getStories({
          data: storyItem,
          deployment,
          contextPath,
          arcSite,
        }),
      }

      return response
    },
  })
  const { stories = [] } = data || []

  return (
    <CardMostReadChildrenList
      viewImage={viewImage}
      stories={stories}
      customTitle={customTitle}
      customLink={customLink}
      contextPath={contextPath}
      arcSite={arcSite}
    />
  )
}

StoryMostReadChildrenLite.label = 'Últimas Noticias'

export default StoryMostReadChildrenLite
