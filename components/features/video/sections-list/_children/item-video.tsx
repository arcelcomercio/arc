import React from 'react'
import { FC } from 'types/features'

import Image from '../../../../global-components/image'
import StoryData from '../../../../utilities/story-data'

interface Props {
  story?: object
  index?: number
  arcSite?: string
  contextPath?: string
  deployment?: () => boolean
}

const classes = {
  wrapper: 'video-categories-list__section__item__wrapper',
  image: 'video-categories-list__section__item__image',
  duration: 'video-categories-list__section__item__duration',
  title: 'video-categories-list__section__item__title',
}

const ItemVideo: FC<Props> = ({
  story,
  index,
  arcSite,
  contextPath,
  deployment,
}) => {
  const Story = new StoryData({
    data: {},
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  Story.__data = story

  const link = `${Story.websiteLink}?ref=landingvideos&pos=${index + 1}`

  return (
    <div className={classes.wrapper}>
      <a
        itemProp="url"
        className="play-list__image-box"
        href={Story.websiteLink}>
        <Image
          src={Story.multimediaLandscapeMD}
          width={225}
          height={0}
          alt={Story.title}
          className={classes.image}
          loading="lazy"
          sizes="(max-width: 276px) 276px"
          clientResize
        />

        {!(
          Story.videoDuration === '00:00' || Story.videoDuration === '00:00:00'
        ) && <span className={classes.duration}>{Story.videoDuration}</span>}
      </a>
      <h3 itemProp="name" className={classes.title}>
        <a itemProp="url" href={Story.websiteLink}>
          {Story.title}
        </a>
      </h3>
    </div>
  )
}

ItemVideo.label = 'Video de listado de secciones'

export default ItemVideo
