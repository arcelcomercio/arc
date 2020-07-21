import React from 'react'
import { formatDateLocalTimeZone } from '../../../../utilities/helpers'

const classes = {
  box: 'stories-list-correction__box mb-20 bt-20 p-20',
  title: 'stories-list-correction__title pb-15',
  content: 'stories-list-correction__content',
  time: 'stories-list-correction__time block pb-15',
}

const StoriesListsCardChildItem = ({
  websiteLink,
  title,
  contentElementsCorrectionList = [],
  displayDate,
}) => {
  return (
    <>
      {contentElementsCorrectionList.map(({ text, _id }) => {
        const time = formatDateLocalTimeZone(displayDate)
        return (
          <div key={_id} className={classes.box}>
            <a itemProp="url" href={websiteLink}>
              <h3 itemProp="name" className={classes.title}>
                {title}
              </h3>
            </a>
            <div className={classes.content}>
              <time className={classes.time}>{time}</time>
              {text}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default StoriesListsCardChildItem
