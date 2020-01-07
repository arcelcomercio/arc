import React, { useEffect } from 'react'
import { msToTime } from '../../../../utilities/helpers'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../../utilities/constants'

const classes = {
  listItemDest: 'stories-video__item-dest w-full',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  listItemDestPicture: 'stories-video__item-dest-picture position-relative',
  listItem: 'stories-video__item w-full p-20',
  listItemTitle: 'stories-video__item-title text-white',
  listItemImg:
    'stories-video__item-img w-full h-full object-cover object-center',
  listItemTime: 'stories-video__item-time position-absolute',
}
const YoutubeVideo = ({
  index,
  liveStory,
  title = '',
  image = {},
  video = {},
}) => {
  return (
    <div className={classes.listItemDest}>
      {index === 0 ? (
        <iframe
          className=""
          src={`https://www.youtube.com/embed/${video.payload}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video"
        />
      ) : (
        <div className={classes.listItemDestPicture}>
          <img
            src={image.payload}
            alt={title}
            className={classes.listItemImgDest}
          />
        </div>
      )}

      <span className={classes.listItemTitleDest}>{title}</span>
      {liveStory && <span>EN VIVO</span>}
    </div>
  )
}

const VideoCenterItem = ({
  index,
  liveStory,
  title = '',
  image = {},
  video = {},
  videoTime,
}) => {
  const time = msToTime(videoTime)
  return (
    <div className={classes.listItem}>
      {index === 0 ? (
        <>
          {/* <script src="//d1tqo5nrys2b20.cloudfront.net/prod/powaBoot.js?org=elcomercio"></script> */}
          <div dangerouslySetInnerHTML={{ __html: video.payload }} />
        </>
      ) : (
        <div>
          <img
            className={classes.listItemImg}
            src={image.payload}
            alt={title}
          />
          <span className={classes.listItemTime}>{time}</span>
        </div>
      )}

      <div>
        <span className={classes.listItemTitle}>{title}</span>
        {liveStory && <span>EN VIVO</span>}
      </div>
    </div>
  )
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
      resultItemVideo = <VideoCenterItem {...paramsItem} />
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
