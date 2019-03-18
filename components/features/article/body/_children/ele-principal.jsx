import React, { Fragment } from 'react'
import Video from './video'
import Imagen from './image'

const ElePrincipal = props => {
  const {
    data: { basic_video: basicVideo, basic },
  } = props
  return (
    <Fragment>
      {basic && basic.type === 'image' && <Imagen data={basic} />}
      {basicVideo && basicVideo.type === 'video' && (
        <Video data={basicVideo.embed_html} />
      )}
    </Fragment>
  )
}

export default ElePrincipal
