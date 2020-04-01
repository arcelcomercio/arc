import React from 'react'
import MultimediaIcon from '../../../../../global-components/lite/multimedia-icon'

const CardMostReadChildItem = props => {
  const { item, viewImage, isAdmin } = props
  const { websiteUrl, imageUrl, lazyImage, title, storyType } = item

  const classes = {
    item: `most-read__item `,
    link: `most-read__link f`,
    figure: `most-read__multimedia f pos-rel`,
    img: 'most-read__img ',
    icon: 'most-read__icon',
    title: `most-read__txt w-full `,
    numLines: 'three-lines',
  }

  if (viewImage) classes.numLines = 'four-lines'

  return (
    <article role="listitem" className={classes.item}>
      <a href={websiteUrl} className={classes.link}>
        {viewImage && (
          <figure className={classes.figure}>
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
              src={isAdmin ? imageUrl : lazyImage}
              data-src={imageUrl}
              alt={title}
            />
            <MultimediaIcon type={storyType} />
          </figure>
        )}
        <h4 className={`${classes.title} ${classes.numLines}`}>{title}</h4>
      </a>
    </article>
  )
}

export default CardMostReadChildItem
