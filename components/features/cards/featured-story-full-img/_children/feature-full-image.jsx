import React from 'react'
// import ConfigParams from '../../../../utilities/config-params'
import Icon from '../../../../global-components/multimedia-icon'

const getModel = model => {
  const type = {
    basic: 'row-1',
    twoCol: 'col-2 row-1',
    full: 'col-2 row-2',
  }
  return type[model] || type.basic
}

const classes = {
  fullImg:
    'feature-fullimage position-relative flex justify-start items-end w-full',
  boxImg: 'feature-fullimage__box-image block h-full w-full position-absolute',
  img: 'feature-fullimage__image h-full w-full object-cover object-center',
  boxDetail: 'feature-fullimage__box-detail w-full p-20',
  author: 'feature-fullimage__author font-thin text-xs uppercase text-white',
  section: 'feature-fullimage__section text-white text-md',
  title:
    'feature-fullimage__title overflow-hidden text-white block mt-10 mb-10 title-xs line-h-sm',
  boxIcon:
    'feature-fullimage__box-icon position-absolute flex justify-center items-center',
  icon: 'feature-fullimage__icon text-white',
}

export default ({
  author,
  authorLink,
  primarySectionLink,
  title,
  multimediaLandscapeL,
  multimediaPortraitMD,
  multimediaSquareXL,
  multimediaLazyDefault,
  websiteLink,
  multimediaType,
  crossY,
  crossX,
  model,
  section,
  isAdmin,
}) => {
  return (
    <div
      className={`${classes.fullImg} ${crossY} ${crossX} ${getModel(model)}`}>
      <a href={websiteLink} className={classes.boxImg}>
        {model === 'twoCol' && (
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
            data-src={multimediaLandscapeL}
            src={isAdmin ? multimediaLandscapeL : multimediaLazyDefault}
            alt={title}
          />
        )}
        {model === 'full' && (
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
            data-src={multimediaSquareXL}
            src={isAdmin ? multimediaSquareXL : multimediaLazyDefault}
            alt={title}
          />
        )}
        {model === 'basic' && (
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
            data-src={multimediaPortraitMD}
            src={isAdmin ? multimediaPortraitMD : multimediaLazyDefault}
            alt={title}
          />
        )}
      </a>
      <div className={classes.boxDetail}>
        <h3>
          <a className={classes.section} href={primarySectionLink}>
            {section}
          </a>
        </h3>
        <h2>
          <a className={classes.title} href={websiteLink} title={title}>
            {title}
          </a>
        </h2>
        <p>
          <a className={classes.author} href={authorLink}>
            {author}
          </a>
        </p>
      </div>
      <div className={classes.boxIcon}>
        <Icon type={multimediaType} iconClass={classes.icon} />
      </div>
    </div>
  )
}
