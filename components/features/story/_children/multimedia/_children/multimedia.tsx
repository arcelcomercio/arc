import * as React from 'react'
import { FC } from 'types/features'
import { EmbedConfig, PromoItems } from 'types/story'

import LiteYoutube from '../../../../../global-components/lite-youtube'
import VideoJwplayer from '../../../../../global-components/video-jwplayer'
import Html from './html'
import Imagen from './image'
import Video from './video'
import VideoNativo from './video-nativo'

const classes = {
  audio: 's-multimedia__audio w-full',
}

interface FeatureProps {
  primarySection?: string
  authorEmail?: string
  promoItems?: PromoItems
  multimedia?: string
  primaryImage?: boolean
  completeImage?: boolean
  promoItemJwplayer?: EmbedConfig
  classImage?: string
  lite?: boolean
  showCaption?: boolean
}
const StoryContentChildMultimedia: FC<FeatureProps> = (data) => {
  const {
    primarySection,
    promoItems,
    multimedia,
    primaryImage,
    completeImage,
    promoItemJwplayer,
    classImage,
    lite = false,
    showCaption = true,
  } = data

  const contenEmbed = promoItems?.basic_html?.content
  const typeEmbed = promoItems?.basic_html?.type
  const youtubeId = promoItems?.youtube_id?.content
  const typeInfo = promoItems?.youtube_id?.type
  const typeImage = promoItems?.basic?.type
  const caption = promoItems?.basic?.caption
  const imageUrl = promoItems?.basic?.url
  const streams = promoItems?.basic_video?.streams
  const embedHtml = promoItems?.basic_video?.embed_html
  const id = promoItems?.basic_video?._id
  const duration = promoItems?.basic_video?.duration
  const typoVideo = promoItems?.basic_video?.type
  const descriptionVideo = promoItems?.basic_video?.description
  const mp3 = promoItems?.path_mp3?.content

  return (
    <>
      {promoItemJwplayer?.key ? (
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
              showCaption={showCaption}
              primaryImage={primaryImage}
              completeImage={completeImage}
              classImage={classImage}
            />
          ) : (
            <Html
              embedHtml={embedHtml}
              descriptionVideo={descriptionVideo}
              primarySection={primarySection}
              duration={duration}
              classImage={classImage}
              content={contenEmbed}
              streams={streams}
              id={id}
              imageUrl={imageUrl}
              caption={caption}
            />
          )}

          {youtubeId && <LiteYoutube videoId={youtubeId} />}
          {typoVideo === 'video' && embedHtml ? (
            <Video
              description={descriptionVideo}
              classImage={classImage}
              primarySection={primarySection}
              content={contenEmbed}
              duration={duration}
              streams={streams}
              id={id}
              imageUrl={imageUrl}
            />
          ) : (
            <>{streams && <VideoNativo streams={streams} />}</>
          )}
          {mp3 && (
            <>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
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
