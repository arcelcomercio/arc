import React from 'react'
// import { alignmentClassesPropType } from '@arc-core-components/feature_article-body/build/helpers'
import Icon from './multimedia-icon'

import { formatDateLocalTimeZone } from '../utilities/helpers'

const classes = {
  storyItem: `story-item w-full pr-20 pl-20 pb-20 mb-20 border-b-1 border-solid border-gray md:pl-0 md:pr-0  lg:p-0`,
  top: 'story-item__top flex items-center md:flex-col md:items-start',
  section: 'story-item__section text-sm text-black md:mb-15',
  sectionHidden:
    'story-item__section story-item__section--desktop text-sm text-black md:mb-15 hidden',
  date: 'story-item__date font-thin ml-5 text-xs text-gray-300 md:mt-5 md:ml-0',
  bottom: 'story-item__bottom flex lg:pb-15',
  left: 'story-item__left flex flex-col justify-between pr-20 ',
  contentTitle: 'story-item__content-title overflow-hidden',
  title: `story-item__title block overflow-hidden primary-font line-h-xs mt-10`,
  subtitle: `story-item__subtitle overflow-hidden hidden mt-10 mb-10 text-md text-gray-200 line-h-xs`,
  contenetAuthor: 'story-item__author-wrapper  hidden',
  author: `story-item__author block uppercase mt-10 font-thin text-xs text-gray-200`,
  right: 'story-item__right position-relative overflow-hidden',
  rightLink: 'story-item__link  h-full',
  icon: `story-item__icon position-absolute flex items-center justify-center text-white w-full h-full`,
  img: 'story-item__img object-cover object-center w-full h-full',
  /*   iconImg: `story-item__icon icon-img position-absolute flex items-center justify-center rounded text-black text-sm`, */
  wrapperTitle: 'w-full',
}

export default ({
  isAdmin,
  primarySectionLink,
  primarySection,
  date,
  websiteLink,
  title,
  subTitle,
  authorLink,
  author,
  multimediaType,
  multimediaLandscapeXS,
  multimediaLazyDefault,
  multimediaLandscapeS,
  formato,
}) => {
  return (
    <div
      className={`${classes.storyItem} ${
        formato && formato === 'row' ? 'story-item--row' : ''
      }`}>
      <div className={classes.bottom}>
        <div className={classes.left}>
          <div className={classes.top}>
            <a href={primarySectionLink} className={classes.section}>
              {primarySection}
            </a>
            <p className={classes.date}>{formatDateLocalTimeZone(date)}</p>
          </div>
          <div className={classes.wrapperTitle}>
            <h2 className={classes.contentTitle}>
              <a className={classes.title} href={websiteLink} title={title}>
                {title}
              </a>
            </h2>
            <p className={classes.subtitle}>{subTitle}</p>
            <a href={primarySectionLink} className={classes.sectionHidden}>
              {primarySection}
            </a>
          </div>
          <div className={classes.contenetAuthor}>
            <a href={authorLink} className={classes.author}>
              {author}
            </a>
          </div>
        </div>
        <figure className={classes.right}>
          <a href={websiteLink} className={classes.rightLink}>
            <Icon type={multimediaType} iconClass={classes.icon} />
            <picture>
              <source
                className={isAdmin ? '' : 'lazy'}
                media="(max-width: 639px)"
                srcSet={isAdmin ? multimediaLandscapeXS : multimediaLazyDefault}
                data-srcset={multimediaLandscapeXS}
              />
              <img
                alt={title}
                className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
                src={isAdmin ? multimediaLandscapeS : multimediaLazyDefault}
                data-src={multimediaLandscapeS}
              />
            </picture>
          </a>
        </figure>
      </div>
    </div>
  )
}
