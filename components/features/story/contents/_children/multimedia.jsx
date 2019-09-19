/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import Video from './video'
import Imagen from './image'
import Html from './html'
import VideoNativo from './video-nativo'

const classes = {
  mp3: 'pt-10',
}

const StoryContentChildMultimedia = ({ data, showCaption } = []) => {
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
    path_mp3: { content: mp3 = '' } = {},
  } = data
  const { type: typeImage, caption = '' } = basic || {}

  return (
    <>
      {!youtubeId && !typeInfo && !typeEmbed && typeImage ? (
        <Imagen data={basic} showCaption={showCaption} />
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
      {mp3 && (
        <div className={classes.mp3}>
          <audio controls>
            <source src={mp3} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </>
  )
}

export default StoryContentChildMultimedia
