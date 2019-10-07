import React from 'react'
import Multimedia from './multimedia'

const classes = {
  story: `stories-l-item flex flex-col w-auto pt-10 pb-10 border-b-1 border-solid border-gray`,
  time: 'stories-l-item__time text-md line-h-sm mr-10',
  linkBox: 'stories-l-item__link-box flex flex-col text-gray-300',
  link: 'stories-l-item__link bold m-0 text-md text-gray-300 line-h-sm',
  boxNew: 'flex flex-row',
}

export default ({
  storyNumber,
  storyIndex,
  seeImageNews,
  title,
  urlNews,
  multimedia,
  lazyImage,
  multimediaType,
  isAdmin,
}) => {
  return (
    <article role="listitem" className={classes.story}>
      <div className={classes.linkBox}>
        <a href={urlNews} title={title}>
          <h3 className={classes.link}>
            {storyNumber && (
              <span className={classes.time}>-{storyIndex}-</span>
            )}
            <div className={classes.boxNew}>
              {seeImageNews && (
                <Multimedia
                  {...{
                    urlNews,
                    multimedia,
                    lazyImage,
                    multimediaType,
                    isAdmin,
                  }}
                />
              )}
              {title}
            </div>
          </h3>
        </a>
      </div>
    </article>
  )
}
