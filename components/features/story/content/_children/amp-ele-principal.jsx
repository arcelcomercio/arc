import React from 'react'
import Video from './video'
import Imagen from './image'
import ConfigParams from '../../../../utilities/config-params'

export default props => {
  const {
    data: { basic_video: basicVideo = {}, basic: data = {} } = {},
  } = props
  const imgTag = 'amp-img'
  const parameters = { data, imgTag }
  return (
    <>
      {data.type === ConfigParams.ELEMENT_IMAGE && <Imagen {...parameters} />}
      {basicVideo.type === ConfigParams.ELEMENT_VIDEO && (
        <Video data={basicVideo.embed_html} />
      )}
    </>
  )
}
