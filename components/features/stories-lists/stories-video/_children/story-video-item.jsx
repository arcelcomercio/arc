/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
import { msToTime } from '../../../../utilities/helpers'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../../utilities/constants'

const classes = {
  listItemDest: 'stories-video__item-dest w-full',
  listItemText: 'pt-20 pl-20 pr-20 pb-10 w-full',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  listItem:
    'stories-video__item w-full p-15 flex justify-between position-relative cursor-pointer',
  listItemTitle: 'stories-video__item-title text-white mb-10',
  listItemInfo: 'stories-video__item-text text-white',
  listItemImg:
    'stories-video__item-img w-full h-full object-cover object-center mr-15',
  listItemImgDefault:
    'stories-video__item-default w-full h-full object-cover object-center mr-15',
  listItemTime:
    'stories-video__item-time position-absolute icon-video text-white flex justify-center items-center',
  live: 'stories-video__item-live flex items-center uppercase',
  destYoutube: 'stories-video__youtube',
}

const YoutubeVideoDestacado = ({ title, video, autoPlayVideo }) => {
  const urlVideo = autoPlayVideo
    ? `https://www.youtube.com/embed/${video.payload}?autoplay=1`
    : `https://www.youtube.com/embed/${video.payload}`
  return (
    <>
      <div className={classes.destYoutube}>
        <iframe
          className=""
          src={urlVideo}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video"
        />
      </div>
      <div className={classes.listItemText}>
        <div className={classes.listBorder}>
          <h2 className={classes.listItemTitleDest}>{title}</h2>
        </div>
      </div>
    </>
  )
}

const YoutubeVideoNoDestacado = ({ image, title, liveStory }) => {
  const imageclass =
    image.default === false ? classes.listItemImg : classes.listItemImgDefault
  return (
    <>
      <img src={image.payload} alt={title} className={imageclass} />
      <div className={classes.listItemInfo}>
        <h2 className={classes.listItemTitle}>{title}</h2>
        {liveStory && <p className={classes.live}>EN VIVO</p>}
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
  autoPlayVideo,
}) => {
  const propsItem = {
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

const ItemVideoCenterDestacado = ({ isAdmin, title, video, autoPlayVideo }) => {
  const [powaAutoPlay, setPowaAutoPlay] = useState(false)

  useEffect(() => {
    // document.addEventListener('powaRender',load)
    window.addEventListener('powaRender', ({ detail: { powa } }) => {
      if (!isAdmin) {
        if (powaAutoPlay || autoPlayVideo) {
          powa.play()
        }

        setPowaAutoPlay(true)
      }
    })
  })
  return (
    <>
      <div
        // className={classes.listItemDest}
        dangerouslySetInnerHTML={{ __html: video.payload }}
      />
      <div className={classes.listItemText}>
        <div className={classes.listBorder}>
          <h2 className={classes.listItemTitleDest}>{title}</h2>
        </div>
      </div>
      {/*  {liveStory && <p className={classes.live}>EN VIVO</p>} */}
    </>
  )
}

const ItemVideoCenterNoDestacado = ({ liveStory, image, title, time }) => {
  return (
    <>
      <img className={classes.listItemImg} src={image.payload} alt={title} />
      <span className={classes.listItemTime}>{time}</span>
      <div className={classes.listItemInfo}>
        <h2 className={classes.listItemTitle}>{title}</h2>
        {liveStory && <p className={classes.live}>EN VIVO</p>}
      </div>
    </>
  )
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
