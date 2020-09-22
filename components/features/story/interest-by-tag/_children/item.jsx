import React from 'react'
import ConfigParams from '../../../../utilities/config-params'
import { SITE_GESTION } from '../../../../utilities/constants/sitenames'

const classes = {
  item: 'story-interest__item w-full mb-40',
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
  iconImagePremium: 'story-interest__icon-premium mr-15 position-relative',
}

const StorySeparatorChildItem = ({ data, arcSite, logo = '' }) => {
  const {
    title,
    link,
    section,
    sectionLink,
    lazyImage,
    // multimediaLandscapeS,
    multimediaLandscapeMD,
    multimediaType,
    isAdmin,
    isPremium,
  } = data
  const isGestion = arcSite === SITE_GESTION
  return (
    <li className={classes.item}>
      {multimediaType === 'video' && <span>&#8227;</span>}
      {multimediaType === 'gallery' && <span>G</span>}
      {link && (
        <a itemProp="url" href={link}>
          <picture className={classes.figure}>
            {/* <source
              className={isAdmin ? '' : 'lazy'}
              media="(max-width: 1023px)"
              srcSet={isAdmin ? multimediaLandscapeL : lazyImage}
              data-srcset={multimediaLandscapeL}
            /> */}
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.itemImage}`}
              src={isAdmin ? multimediaLandscapeMD : lazyImage}
              data-src={multimediaLandscapeMD}
              alt={title}
            />
          </picture>
        </a>
      )}

      <div className={classes.detail}>
        {arcSite !== ConfigParams.SITE_ELCOMERCIO && (
          <>
            <h2 itemProp="name" className={classes.separatorCategory}>
              {isPremium && isGestion && (
                <img
                  className={classes.iconImagePremium}
                  src={logo}
                  alt="premium"
                />
              )}
              <a
                itemProp="url"
                href={sectionLink}
                className={classes.separatorCategoryLink}>
                {section}
              </a>
            </h2>
          </>
        )}
        <h3 itemProp="name" className={classes.separatorTitle}>
          <a itemProp="url" className={classes.titleLink} href={link}>
            {title}
          </a>
        </h3>
      </div>
    </li>
  )
}

export default StorySeparatorChildItem
