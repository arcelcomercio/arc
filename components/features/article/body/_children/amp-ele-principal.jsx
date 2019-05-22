import React, { Fragment } from 'react'
import Video from './video'
import Imagen from './amp-image'

export default props => {
  const { data: { basic_video: basicVideo = {}, basic = {} } = {} } = props
  return (
    <Fragment>
      {basic.type === 'image' && <Imagen data={basic} />}
      {basicVideo.type === 'video' && <Video data={basicVideo.embed_html} />}
    </Fragment>
  )
}
