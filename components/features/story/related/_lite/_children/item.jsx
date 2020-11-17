import React from 'react'

import UtilListKey from '../../../../../utilities/list-keys'
import { createResizedParams } from '../../../../../utilities/resizer/resizer'
import StoryData from '../../../../../utilities/story-data'
import MultimediaIcon from '../../../../../global-components/lite/multimedia-icon'
import { SITE_ELCOMERCIO } from '../../../../../utilities/constants/sitenames'

// Basic flex stuff
const classes = {
  item: 'st-rel__item f',
  link: 'st-rel__link ',
  multimedia: 'st-rel__multimedia pos-rel',
  image: 'st-rel__img',
  author: 'st-rel__author',
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
    author: storyData.author,
    authorLink: storyData.authorLink,
    type: storyData.multimediaType,
    image:
      createResizedParams({
        url: storyData.imageUrl,
        presets: 'landscape_sm:200x116',
        arcSite,
      }).landscape_sm || {},
    lazyImage: storyData.multimediaLazyDefault,
  }

  return (
    <article role="listitem" className={classes.item} key={UtilListKey(i + 12)}>
      <div>
        <h2 itemProp="name" className={classes.text}>
          <a itemProp="url" href={filterData.link} className={classes.link}>
            {filterData.title}
          </a>
        </h2>
        {arcSite === SITE_ELCOMERCIO && (
          <a
            itemProp="url"
            className={classes.author}
            href={filterData.authorLink}>
            {filterData.author}
          </a>
        )}
      </div>
      <figure className={classes.multimedia}>
        <a itemProp="url" href={filterData.link} className={classes.link}>
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
            src={isAdmin ? filterData.image : filterData.lazyImage}
            data-src={filterData.image}
            alt={filterData.title}
          />

          <MultimediaIcon type={filterData.type} />
        </a>
      </figure>
    </article>
  )
}

export default RenderRelatedContentElement
