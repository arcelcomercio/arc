import React from 'react'
import Multimedia from './multimedia'

const classes = {
  story: `stories-l-item flex flex-col w-auto pt-10 pb-10 border-b-1 border-solid border-gray`,
  time: 'stories-l-item__time text-md line-h-sm mr-5',
  linkBox: 'stories-l-item__link-box flex flex-col text-gray-300',
  link: 'stories-l-item__link bold m-0 text-md text-gray-300 line-h-sm',
}

const StoriesListsCardChildItem = ({
  seeImageNews,
  title,
  urlNews,
  multimedia,
  lazyImage,
  multimediaType,
  isAdmin,
  author,
  urlAutor,
}) => {
  return (
    <article role="listitem" className={classes.story}>
      {seeImageNews && (
        <Multimedia
          {...{ urlNews, multimedia, lazyImage, multimediaType, isAdmin }}
        />
      )}

      <div className={classes.linkBox}>
        <a href={urlNews} title={title}>
          <h3 className={classes.link}>{title}</h3>
        </a>
      </div>
      <span>
        <a href={urlAutor}>{author}</a>
      </span>
    </article>
  )
}

export default StoriesListsCardChildItem
