import React from 'react'
// import { addResizedUrlItem } from '../../../../utilities/thumbs'

const classes = {
  item: 'story-separator__item separator__item--nota flex justify-between',
  detail: 'story-separator__detail',
  separatorCategory: 'story-separator__category',
  separatorTitle: 'story-separator__title story-separator__title--nota overflow-hidden',
  titleLink: '',
  itemImage: 'w-full h-full object-cover',
  oneline: 'story-separator-oneline',
  twoline: 'story-separator-twoline',
  threeline: 'story-separator-threeline text-left',
}

const StorySeparatorChildItem = ({ data, contextPath, arcSite }) => {
  let numline = ''
  switch (arcSite) {
    case 'elcomercio':
      numline = classes.threeline
      break
    case 'depor':
      numline = classes.twoline
      break
    default:
      numline = classes.twolinegit
      break
  }
  const { title, link, section, sectionLink, multimedia, multimediaType } = data

  // TODO: Este es el resizer que funciona?
  /*   const aspectRatios = ['3:4|60x70']
  const { resized_urls: resizedUrls } = addResizedUrlItem(
    arcSite,
    multimedia,
    aspectRatios
  ) */

  return (
    <article className={classes.item}>
      {multimediaType === 'video' && <span>&#8227;</span>}
      {multimediaType === 'gallery' && <span>G</span>}
      <div className={classes.detail}>
        <h2 className={classes.separatorCategory}>
          <a href={`${contextPath}${sectionLink}`}>{section}</a>{' '}
        </h2>
        <h3 className={`${classes.separatorTitle} ${numline}`}>
          <a className={classes.titleLink} href={`${contextPath}${link}`}>
            {title}
          </a>
        </h3>
      </div>
      <figure>
        {link && (
          <a href={`${contextPath}${link}`}>
            <img
              src={multimedia /* resizedUrls['3:4'] */}
              alt=""
              className={classes.itemImage}
            />
          </a>
        )}
      </figure>
    </article>
  )
}

export default StorySeparatorChildItem
