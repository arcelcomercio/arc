import React from 'react'
import Icon from '../../../../global-components/multimedia-icon'

const classes = {
  featuredPremium: 'featured-premium',
  left: 'featured-premium__left',
  section: 'featured-premium__section',
  title: 'featured-premium__title',
  detail: 'featured-premium__detail',
  read: 'featured-premium__read',
  description: 'featured-premium__description',
  author: 'featured-premium__author',
  boxIcon: 'featured-premium__box-icon',
  sectionSmall: 'featured-premium__section-small',
  iconImage: 'featured-premium__icon-image',
  right: 'featured-premium__right',
  icon: 'featured-premium__icon icon-video',
  image: 'featured-premium__image',
}

const getModel = model => {
  const type = {
    basic: ' featured-premium--card ',
    twoCol: ' col-2 ',
    full: ' col-2 row-2 ',
  }
  return type[model] || type.basic
}

const FeaturedStoryPremiumChild = ({
  isPremium,
  model,
  bgColor,
  websiteLink,
  multimediaSquareMD,
  multimediaLandscapeMD,
  multimediaLandscapeL,
  multimediaLazyDefault,
  title,
  author,
  authorLink,
  subTitle,
  multimediaType,
  primarySectionLink,
  primarySection,
  isAdmin,
}) => {
  return (
    <div
      className={classes.featuredPremium
        .concat(getModel(model))
        .concat(` featured-premium--${bgColor}`)}>
      <div className={classes.left}>
        <h3 className={classes.section}>
          <a href={primarySectionLink}>{primarySection}</a>
        </h3>
        <h2>
          <a className={classes.title} href={websiteLink}>
            {title}
          </a>
        </h2>
        <p className={classes.detail}>
          {subTitle}{' '}
          <a className={classes.read} href={websiteLink}>
            Leer
          </a>
        </p>
        <div className={classes.description}>
          <h6>
            <a className={classes.author} href={authorLink}>
              {author}
            </a>
          </h6>
          <div className={classes.boxIcon}>
            <p>
              <a className={classes.sectionSmall} href={primarySectionLink}>
                {primarySection || 'Sección'}
              </a>
            </p>
            {isPremium && (
              <img
                className={classes.iconImage}
                src="data:image/png;base64,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"
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <Icon type={multimediaType} iconClass={classes.icon} />
        <a href="/">
          <picture>
            <source
              srcSet={isAdmin ? multimediaLandscapeMD : multimediaLazyDefault}
              data-srcSet={multimediaLandscapeMD}
              media="(max-width: 367px)"
            />
            <source
              srcSet={isAdmin ? multimediaSquareMD : multimediaLazyDefault}
              datasrcSet={multimediaSquareMD}
              media="(max-width: 620px)"
            />
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
              src={isAdmin ? multimediaLandscapeL : multimediaLazyDefault}
              data-src={multimediaLandscapeL}
              alt={title}
              loading="lazy"
            />
          </picture>
        </a>
      </div>
    </div>
  )
}

export default FeaturedStoryPremiumChild
