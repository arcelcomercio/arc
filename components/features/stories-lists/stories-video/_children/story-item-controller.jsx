import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'
import React from 'react'

import { defaultImage, getAssetsPathVideo } from '../../../../utilities/assets'
import { VIDEO_JWPLAYER } from '../../../../utilities/constants'
import { LANDSCAPE_XXS } from '../../../../utilities/constants/image-sizes'
import {
  ELEMENT_YOUTUBE_ID,
  VIDEO,
} from '../../../../utilities/constants/multimedia-types'
import {
  getImage,
  getPrimarySection,
  getTitle,
  getType,
  getVideoAccount,
  getVideoID,
  getVideoImage,
  getVideoImageJWplayer,
  getVideoJWplayerHasAds,
  getVideoJWplayerId,
  getVideoStreams,
  getVideoTime,
  getVideoTimeJWplayer,
  getVideoYoutube,
} from '../../../../utilities/get-story-values'
import schemaFilter from '../_dependencies/schema-filters'
import StoryItem from './story-video-item'

const CONTENT_SOURCE = 'story-by-url'

const Peru21TvItem = ({ storyUrl, isLive, index = 0 }) => {
  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  const getListVideoNews = (data) => {
    const videoType = getType(data)

    let videoID = ''
    let hasAds = ''
    let videoStreams = []
    let image = {}
    let duration = ''
    let account = ''
    const sectionData = getPrimarySection(data, arcSite)

    if (videoType === ELEMENT_YOUTUBE_ID) {
      videoID = getVideoYoutube(data)
      image = getImage(data, LANDSCAPE_XXS)
      image.default = false

      if (image.payload === '') {
        image.default = true
        image.payload = defaultImage({
          deployment,
          contextPath,
          arcSite,
          size: 'sm',
        })
      }
    } else if (videoType === VIDEO) {
      videoID = getVideoID(data)
      videoStreams = getVideoStreams(data)
      image = getVideoImage(data, LANDSCAPE_XXS)
    } else if (videoType === VIDEO_JWPLAYER) {
      videoID = getVideoJWplayerId(data)
      hasAds = getVideoJWplayerHasAds(data)
      image = getImage(data, LANDSCAPE_XXS)
      if (image.payload === '') {
        image = getVideoImageJWplayer(data, LANDSCAPE_XXS)
      }
      duration = getVideoTimeJWplayer(data, LANDSCAPE_XXS)
      account = getVideoAccount(data, LANDSCAPE_XXS)
    }

    let story = {
      index,
      isAdmin,
      liveStory: isLive,
    }

    if (
      data &&
      (videoType === ELEMENT_YOUTUBE_ID ||
        videoType === VIDEO ||
        videoType === VIDEO_JWPLAYER)
    ) {
      const title = getTitle(data)
      let powaVideo = ''

      if (videoStreams) {
        const streamUrls = videoStreams
          .map(({ url = '', stream_type: streamType = '' }) =>
            streamType === 'ts' ? url : []
          )
          .filter(String)
        powaVideo = getAssetsPathVideo(
          arcSite,
          streamUrls[streamUrls.length - 1]
        )
      }

      story = {
        index,
        isAdmin,
        liveStory: isLive,
        valid: true,
        title,
        image,
        videoType,
        videoID,
        powaVideo,
        autoPlayVideo: false,
        videoTime: getVideoTime(data) || duration,
        hasAds,
        account,
        section: sectionData.name,
      }
    }
    return story
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
            filter: schemaFilter(arcSite),
            transform: (data) => getListVideoNews(data),
          }
        : {}
    ) || {}

  return <StoryItem {...story} />
}

Peru21TvItem.propTypes = {
  storyUrl: PropTypes.string.isRequired,
  isLive: PropTypes.bool.isRequired,
}

export default Peru21TvItem
