import React from 'react'
import StoriesListCardChildItem from './item'
import StoryData from '../../../../utilities/story-data'

const classes = {
  list:
    'most-read-homologated-card__list bg-white overflow-y-auto pt-10 pb-10 pl-20 pr-20',
}

export default ({
  storyNumber,
  seeImageNews,
  listNews,
  deployment,
  arcSite,
  contextPath,
}) => {
  const Story = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <div role="list" className={classes.list}>
      {listNews &&
        listNews.map((el, index) => {
          Story.__data = el
          // const data = Story.attributesRaw
          const params = {
            key: Story.websiteLink,
            storyNumber,
            storyIndex: Number(index + 1),
            seeImageNews,
            title: Story.title,
            urlNews: Story.websiteLink,
            multimedia: Story.multimedia,
            multimediaType: Story.multimediaType,
            arcSite,
          }

          return <StoriesListCardChildItem {...params} />
        })}
    </div>
  )
}
