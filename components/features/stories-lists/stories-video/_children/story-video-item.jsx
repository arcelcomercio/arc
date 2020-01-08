/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
import { msToTime } from '../../../../utilities/helpers'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../../utilities/constants'

const classes = {
  listItemDest: 'stories-video__item-dest w-full',
  listItemText: 'pt-20 pl-20 pr-20 pb-10 w-full',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  liveVideo: 'stories-video__live-video text-white position-absolute',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  listItem:
    'stories-video__item w-full p-20 flex justify-between position-relative cursor-pointer',
  listItemTitle: 'stories-video__item-title text-white mb-10',
  listItemInfo: 'stories-video__item-text text-white',
  listItemImg:
    'stories-video__item-img w-full h-full object-cover object-center mr-15',
  listItemTime:
    'stories-video__item-time position-absolute icon-video text-white flex justify-center items-center',
  live: 'stories-video__item-live flex items-center uppercase',
  destYoutube: 'stories-video__ position-relative',
}

const YoutubeVideoDestacado = ({ title, video, liveStory }) => {
  const [youtubeAutoPlay, setYoutubeAutoPlay] = useState('')

  useEffect(() => {
    // document.addEventListener('powaRender',load)
    if (youtubeAutoPlay === '') {
      setYoutubeAutoPlay('?autoplay=0')
    } else {
      setYoutubeAutoPlay('?autoplay=1')
    }
  }, [youtubeAutoPlay])

  return (
    <>
      <div className={classes.destYoutube}>
        <iframe
          className=""
          src={`https://www.youtube.com/embed/${
            video.payload
          }${youtubeAutoPlay}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video"
        />
        {liveStory && <p className={classes.liveVideo}>EN VIVO</p>}
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
  return (
    <>
      <img src={image.payload} alt={title} className={classes.listItemImg} />
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

const ItemVideoCenterDestacado = ({ title, video, liveStory }) => {
  const [powaAutoPlay, setPowaAutoPlay] = useState(false)

  useEffect(() => {
    // document.addEventListener('powaRender',load)
    window.addEventListener('powaRender', ({ detail: { powa } }) => {
      if (powaAutoPlay) {
        powa.play()
      }

      setPowaAutoPlay(true)
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
