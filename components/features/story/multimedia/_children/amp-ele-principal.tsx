import React from 'react'

import ConfigParams from '../../../../utilities/config-params'
import Html from './amp-html'
import Imagen from './amp-image'
import Video from './amp-video'

export default (props) => {
  const {
    data: {
      basic_video: basicVideo = {},
      basic: data = {},
      youtube_id: { content: youtubeId = '' } = {},
      basic_html: basicHtml,
      path_mp3: { content: mp3 = '' } = {},
    } = {},
  } = props
  const imgTag = 'amp-img'
  const parameters = { data, imgTag, basicVideo, basicHtml }
  return (
    <>
      {basicHtml && <Html {...parameters} />}
      {data.type === ConfigParams.ELEMENT_IMAGE && !basicHtml && !youtubeId && (
        <Imagen {...parameters} />
      )}
      {youtubeId && (
        <amp-youtube
          class="media"
          data-videoid={youtubeId}
          layout="responsive"
          width="550"
          height="350"
        />
      )}
      {basicVideo.type === ConfigParams.ELEMENT_VIDEO && !basicHtml && (
        <Video data={basicVideo} />
      )}
      {mp3 && (
        <amp-audio src={mp3} class="w-full" layout="fixed-height" height="44" />
      )}
    </>
  )
}
