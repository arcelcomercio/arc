import React from 'react'

const ExtraordinayStoryGridSectionItem = props => {
  const classes = {
    itemContainer: 'sections-grid-item p-10',
    imageContainer: 'sections-grid-item__image-container overflow-hidden',
    image: 'w-full',
    title: 'sections-grid-item__title text-left text-sm text-white',
  }
  const { data, path } = props
  return (
    <div className={classes.itemContainer}>
      <a href={`${path}${data.id}`}>
        <figure className={classes.imageContainer}>
          <img className={classes.image} src={data.image} alt={data.name} />
        </figure>
        <p className={classes.title}>{data.name}</p>
      </a>
    </div>
  )
}

export default ExtraordinayStoryGridSectionItem
