import React from 'react'

import {
  GALLERY,
  VIDEO,
} from '../../../../utilities/constants/multimedia-types'
import { reduceWord } from '../../../../utilities/parse/strings'
import formatTime from '../../../../utilities/date-time/format-time'
import { SITE_GESTION } from '../../../../utilities/constants/sitenames'

const formatDateLocalTimeZone = rawDate => {
  const auxDate = new Date(rawDate)
  const today = new Date()
  const format = date =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

  if (format(auxDate) === format(today)) {
    return formatTime(auxDate)
  }
  return format(auxDate)
}

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
  contenetAuthor: 'hidden',
  author: `story-item__author block uppercase mt-10 font-thin text-xs text-gray-200`,
  right: 'story-item__right position-relative overflow-hidden',
  rightLink: 'story-item__link  h-full',
  iconGallery: `story-item__icon icon-img position-absolute flex items-center justify-center text-white w-full h-full`,
  iconVideo: `story-item__icon icon-video position-absolute flex items-center justify-center text-white w-full h-full`,
  img: 'story-item__img object-cover object-center w-full h-full',
  /*   iconImg: `story-item__icon icon-img position-absolute flex items-center justify-center rounded text-black text-sm`, */
  wrapperTitle: 'story-item__information-box w-full',
  iconImagePremium: 'story-item__icon-premium mr-15',
}

export default React.memo(
  ({
    primarySectionLink,
    primarySection,
    date,
    link,
    title,
    subTitle,
    authorLink,
    author,
    multimediaType,
    multimediaLandscapeXS,
    multimediaLandscapeS,
    format,
    isRender,
    isPremium = '',
    arcSite = '',
    logo = '',
  }) => {
    const isGestion = arcSite === SITE_GESTION
    return (
      <div
        className={`${classes.storyItem} ${
          format && format === 'row' ? 'story-item--row' : ''
        }`}>
        <div className={classes.bottom}>
          <div className={classes.left}>
            <div className={classes.top}>
              <div>
                {isPremium && isGestion && (
                  <img
                    className={classes.iconImagePremium}
                    src={logo}
                    alt="premium"
                  />
                )}
                <a
                  itemProp="url"
                  href={primarySectionLink}
                  className={classes.section}>
                  {primarySection}
                </a>
              </div>
              <p itemProp="description" className={classes.date}>
                {date && isRender ? formatDateLocalTimeZone(date) : ''}
              </p>
            </div>
            <div className={classes.wrapperTitle}>
              <h2 itemProp="name" className={classes.contentTitle}>
                <a itemProp="url" className={classes.title} href={link}>
                  {reduceWord(title)}
                </a>
              </h2>
              <p itemProp="description" className={classes.subtitle}>
                {reduceWord(subTitle)}
              </p>
              <a
                itemProp="url"
                href={primarySectionLink}
                className={classes.sectionHidden}>
                {primarySection}
              </a>
            </div>
            <div className={classes.contenetAuthor}>
              <a itemProp="url" href={authorLink} className={classes.author}>
                {author}
              </a>
            </div>
          </div>
          <figure className={classes.right}>
            {/* TODO: Actualizar iconos con multimediaIcon */}
            <a itemProp="url" href={link} className={classes.rightLink}>
              {multimediaType !== null &&
                multimediaType === { GALLERY, VIDEO }.GALLERY && (
                  <span className={classes.iconGallery} />
                )}
              {multimediaType !== null &&
                multimediaType === { GALLERY, VIDEO }.VIDEO && (
                  <span className={classes.iconVideo} />
                )}
              <picture>
                <source
                  media="(max-width: 639px)"
                  srcSet={multimediaLandscapeXS}
                />
                <img
                  alt={title}
                  className={classes.img}
                  src={multimediaLandscapeS}
                />
              </picture>
            </a>
          </figure>
        </div>
      </div>
    )
  }
)
