/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { msToTime } from '../../../../utilities/helpers'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../../utilities/constants'

// subcomponents
import YoutubeVideoNoDestacado from './youtube-video-unpromoted'
import YoutubeVideoDestacado from './youtube-video-promoted'
import ItemVideoCenterNoDestacado from './powa-video-unpromoted'
import ItemVideoCenterDestacado from './powa-video-promoted'

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
  video = {},
  autoPlayVideo,
}) => {
  const propsItem = {
    isAdmin,
    liveStory,
    title,
    image,
    video,
    autoPlayVideo,
  }
  if (index === 0) {
    return <YoutubeVideoDestacado {...propsItem} />
  }
  return <YoutubeVideoNoDestacado {...propsItem} />
}

const VideoCenter = ({
  index,
  isAdmin,
  liveStory,
  title = '',
  image = {},
  video = {},
  videoTime,
  autoPlayVideo,
}) => {
  const time = msToTime(videoTime)

  const propsItem = {
    isAdmin,
    liveStory,
    time,
    title,
    image,
    video,
    autoPlayVideo,
  }

  if (index === 0) {
    return <ItemVideoCenterDestacado {...propsItem} />
  }
  return <ItemVideoCenterNoDestacado {...propsItem} />
}

const StoriesListStoryVideoItem = ({
  index = 0,
  isAdmin,
  liveStory = false,
  content: {
    title = '',
    image = '',
    video = {},
    autoPlayVideo = false,
    videoTime = 0,
  } = {},
  StoryItemHandleClick,
}) => {
  const paramsItem = {
    index,
    isAdmin,
    liveStory,
    title,
    image,
    video,
    autoPlayVideo,
    videoTime,
  }
  let resultItemVideo = null
  switch (video.type) {
    case VIDEO:
      resultItemVideo = <VideoCenter {...paramsItem} />
      break
    case ELEMENT_YOUTUBE_ID:
      resultItemVideo = <YoutubeVideo {...paramsItem} />
      break
    default:
      resultItemVideo = null
  }

  useEffect(() => {
    if (index === 0 && video.type === VIDEO) {
      if (window.powaBoot) {
        window.powaBoot()
      }
    }
  })
  const classItem = index === 0 ? classes.listItemDest : classes.listItem
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={classItem} onClick={() => StoryItemHandleClick(index)}>
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
  video: PropTypes.object.isRequired,
  autoPlayVideo: PropTypes.bool.isRequired,
}

VideoCenter.propTypes = {
  index: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  liveStory: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  videoTime: PropTypes.number.isRequired,
  autoPlayVideo: PropTypes.bool.isRequired,
}

StoriesListStoryVideoItem.propTypes = {
  index: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  liveStory: PropTypes.bool.isRequired,
  content: PropTypes.object.isRequired,
  StoryItemHandleClick: PropTypes.func.isRequired,
}

export default StoriesListStoryVideoItem
