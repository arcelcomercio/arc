import React from 'react'

const classes = {
  opinionItem:
    'separator__opinion--item position-relative pt-20 pb-20 pr-20 pl-20 bg-tertiary',
  opinionItemDetails: 'separator__opinion--item-details',
  opinionItemText: 'mb-15',
  opinionItemLink: 'separator__opinion-link uppercase text-sm font-normal',
  opinionItemName: 'separator__opinion-name mb-10',
  opinionItemNameLink: 'title-xs mb-25 text-gray-300 font-bold line-h-sm',
  opinionItemTitle: 'text-md text-gray-300',
  opinionItemImage: 'separator__opinion--item-image mb-20',
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
      // section,
      // sectionUrl,
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
        <figure className={classes.opinionItemImage}>
          <img
            className={classes.opinionItemImageImg}
            src={imageUrl}
            alt={author || ''}
            
          />
        </figure>
        {/*  <h3 className={classes.opinionItemText}>
          <a href={sectionUrl} className={classes.opinionItemLink}>
            {section}
          </a>
        </h3> */}
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
    </article>
  )
}

export default SeparatorsChildAuthorCard
