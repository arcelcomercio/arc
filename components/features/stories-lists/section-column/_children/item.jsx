import React from 'react'
import Multimedia from './multimedia'

const classes = {
  story: `sec-col__story flex flex-col pb-10 mr-20 ml-20 mb-20 text-gray-300 border-b-1 border-dashed border-gray`,

  link: 'sec-col__link mb-15 text-gray-300 line-h-sm font-bold overflow-hidden',
  autorLink: 'sec-col__author text-gray-200',
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
    <>
      {seeImageNews && (
        <Multimedia
          {...{ urlNews, multimedia, lazyImage, multimediaType, isAdmin }}
        />
      )}
      <article role="listitem" className={classes.story}>
        <a href={urlNews}>
          <h3 className={classes.link}>{title}</h3>
        </a>

        <a className={classes.autorLink} href={urlAutor}>
          {author}
        </a>
      </article>
    </>
  )
}

export default StoriesListsCardChildItem
