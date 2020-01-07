import React, { useEffect } from 'react'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../../utilities/constants'

const YoutubeVideo = ({
  index,
  liveStory,
  title = '',
  image = {},
  video = {},
}) => {
  return (
    <div>
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
        <img src={image.payload} alt={title} />
      )}

      <span>{title}</span>
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
}) => {
  return (
    <div>
      {index === 0 ? (
        <>
          <script src="//d1tqo5nrys2b20.cloudfront.net/prod/powaBoot.js?org=elcomercio"></script>
          <div
            style={{ height: 200, width: 200 }}
            dangerouslySetInnerHTML={{ __html: video.payload }}
          />
        </>
      ) : (
        <img src={image.payload} alt={title} />
      )}

      <span className="">{title}</span>
      {liveStory && <span>EN VIVO</span>}
    </div>
  )
}

const StoriesListStoryVideoItem = ({
  index = 0,
  liveStory = false,
  content: { title = '', image = '', video = {} } = {},
  StoryItemHandleClick,
}) => {
  // console.log(multimediaValue)
  const paramsItem = {
    index,
    liveStory,
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
