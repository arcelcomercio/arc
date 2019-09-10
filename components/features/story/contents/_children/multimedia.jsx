import React from 'react'
import Video from './video'
import Imagen from './image'
import Html from './html'
import VideoNativo from './video-nativo'

const StoryContentChildMultimedia = ({ data } = []) => {
  const {
    basic_video: {
      embed_html: embedHtml = '',
      type: typoVideo = '',
      streams,
      description: { basic: descriptionVideo = '' } = {},
    } = {},
    basic = {},
    infografia: { type: typeInfo = '' } = {},
    youtube_id: { content: youtubeId = '' } = {},
    basic_html: {
      type: typeEmbed = '',
      content: embedHtmlPromoItems = '',
    } = {},
  } = data
  const { type: typeImage, caption = '' } = basic || {}

  return (
    <>
      {!youtubeId && !typeInfo && !typeEmbed && typeImage ? (
        <Imagen data={basic} />
      ) : (
        <Html data={embedHtmlPromoItems} caption={caption} />
      )}

      {youtubeId && (
        <iframe
          title={`Youtube - ${youtubeId}`}
          width="100%"
          height="373"
          src={`https://www.youtube.com/embed/${youtubeId}?&autoplay=1`}
          frameBorder="0"
          allowFullScreen
        />
      )}

      {typoVideo === 'video' && embedHtml ? (
        <Video data={embedHtml} description={descriptionVideo} />
      ) : (
        <>{streams && <VideoNativo streams={streams} />}</>
      )}
    </>
  )
}

export default StoryContentChildMultimedia
