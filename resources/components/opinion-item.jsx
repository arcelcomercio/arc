import React from 'react'

const classes = {
  opinionItem: 'separator__opinion--item',
  opinionItemDetails: 'separator__opinion--item-details',
  opinionItemImage: 'separator__opinion--item-image',
}

const OpinionItem = props => {
  const {
    data: {
      author,
      authorUrl,
      titulo,
      seccion,
      seccionUrl,
      websiteUrl,
      imageUrl,
    } = {},
  } = props
  return (
    <article className={classes.opinionItem}>
      <div className={classes.opinionItemDetails}>
        <h3>
          <a href={seccionUrl}>{seccion}</a>
        </h3>
        <h5>
          <a href={authorUrl}>{author}</a>
        </h5>
        <p>
          <a href={websiteUrl}>{titulo}</a>
        </p>
      </div>
      <figure className={classes.opinionItemImage}>
        <img src={imageUrl} alt={author || ''} />
      </figure>
    </article>
  )
}

export default OpinionItem
