import React from 'react'

const StoriesListStoryVideoItem = ({
  index = 0,
  content: { title = '', multimediaValue = {} } = {},
  StoryItemHandleClick,
}) => {
  console.log(multimediaValue)
  return (

  <div onClick={()=> StoryItemHandleClick(index)}>
    {`${index} - ${title}`}
  </div>)
}

export default StoriesListStoryVideoItem
