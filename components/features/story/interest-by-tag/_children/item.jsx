import React from 'react'

const classes = {
  item:
    'story-interest__item w-full border-solid border-white border-r-1 mb-40',
  detail: 'story-interest__detail w-full pl-10 pr-10 pt-10',
  separatorCategory:
    'story-interest__category mb-10 lg:text-center hidden md:block',
  separatorCategoryLink: 'story-interest__category-link text-xl',
  separatorTitle: 'story-interest__title overflow-hidden lg:text-center',
  titleLink:
    'story-interest__title-link text-md text-white line-h-sm font-bold',
  link: '',
  itemImage: 'story-interest__img w-full h-full object-cover',
  figure: 'story-interest__figure hidden md:block',
}

const StorySeparatorChildItem = ({ data }) => {
  const {
    title,
    link,
    section,
    sectionLink,
    multimediaPortraitXS,
    multimediaType,
  } = data

  return (
    <li className={classes.item}>
      {multimediaType === 'video' && <span>&#8227;</span>}
      {multimediaType === 'gallery' && <span>G</span>}
      <figure className={classes.figure}>
        {link && (
          <a href={link}>
            <img
              src={multimediaPortraitXS}
              alt=""
              className={classes.itemImage}
            />
          </a>
        )}
      </figure>

      <div className={classes.detail}>
        <h2 className={classes.separatorCategory}>
          <a href={sectionLink} className={classes.separatorCategoryLink}>
            {section}
          </a>{' '}
        </h2>
        <h3 className={classes.separatorTitle}>
          <a className={classes.titleLink} href={link}>
            {title}
          </a>
        </h3>
      </div>
    </li>
  )
}

export default StorySeparatorChildItem
