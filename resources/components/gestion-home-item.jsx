import React from 'react'

const classes = {
  blogItem: 'item__blog-item',
  blogItemTop: 'item__blog-top',
  blogItemBottom: 'item__blog-bottom',
  blogItemLeft: 'item__blog-left',
  blogItemRight: 'item__blog-right',
  blogItemDateHour: 'item__blog-date-hour',
  blogItemImage: 'item__blog-image',
}

const GestionHomeItem = props => {
  const {
    data: { author, authorUrl, itemUrl, titleItem, dateHour, imageUrl } = {},
  } = props

  return (
    <article className={classes.blogItem}>
      <div className={classes.blogItemTop}>
        <div className={classes.blogItemDateHour}>{dateHour}</div>
      </div>
      <div className={classes.blogItemBottom}>
        <div className={classes.blogItemLeft}>
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
      </div>
    </article>
  )
}

export default GestionHomeItem
