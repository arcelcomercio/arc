import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'
import { removeLastSlash } from '../../../utilities/helpers'
import ChildrenSectionVideo from './_children/section-video'
import {
  SchemaMultiStory,
  SchemaSingleStory,
} from './_dependencies/schema-filter'

const SectionVideo = () => {
  const {
    globalContent,
    arcSite,
    contextPath,
    deployment,
    isAdmin,
  } = useFusionContext()
  const dataVideo = {}
  let section = null

  const principalVideo = data => {
    const Story = new StoryData({
      data,
      arcSite,
      contextPath,
      deployment,
      defaultImgSize: 'sm',
    })
    const {
      title,
      subTitle,
      displayDate,
      primarySection,
      primarySectionLink,
      promoItemsType,
    } = Story
    dataVideo.principalVideo = {
      primarySection,
      primarySectionLink,
      title,
      subTitle,
      displayDate,
      promoItemsType,
    }
    if (promoItemsType === ConfigParams.VIDEO) {
      const { video } = Story
      dataVideo.principalVideo = {
        ...dataVideo.principalVideo,
        video,
      }
    }
    if (promoItemsType === ConfigParams.ELEMENT_YOUTUBE_ID) {
      const video = Story.idYoutube
      dataVideo.principalVideo = {
        ...dataVideo.principalVideo,
        video,
      }
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
  const params = {
    ...dataVideo,
    arcSite,
    contextPath,
    deployment,
    isAdmin,
  }

  return <ChildrenSectionVideo {...params} />
}

export default SectionVideo
