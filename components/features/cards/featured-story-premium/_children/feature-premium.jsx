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
  logo,
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
              <img className={classes.iconImage} src={logo} alt="" />
            )}
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <Icon type={multimediaType} iconClass={classes.icon} />
        <a href="/">
          <picture>
            <source
              className={isAdmin ? '' : 'lazy'}
              srcSet={isAdmin ? multimediaLandscapeMD : multimediaLazyDefault}
              data-srcset={multimediaLandscapeMD}
              media="(max-width: 367px)"
            />
            <source
              className={isAdmin ? '' : 'lazy'}
              srcSet={isAdmin ? multimediaSquareMD : multimediaLazyDefault}
              data-srcset={multimediaSquareMD}
              media="(max-width: 620px)"
            />
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
              src={isAdmin ? multimediaLandscapeL : multimediaLazyDefault}
              data-src={multimediaLandscapeL}
              alt={title}
            />
          </picture>
        </a>
      </div>
    </div>
  )
}

export default FeaturedStoryPremiumChild
