import React from 'react'

import Icon from '../../../../global-components/multimedia-icon'
import {
  formatDateLocalTimeZone,
  createMarkup,
} from '../../../../utilities/helpers'

const classes = {
  featuredMultimedia:
    'featured-multimedia flex flex-col col-1 row-1 bg-black p-20',
  section: 'featured-multimedia__section overflow-hidden mb-10',
  sectionHtml: 'h-full',
  sectionLink: 'text-white text-md uppercase',
  imgContainer: 'mb-25 bg-gray-300 position-relative  overflow-hidden',
  img: 'featured-multimedia__img object-cover w-full block',
  time: 'text-primary-color text-md mb-5 secondary-font font-bold',
  title: 'flex-1 text-md line-h-sm',
  titleLink: 'featured-multimedia__title-link text-white overflow-hidden',
  editionLink:
    'featured-multimedia__button bg-tertiary text-white secondary-font flex justify-center items-center rounded-sm font-bold mx-auto',
}

export default ({
  websiteLink,
  multimediaLandscapeMD,
  multimediaLazyDefault,
  title,
  multimediaType,
  date,
  section,
  sectionName,
  freeHtml,
  isAdmin,
}) => {
  return (
    <article className={classes.featuredMultimedia}>
      <div className={classes.section}>
        {freeHtml ? (
          <div
            className={classes.sectionHtml}
            dangerouslySetInnerHTML={createMarkup(freeHtml)}
          />
        ) : (
          <a className={classes.sectionLink} href={section}>
            {sectionName}
          </a>
        )}
      </div>

      <a className={classes.imgContainer} href={websiteLink}>
        <picture>
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
            src={isAdmin ? multimediaLandscapeMD : multimediaLazyDefault}
            data-src={multimediaLandscapeMD}
            alt={title}
            
          />
          <Icon type={multimediaType} iconClass="" />
        </picture>
      </a>
      <time className={classes.time} dateTime={date}>
        {date && formatDateLocalTimeZone(date)}
      </time>
      <h2 className={classes.title}>
        <a className={classes.titleLink} href={websiteLink}>
          {title}
        </a>
      </h2>

      <a className={classes.editionLink} href={section}>
        Ver ediciones
      </a>
    </article>
  )
}
