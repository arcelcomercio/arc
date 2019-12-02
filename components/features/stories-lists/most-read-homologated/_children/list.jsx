import React from 'react'
import StoriesListCardChildItem from './item'
import StoryData from '../../../../utilities/story-data'

const classes = {
  list:
    'most-read-homologated-card__list stories-l-card__list bg-white overflow-y-auto',
}

export default ({
  storyNumber,
  seeImageNews,
  listNews,
  deployment,
  arcSite,
  contextPath,
  isAdmin,
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
            multimedia: Story.multimediaLandscapeMD,
            lazyImage: Story.multimediaLazyDefault,
            multimediaType: Story.multimediaType,
            isAdmin,
          }

          return <StoriesListCardChildItem {...params} />
        })}
    </div>
  )
}
