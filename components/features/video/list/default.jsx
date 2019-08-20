import React from 'react'

import VideoListItem from './_children/item'

const VideoList = () => {
  return (
    <div className="flex justify-center md:justify-between flex-wrap">
      <VideoListItem />
      <VideoListItem />
      <VideoListItem />
      <VideoListItem />
    </div>
  )
}

export default VideoList
