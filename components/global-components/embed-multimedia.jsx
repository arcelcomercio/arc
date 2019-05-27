import React, { Fragment } from 'react'
import ConfigParams from '../utilities/config-params'
import { defaultImage } from '../utilities/helpers'

const GOLDFISH = 'goldfish'
const YOUTUBE = 'youtube'
const IMAGE = 'image'

const GOLDFISH_ENV = 'sandbox'

const EmbedMultimedia = props => {
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
      />
    )
  }

  const videoGoldfish = (multimediaSource, { website = 'elcomercio' }) => {
    return (
      <div
        id={`powa-${multimediaSource}`}
        data-env={GOLDFISH_ENV}
        data-api={GOLDFISH_ENV}
        data-org={website}
        data-uuid={multimediaSource}
        data-aspect-ratio="0.562"
        className="powa"
      />
    )
  }

  const image = (url, { deployment, contextPath, website, title = '' }) => {
    return (
      <img
        className="embed-multimedia-image full-width"
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

  const getMultimedia = type => {
    let fx = () => ''
    if (type === GOLDFISH || type === ConfigParams.VIDEO) {
      fx = videoGoldfish
    } else if (type === YOUTUBE) {
      fx = videoYoutube
    } else if (
      type === IMAGE ||
      type === ConfigParams.GALLERY ||
      type === ConfigParams.IMAGE
    ) {
      fx = image
    }
    return fx
  }

  const { type, source, deployment, contextPath, website, title = '' } = props
  return (
    <Fragment>
      {getMultimedia(type)(source, {
        deployment,
        contextPath,
        title,
        website,
      })}
      <script src="https://d1tqo5nrys2b20.cloudfront.net/sandbox/powaBoot.js?org=elcomercio" />
    </Fragment>
  )
}

export default EmbedMultimedia
