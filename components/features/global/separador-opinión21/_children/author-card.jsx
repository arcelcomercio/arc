import React from 'react'

const classes = {
  opinionItem: 'separator__opinion--item',
  opinionItemDetails: 'separator__opinion--item-details',
  opinionItemImage: 'separator__opinion--item-image',
  opiniononeline: 'separator__opinion--item-oneline',
  opiniontwoline: 'separator__opinion--item-twoline',
  opinionthreeline: 'separator__opinion--item-threeline',
}

const AuthorCard = props => {
  const {
    arcSite,
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

  let numline = ''
  switch (arcSite) {
    case 'elcomercio':
      numline = classes.opinionthreeline
      break
    case 'depor':
      numline = classes.opiniontwoline
      break
    default:
      numline = classes.opiniontwoline
      break
  }
  return (
    <article className={classes.opinionItem}>
      <div className={classes.opinionItemDetails}>
        <h3>
          <a href={seccionUrl}>{seccion}</a>
        </h3>
        <h5>
          <a href={authorUrl}>{author}</a>
        </h5>
        <p className={numline}>
          <a href={websiteUrl}>{titulo}</a>
        </p>
      </div>
      <figure className={classes.opinionItemImage}>
        <img src={imageUrl} alt={author || ''} />
      </figure>
    </article>
  )
}

export default AuthorCard
