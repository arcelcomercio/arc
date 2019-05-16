import React from 'react'

const classes = {
  itemContainer: 'stories-grid-item',
  imageContainer: 'stories-grid-item__image-container',
  image: 'full-width',
  title: 'stories-grid-item__title text-left',
}

const ExtraordinayStoryGridSectionItem = ({ data }) => {
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
