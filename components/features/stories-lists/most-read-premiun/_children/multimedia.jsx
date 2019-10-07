import React from 'react'
import { getMultimediaIcon } from '../../../../utilities/helpers'

const classes = {
  figure: 'position-relative mb-10 overflow-hidden',
  icon:
    'position-absolute text-center multimedia__icon mx-auto rounded text-gray-100',
  image: 'stories-l-card__image w-full object-center object-cover',
}

export default ({
  urlNews,
  multimedia,
  lazyImage,
  multimediaType,
  isAdmin,
}) => {
  return (
    <figure className={classes.figure}>
      {getMultimediaIcon(multimediaType) && (
        <i className={`${getMultimediaIcon(multimediaType)} ${classes.icon}`} />
      )}

      {multimedia && (
        <a href={urlNews}>
          <picture>
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
              src={isAdmin ? multimedia : lazyImage}
              data-src={multimedia}
              alt=""
            />
          </picture>
        </a>
      )}
    </figure>
  )
}
