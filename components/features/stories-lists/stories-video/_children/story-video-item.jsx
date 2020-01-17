/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
import { msToTime } from '../../../../utilities/helpers'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../../utilities/constants'

// subcomponents
import YoutubeVideoNoDestacado from './youtube-video-unpromoted'
import YoutubeVideoDestacado from './youtube-video-promoted'
import ItemVideoCenterNoDestacado from './powa-video-unpromoted'


const classes = {
  listItemDest: 'stories-video__item-dest w-full',
  listItemText: 'pt-20 pl-20 pr-20 pb-10 w-full',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  listItem:
    'stories-video__item w-full p-10 flex justify-between position-relative cursor-pointer',
  listItemTitle: 'stories-video__item-title text-white mb-10',
  listItemInfo: 'stories-video__item-text text-white',
  listItemImg:
    'stories-video__item-img w-full h-full object-cover object-center mr-15',
  listItemImgDefault:
    'stories-video__item-default w-full h-full object-cover object-center mr-15',
  listItemTime:
    'stories-video__item-time position-absolute icon-video text-white flex justify-center items-center',
  live: 'stories-video__item-live flex items-center uppercase',
  destYoutube: 'stories-video__youtube position-relative',
  liveYoutube:
    'stories-video__youtube-live flex items-center justify-center position-absolute',
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

const ItemVideoCenterDestacado = ({
  isAdmin,
  title,
  video,
  autoPlayVideo,
  isPreviewYoutubeVideo,
}) => {
  // onePlayFlag se usa para no dar play varias veces por los rerenderizados por el state
  const [onePlayFlag, setonePlayFlag] = useState(0)
  // const [prevYoutube, setPrevYoutube] = useState(isPreviewYoutubeVideo)

  // logica de reproduccion
  // window.addEventListener('powaRender', event => {
  window.addEventListener('powaRender', event => {
    const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      window.navigator.userAgent
    )

    const {
      detail: { powa },
    } = event

    // if (isPreviewYoutubeVideo && !prevYoutube && powa && powa.destroy) {
    //   // powa.pause
    //   powa.destroy()
    //   setPrevYoutube(false)
    // }
    // window.addEventListener('play',(evento)=>{
    //   debugger
    //   console.log("hola mundo")
    // })

    if (
      !isMobile &&
      !isAdmin &&
      autoPlayVideo &&
      // onePlayFlag &&
      powa &&
      powa.play
      // isPreviewYoutubeVideo === false
    ) {
      if (onePlayFlag === 0) {
        powa.play()

        setonePlayFlag(onePlayFlag + 1)
      } else {
        powa.pause()
        setonePlayFlag(onePlayFlag + 1)
      }

    }
  })

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: video.payload }} />
      <div className={classes.listItemText}>
        <div className={classes.listBorder}>
          <h2 className={classes.listItemTitleDest}>{title}</h2>
        </div>
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
  isPreviewYoutubeVideo,
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
    isPreviewYoutubeVideo,
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
    isPreviewYoutubeVideo = false,
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
    isPreviewYoutubeVideo,
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

export default StoriesListStoryVideoItem

// window.addEventListener('play', event => {
//   debugger
// })

// window.addEventListener('pause', event => {
//   debugger
//   console.log('pause')
// })

// window.addEventListener('powaReady', event => {
//   // event.detail.id

//   console.log('playbackPaused')
// })

// window.addEventListener('play', event => {
//   debugger
// })

// window.addEventListener('pause', event => {
//   debugger
//   console.log('pause')
// })

// window.addEventListener('mouse', event => {
//   debugger
//   console.log('mouse')
// })

// window.addEventListener('muted', event => {
//   debugger
//   console.log('muted')
// })
