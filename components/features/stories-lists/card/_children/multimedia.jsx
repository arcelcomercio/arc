import React from 'react'
import { getMultimediaIcon } from '../../../../utilities/helpers'

const classes = {
  figure: 'position-relative mb-10',
  icon:
    'position-absolute text-center multimedia__icon mx-auto rounded text-gray-100',
}

const StoriesListsCardChildMultimedia = ({
  urlNews,
  multimedia,
  multimediaType,
}) => {
  return (
    <figure className={classes.figure}>
      {getMultimediaIcon(multimediaType) && (
        <i className={`${getMultimediaIcon(multimediaType)} ${classes.icon}`} />
      )}

      {multimedia && (
        <a href={urlNews}>
          <picture>
            <img className="w-full" src={multimedia} alt="" loading="lazy" />
          </picture>
        </a>
      )}
    </figure>
  )
}

export default StoriesListsCardChildMultimedia
