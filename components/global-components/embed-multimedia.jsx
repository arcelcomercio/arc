import React, { Fragment } from 'react'

const GOLDFISH = 'goldfish'
const YOUTUBE = 'youtube'
const IMAGE = 'image'

const videoGoldfish = multimediaSource => {
  return (
    <Fragment>
      <div
        id={`powa-${multimediaSource}`}
        data-env="sandbox"
        data-api="sandbox"
        data-org="elcomercio"
        data-uuid={multimediaSource}
        data-aspect-ratio="0.562"
        className="powa"
      />
      <script src="https://d1tqo5nrys2b20.cloudfront.net/sandbox/powaBoot.js?org=elcomercio" />
    </Fragment>
  )
}

const videoYoutube = (codeId, width = '100%', height = '100%') => {
  return (
    <iframe
      width={width}
      height={height}
      src={codeId}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      title="Youtube"
      allowFullScreen
    />
  )
}

const image = (url, title) => {
  return <img src={url} alt={title} />
}

const getMultimedia = type => {
  let fx = image
  if (type === GOLDFISH) {
    fx = videoGoldfish
  } else if (type === YOUTUBE) {
    fx = videoYoutube
  }
  return fx
}

const EmbedMultimedia = props => {
  const { type, source, title = '' } = props
  return getMultimedia(type)(source, title)
}

export default EmbedMultimedia
