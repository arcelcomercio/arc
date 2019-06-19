import React from 'react'
import Video from './video'
import Imagen from './amp-image'
import ConfigParams from '../../../../utilities/config-params'

export default props => {
  const { data: { basic_video: basicVideo = {}, basic = {} } = {} } = props
  return (
    <>
      {basic.type === ConfigParams.ELEMENT_IMAGE && <Imagen data={basic} />}
      {basicVideo.type === ConfigParams.ELEMENT_VIDEO && (
        <Video data={basicVideo.embed_html} />
      )}
    </>
  )
}
