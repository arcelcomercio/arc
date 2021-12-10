import React from 'react'
import { FC } from 'types/features'
import { AppContext, ArcSite } from 'types/fusion'

import { defaultImage } from '../../../../utilities/assets'
import StoryData from '../../../../utilities/story-data'

interface Props {
  arcSite: ArcSite
  story?: any
  index?: number
  contextPath?: AppContext['contextPath']
  deployment?: AppContext['deployment']
}

const classes = {
  wrapper: 'video-categories-list__section__item__wrapper',
  imageWrapper: 'video-categories-list__section__item__image_wrapper',
  image: 'video-categories-list__section__item__image',
  duration: 'video-categories-list__section__item__duration',
  title: 'video-categories-list__section__item__title',
  play: 'video-categories-list__section__item__play',
  icon: 'video-categories-list__section__item__icon-play',
}

const ItemVideo: FC<Props> = ({ story, arcSite, contextPath = '' }) => {
  const Story = new StoryData({
    data: {},
    arcSite,
    contextPath,
  })

  Story.__data = story

  const lazyImg = defaultImage({ contextPath, arcSite })

  return (
    <div className={classes.wrapper}>
      <a
        itemProp="url"
        className={classes.imageWrapper}
        href={Story.websiteLink}>
        <img
          data-src={Story.multimediaLandscapeMD}
          src={lazyImg}
          alt={Story.title}
          className={`${classes.image} lazy`}
        />

        {!(
          Story.videoDuration === '00:00' || Story.videoDuration === '00:00:00'
        ) && <span className={classes.duration}>{Story.videoDuration}</span>}
        {arcSite === 'trome' && (
          <svg
            className={classes.play}
            xmlns="http://www.w3.org/2000/svg "
            viewBox="0 0 112 112">
            <path className={classes.icon} d="M39.67,28V84L86.34,56Z" />
          </svg>
        )}
      </a>
      <h3 itemProp="name" className={classes.title}>
        <a itemProp="url" href={Story.websiteLink}>
          {Story.title}
        </a>
      </h3>
    </div>
  )
}

export default ItemVideo
