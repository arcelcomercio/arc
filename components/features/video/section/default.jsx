import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'
import { removeLastSlash, formatSections } from '../../../utilities/helpers'
import ChildrenSectionVideo from './_children/section-video'
import customFields from './_dependencies/custom-fields'

import {
  SchemaMultiStory,
  SchemaSingleStory,
  SchemaHierarchy,
} from './_dependencies/schema-filter'

const SectionVideo = props => {
  const DEFAULT_HIERARCHY = 'header-default'
  const {
    globalContent,
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    siteProperties,
  } = useFusionContext()
  const dataVideo = {}
  let section = null

  const { customFields: { hierarchyConfig } = {} } = props

  const { contentService = '', contentConfigValues = {} } =
    hierarchyConfig || {}

  const isHierarchyReady = !!contentConfigValues.hierarchy
  const sourceHierarchy = isHierarchyReady
    ? contentService
    : 'navigation-by-hierarchy'
  const paramsFetch = isHierarchyReady
    ? contentConfigValues
    : {
        website: arcSite,
        hierarchy: DEFAULT_HIERARCHY,
      }

  const dataHierarchy =
    useContent({
      source: sourceHierarchy,
      query: paramsFetch,
      filter: SchemaHierarchy,
    }) || {}

  const arrSections = formatSections(dataHierarchy)

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
      websiteLink,
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
      websiteLink,
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
    siteProperties,
    arrSections,
  }

  return <ChildrenSectionVideo {...params} />
}

SectionVideo.propTypes = {
  customFields,
}

export default SectionVideo
