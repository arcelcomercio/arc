import React from 'react'
import Multimedia from './multimedia'

const classes = {
  story: `stories-l-item flex flex-col w-auto pt-10 pb-10`,
  wrapper: `pr-20 pl-20`,
  time: 'stories-l-item__time text-md line-h-sm mr-5',
  linkBox:
    'stories-l-item__link-box flex flex-col text-gray-300 border-b-1 border-dashed border-gray pb-10 ',
  link: 'stories-l-item__link mb-15 text-gray-300 line-h-sm font-bold',
  autorLink: 'stories-l-item__autor text-gray-200 ',
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

      <div className={classes.wrapper}>
        <div className={classes.linkBox}>
          <a href={urlNews} title={title}>
            <h3 className={classes.link}>{title}</h3>
          </a>
          <span>
            <a className={classes.autorLink} href={urlAutor}>
              {author}
            </a>
          </span>
        </div>
      </div>
    </article>
  )
}

export default StoriesListsCardChildItem
