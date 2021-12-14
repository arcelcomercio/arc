/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react'

import LiteYoutube from '../../../../global-components/lite-youtube'
import VideoJwplayer from '../../../../global-components/video-jwplayer'
import Html from './html'
import Imagen from './image'
import Video from './video'
import VideoNativo from './video-nativo'

const classes = {
  audio: 's-multimedia__audio w-full',
}

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
    path_mp3: { content: mp3 = '' } = {},
    multimedia,
    showCaption,
    primaryImage,
    completeImage,
    classImage,
    promoItemJwplayer = {},
    lite = false,
  } = data

  const { type: typeImage, caption = '', credits: { by = [] } = {} } =
    basic || {}

  const { name: authorName = '' } = by[0] || {}

  return (
    <>
      {promoItemJwplayer.key ? (
        <>
          <VideoJwplayer data={promoItemJwplayer} lite={lite} />
        </>
      ) : (
        <>
          {typoVideo !== 'video' &&
          !youtubeId &&
          !typeInfo &&
          !typeEmbed &&
          typeImage ? (
            <Imagen
              multimedia={multimedia}
              caption={caption}
              authorName={authorName}
              showCaption={showCaption}
              primaryImage={primaryImage}
              completeImage={completeImage}
              classImage={classImage}
            />
          ) : (
            <Html data={embedHtmlPromoItems} caption={caption} {...data} />
          )}

          {youtubeId && <LiteYoutube videoId={youtubeId} />}
          {typoVideo === 'video' && embedHtml ? (
            <Video
              data={embedHtml}
              description={descriptionVideo}
              classImage={classImage}
              {...basic}
            />
          ) : (
            <>{streams && <VideoNativo streams={streams} />}</>
          )}
          {mp3 && (
            <>
              <audio className={classes.audio} controls>
                <source src={mp3} type="audio/mpeg" />
              </audio>
            </>
          )}
        </>
      )}
    </>
  )
}

export default StoryContentChildMultimedia
