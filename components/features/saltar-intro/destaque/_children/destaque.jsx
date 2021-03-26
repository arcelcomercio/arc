import * as React from 'react'
// import { useEditableContent } from 'fusion:content'

// import { SITE_TROME } from '../../../../utilities/constants/sitenames'

import Image from '../../../../global-components/image'

const classes = {
  featuredStory: `featured-story-si  pt-10 pb-10 flex md:p-0`,
  detail: `flex flex-col position relative md:p-20`,
  category:
    'featured-story-si__category pb-15 hidden md:inline-block position-relative',
  categoryLink: 'featured-story-si__category-link text-md',

  title: 'featured-story-si__title overflow-hidden mb-10 line-h-xs',
  titleLink: 'featured-story-si__title-link title-xs line-h-sm ',

  author: 'featured-story-si__author uppercase',
  authorLink: 'featured-story-si__author-link text-gray-200 text-xs',

  imageLink: 'featured-story-si__img-link block h-full ml-10 md:ml-0',
  imageBox: `featured-story-si__img-box block position-relative overflow-hidden w-full h-full`,
  image: 'featured-story-si__img w-full h-full object-cover',

  starFieldClass: 'featured-story-si__star',
  starFieldClassIcon: 'featured-story-si__star-icon',
  strf: 'featured-story-si__star-icon-full',

  // imgComplete: 'img-complete justify-end',
  // parcialTop: 'featured-story-si--reverse',

  // [SIZE_TWO_COL]: 'col-2',
  // Headbands
  // headband: 'featured-story-si__headband mb-5 text-lg',
  // headbandLink: 'featured-story-si__headband-link font-bold text-white uppercase',

  // live: 'featured-story-si--live',
  // livetv: 'featured-story-si--livetv',

  icon: `featured-story-si__icon`,
}

const FeaturedStory = props => {
  const {
    primarySection,
    primarySectionLink,
    title,
    websiteLink,
    author,
    authorLink,
    // multimediaType,
    multimediaCaption,
    multimedia,
    // arcSite,
    // siteName,
    isLazyLoadActivate = true,
    starField,
  } = props

  // width y height para imagen dinámico
  const imageWidth = 313
  const imageHeight = 370
  // if (size === SIZE_ONE_COL) {
  //   if (imageSize === IMAGE_COMPLETE) {
  //     imageWidth = 314
  //     imageHeight = 374
  //   } else {
  //     imageWidth = 314
  //     imageHeight = 157
  //   }
  // }

  // width y height para imagen dinámico en mobile

  const getCategorySectionClass = () => {
    if (
      primarySectionLink[0] === '/' &&
      primarySectionLink[primarySectionLink.length - 1] === '/'
    )
      return primarySectionLink.slice(1, -1)
    return primarySectionLink
  }

  return (
    <article
      className={`${starField ? 'featured-story-si-star' : ''} ${
        classes.featuredStory
      } `}>
      <div
        className={`${
          starField
            ? 'featured-story-si__detail-star'
            : 'featured-story-si__detail'
        } ${classes.detail}${author ? ' justify-between' : ''}`}>
        <h3
          itemProp="name"
          className={`${starField ? 'featured-story-si__category-star' : ''} ${
            classes.category
          } ${getCategorySectionClass()}`}>
          <a
            itemProp="url"
            className={classes.categoryLink}
            href={primarySectionLink}>
            {primarySection}
          </a>
        </h3>
        <h2 itemProp="name" className={classes.title}>
          <a itemProp="url" className={classes.titleLink} href={websiteLink}>
            {title}
          </a>
        </h2>

        {starField ? (
          <div className={classes.starFieldClass}>
            <span
              className={`${classes.starFieldClassIcon} ${
                starField === '1' ? classes.strf : ''
              } ${starField === '2' ? classes.strf : ''} ${
                starField === '3' ? classes.strf : ''
              } ${starField === '4' ? classes.strf : ''} ${
                starField === '5' ? classes.strf : ''
              } `}>
              ☆
            </span>
            <span
              className={`${classes.starFieldClassIcon} ${
                starField === '2' ? classes.strf : ''
              } ${starField === '3' ? classes.strf : ''} ${
                starField === '4' ? classes.strf : ''
              } ${starField === '5' ? classes.strf : ''}`}>
              ☆
            </span>
            <span
              className={`${classes.starFieldClassIcon} ${
                starField === '3' ? classes.strf : ''
              } ${starField === '4' ? classes.strf : ''} ${
                starField === '5' ? classes.strf : ''
              }`}>
              ☆
            </span>
            <span
              className={`${classes.starFieldClassIcon} ${
                starField === '4' ? classes.strf : ''
              } ${starField === '5' ? classes.strf : ''}`}>
              ☆
            </span>
            <span
              className={`${classes.starFieldClassIcon} ${
                starField === '5' ? classes.strf : ''
              }`}>
              ☆
            </span>
          </div>
        ) : null}

        {author ? (
          <address className={classes.author}>
            <a
              itemProp="url"
              className={classes.authorLink}
              href={authorLink || '/autores/'}>
              {author}
            </a>
          </address>
        ) : null}
      </div>
      <a itemProp="url" className={classes.imageLink} href={websiteLink}>
        <Image
          src={multimedia}
          alt={multimediaCaption || title}
          // height="374"
          // width="648"
          height={imageHeight}
          width={imageWidth}
          sizes="(max-width: 639px) 314px, 240px"
          sizesHeight={[240]}
          className={classes.image}
          pictureClassName={classes.imageBox}
          loading={isLazyLoadActivate ? 'lazy' : 'auto'}>
          {/* <Icon type={multimediaType} iconClass={classes.icon} /> */}
        </Image>
      </a>
    </article>
  )
}

export default FeaturedStory
