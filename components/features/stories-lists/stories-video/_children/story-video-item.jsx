import React from 'react'

const StoriesListStoryVideoItem = ({ index = 0, url = '' }) => {
  return <div>{`${index} - ${url}` }</div>
}

export default StoriesListStoryVideoItem
