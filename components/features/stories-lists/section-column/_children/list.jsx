import React from 'react'
import StoriesListCardChildItem from './item'
import StoryData from '../../../../utilities/story-data'
import { createResizedParams } from '../../../../utilities/resizer/resizer'

const classes = {
  list: 'sec-col__list bg-white h-full',
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

  const getMultimedia = () => {
    const { landscape_md: landscapeMd } =
      createResizedParams({
        url: Story.multimedia,
        presets: 'landscape_md:314x157',
        arcSite,
      }) || {}
    return landscapeMd
  }

  return (
    <div role="list" className={classes.list}>
      {listNews.map((el, index) => {
        Story.__data = el
        const params = {
          key: Story.websiteLink,
          seeImageNews: index === 0 && true,
          title: Story.title,
          urlNews: Story.websiteLink,
          multimedia: isAdmin ? Story.multimediaLandscapeMD : getMultimedia(),
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
