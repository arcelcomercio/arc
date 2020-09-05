import React from 'react'

import Icon from '../../../../global-components/multimedia-icon'
import Image from '../../../../global-components/image'

export default ({
  title,
  websiteLink,
  primarySection,
  primarySectionLink,
  author,
  authorLink,
  authorImage,
  multimediaLandscapeMD,
  multimediaPortraitMD,
  multimediaLandscapeL,
  multimediaLazyDefault,
  authorOccupation,
  subTitle,
  multimediaType,
  design,
  isAdmin,
  // multimediaSubtitle,
  multimediaCaption,
}) => {
  const classes = {
    featuredAuthor: 'featured-author row-1',
    storyImgLink: 'featured-author__img-link block',
    storyPicture: 'featured-author__img-picture block position-relative',
    icon: 'featured-author__icon right-0 m-10',
    storyImg: 'featured-author__img w-full object-cover',
    content:
      'featured-author__content pl-20 pr-20 md:pl-10 md:pr-10 pt-5 md:pt-5 pb-20',
    section: 'featured-author__section flex justify-center mt-10 mb-10',
    sectionLink: 'featured-author__section-link text-gray-200 title-sm',
    title: 'featured-author__title flex justify-center mb-15',
    titleLink:
      'featured-author__title-link text-center line-h-xs title-md overflow-hidden',
    subtitle: 'featured-author__subtitle mb-20',
    subtitleLink:
      'featured-author__subtitle-link block text-center text-md line-h-sm overflow-hidden',
    authorContainer: 'flex justify-center',
    authorImgLink: 'rounded overflow-hidden bg-tertiary',
    authorPicture: '',
    authorImg: 'featured-author__author-img object-cover',
    authorNameContainer: 'flex flex-col justify-center ml-10',
    authorName: '',
    authorNameLink: 'text-md line-h-xs',
    authorRole: 'text-sm text-gray-200',
  }
  const storyImages = {
    desktop: multimediaLandscapeMD,
    mobile: multimediaLandscapeL,
  }
  /** Estilos por cada diseño */
  if (design === 'second') {
    classes.featuredAuthor =
      'featured-author second row-1 col-2 md:flex md:flex-row-reverse bg-tertiary'
    classes.content = 'featured-author__content pl-20 pr-20 md:pt-25 pt-5 pb-20'

    storyImages.desktop = multimediaPortraitMD
    storyImages.mobile = multimediaLandscapeL
  }
  if (design === 'third') {
    classes.featuredAuthor =
      'featured-author third row-1 col-2 position-relative flex items-end md:items-center'
    classes.storyImgLink =
      'featured-author__img-link block position-absolute right-0 w-full h-full'
    classes.storyPicture =
      'featured-author__img-picture block position-relative h-full'
    classes.storyImg = 'featured-author__img w-full object-cover h-full'
    classes.content =
      'featured-author__content pl-20 pr-20 md:pt-20 pt-5 pb-20 position-relative'
    classes.sectionLink = 'featured-author__section-link text-white title-sm'
    classes.titleLink =
      'featured-author__title-link text-center line-h-xs overflow-hidden title-md text-white'
    classes.subtitle = 'featured-author__subtitle hidden md:block mb-20'
    classes.subtitleLink =
      'featured-author__subtitle-link block text-center text-md line-h-sm text-white overflow-hidden'
    classes.authorNameLink = 'text-md line-h-xs text-white'
    classes.authorRole = 'text-sm text-white'

    storyImages.desktop = multimediaLandscapeL
    storyImages.mobile = multimediaLandscapeL
  }
  if (design === 'fourth') {
    classes.featuredAuthor = 'featured-author fourth bg-tertiary row-2 col-2'
    classes.content = 'featured-author__content pl-20 pr-20 pt-5 md:pt-5 pb-20'
    classes.section =
      'featured-author__section flex justify-center mt-10 md:mt-25 mb-10'
    classes.title = 'featured-author__title flex justify-center mb-20'
    classes.subtitle = 'featured-author__subtitle mb-20 md:pl-40 md:pr-40'
    classes.sectionLink = 'featured-author__section-link text-gray-200 title-xl'
    classes.titleLink =
      'featured-author__title-link text-center line-h-xs overflow-hidden title-lg'
    classes.subtitleLink =
      'featured-author__subtitle-link block text-center text-lg line-h-sm overflow-hidden'
    classes.authorContainer = 'flex justify-center md:mt-60 lg:mt-60'
    storyImages.desktop = multimediaLandscapeL
    storyImages.mobile = multimediaLandscapeL
  }
  return (
    <article className={classes.featuredAuthor}>
      <a itemProp="url" className={classes.storyImgLink} href={websiteLink}>
        <picture className={classes.storyPicture}>
          <source
            className={isAdmin ? '' : 'lazy'}
            media="(max-width: 639px)"
            type="image/jpeg"
            srcSet={isAdmin ? storyImages.mobile : multimediaLazyDefault}
            data-srcset={storyImages.mobile}
          />
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.storyImg}`}
            data-src={storyImages.desktop}
            src={isAdmin ? storyImages.desktop : multimediaLazyDefault}
            alt={multimediaCaption || title}
          />
          <Icon type={multimediaType} iconClass={classes.icon} />
        </picture>
      </a>
      <div className={classes.content}>
        <h3 itemProp="name" className={classes.section}>
          <a
            itemProp="url"
            className={classes.sectionLink}
            href={primarySectionLink}>
            {primarySection}
          </a>
        </h3>
        <h2 itemProp="name" className={classes.title}>
          <a itemProp="url" className={classes.titleLink} href={websiteLink}>
            {title}
          </a>
        </h2>
        {design !== 'first' && (
          <h3 itemProp="name" className={classes.subtitle}>
            <a
              itemProp="url"
              className={classes.subtitleLink}
              href={websiteLink}>
              {subTitle}
            </a>
          </h3>
        )}
        <div className={classes.authorContainer}>
          <a itemProp="url" className={classes.authorImgLink} href={authorLink}>
            <Image
              src={authorImage}
              width={47}
              height={47}
              alt={author}
              className={classes.authorImg}
              loading="lazy"
            />
          </a>
          <div className={classes.authorNameContainer}>
            <h4 itemProp="name">
              <a
                itemProp="url"
                className={classes.authorNameLink}
                href={authorLink}>
                {author}
              </a>
            </h4>
            <a itemProp="url" className={classes.authorRole} href={authorLink}>
              {authorOccupation}
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
