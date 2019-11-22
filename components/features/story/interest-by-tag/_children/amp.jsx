import React from 'react'

const classes = {
  item: 'amp-story-interest__item flex w-full mb-25',
  detail: 'amp-story-interest__detail w-full pl-10 pr-10',
  separatorCategory:
    'amp-story-interest__category mb-10 lg:text-center hidden md:block',
  separatorCategoryLink: 'story-interest__category-link text-xl',
  separatorTitle: 'amp-story-interest__title overflow-hidden lg:text-center',
  titleLink: 'amp-story-interest__title-link text-lg line-h-sm font-bold',
  link: 'amp-story-interest__link text-xl',
  itemImage:
    'amp-story-interest__img justify-center items-center w-full h-full overflow-hidden position-relative mr-15 object-cover',
  figure: 'amp-story-interest__figure hidden md:block',
}

const StorySeparatorChildItemAmp = ({ data }) => {
  const { title, link, multimediaLandscapeMD, multimediaType } = data

  return (
    <div className={classes.item}>
      {multimediaType === 'video' && <span>&#8227;</span>}
      {multimediaType === 'gallery' && <span>G</span>}
      {link && (
        <a href={link} className={classes.link}>
          <amp-img
            src={multimediaLandscapeMD}
            layout="responsive"
            width="304"
            height="200"
            alt={title}
            class={classes.itemImage}
          />
        </a>
      )}
      <div className={classes.detail}>
        <h3 className={classes.separatorTitle}>
          <a className={classes.titleLink} href={link}>
            {title}
          </a>
        </h3>
      </div>
    </div>
  )
}

export default StorySeparatorChildItemAmp
