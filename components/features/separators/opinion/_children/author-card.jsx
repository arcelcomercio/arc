import React from 'react'

const classes = {
  opinionItem:
    'separator__opinion--item position-relative pt-25 pb-25 pr-20 pl-20',
  opinionItemDetails: 'separator__opinion--item-details',
  opinionItemText: 'mb-15',
  opinionItemLink: 'separator__opinion-link uppercase text-sm font-normal',
  opinionItemName: 'mb-25',
  opinionItemNameLink: 'title-xs mb-25 text-gray-300 font-normal',
  opinionItemTitle: 'text-sm text-black',
  opinionItemImage: 'separator__opinion--item-image position-absolute',
  opinionItemImageImg: 'object-cover w-full h-full rounded',
  opiniononeline: 'separator__opinion--item-oneline',
  opiniontwoline: 'separator__opinion--item-twoline',
  opinionthreeline:
    'separator__opinion--item-threeline separator__opinion-description overflow-hidden',
}

const SeparatorsChildAuthorCard = props => {
  const {
    arcSite,
    data: {
      author,
      authorUrl,
      titulo,
      section,
      sectionUrl,
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
        <h3 className={classes.opinionItemText}>
          <a href={sectionUrl} className={classes.opinionItemLink}>
            {section}
          </a>
        </h3>
        <h5 className={classes.opinionItemName}>
          <a href={authorUrl} className={classes.opinionItemNameLink}>
            {author}
          </a>
        </h5>
        <p className={numline}>
          <a href={websiteUrl} className={classes.opinionItemTitle}>
            {titulo}
          </a>
        </p>
      </div>
      <figure className={classes.opinionItemImage}>
        <img
          className={classes.opinionItemImageImg}
          src={imageUrl}
          alt={author || ''}
        />
      </figure>
    </article>
  )
}

export default SeparatorsChildAuthorCard
