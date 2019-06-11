import React from 'react'
import ConfigParams from '../../../../utilities/config-params'

// TODO: para que usan estos data-type?

const StoriesListsCardChildMultimedia = ({
  urlNews,
  multimedia,
  multimediaType,
}) => {
  return (
    <figure>
      {multimediaType === ConfigParams.VIDEO && <span>&#8227;</span>}
      {multimediaType === ConfigParams.GALLERY && <span>G</span>}
      {multimedia ? (
        <a href={urlNews}>
          <picture>
            <source
              data-type="srcset"
              srcSet={multimedia}
              media="(max-width: 639px)"
            />
            <img
              datatype="src"
              className="w-full"
              src={multimedia}
              alt=""
            />
          </picture>
        </a>
      ) : null}
    </figure>
  )
}

export default StoriesListsCardChildMultimedia
