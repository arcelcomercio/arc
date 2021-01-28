/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { msToTime, secToTime } from '../../../../utilities/date-time/time'
import {
  VIDEO,
  ELEMENT_YOUTUBE_ID,
} from '../../../../utilities/constants/multimedia-types'

import YoutubeVideoNoDestacado from './youtube-video-unpromoted'
import YoutubeVideoDestacado from './youtube-video-promoted'
import ItemVideoCenterNoDestacado from './powa-video-unpromoted'
import ItemVideoCenterDestacado from './powa-video-promoted'
import ItemVideoJWplayerNoDestacado from './jwplayer-video-unpromoted'
import ItemVideoJWplayerDestacado from './jwplayer-video-promoted'
import { VIDEO_JWPLAYER } from '../../../../utilities/constants'

const classes = {
  listItemDest: 'stories-video__item-dest w-full',
  listItem:
    'stories-video__item w-full p-10 flex justify-between position-relative cursor-pointer',
}

const YoutubeVideo = ({
  index,
  isAdmin,
  liveStory,
  title = '',
  image = {},
  videoID = '',
  autoPlayVideo,
}) => {
  const youtubeVideoProps = {
    isAdmin,
    title,
    liveStory,
    image: image.payload,
    imageDefault: image.default,
    videoID,
    autoPlayVideo,
  }

  if (index === 0) {
    return <YoutubeVideoDestacado {...youtubeVideoProps} />
  }
  return <YoutubeVideoNoDestacado {...youtubeVideoProps} />
}
const VideoJWplayer = ({
  index,
  isAdmin,
  liveStory,
  title = '',
  image = {},
  videoID = '',
  powaVideo = '',
  videoTime,
  autoPlayVideo,
  account,
}) => {
  const time = secToTime(videoTime)
  const powaVideoProps = {
    isAdmin,
    title,
    liveStory,
    image: image.payload,
    videoID,
    powaVideo,
    time,
    account,
    autoPlayVideo,
  }

  if (index === 0) {
    return <ItemVideoJWplayerDestacado {...powaVideoProps} />
  }
  return <ItemVideoJWplayerNoDestacado {...powaVideoProps} />
}

const VideoCenter = ({
  index,
  isAdmin,
  liveStory,
  title = '',
  image = {},
  videoID = '',
  powaVideo = '',
  videoTime,
  autoPlayVideo,
}) => {
  const time = msToTime(videoTime)

  const powaVideoProps = {
    isAdmin,
    title,
    liveStory,
    image: image.payload,
    videoID,
    powaVideo,
    time,
    autoPlayVideo,
  }

  if (index === 0) {
    return <ItemVideoCenterDestacado {...powaVideoProps} />
  }
  return <ItemVideoCenterNoDestacado {...powaVideoProps} />
}

const StoriesListStoryVideoItem = ({
  index = 0,
  isAdmin,
  liveStory = false,
  title = '',
  image = {},
  videoType = '',
  videoID = '',
  powaVideo = '',
  autoPlayVideo = false,
  videoTime = 0,
  hasAds = '',
  duration,
  account,
}) => {
  const paramsItem = {
    index,
    isAdmin,
    liveStory,
    title,
    image,
    videoID,
    powaVideo,
    autoPlayVideo,
    videoTime,
    hasAds,
    duration,
    account,
  }
  let resultItemVideo = null

  switch (videoType) {
    case VIDEO:
      resultItemVideo = <VideoCenter {...paramsItem} />
      break
    case VIDEO_JWPLAYER:
      resultItemVideo = <VideoJWplayer {...paramsItem} />
      break
    case ELEMENT_YOUTUBE_ID:
      resultItemVideo = <YoutubeVideo {...paramsItem} />
      break
    default:
      resultItemVideo = null
  }

  useEffect(() => {
    if (index === 0 && videoType === VIDEO) {
      if (window.powaBoot) {
        window.powaBoot()
      }
    }
  })

  const classItem = index === 0 ? classes.listItemDest : classes.listItem

  const removeStickyHeadband = (indexItem = 1) => {
    const fixedHeadband = document.querySelector('.headband__fixedvideo__close')
    if (fixedHeadband && indexItem === 0) {
      fixedHeadband.click()
    }
  }

  return (
    <div
      role="button"
      tabIndex="0"
      className={classItem}
      onClick={() => {
        removeStickyHeadband(index)
      }}
      data-type={videoType}>
      {resultItemVideo}
    </div>
  )
}

YoutubeVideo.propTypes = {
  index: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  liveStory: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  videoID: PropTypes.string.isRequired,
  autoPlayVideo: PropTypes.bool.isRequired,
}

VideoCenter.propTypes = {
  index: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  liveStory: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  videoID: PropTypes.string.isRequired,
  powaVideo: PropTypes.string.isRequired,
  videoTime: PropTypes.number.isRequired,
  autoPlayVideo: PropTypes.bool.isRequired,
}

StoriesListStoryVideoItem.propTypes = {
  index: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  liveStory: PropTypes.bool.isRequired,
}

export default StoriesListStoryVideoItem
