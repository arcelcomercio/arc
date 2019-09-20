import React from 'react'

import Icon from '../../../global-components/multimedia-icon'

const classes = {
  fullImg:
    'photogallery-image bg-white position-relative flex justify-start items-end w-full',
  boxImg: 'photogallery-image__box-image block h-full w-full position-absolute',
  img: 'photogallery-image__image h-full w-full object-cover object-center',
  boxDetail: 'photogallery-image__box-detail w-full p-20',
  section: 'photogallery-image__section block text-white text-md',
  title:
    'photogallery-image__title overflow-hidden text-white block title-md line-h-sm',
  boxIcon:
    'photogallery-image__box-icon position-absolute flex justify-center items-center',
  icon: 'photogallery-image__icon text-white',
}

const FullImage = ({
  isAdmin,
  primarySection,
  primarySectionLink,
  title,
  websiteLink,
  multimediaLandscapeL,
  multimediaSquareXL,
  multimediaLazyDefault,
  multimediaType,
  textPosition,
  textOrientation,
}) => {
  return (
    <div className={`${classes.fullImg} ${textOrientation} ${textPosition}`}>
      <a href={websiteLink} className={classes.boxImg}>
        <picture className={classes.img}>
          <source
            className={isAdmin ? '' : 'lazy'}
            media="(max-width: 639px)"
            type="image/jpeg"
            srcSet={isAdmin ? multimediaSquareXL : multimediaLazyDefault}
            data-srcset={multimediaSquareXL}
          />
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
            data-src={multimediaLandscapeL}
            src={isAdmin ? multimediaLandscapeL : multimediaLazyDefault}
            alt={title}
          />
        </picture>
      </a>
      <div className={classes.boxDetail}>
        <h3>
          <a className={classes.section} href={primarySectionLink}>
            {primarySection}
          </a>
        </h3>
        <h2>
          <a className={classes.title} href={websiteLink} title={title}>
            {title}
          </a>
        </h2>
      </div>
      <div className={classes.boxIcon}>
        <Icon type={multimediaType} iconClass={classes.icon} />
      </div>
    </div>
  )
}

export default FullImage
