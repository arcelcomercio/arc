import React from 'react'
import StoriesListCardChildItem from './item'
import StoryData from '../../../../utilities/story-data'

const classes = {
  list: 'stories-l-card__list bg-white overflow-y-auto h-full',
}

const StoriesListsCardChildList = ({
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
      {listNews.map((el, index) => {
        Story.__data = el
        const params = {
          key: Story.websiteLink,
          seeImageNews: index === 0 && true,
          title: Story.title,
          urlNews: Story.websiteLink,
          multimedia: Story.multimediaLandscapeMD,
          lazyImage: Story.multimediaLazyDefault,
          multimediaType: Story.multimediaType,
          isAdmin,
          author: Story.author,
          urlAutor: Story.authorLink,
        }

        return <StoriesListCardChildItem {...params} />
      })}
    </div>
  )
}

export default StoriesListsCardChildList
