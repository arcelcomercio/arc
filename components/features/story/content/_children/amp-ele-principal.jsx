import React from 'react'
import Video from './amp-video'
import Html from './amp-html'
import Imagen from './image'
import ConfigParams from '../../../../utilities/config-params'

export default props => {
  const {
    data: {
      basic_video: basicVideo = {},
      basic: data = {},
      basic_html: basicHtml,
    } = {},
  } = props
  const imgTag = 'amp-img'
  const parameters = { data, imgTag, basicVideo, basicHtml }
  return (
    <>
      {data.type === ConfigParams.ELEMENT_IMAGE && basicHtml && (
        <Html {...parameters} />
      )}
      {data.type === ConfigParams.ELEMENT_IMAGE && !basicHtml && (
        <Imagen {...parameters} />
      )}
      {basicVideo.type === ConfigParams.ELEMENT_VIDEO && !basicHtml && (
        <Video data={basicVideo} />
      )}
    </>
  )
}
