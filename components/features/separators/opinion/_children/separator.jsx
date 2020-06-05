import React from 'react'

const classes = {
  opinionBody: 'separator__opinion--body mt-0 mb-0 ',

  opinionItem:
    'separator__opinion--item position-relative pt-20 pb-20 pr-20 pl-20 bg-tertiary hidden',
  opinionItemText: 'mb-15',
  opinionItemLink: 'separator__opinion-link uppercase text-sm font-normal',
  opinionItemName: 'separator__opinion-name mb-10',
  opinionItemNameLink: 'title-xs mb-25 text-gray-300 font-bold line-h-sm',
  opinionItemTitle: 'text-md text-gray-300',
  opinionItemImage:
    'separator__opinion--item-image mb-20 object-cover w-full h-full rounded',
  opiniononeline: 'separator__opinion--item-oneline',
  opiniontwoline: 'separator__opinion--item-twoline',
  opinionthreeline:
    'separator__opinion--item-threeline separator__opinion-description overflow-hidden',
}

const SeparatorsChildAuthorCard = ({ arcSite, isAdmin, stories }) => {
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
    <div className={classes.opinionBody}>
      {stories &&
        stories.length > 0 &&
        stories.map(
          ({
            author,
            authorUrl,
            titulo,
            websiteUrl,
            imageUrl,
            multimediaLazyDefault,
          }) => {
            const existImageAuthor = imageUrl.includes('author.png')
            return (
              <article className={classes.opinionItem}>
                {existImageAuthor ? (
                  <div className={classes.opinionContentImageDefault}>
                    <i className={classes.opinionDefaulImage} />
                  </div>
                ) : (
                  <a href={authorUrl}>
                    <img
                      className={`${isAdmin ? '' : 'lazy'} ${
                        classes.opinionItemImage
                      }`}
                      src={isAdmin ? imageUrl : multimediaLazyDefault}
                      data-src={imageUrl}
                      alt={author || ''}
                    />
                  </a>
                )}
                <h5 itemProp="name" className={classes.opinionItemName}>
                  <a href={authorUrl} className={classes.opinionItemNameLink}>
                    {author}
                  </a>
                </h5>
                <p className={numline}>
                  <a href={websiteUrl} className={classes.opinionItemTitle}>
                    {titulo}
                  </a>
                </p>
              </article>
            )
          }
        )}
    </div>
  )
}

export default SeparatorsChildAuthorCard
