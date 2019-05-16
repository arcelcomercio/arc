import React, { Fragment } from 'react'
import ConfigParams from '../utilities/config-params'

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

  const image = (url, { title = '' }) => {
    return <img src={url} alt={title} />
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

  const { type, source, website, title = '' } = props
  return getMultimedia(type)(source, { title, website })
}

export default EmbedMultimedia
