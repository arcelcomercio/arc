import React from 'react'

const classes = {
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle',
  body: 'separator__body',
  item: 'separator__item',
  detail: 'separator__detail',
  separatorTitle: 'separator__title',
  mvideo: 'separator--video',
  separadorTitleOpinion: 'separador__headerTitle-opinion',
  opinionItem: 'separator__opinion--item',
  opinionItemImage: 'separator__opinion--item-image',
  itemDetailAuthor: 'separator__opinion--item',
  opinionSection: 'separator__opinion--section', //
  opinionItemDetails: 'separator__opinion--item-details',
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
