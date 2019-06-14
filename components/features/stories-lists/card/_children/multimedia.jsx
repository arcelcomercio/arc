import React from 'react'
import ConfigParams from '../../../../utilities/config-params'

// TODO: para que usan estos data-type?

const classes = {
  figure: 'position-relative',
  icon: 'position-absolute text-center multimedia__icon mx-auto rounded',
}

const StoriesListsCardChildMultimedia = ({
  urlNews,
  multimedia,
  multimediaType,
}) => {
  return (
    <figure className={classes.figure}>
      {multimediaType === ConfigParams.VIDEO && (
        <span className={classes.icon}>&#8227;</span>
      )}
      {multimediaType === ConfigParams.GALLERY && (
        <span className={classes.icon}>G</span>
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
