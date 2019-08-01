import React from 'react'

import Icon from '../../../../global-components/multimedia-icon'
import {
  formatDateLocalTimeZone,
  createMarkup,
} from '../../../../utilities/helpers'

export default props => {
  const {
    websiteLink,
    multimediaLandscapeMD,
    title,
    multimediaType,
    date,
    section,
    sectionName,
    freeHtml,
  } = props
  return (
    <article className="featured-multimedia flex flex-col col-1 row-1 bg-black p-20">
      <div className="featured-multimedia__section overflow-hidden mb-10">
        {freeHtml ? (
          <div
            className="h-full"
            dangerouslySetInnerHTML={createMarkup(freeHtml)}
          />
        ) : (
          <a className="text-white text-md uppercase" href={`${section}/`}>
            {sectionName}
          </a>
        )}
      </div>

      <a className="mb-25 bg-gray-300 position-relative" href={websiteLink}>
        <picture>
          <img
            className="featured-multimedia__img object-cover w-full block"
            src={multimediaLandscapeMD}
            alt={title}
          />
          <Icon type={multimediaType} iconClass="" />
        </picture>
      </a>
      <time
        className="text-primary-color text-md mb-5 secondary-font font-bold"
        dateTime={date}>
        {date && formatDateLocalTimeZone(date)}
      </time>
      <h2 className="flex-1 text-md line-h-sm">
        <a
          className="featured-multimedia__title-link text-white overflow-hidden"
          href={websiteLink}>
          {title}
        </a>
      </h2>

      <a
        className="featured-multimedia__button bg-tertiary text-white secondary-font flex justify-center items-center rounded-sm font-bold mx-auto"
        href={`${section}/`}>
        Ver ediciones
      </a>
    </article>
  )
}
