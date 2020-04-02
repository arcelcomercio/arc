import React from 'react'
import StoryData from '../../../../utilities/story-data'
import {
  formatDateLocalTimeZone,
  getMultimediaIcon,
} from '../../../../utilities/helpers'

const classes = {
  list: 'stories-l-card__list bg-white overflow-y-auto pr-20 pl-20',

  story: `stories-l-item flex flex-col w-auto pt-10 pb-10 border-b-1 border-solid border-gray`,
  time: 'stories-l-item__time text-md line-h-sm mr-10',
  link: 'stories-l-item__link text-md text-gray-300 line-h-sm',

  figure: 'position-relative mb-10 overflow-hidden',
  icon:
    'position-absolute text-center multimedia__icon mx-auto rounded text-gray-100',
  image: 'stories-l-card__image w-full object-center object-cover',
}

const StoriesListsCardChildList = ({
  seeHour,
  seeImageNews,
  listNews,
  deployment,
  arcSite,
  contextPath,
  isAdmin,
}) => {
  const Story = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })
  return (
    <div role="navigation" className={classes.list}>
      {listNews.map((el, index) => {
        Story.__data = el
        // const data = Story.attributesRaw

        const time = formatDateLocalTimeZone(Story.displayDate)

        const {
          websiteLink,
          title,
          multimediaLandscapeMD,
          multimediaLazyDefault,
          multimediaType,
        } = Story

        return (
          <a href={websiteLink} className={classes.story}>
            {seeImageNews === true && index === 0 && (
              <figure className={classes.figure}>
                {getMultimediaIcon(multimediaType) && (
                  <i
                    className={`${getMultimediaIcon(multimediaType)} ${
                      classes.icon
                    }`}
                  />
                )}

                {multimediaLandscapeMD && (
                  <picture>
                    <img
                      className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
                      src={
                        isAdmin ? multimediaLandscapeMD : multimediaLazyDefault
                      }
                      data-src={multimediaLandscapeMD}
                      alt=""
                    />
                  </picture>
                )}
              </figure>
            )}

            <h3 className={classes.link}>
              {seeHour && <time className={classes.time}>{time}</time>}
              {title}
            </h3>
          </a>
        )
      })}
    </div>
  )
}

export default StoriesListsCardChildList
