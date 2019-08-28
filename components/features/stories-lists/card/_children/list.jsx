import React from 'react'
import StoriesListCardChildItem from './item'
import StoryData from '../../../../utilities/story-data'
import { formatDateLocalTimeZone } from '../../../../utilities/helpers'

const classes = {
  list: 'stories-l-card__list bg-white overflow-y-auto pr-20 pl-20',
}

const StoriesListsCardChildList = ({
  seeHour,
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
      {listNews.map((el, index) => {
        Story.__data = el
        // const data = Story.attributesRaw

        const params = {
          key: Story.websiteLink,
          seeHour,
          seeImageNews:
            seeImageNews === true && index === 0 /* ? true : false */,
          time: formatDateLocalTimeZone(Story.displayDate),
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

export default StoriesListsCardChildList
