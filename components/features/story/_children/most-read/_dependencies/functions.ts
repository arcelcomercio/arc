import { AnyObject } from 'fusion:content'
import React, { ReactElement } from 'react'
import { ArcSite } from 'types/fusion'
import { ListDataStories, Story } from 'types/story'

import { removeLastSlash } from '../../../../../utilities/parse/strings'
import StoryData from '../../../../../utilities/story-data'

interface StoriesProps {
  arcSite?: ArcSite
  deployment?: AnyObject[]
  contextPath?: string
  viewImage?: boolean
  data?: ListDataStories[]
  customTitle?: string
  customLink?: string
}

const formatStories: React.FC<StoriesProps> = ({
  data = [],
  deployment,
  contextPath,
  arcSite,
}) => {
  const aux:
    | React.ReactElement<never, never>
    | {
        websiteUrl: string
        imageUrl: string
        storyType: string
        title: string
        id: string
      }[]
    | null = []

  const element = new StoryData({
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })

  data.forEach((el) => {
    element.__data = el
    aux.push({
      websiteUrl: element.link,
      imageUrl: element.multimedia,
      storyType: element.multimediaType,
      title: element.title,
      id: el._id,
    })
  })
  return aux
}
interface QueryProps {
  arcSite?: ArcSite
  story?: Story
  storiesQty?: number
}
export const getQuery: React.FC<QueryProps> = (props): AnyObject => {
  const { story, storiesQty, arcSite = 'elcomercio' } = props
  const { websites = {} } = story || {}

  const { website_section: { _id: id = '', path = '' } = {} } =
    websites[arcSite] || {}

  let sec = id || path

  if (sec === 'todas' || sec === null || sec === 'undefined') sec = ''
  else if (sec !== '') {
    sec = sec.charAt(0) === '/' ? sec : `/${sec}`
  }

  return {
    section: removeLastSlash(sec),
    size: storiesQty,
  }
}
interface FeatureProps {
  arcSite?: ArcSite
  deployment?: AnyObject[]
  contextPath?: string
  data?: ListDataStories[]
}

export const getStories: React.FC<FeatureProps> = (props): ReactElement => {
  const {
    data = [],
    deployment = [],
    contextPath = '',
    arcSite = 'elcomercio',
  } = props
  let stories = {}
  if (data?.length > 0) {
    stories = formatStories({
      data,
      deployment,
      contextPath,
      arcSite,
    })
  }
  return stories as ReactElement
}
