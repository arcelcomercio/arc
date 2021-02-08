import * as React from 'react'
import { useEditableContent } from 'fusion:content'

import Image from '../../../../global-components/image'
import Icon from '../../../../global-components/multimedia-icon'

const FeaturedStoryPremiumChild = ({
  websiteLink,
  title,
  author,
  authorLink,
  primarySectionLink,
  primarySection,
  multimedia,
  multimediaType,
  multimediaSubtitle,
  imgType,
  isPremium,
  model,
  bgColor,
  titleField,
  categoryField,
}) => {
  const classes = {
    featuredPremium: `f-premium featured-story position-relative flex expand`,
    detail: `flex flex-col flex-1`,

    section: 'featured-story__category mt-10 mb-10',
    sectionLink: 'featured-story__category-link text-md',

    title: 'featured-story__title overflow-hidden mb-5 line-h-xs flex-1',
    titleLink: 'featured-story__title-link title-xs line-h-sm overflow-hidden',

    author: 'featured-story__author uppercase mb-10',
    authorLink: 'featured-story__author-link text-gray-200 text-xs',

    imageLink: 'featured-story__img-link block h-full ml-10 md:ml-0',
    imageBox: `featured-story__img-box block position-relative overflow-hidden w-full h-full`,
    image: 'featured-story__img w-full h-full object-cover',
    icon: 'featured-premium__icon',

    premiumWrapper:
      'premium__wrapper bg-primary flex justify-center items-center',
    premiumText:
      'premium__text flex justify-center items-center text-black font-bold icon-padlock',
  }

  const { editableField } = useEditableContent()

  const getEditableField = element =>
    editableField ? editableField(element) : null

  if (model === 'basic' && imgType) {
    classes.featuredPremium =
      'f-premium featured-story position-relative flex expand img-complete'
    classes.detail = 'featured-story__detail'
    classes.title =
      'featured-story__title overflow-hidden mb-10 line-h-xs flex-1'
  }
  if (model === 'twoCol') {
    classes.featuredPremium =
      'f-premium featured-story position-relative flex expand img-complete col-2'
    classes.detail = 'featured-story__detail'
    classes.title =
      'featured-story__title overflow-hidden mb-10 line-h-xs flex-1'
  }
  if (model === 'full') {
    classes.featuredPremium =
      'f-premium featured-story position-relative flex expand img-complete col-2 row-2'
    classes.detail = 'featured-story__detail'
  }

  // width y height para imagen dinámico en mobile
  const imageMobileWidth = 314
  let imageMobileHeight = 374
  if (model === 'basic' && !imgType) {
    imageMobileHeight = 157
  }

  // if (model === 'twoCol') 648x374
  // width y height para imagen dinámico
  let imageWidth = 648
  let imageHeight = 374
  if (model === 'basic') {
    imageWidth = 314
    imageHeight = imgType ? 374 : 157
  } else if (model === 'full') {
    imageWidth = 900
    imageHeight = 900
  }

  return (
    <article
      className={`${classes.featuredPremium}${
        bgColor === 'gray' ? ' featured-premium--gray' : ''
      }`}>
      <a itemProp="url" href={websiteLink} className={classes.imageLink}>
        <Icon type={multimediaType} iconClass={classes.icon} />
        <Image 
          src={multimedia}
          width={imageWidth}
          height={imageHeight}
          sizes={`(max-width: 480px) ${imageMobileWidth}px, ${imageWidth}px`}
          sizesHeight={[imageMobileHeight]}
          alt={multimediaSubtitle || title}
          className={classes.image}
          pictureClassName={classes.imageBox}
          loading='lazy'
        />
      </a>

      <div className={classes.detail}>
        <h3 itemProp="name" className={classes.section}>
          <a
            itemProp="url"
            className={classes.sectionLink}
            href={primarySectionLink}
            {...getEditableField('categoryField')}
            suppressContentEditableWarning>
            {categoryField || primarySection}
          </a>
        </h3>
        <h2 itemProp="name" className={classes.title}>
          <a
            itemProp="url"
            className={classes.titleLink}
            href={websiteLink}
            {...getEditableField('titleField')}
            suppressContentEditableWarning>
            {titleField || title}
          </a>
        </h2>
        <h6 itemProp="name" className={classes.author}>
          {author ? (
            <a
              itemProp="url"
              className={classes.authorLink}
              href={authorLink || '/autores/'}>
              {author}
            </a>
          ) : null}
        </h6>
        {isPremium ? (
          <div className={classes.premiumWrapper}>
            <p itemProp="description" className={classes.premiumText}>
              Suscriptor Digital
            </p>
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default React.memo(FeaturedStoryPremiumChild)
