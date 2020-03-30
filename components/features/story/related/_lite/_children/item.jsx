import React from 'react'

import UtilListKey from '../../../../../utilities/list-keys'
import { getResizedUrl } from '../../../../../utilities/resizer'
import StoryData from '../../../../../utilities/story-data'
import MultimediaIcon from '../../../../../global-components/lite/multimedia-icon'

// Basic flex stuff
const classes = {
  item: 'st-rel__item',
  link: 'st-rel__link f',
  multimedia: 'st-rel__multimedia pos-rel',
  image: 'st-rel__img',
  text: 'st-rel__txt',
}

const RenderRelatedContentElement = (props, i) => {
  const { deployment, contextPath, arcSite, isAdmin } = props

  const storyData = new StoryData({
    data: props,
    contextPath,
    deployment,
    arcSite,
    defaultImgSize: 'sm',
  })
  const filterData = {
    title: storyData.title,
    link: storyData.link,
    type: storyData.multimediaType,
    image:
      getResizedUrl({
        url: storyData.imageUrl,
        presets: 'landscape_sm:110x72',
        arcSite,
      }).landscape_sm || {},
    lazyImage: storyData.multimediaLazyDefault,
  }

  return (
    <article role="listitem" className={classes.item} key={UtilListKey(i + 12)}>
      <a href={filterData.link} className={classes.link}>
        <figure className={classes.multimedia}>
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
            src={isAdmin ? filterData.image : filterData.lazyImage}
            data-src={filterData.image}
            alt={filterData.title}
          />
          <MultimediaIcon type={filterData.type} />
        </figure>
        <h2 className={classes.text}>{filterData.title}</h2>
      </a>
    </article>
  )
}

export default RenderRelatedContentElement
