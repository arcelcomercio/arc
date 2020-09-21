import ENV from 'fusion:environment'
import React from 'react'
import {
  VIDEO,
  ELEMENT_YOUTUBE_ID,
} from '../utilities/constants/multimedia-types'

import { defaultImage } from '../utilities/assets'

const GOLDFISH = 'goldfish'
const YOUTUBE = 'youtube'

const GOLDFISH_ENV = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
const ORG_ID = 'elcomercio'

const EmbedMultimedia = props => {
  const image = (
    url,
    { deployment, contextPath, website, title = '', linkStory = '' }
  ) => {
    return (
      <a itemProp="url" href={linkStory} className="w-full h-full">
        <img
          // Siempre está en la parte inicial de la pag, no hace falta lazyload
          // TODO: buscar la manera de aplicar resize a esta imagen.
          className="embed-multimedia-image w-full h-full object-cover"
          src={
            url ||
            defaultImage({
              deployment,
              contextPath,
              arcSite: website,
              size: 'md',
            })
          }
          alt={title}
        />
      </a>
    )
  }

  const videoYoutube = (codeId, { width = '100%', height = '100%' }) => {
    return (
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${codeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        title="Youtube"
        allowFullScreen
        className="youtube-iframe"
      />
    )
  }

  const videoGoldfish = (
    multimediaSource,
    { deployment, contextPath, website, title = '', secondMultimedia = '' }
  ) => {
    return multimediaSource ? (
      <>
        <div
          id={`powa-${multimediaSource}`}
          data-env={GOLDFISH_ENV}
          data-api={GOLDFISH_ENV}
          data-org={ORG_ID}
          data-uuid={multimediaSource}
          data-aspect-ratio="0.562"
          className="powa w-full">
          {secondMultimedia &&
            image(secondMultimedia, {
              deployment,
              contextPath,
              website,
              title,
            })}
        </div>
        <script
          async
          src={deployment(
            `${contextPath}/resources/assets/js/powaSettings.min.js`
          )}
        />
        <script
          async
          src={`https://d1tqo5nrys2b20.cloudfront.net/${GOLDFISH_ENV}/powaBoot.js?org=elcomercio`}
        />
      </>
    ) : (
      image(multimediaSource, { deployment, contextPath, website, title })
    )
  }

  const getMultimedia = type => {
    if (type === GOLDFISH || type === { VIDEO, ELEMENT_YOUTUBE_ID }.VIDEO) {
      return videoGoldfish
    }
    if (
      type === YOUTUBE ||
      type === { VIDEO, ELEMENT_YOUTUBE_ID }.ELEMENT_YOUTUBE_ID
    ) {
      return videoYoutube
    }
    return image
  }

  const {
    type,
    source,
    deployment,
    contextPath,
    website,
    title = '',
    linkStory = '',
    secondMultimedia = '',
    width = '100%',
    height = '100%',
  } = props

  return getMultimedia(type)(source, {
    deployment,
    contextPath,
    title,
    website,
    linkStory,
    secondMultimedia,
    width,
    height,
  })
}

export default EmbedMultimedia
