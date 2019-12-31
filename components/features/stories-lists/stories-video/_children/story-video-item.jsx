import React from 'react'

const StoriesListStoryVideoItem = ({
  index = 0,
  content: { title = '', multimediaValue = {} } = {},
}) => {
  console.log(multimediaValue)
  return <div>{`${index} - ${title}`}</div>
}

export default StoriesListStoryVideoItem
