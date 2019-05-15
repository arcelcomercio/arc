import React from 'react'

const ExtraordinayStoryGridArticleItem = props => {
  const classes = {
    itemContainer: 'stories-grid-item',
    image: 'full-width',
    title: 'stories-grid-item__title text-left',
  }
  const {
    urlNote = '#',
    urlImage = 'http://peru21.pe/img/p21tv/21noticias.jpg',
    title = '',
  } = props
  return (
    <div className={classes.itemContainer}>
      <a href={urlNote}>
        <img className={classes.image} src={urlImage} alt={title} />
        <p className={classes.title}>{title}</p>
      </a>
    </div>
  )
}

export default ExtraordinayStoryGridArticleItem
