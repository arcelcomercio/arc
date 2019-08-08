import React from 'react'
import Icon from '../../../../global-components/multimedia-icon'

const CardMostReadChildItem = props => {
  const { item, viewImage, isAdmin } = props
  const { websiteUrl, imageUrl, lazyImage, title, storyType } = item

  const classes = {
    item: `most-read-item block border-solid border-b-1 border-base mr-20 ml-20`,
    article: `most-read-item__article flex pt-15 pb-15`,
    figure: `most-read-item__figure flex justify-center items-center w-full h-full overflow-hidden position-relative mr-15`,
    img: 'most-read-item__img w-inherit h-inherit object-cover object-center',
    icon: 'most-read-item__icon',
    title: `most-read-item__detail w-full overflow-hidden text-gray-300 line-h-sm`,
    numLines: 'three-lines',
  }

  if (viewImage) classes.numLines = 'four-lines'

  return (
    <a href={websiteUrl} className={classes.item}>
      <article role="listitem" className={classes.article}>
        {viewImage && (
          <figure className={classes.figure}>
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
              src={isAdmin ? imageUrl : lazyImage}
              data-src={imageUrl}
              alt={title}
              
            />
            <Icon type={storyType} iconClass={classes.icon} />
          </figure>
        )}
        <h4 className={`${classes.title} ${classes.numLines}`}>{title}</h4>
      </article>
    </a>
  )
}

export default CardMostReadChildItem
