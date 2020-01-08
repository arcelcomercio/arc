/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
import { msToTime } from '../../../../utilities/helpers'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../../utilities/constants'

const classes = {
  listItemDest: 'stories-video__item-dest w-full',
  listItemTitleDest: 'stories-video__item-dest-title text-white',

  listItem:
    'stories-video__item w-full p-20 flex justify-between position-relative',
  listItemTitle: 'stories-video__item-title text-white',
  listItemInfo: 'stories-video__item-text text-white',
  listItemImg:
    'stories-video__item-img w-full h-full object-cover object-center mr-15',
  listItemTime:
    'stories-video__item-time position-absolute icon-video text-white flex justify-center items-center',
}

const YoutubeVideoDestacado = ({ title, video }) => {
  return (
    <>
      <iframe
        className=""
        src={`https://www.youtube.com/embed/${video.payload}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video"
      />
      <span>{title}</span>
    </>
  )
}

const YoutubeVideoNoDestacado = ({ image, title, liveStory }) => {
  return (
    <>
      <img src={image.payload} alt={title} className={classes.listItemImg} />
      <div className={classes.listItemInfo}>
        <span className={classes.listItemTitle}>{title}</span>
        {liveStory && <span>EN VIVO</span>}
      </div>
    </>
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

const ItemVideoCenterDestacado = ({ title, video }) => {
  const [playState, setPlayState] = useState(false)

  useEffect(() => {
    // document.addEventListener('powaRender',load)
    window.addEventListener('powaRender', ({ detail: { powa } }) => {
      if (playState) {
        powa.play()
      }

      setPlayState(true)
    })
  })
  return (
    <>
      <div
        // className={classes.listItemDest}
        dangerouslySetInnerHTML={{ __html: video.payload }}
      />
      <span>{title}</span>
    </>
  )
}

const ItemVideoCenterNoDestacado = ({ liveStory, image, title, time }) => {
  return (
    <>
      <img className={classes.listItemImg} src={image.payload} alt={title} />
      <span className={classes.listItemTime}>{time}</span>
      <div className={classes.listItemInfo}>
        <span className={classes.listItemTitle}>{title}</span>
        {liveStory && <span>EN VIVO</span>}
      </div>
    </>
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
  const classItem = index === 0 ? classes.listItemDest : classes.listItem
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={classItem} onClick={() => StoryItemHandleClick(index)}>
      {resultItemVideo}
    </div>
  )
}

export default StoriesListStoryVideoItem
