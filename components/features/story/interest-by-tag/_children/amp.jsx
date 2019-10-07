import React from 'react'

const classes = {
  item: 'story-interest__item w-full mb-25',
  detail: 'story-interest__detail w-full pl-10 pr-10 pt-10',
  separatorCategory:
    'story-interest__category mb-10 lg:text-center hidden md:block',
  separatorCategoryLink: 'story-interest__category-link text-xl',
  separatorTitle: 'story-interest__title overflow-hidden lg:text-center',
  titleLink: 'story-interest__title-link text-md line-h-sm font-bold',
  link: '',
  itemImage: 'story-interest__img w-full h-full object-cover',
  figure: 'story-interest__figure hidden md:block',
}

const StorySeparatorChildItemAmp = ({ data }) => {
  const {
    title,
    link,
    section,
    sectionLink,
    multimediaLandscapeL,
    multimediaType,
  } = data

  return (
    <li className={classes.item}>
      {multimediaType === 'video' && <span>&#8227;</span>}
      {multimediaType === 'gallery' && <span>G</span>}
      {link && (
        <a href={link} title={title}>
          <amp-img
            src={multimediaLandscapeL}
            layout="responsive"
            width="304"
            height="200"
            alt={title}
          />
        </a>
      )}

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

export default StorySeparatorChildItemAmp
