import React from 'react'
import { GetMultimediaContent } from '../../../../utilities/helpers'

// TODO: para que usan estos data-type?

const StoriesListsCardChildMultimedia = ({ urlNews, promoItems }) => {
  const imagen = promoItems.basic ? promoItems.basic.url || '' : ''
  const multimedia = GetMultimediaContent(promoItems)
  const { url, medio } = multimedia

  return (
    <figure>
      {medio === 'video' && <span>&#8227;</span>}
      {medio === 'gallery' && <span>G</span>}
      {url ? (
        <a href={urlNews}>
          <picture>
            <source
              data-type="srcset"
              srcSet={imagen}
              media="(max-width: 639px)"
            />
            <img datatype="src" src={url} alt="" />
          </picture>
        </a>
      ) : null}
    </figure>
  )
}

export default StoriesListsCardChildMultimedia
