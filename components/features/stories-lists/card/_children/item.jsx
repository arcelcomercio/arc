import React from 'react'
import Multimedia from './multimedia'

const classes = {
  story:
    'stories-l-item flex flex-col w-auto pt-20 pb-20 border-b-1 border-solid border-gray',
  time:
    'stories-l-item__time flex justify-center flex-col text-gray-300 text-md line-h-sm',
  linkBox: 'stories-l-item__link-box flex flex-col',
  link: 'stories-l-item__link bold m-0 text-md text-gray-300 line-h-sm',
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
    <article role="listitem" className={classes.story}>
      {seeImageNews && (
        <Multimedia
          urlNews={urlNews}
          multimedia={multimedia}
          multimediaType={multimediaType}
        />
      )}
      {seeHour && <div className={classes.time}>{time}</div>}
      <div className={classes.linkBox}>
        <a href={urlNews}>
          <h3 className={classes.link}>{title}</h3>
        </a>
      </div>
    </article>
  )
}

export default StoriesListsCardChildItem
