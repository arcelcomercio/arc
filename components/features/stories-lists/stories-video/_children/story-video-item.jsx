import React from 'react'

const StoriesListStoryVideoItem = ({
  index = 0,
  url = '',
  content: { title = '', multimediaValue = {} } = {},
}) => {
  console.log(multimediaValue)
  return <div>{`${index} - ${url} - ${title}`}</div>
}

export default StoriesListStoryVideoItem
