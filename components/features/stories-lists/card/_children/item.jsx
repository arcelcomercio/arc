import React from 'react'
import Multimedia from './multimedia'

const classes = {
  story:
    'stories-list-card__story bg-white flex flex-col w-auto p-20 border-b-1 border-solid',
  time:
    'stories-list-card__time flex justify-center flex-col text-gray-300 text-lg line-h-sm',
  pageLink: 'stories-list-card__page-link-container flex flex-col',
  textLink:
    'stories-list-card__text-link bold m-0 text-md text-gray-300 line-h-xs',
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
