import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import { removeLastSlash } from '../../../utilities/helpers'
import ChildrenSectionVideo from './_children/section-video'
import {
  SchemaMultiStory,
  SchemaSingleStory,
} from './_dependencies/schema-filter'

const SectionVideo = () => {
  const { globalContent, arcSite, contextPath, deployment } = useFusionContext()
  const dataVideo = {}
  let section = null

  const principalVideo = data => {
    const {
      title,
      subTitle,
      author,
      displayDate,
      primarySection,
      primarySectionLink,
    } = new StoryData({
      data,
      arcSite,
      contextPath,
      deployment,
      defaultImgSize: 'sm',
    })
    dataVideo.principalVideo = {
      primarySection,
      primarySectionLink,
      title,
      subTitle,
      author,
      displayDate,
    }
    section = removeLastSlash(primarySectionLink)
  }

  const playListVideo = (offset = 0) => {
    const fetchPlayList =
      useContent({
        source: 'story-feed-by-section',
        query: {
          section,
          feedOffset: offset,
          stories_qty: 4,
        },
        filter: SchemaMultiStory(arcSite),
      }) || {}
    dataVideo.playListVideo = fetchPlayList
  }

  if (globalContent && globalContent.type === 'story') {
    principalVideo(globalContent)
    playListVideo()
  } else {
    section = globalContent._id
    const fetchPrincipalVideo =
      useContent({
        source: 'story-by-section',
        query: {
          section,
        },
        filter: SchemaSingleStory(arcSite),
      }) || {}
    playListVideo()
    principalVideo(fetchPrincipalVideo)
  }

  return <ChildrenSectionVideo {...dataVideo} />
}

export default SectionVideo
