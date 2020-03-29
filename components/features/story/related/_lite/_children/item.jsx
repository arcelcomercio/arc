import React from 'react'

import UtilListKey from '../../../../../utilities/list-keys'
import { IMAGE } from '../../../../../utilities/constants/multimedia-types'
import { getResizedUrl } from '../../../../../utilities/resizer'
import StoryData from '../../../../../utilities/story-data'

// Basic flex stuff
const classes = {
  item: 'st-rel__item',
  link: 'st-rel__link f',
  multimedia: 'st-rel__multimedia pos-rel',
  image: 'st-rel__img',
  icon: 'st-rel__icon pos-abs',
  text: 'st-rel__txt',
}

const getIcon = type => {
  switch (type) {
    case 'basic_gallery':
      return (
        <svg
          className={classes.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="46"
          height="46"
          viewBox="0 0 46 46">
          <path d="M7.1 30.8V11.1H4C1.8 11.1 0 12.9 0 15.1v26.7c0 2.2 1.8 4.1 4 4.1h26.7c2.2 0 4.1-1.8 4.1-4.1v-2.9H15.2C10.7 38.9 7.1 35.3 7.1 30.8z" />
          <path d="M41.9 0.1H15.2c-2.2 0-4.1 1.8-4.1 4.1v26.7c0 2.2 1.8 4.1 4.1 4.1h26.7c2.2 0 4.1-1.8 4.1-4.1V4.1C46 1.9 44.2 0.1 41.9 0.1zM41.4 28.6c-0.2 0.4-0.7 0.7-1.1 0.7H17.3c-0.4 0-0.8-0.2-1-0.5 -0.2-0.3-0.3-0.7-0.2-1.1l3.3-10.8c0.2-0.7 0.8-1.2 1.6-1.4 0.7-0.1 1.5 0.2 1.9 0.8l4.6 6.4c0.6 0.9 1.8 1.1 2.7 0.5l4.2-2.9c0.4-0.3 1-0.4 1.5-0.3 0.5 0.1 1 0.4 1.3 0.8l4.2 6.5C41.6 27.7 41.6 28.2 41.4 28.6z" />
        </svg>
      )

    case 'basic_video':
      return (
        <svg
          className={classes.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="46"
          height="46"
          viewBox="0 0 46 46">
          <path d="M229.5 0C102.8 0 0 102.8 0 229.5S102.8 459 229.5 459 459 356.2 459 229.5 356.2 0 229.5 0zM310.3 239.7l-111.8 76.1c-3.8 2.6-8.6 2.8-12.7 0.7 -4-2.1-6.5-6.3-6.5-10.9V153.4c0-4.5 2.5-8.7 6.5-10.9 4-2.1 8.9-1.9 12.7 0.7l111.8 76.1c3.4 2.3 5.4 6.1 5.4 10.2C315.7 233.6 313.7 237.4 310.3 239.7z" />
        </svg>
      )

    default:
      return ''
  }
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

          {filterData.type === IMAGE || filterData.type === ''
            ? getIcon('basic_gallery')
            : ''}
        </figure>
        <h2 className={classes.text}>{filterData.title}</h2>
      </a>
    </article>
  )
}

export default RenderRelatedContentElement
