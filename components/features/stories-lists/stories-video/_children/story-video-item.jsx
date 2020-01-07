import React, { useEffect } from 'react'
import { msToTime } from '../../../../utilities/helpers'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../../utilities/constants'

const classes = {
  listItemDest: 'stories-video__item-dest w-full',
  listItemTitleDest: 'stories-video__item-dest-title text-white',

  listItem: 'stories-video__item w-full p-20 flex justify-between',
  listItemTitle: 'stories-video__item-title text-white',
  listItemImg:
    'stories-video__item-img w-full h-full object-cover object-center mr-15',
  listItemTime: 'stories-video__item-time position-absolute',
}

const YoutubeVideoDestacado = ({ video }) => {
  return (
    <div className={classes.listItemDest}>
      <iframe
        className=""
        src={`https://www.youtube.com/embed/${video.payload}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video"
      />
    </div>
  )
}

const YoutubeVideoNoDestacado = ({ image, title, liveStory }) => {
  return (
    <div className={classes.listItem}>
      <img src={image.payload} alt={title} className={classes.listItemImg} />
      <span className={classes.listItemTitle}>{title}</span>
      {liveStory && <span>EN VIVO</span>}
    </div>
  )
}

const YoutubeVideo = ({
  index,
  liveStory,
  title = '',
  image = {},
  video = {},
}) => {
  const propsItem = {
    liveStory,
    title,
    image,
    video,
  }
  if (index === 0) {
    return <YoutubeVideoDestacado {...propsItem} />
  }
  return <YoutubeVideoNoDestacado {...propsItem} />
}

const ItemVideoCenterDestacado = ({ video }) => {
  return (
    <div
      className={classes.listItemDest}
      dangerouslySetInnerHTML={{ __html: video.payload }}
    />
  )
}

const ItemVideoCenterNoDestacado = ({ liveStory, image, title, time }) => {
  return (
    <div className={classes.listItem}>
      <img className={classes.listItemImg} src={image.payload} alt={title} />
      <span className={classes.listItemTime}>{time}</span>
      <div>
        <span className={classes.listItemTitle}>{title}</span>
        {liveStory && <span>EN VIVO</span>}
      </div>
    </div>
  )
}
const VideoCenter = ({
  index,
  liveStory,
  title = '',
  image = {},
  video = {},
  videoTime,
}) => {
  const time = msToTime(videoTime)

  const propsItem = {
    liveStory,
    time,
    title,
    image,
    video,
  }

  if (index === 0) {
    return <ItemVideoCenterDestacado {...propsItem} />
  }
  return <ItemVideoCenterNoDestacado {...propsItem} />
}

const StoriesListStoryVideoItem = ({
  index = 0,
  liveStory = false,
  content: { title = '', image = '', video = {}, videoTime = 0 } = {},
  StoryItemHandleClick,
}) => {
  const paramsItem = {
    index,
    liveStory,
    title,
    image,
    video,
    videoTime,
  }
  let resultItemVideo = {}
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
  return (
    <div onClick={() => StoryItemHandleClick(index)}>{resultItemVideo}</div>
  )
}

export default StoriesListStoryVideoItem
