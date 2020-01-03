import React from 'react'
import { VIDEO } from '../../../../utilities/constants'

const YoutubeVideo = ({ title = '', multimediaValue = '' }) => {
  return (
    <div>
      <iframe
        className=""
        src={`https://www.youtube.com/embed/${multimediaValue.payload}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video"
      />
      <span>{title}</span>
    </div>
  )
}

const VideoCenterItem = ({ title = '', multimediaValue = '' }) => {
  return (
    
    <div>
      <div
        style={{ height: 200, width: 200 }}
        dangerouslySetInnerHTML={{ __html: multimediaValue.payload }}
      />
      <span className="">{title}</span>
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
    title,
    image,
    video,
  }
  debugger
  return (
    <div onClick={() => StoryItemHandleClick(index)}>
      {video.type === VIDEO ? (
        <VideoCenterItem {...paramsItem} />
      ) : (
        <YoutubeVideo {...paramsItem} />
      )}
    </div>
  )
}

export default StoriesListStoryVideoItem
