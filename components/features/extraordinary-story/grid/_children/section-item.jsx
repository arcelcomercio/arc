import React from 'react'

const ExtraordinayStoryGridSectionItem = props => {
  const classes = {
    itemContainer: 'sections-grid-item',
    imageContainer: 'sections-grid-item__image-container',
    image: 'full-width',
    title: 'sections-grid-item__title text-left',
  }
  const { data } = props
  return (
    <div className={classes.itemContainer}>
      <a href={data.id}>
        <figure className={classes.imageContainer}>
          <img className={classes.image} src={data.image} alt={data.name} />
        </figure>
        <p className={classes.title}>{data.name}</p>
      </a>
    </div>
  )
}

export default ExtraordinayStoryGridSectionItem
