import React from 'react'
// import { addResizedUrlItem } from '../../../../utilities/thumbs'

const classes = {
  item:
    'story-separator__item separator__item--nota flex justify-between w-full position-relative pt-0 pr-5 pb-0 pl-0 border-solid border-gray',
  detail: 'story-separator__detail w-full pl-10 pr-10',
  separatorCategory: 'story-separator__category mb-10 text-xl',
  separatorTitle:
    'story-separator__title story-separator__title--nota overflow-hidden text-sm text-gray-300 line-h-sm',
  titleLink: '',
  itemImage: 'story-separator__img object-cover',
  oneline: 'story-separator-oneline',
  twoline: 'story-separator-twoline',
  threeline: 'story-separator-threeline text-left',
  figure: 'story-separator__figure pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0',
}

const StorySeparatorChildItem = ({ data, arcSite }) => {
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
          <a href={sectionLink}>{section}</a>{' '}
        </h2>
        <h3 className={`${classes.separatorTitle} ${numline}`}>
          <a className={classes.titleLink} href={link}>
            {title}
          </a>
        </h3>
      </div>
      <figure className={classes.figure}>
        {link && (
          <a href={link}>
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
