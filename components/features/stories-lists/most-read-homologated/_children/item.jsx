import React from 'react'
import { getMultimediaIcon } from '../../../../utilities/helpers'

const classes = {
  story: `most-read-premium-item flex flex-col w-auto pt-10 pb-10 border-b-1 border-solid border-gray`,
  time: 'most-read-premium-item__time text-md line-h-sm mr-10',
  linkBox: 'most-read-premium-item__link-box flex flex-row text-gray-300',
  link:
    'most-read-premium-item__link flex bold m-0 text-md text-gray-300 line-h-sm',
  boxNew: 'flex flex-row',
  figure:
    'most-read-premium-item__image mr-10 position-relative overflow-hidden',
  icon:
    'position-absolute text-center most-read-premium-item__icon mx-auto rounded text-gray-100',
  image: 'w-full h-full object-center object-cover',
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
        {storyNumber && <span className={classes.time}>-{storyIndex}-</span>}

        <div className={classes.boxNew}>
          {seeImageNews && (
            <figure className={classes.figure}>
              {getMultimediaIcon(multimediaType) && (
                <i
                  className={`${getMultimediaIcon(multimediaType)} ${
                    classes.icon
                  }`}
                />
              )}

              {multimedia && (
                <a href={urlNews}>
                  <picture>
                    <img
                      className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
                      src={isAdmin ? multimedia : lazyImage}
                      data-src={multimedia}
                      alt={title}                      
                    />
                  </picture>
                </a>
              )}
            </figure>
          )}
          <a href={urlNews}>
            <h3 className={classes.link}>{title}</h3>
          </a>
        </div>
      </div>
    </article>
  )
}
