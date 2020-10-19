import React from 'react'
import Video from './amp-video'
import Html from './amp-html'
import Imagen from './amp-image'
import ConfigParams from '../../../../utilities/config-params'
import { VIDEO_JWPLAYER } from '../../../../utilities/constants/subtypes'

export default props => {
  const {
    data: {
      basic_video_Jwplayer: { key = '' } = {},
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
      {key ? (
        <>
          <amp-jwplayer
            data-player-id={VIDEO_JWPLAYER}
            data-media-id={key}></amp-jwplayer>
        </>
      ) : (
        <>
          {basicHtml && <Html {...parameters} />}
          {data.type === ConfigParams.ELEMENT_IMAGE &&
            !basicHtml &&
            !youtubeId && <Imagen {...parameters} />}
          {youtubeId && (
            <amp-youtube
              class="media"
              data-videoid={youtubeId}
              layout="responsive"
              width="550"
              height="350"></amp-youtube>
          )}
          {basicVideo.type === ConfigParams.ELEMENT_VIDEO && !basicHtml && (
            <Video data={basicVideo} />
          )}
          {mp3 && (
            <amp-audio
              src={mp3}
              class="w-full"
              layout="fixed-height"
              height="44"></amp-audio>
          )}
        </>
      )}
    </>
  )
}
