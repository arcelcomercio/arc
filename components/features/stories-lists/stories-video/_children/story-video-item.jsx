import React, { useEffect } from 'react'
import { msToTime } from '../../../../utilities/helpers'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../../utilities/constants'

const classes = {
  listItemDestacado: 'stories-video__item-dest w-full',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  listItem: 'stories-video__item w-full p-20',
  listItemTitle: 'stories-video__item-title text-white',
  listItemImg: 'stories-video__item-img',
}

const YoutubeVideoDestacado = ({ video }) => {
  return (
    <div className={classes.listItemDestacado}>
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
    <div>
      <img src={image.payload} alt={title} className={classes.listItemImg} />
      <span className={classes.listItemTitleDest}>{title}</span>
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

const ItemVideoCenterItemDestacado = ({ video }) => {
  return <div dangerouslySetInnerHTML={{ __html: video.payload }} />
}

const ItemVideoCenterItemNoDestacado = ({ liveStory, image, title, time }) => {
  return (
    <div>
      <img src={image.payload} alt={title} />
      <span>{time}</span>
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
    return <ItemVideoCenterItemDestacado {...propsItem} />
  }
  return <ItemVideoCenterItemNoDestacado {...propsItem} />
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
