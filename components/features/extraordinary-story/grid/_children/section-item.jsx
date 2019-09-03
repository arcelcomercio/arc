import React from 'react'

const ExtraordinayStoryGridSectionItem = props => {
  const classes = {
    itemContainer: 'sections-grid-item p-10',
    imageContainer: 'sections-grid-item__image-container overflow-hidden',
    image: 'w-full h-full object-cover',
    title: 'sections-grid-item__title text-left text-sm text-white',
  }
  const { data, isAdmin } = props
  return (
    <div role="listitem" className={classes.itemContainer}>
      <a href={data.id}>
        <figure className={classes.imageContainer}>
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
            alt={data.name}
            src={isAdmin ? data.imageLandscapeS : data.imageLazyDefault}
            data-src={data.imageLandscapeS}
          />
        </figure>
        <p className={classes.title}>{data.name}</p>
      </a>
    </div>
  )
}

export default ExtraordinayStoryGridSectionItem
