import React, { useEffect } from 'react'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../../utilities/constants'

const classes = {
  listItemDestacado: 'stories-video__item-dest w-full',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  listItem: 'stories-video__item w-full p-20',
  listItemTitle: 'stories-video__item-title text-white',
  listItemImg: 'stories-video__item-img',
}
const YoutubeVideo = ({ index, title = '', image = {}, video = {} }) => {
  return (
    <div className={classes.listItem}>
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
        <img src={image.payload} alt={title} className={classes.listItemImg} />
      )}

      <span className={classes.listItemTitle}>{title}</span>
    </div>
  )
}

const VideoCenterItem = ({ index, title = '', image = {}, video = {} }) => {
  return (
    <div className={classes.listItemDestacado}>
      {index === 0 ? (
        <>
          <script src="//d1tqo5nrys2b20.cloudfront.net/prod/powaBoot.js?org=elcomercio" />
          <div
            style={{ height: 200, width: 200 }}
            dangerouslySetInnerHTML={{ __html: video.payload }}
          />
        </>
      ) : (
        <img src={image.payload} alt={title} />
      )}

      <span className={classes.listItemTitleDest}>{title}</span>
    </div>
  )
}

const StoriesListStoryVideoItem = ({
  index = 0,
  content: { title = '', image = '', video = {} } = {},
  StoryItemHandleClick,
}) => {
  // console.log(multimediaValue)
  const paramsItem = {
    index,
    title,
    image,
    video,
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
