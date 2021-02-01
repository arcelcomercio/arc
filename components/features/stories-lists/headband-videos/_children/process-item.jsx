import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { LANDSCAPE_XXS } from '../../../../utilities/constants/image-sizes'
import schemaFilter from '../_dependencies/schema-filters'
import VideoItem from './item'
import {
  getType,
  getTitle,
  getVideoYoutube,
  getImage,
  getVideoImage,
  getVideoTime,
  getVideoJWplayerId,
  getVideoJWplayerHasAds,
  getVideoTimeJWplayer,
  getVideoAccount,
  getVideoImageJWplayer,
} from '../../../../utilities/get-story-values'
import {
  ELEMENT_YOUTUBE_ID,
  JWPLAYER,
} from '../../../../utilities/constants/multimedia-types'
import { defaultImage } from '../../../../utilities/assets'
import { secToTime } from '../../../../utilities/date-time/time'

function HeadBandProcessItem({ storyUrl = '', storyLive = false, loadFixedVideo, position }) {
  const CONTENT_SOURCE = 'story-by-url'
  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  const processData = data => {
    const videoType = getType(data)

    let videoID = ''
    let hasAds = ''
    let image = {}
    let duration = ''
    let account = ''

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
    } else if (videoType === JWPLAYER) {
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
      isAdmin,
      liveStory: storyLive,
    }

    if (data && (videoType === ELEMENT_YOUTUBE_ID || videoType === JWPLAYER)) {
      const title = getTitle(data)
      story = {
        isAdmin,
        liveStory: storyLive,
        valid: true,
        title,
        image,
        videoType,
        videoID,
        autoPlayVideo: false,
        videoTime: videoType === JWPLAYER ? secToTime(duration || 0) : '',
        hasAds,
        account,
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
            filter: schemaFilter,
            transform: data => processData(data),
          }
        : {}
    ) || {}

  return storyUrl ? <VideoItem position={position} data={story} loadFixedVideo={loadFixedVideo} /> : <></>
}

HeadBandProcessItem.propTypes = {
  storyUrl: PropTypes.string.isRequired,
  storyLive: PropTypes.bool.isRequired,
}

export default HeadBandProcessItem
