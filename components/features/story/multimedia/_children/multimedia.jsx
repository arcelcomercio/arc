/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import Video from './video'
import Imagen from './image'
import Html from './html'
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
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
    multimediaLazyDefault,
    showCaption,
    primaryImage,
    completeImage,
    classImage,
  } = data

  const { type: typeImage, caption = '' } = basic || {}

  const parameters = {
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLazyDefault,
    multimediaLarge,
    caption,
    showCaption,
    primaryImage,
    completeImage,
    classImage,
  }

  return (
    <>
      {typoVideo !== 'video' &&
      !youtubeId &&
      !typeInfo &&
      !typeEmbed &&
      typeImage ? (
        <Imagen {...parameters} />
      ) : (
        <Html data={embedHtmlPromoItems} caption={caption} {...data} />
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
  )
}

export default StoryContentChildMultimedia
