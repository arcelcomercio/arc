import React from 'react'

const classes = {
  // opinionItem: 'separator__opinion--item',
  // opinionItemDetails: 'separator__opinion--item-details',
  // opinionItemImage: 'separator__opinion--item-image',
  // opiniononeline: 'separator__opinion--item-oneline',
  // opiniontwoline: 'separator__opinion--item-twoline',
  // opinionthreeline: 'separator__opinion--item-threeline',

  blogItem: 'item__blog-item',
  blogItemLeft: 'item__blog-item-left',
  blogItemRight: 'item__blog-item-right',
  blogItemDateHour: 'item__blog-item-date-hour',
  blogItemImage: 'item__blog-item-image',
}

const GestionHomeItem = props => {
  const {
    data: { author, authorUrl, itemUrl, titleItem, dateHour, imageUrl } = {},
  } = props

  return (
    <article className={classes.blogItem}>
      <div className={classes.blogItemLeft}>
        <div className={classes.blogItemDateHour}>{dateHour}</div>
        <figure className={classes.blogItemImage}>
          <img src={imageUrl} alt={author || ''} />
        </figure>
      </div>
      <div className={classes.blogItemRight}>
        <h3>
          <a href={itemUrl}>{titleItem}</a>
        </h3>
        <h5>
          <a href={authorUrl}>{author}</a>
        </h5>
      </div>
    </article>
  )
}

export default GestionHomeItem
