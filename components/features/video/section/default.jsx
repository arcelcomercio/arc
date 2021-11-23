import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import React from 'react'

import {
  ELEMENT_YOUTUBE_ID,
  VIDEO,
} from '../../../utilities/constants/multimedia-types'
import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
  includePromoVideo,
  includePromoVideoAds,
} from '../../../utilities/included-fields'
import { removeLastSlash } from '../../../utilities/parse/strings'
import StoryData from '../../../utilities/story-data'
import ChildrenSectionVideo from './_children/section-video'
import customFields from './_dependencies/custom-fields'
import {
  SchemaHierarchy,
  SchemaMultiStory,
  SchemaSingleStory,
} from './_dependencies/schema-filter'

const formatSections = (data = {}) => {
  const link = 'link'
  const { children = [] } = data
  return children.map((el) => ({
    name: el.node_type === link ? el.display_name : el.name,
    url: el.node_type === link ? el.url : el._id,
  }))
}

const SectionVideo = (props) => {
  const DEFAULT_HIERARCHY = 'header-default'
  const {
    globalContent,
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    siteProperties,
  } = useAppContext()
  const dataVideo = {}
  let section = null

  const {
    customFields: {
      hierarchyConfig,
      hidePlaylist,
      hideSectionBar,
      categoryTop,
      hideShare,
      hideSticky,
      hideMeta,
    } = {},
  } = props

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
  const principalVideo = (data) => {
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
      hasAdsVideo,
      videoStreams,
      captionVideo,
      author,
      videoDuration,
      promoItemJwplayer,
      contentElements,
    } = Story

    dataVideo.principalVideo = {
      primarySection,
      primarySectionLink,
      title,
      websiteLink,
      subTitle,
      displayDate,
      videoStreams,
      promoItemsType,
      hasAdsVideo,
      captionVideo,
      author,
      videoDuration,
      promoItemJwplayer,
      contentElements,
    }
    if (promoItemsType === VIDEO) {
      const { video, promoItems } = Story
      dataVideo.principalVideo = {
        ...dataVideo.principalVideo,
        video,
        image: promoItems[VIDEO].promo_items.basic.url,
      }
    }
    if (promoItemsType === ELEMENT_YOUTUBE_ID) {
      const video = Story.idYoutube
      dataVideo.principalVideo = {
        ...dataVideo.principalVideo,
        video,
      }
    }
    section = removeLastSlash(primarySectionLink)
  }

  const presets = 'landscape_md:314x0'

  const playListVideo = (offset = 0) => {
    const fetchPlayList =
      useContent({
        source: 'story-feed-by-section',
        query: {
          section,
          feedOffset: offset,
          stories_qty: 4,
          presets,
          includedFields: `websites.${arcSite}.website_url,headlines.basic,${includePrimarySection(
            { arcSite }
          )},${includePromoItems},${includePromoVideo},${includeCredits}`,
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
          presets: 'no-presets',
          includedFields: `websites.${arcSite}.website_url,display_date,headlines.basic,subheadlines.basic,${includePrimarySection(
            { arcSite }
          )},${includePromoItems},${includePromoItemsCaptions},${includePromoVideo},${includePromoVideoAds},${includeCredits}`,
        },
        filter: SchemaSingleStory(arcSite),
      }) || {}
    playListVideo()
    principalVideo(fetchPrincipalVideo)

    const storyVideoSection = useContent({
      source: 'story-by-id',
      query: {
        _id: fetchPrincipalVideo._id,
      },
      transform: ({ content_elements: contentElements = [] } = {}) => {
        const filteredData = {
          contentElements,
        }
        return { ...filteredData }
      },
    })

    dataVideo.principalVideo = {
      ...dataVideo.principalVideo,
      ...storyVideoSection,
    }
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

  return (
    <ChildrenSectionVideo
      {...params}
      hidePlaylist={hidePlaylist}
      hideSectionBar={hideSectionBar}
      hideShare={hideShare}
      hideMeta={hideMeta}
      hideSticky={hideSticky}
      categoryTop={categoryTop}
    />
  )
}

SectionVideo.propTypes = {
  customFields,
}

export default SectionVideo
