// TODO:
// Se comenzara a usar story-new a partir del comercio
// y esto se eliminará junto con su feature
import React from 'react'

import ConfigParams from '../utilities/config-params'
import { formatDateLocalTimeZoneTemp,reduceWord } from '../utilities/helpers'
import StoryData from '../utilities/story-data'
// import { alignmentClassesPropType } from '@arc-core-components/feature_article-body/build/helpers'
import Icon from './multimedia-icon'

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
  contenetAuthor: 'story-item__author-wrapper hidden',
  author: `story-item__author block uppercase mt-10 font-thin text-xs text-gray-200`,
  right: 'story-item__right position-relative overflow-hidden',
  rightLink: 'story-item__link  h-full',
  icon: `story-item__icon position-absolute flex items-center justify-center text-white w-full h-full`,
  // iconVideo: `story-item__icon icon-video position-absolute flex items-center justify-center text-white w-full h-full`,
  img: 'story-item__img object-cover object-center w-full h-full',
  /*   iconImg: `story-item__icon icon-img position-absolute flex items-center justify-center rounded text-black text-sm`, */
  wrapperTitle: 'story-item__information-box w-full',
  opinion: 'story-item__opinion',
}

const StoriesList = ({
  data,
  deployment,
  contextPath,
  arcSite,
  formato,
  isAdmin,
}) => {
  const element = new StoryData({
    data,
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })
  const isOpinionPeru21 =
    element.primarySectionLink.includes('/opinion/') &&
    arcSite === ConfigParams.SITE_PERU21

  console.log(arcSite)

  return (
    <div
      className={`${classes.storyItem} ${
        formato && formato === 'row' ? 'story-item--row' : ''
      }`}>
      {arcSite === 'trome' ? (
        <></>
      ) : (
        <div className={classes.bottom}>
          <div
            className={`${classes.left} ${
              isOpinionPeru21 ? classes.opinion : ''
            }`}>
            <div className={classes.top}>
              <a
                itemProp="url"
                href={element.primarySectionLink}
                className={classes.section}>
                {element.primarySection}
              </a>
              <p itemProp="description" className={classes.date}>
                {typeof window === 'undefined'
                  ? formatDateLocalTimeZoneTemp(element.date)
                  : formatDateLocalTimeZoneTemp(element.date, '-', true)}
              </p>
            </div>
            <div className={classes.wrapperTitle}>
              <h2 itemProp="name" className={classes.contentTitle}>
                <a
                  itemProp="url"
                  className={classes.title}
                  href={element.websiteLink}>
                  {reduceWord(element.title)}
                </a>
              </h2>
              <p itemProp="description" className={classes.subtitle}>
                {reduceWord(element.subTitle)}
              </p>
              <a
                itemProp="url"
                href={element.primarySectionLink}
                className={classes.sectionHidden}>
                {element.primarySection}
              </a>
            </div>
            <div className={classes.contenetAuthor}>
              <a
                itemProp="url"
                href={element.authorLink}
                className={classes.author}>
                {element.author}
              </a>
            </div>
          </div>

          <figure className={classes.right}>
            {/* TODO: Actualizar iconos con multimediaIcon */}
            <a
              itemProp="url"
              href={element.websiteLink}
              className={classes.rightLink}>
              <Icon type={element.multimediaType} iconClass={classes.icon} />
              <picture>
                <source
                  className={isAdmin ? '' : 'lazy'}
                  media="(max-width: 639px)"
                  srcSet={
                    isAdmin
                      ? element.multimediaLandscapeXS
                      : element.multimediaLazyDefault
                  }
                  data-srcset={element.multimediaLandscapeXS}
                />
                <img
                  alt={element.title}
                  className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
                  src={
                    isAdmin
                      ? element.multimediaLandscapeS
                      : element.multimediaLazyDefault
                  }
                  data-src={element.multimediaLandscapeS}
                />
              </picture>
            </a>
          </figure>
        </div>
      )}
    </div>
  )
}

export default React.memo(StoriesList)
