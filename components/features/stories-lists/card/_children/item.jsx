import React from 'react'
import Multimedia from './multimedia'

const classes = {
  story: 'stories-list-card__story flex flex-col',
  time: 'stories-list-card__time flex justify-center flex-col',
  pageLink: 'stories-list-card__page-link-container flex flex-col',
  textLink: 'stories-list-card__text-link bold',
}

const StoriesListsCardChildItem = ({
  seeHour,
  seeImageNews,
  time,
  title,
  urlNews,
  multimedia,
  multimediaType,
}) => {
  return (
    <article className={classes.story}>
      {seeImageNews && (
        <Multimedia
          urlNews={urlNews}
          multimedia={multimedia}
          multimediaType={multimediaType}
        />
      )}
      {seeHour && <div className={classes.time}>{time}</div>}
      <div className={classes.pageLink}>
        <a href={urlNews}>
          <h3 className={classes.textLink}>{title}</h3>
        </a>
      </div>
    </article>
  )
}

export default StoriesListsCardChildItem
