import React from 'react'

import VideoListItem from './_children/item'

const VideoList = () => {
  return (
    <div className="flex justify-center md:justify-between mt-50 flex-wrap">
      <VideoListItem />
      <VideoListItem />
      <VideoListItem />
      <VideoListItem />
    </div>
  )
}

VideoList.label = 'Video - Lista'
export default VideoList
