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
}) => {
  const elementFormatter = new StoryData({ deployment, arcSite, contextPath })
  return (
    <div role="list" className={classes.list}>
      {listNews.map((el, index) => {
        elementFormatter.__data = el
        const data = elementFormatter.attributesRaw
        const displayTime = formatDateLocalTimeZone(data.displayDate)

        return (
          <StoriesListCardChildItem
            key={data.link}
            seeHour={seeHour}
            seeImageNews={
              seeImageNews === true && index === 0 /* ? true : false */
            }
            time={displayTime}
            title={data.title}
            urlNews={data.link}
            multimedia={data.multimediaLandscapeMD}
            multimediaType={data.multimediaType}
          />
        )
      })}
    </div>
  )
}

export default StoriesListsCardChildList
