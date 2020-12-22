import React from 'react'

const classes = {
  item: 'amp-story-interest__item flex w-full mb-25',
  item_full_imagen:
    'amp-story-interest__item_full_imagen block w-full mb-15 pb-15',
  detail: 'amp-story-interest__detail w-full pl-10 pr-10',
  detail_text: 'w-full pt-10 text-lg',
  detail_full_imagen: 'amp-story-interest__detail pt-10 pr-10',
  separatorCategory:
    'amp-story-interest__category mb-10 lg:text-center hidden md:block',
  separatorCategoryLink: 'story-interest__category-link text-xl',
  separatorTitle: 'amp-story-interest__title overflow-hidden lg:text-center',
  titleLink: 'amp-story-interest__title-link text-lg line-h-sm font-bold',
  titleLink_full_imagen: ' title-xs line-h-sm font-bold',
  link: 'amp-story-interest__link text-xl',
  itemImage:
    'amp-story-interest__img justify-center items-center w-full h-full overflow-hidden position-relative mr-15 object-cover',
  itemImage_full_imagen:
    'amp-story-interest__img_full_imagen justify-center items-center w-full h-full overflow-hidden position-relative pt-15 mr-15 object-cover',
  figure: 'amp-story-interest__figure hidden md:block',
}

const StorySeparatorChildItemAmp = ({ data }) => {
  const {
    title,
    subtitle,
    link,
    multimediaLandscapeMD,
    multimediaType,
    storyAMP,
  } = data

  const isFullImage = storyAMP === 'amp_full_imagen'

  return (
    <article
      className={` ${isFullImage ? classes.item_full_imagen : classes.item} `}>
      {multimediaType === 'video' && <span>&#8227;</span>}
      {multimediaType === 'gallery' && <span>G</span>}
      {link && (
        <a href={link} className={classes.link}>
          <amp-img
            src={multimediaLandscapeMD}
            layout="responsive"
            width="16"
            height="9"
            alt={title}
            class={` ${
              isFullImage ? classes.itemImage_full_imagen : classes.itemImage
            } `}
          />
        </a>
      )}
      <div
        className={`${
          isFullImage ? classes.detail_full_imagen : classes.detail
        } `}>
        <h3 className={classes.separatorTitle}>
          <a
            className={`${
              isFullImage ? classes.titleLink_full_imagen : classes.titleLink
            } `}
            href={link}>
            {title}
          </a>
        </h3>
        {isFullImage && subtitle && (
          <p className={classes.detail_text}>{subtitle.substring(0, 105)}...</p>
        )}
      </div>
    </article>
  )
}

export default StorySeparatorChildItemAmp
