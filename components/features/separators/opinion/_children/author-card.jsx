import React from 'react'
import Image from '../../../../global-components/image'

const classes = {
  opinionItem:
    'separator__opinion--item position-relative pt-20 pb-20 pr-20 pl-20 bg-tertiary hidden',
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
    defaultAuthorImage,
    data: { author, authorUrl, titulo, websiteUrl, authorImage } = {},
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

  const existImageAuthor = authorImage.includes('author.png')

  return (
    <article className={classes.opinionItem}>
      <div className={classes.opinionItemDetails}>
        {existImageAuthor ? (
          <div className={classes.opinionContentImageDefault}>
            <i className={classes.opinionDefaulImage} />
          </div>
        ) : (
          <figure className={classes.opinionItemImage}>
            <a itemProp="url" href={authorUrl}>
              <Image
                src={authorImage}
                placeholder={defaultAuthorImage}
                width={85}
                height={85}
                alt={author}
                className={classes.opinionItemImageImg}
                loading="lazy"
              />
            </a>
          </figure>
        )}
        <h5 itemProp="name" className={classes.opinionItemName}>
          <a
            itemProp="url"
            href={authorUrl}
            className={classes.opinionItemNameLink}>
            {author}
          </a>
        </h5>
        <p itemProp="description" className={numline}>
          <a
            itemProp="url"
            href={websiteUrl}
            className={classes.opinionItemTitle}>
            {titulo}
          </a>
        </p>
      </div>
    </article>
  )
}

export default SeparatorsChildAuthorCard
