import React, { PureComponent } from 'react'
// import { alignmentClassesPropType } from '@arc-core-components/feature_article-body/build/helpers'

import StoryData from '../utilities/story-data'
import { reduceWord, formatDateLocalTimeZone } from '../utilities/helpers'

const classes = {
  storyItem: `story-item w-full pr-20 pl-20 pb-20 mb-20 border-b-1 border-solid border-gray lg:p-0`,
  top: 'story-item__top flex items-center md:flex-col md:items-start',
  section: 'story-item__section capitalize text-sm text-black md:mb-15',
  date: 'story-item__date font-thin ml-5 text-xs text-gray-300 md:mt-5 md:ml-0',
  bottom: 'story-item__bottom flex pb-20',
  left: 'story-item__left flex flex-col justify-between pr-20 ',
  contentTitle: 'story-item__content-title overflow-hidden',
  title: `story-item__title block overflow primary-font line-h-xs mt-10`,
  subtitle: `story-item__subtitle overflow-hidden hidden mt-10 mb-10 text-md text-gray-200 line-h-xs`,
  contenetAuthor: 'hidden',
  author: `story-item__author block uppercase mt-10 font-thin text-xs text-gray-200`,
  right: 'story-item__right position-relative',
  rightLink: 'story-item__link  h-full',
  iconGallery: `story-item__icon icon-img position-absolute flex items-center justify-center text-white w-full h-full`,
  iconVideo: `story-item__icon icon-video position-absolute flex items-center justify-center text-white w-full h-full`,
  img: 'story-item__img object-cover w-full h-full',
  /*   iconImg: `story-item__icon icon-img position-absolute flex items-center justify-center rounded text-black text-sm`, */
}

class StoriesList extends PureComponent {
  render() {
    const { data, deployment, contextPath, arcSite, formato } = this.props
    const element = new StoryData({
      data,
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })
    return (
      <div
        className={`${classes.storyItem} ${
          formato && formato === 'row' ? 'story-item--row' : ''
        }`}>
        <div className={classes.bottom}>
          <div className={classes.left}>
            <div className={classes.top}>
              <a href={element.primarySectionLink} className={classes.section}>
                {element.primarySection}
              </a>
              <p className={classes.date}>
                {formatDateLocalTimeZone(element.date)}
              </p>
            </div>
            <div>
              <h2 className={classes.contentTitle}>
                <a className={classes.title} href={element.link}>
                  {element.title}
                </a>
              </h2>
              <p className={classes.subtitle}>{reduceWord(element.subTitle)}</p>
            </div>
            <div className={classes.contenetAuthor}>
              <a href={element.authorLink} className={classes.author}>
                {element.author}
              </a>
            </div>
          </div>
          <figure className={classes.right}>
            {/* TODO: Actualizar iconos con multimediaIcon */}
            <a href={element.link} className={classes.rightLink}>
              {element.multimediaType.toLowerCase() === 'basic_gallery' && (
                <span className={classes.iconGallery} />
              )}

              {element.multimediaType.toLowerCase() === 'basic_video' && (
                <span className={classes.iconVideo} />
              )}
              <picture>
                <source
                  media="(min-width: 640px)"
                  srcSet={element.multimediaLandscapeS}
                />
                <img
                  alt={element.title}
                  className={classes.img}
                  src={element.multimediaLandscapeXS}
                  loading="lazy"
                />
              </picture>
            </a>
          </figure>
        </div>
      </div>
    )
  }
}

export default StoriesList
