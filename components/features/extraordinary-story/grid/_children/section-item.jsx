import React from 'react'

const ExtraordinayStoryGridArticleItem = props => {
  const classes = {
    itemContainer: 'stories-grid-item',
    imageContainer: 'stories-grid-item__image-container',
    image: 'full-width',
    title: 'stories-grid-item__title text-left',
  }
  const {
    _id: urlNote = '#',
    site_topper: {
      site_logo_image: urlImage = '',
    } = 'http://peru21.pe/img/p21tv/21noticias.jpg',
    name = '',
  } = props
  return (
    <div className={classes.itemContainer}>
      <a href={urlNote}>
        <figure className={classes.imageContainer}>
          <img className={classes.image} src={urlImage} alt={name} />
        </figure>
        <p className={classes.title}>{name}</p>
      </a>
    </div>
  )
}

export default ExtraordinayStoryGridArticleItem
