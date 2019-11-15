import React from 'react'

const classes = {
  item:
    'story-separator__item flex justify-between w-full position-relative pt-0 pr-5 pb-0 pl-0 border-solid border-gray',
  detail: 'story-separator__detail w-full pl-10 pr-10',
  separatorCategory: 'story-separator__category mb-10 text-xl',
  separatorTitle:
    'story-separator__title overflow-hidden text-left text-sm text-gray-300 line-h-sm',
  titleLink: '',
  itemImage: 'story-separator__img object-cover',
  figure: 'story-separator__figure',
}

const StorySeparatorByRecommendationChildItem = ({ data, clickedRecommendation }) => {
  const {
    title,
    link,
    section,
    sectionLink,
    multimediaPortraitXS,
    multimediaType,
  } = data

  return (
    <article className={classes.item}>
      {multimediaType === 'video' && <span>&#8227;</span>}
      {multimediaType === 'gallery' && <span>G</span>}
      <div className={classes.detail}>
        <h2 className={classes.separatorCategory}>
          <a href={sectionLink}>{section}</a>{' '}
        </h2>
        <h3 className={classes.separatorTitle}>
          <a className={classes.titleLink} href={link} onClick={e => clickedRecommendation(e, link)}>
            {title}
          </a>
        </h3>
      </div>
      <figure className={classes.figure}>
        {link && (
          <a href={link} onClick={e => clickedRecommendation(e, link)}>
            <img
              src={multimediaPortraitXS}
              alt={title}              
              className={classes.itemImage}
            />
          </a>
        )}
      </figure>
    </article>
  )
}

export default StorySeparatorByRecommendationChildItem
