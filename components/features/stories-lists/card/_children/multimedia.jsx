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
  // const multimediaType = ConfigParams.VIDEO
  return (
    <figure className={classes.figure}>
      {getMultimediaIcon(multimediaType) && (
        <i className={`${getMultimediaIcon(multimediaType)} ${classes.icon}`} />
      )}

      {multimedia ? (
        <a href={urlNews}>
          <picture>
            <source
              data-type="srcset"
              srcSet={multimedia}
              media="(max-width: 639px)"
            />
            <img data-type="src" className="w-full" src={multimedia} alt="" />
          </picture>
        </a>
      ) : null}
    </figure>
  )
}

export default StoriesListsCardChildMultimedia
