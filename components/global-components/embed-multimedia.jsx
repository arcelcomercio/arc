import ENV from 'fusion:environment'
import React from 'react'
import ConfigParams from '../utilities/config-params'
import { defaultImage } from '../utilities/helpers'

const GOLDFISH = 'goldfish'
const YOUTUBE = 'youtube'

const GOLDFISH_ENV = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
const ORG_ID = 'elcomercio'

const EmbedMultimedia = props => {
  const image = (url, { deployment, contextPath, website, title = '' }) => {
    return (
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
    { deployment, contextPath, website, title = '' }
  ) =>
    multimediaSource ? (
      <>
        <div
          id={`powa-${multimediaSource}`}
          data-env={GOLDFISH_ENV}
          data-api={GOLDFISH_ENV}
          data-org={ORG_ID}
          data-uuid={multimediaSource}
          data-aspect-ratio="0.562"
          className="powa w-full"
        />
        <script
          async
          src={`https://d1tqo5nrys2b20.cloudfront.net/${GOLDFISH_ENV}/powaBoot.js?org=elcomercio`}
        />
      </>
    ) : (
      image(multimediaSource, { deployment, contextPath, website, title })
    )

  const getMultimedia = type => {
    if (type === GOLDFISH || type === ConfigParams.VIDEO) {
      return videoGoldfish
    }
    if (type === YOUTUBE) {
      return videoYoutube
    }
    return image
  }

  const { type, source, deployment, contextPath, website, title = '' } = props
  return getMultimedia(type)(source, {
    deployment,
    contextPath,
    title,
    website,
  })
}

export default EmbedMultimedia
