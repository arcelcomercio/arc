import React from 'react'
import { FC } from 'types/features'
import { Streams } from 'types/story'

import LiteYoutube from '../../../../../global-components/lite-youtube'
import Video from './video'

const classes = {
  newsEmbed: '__embed',
  caption: '__caption ',
}
interface FeatureProps {
  embedHtml?: string
  descriptionVideo?: string
  primarySection?: string
  duration?: number
  classImage?: string
  content?: string
  streams?: Streams[]
  header?: boolean
  caption: string
  id?: string
  imageUrl?: string
}
const StoryContentChildHtml: FC<FeatureProps> = ({
  embedHtml = '',
  descriptionVideo = '',
  primarySection = '',
  duration = 0,
  streams = [],
  classImage = 'story-contents',
  header = false,
  caption,
  id = '',
  imageUrl = '',
}) => {
  if (embedHtml?.includes('id="powa-') && !header) {
    return (
      <Video
        description={descriptionVideo}
        classImage={classImage}
        primarySection={primarySection}
        duration={duration}
        streams={streams}
        id={id}
        imageUrl={imageUrl}
        content={
          embedHtml &&
          embedHtml
            .replace('data-mp4="', 'data-stream="')
            .replace(
              /https:\/\/elcomercio.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(mp4))/g,
              'https://img.elcomercio.pe$1'
            )
            .replace(
              /https:\/\/peru21.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(mp4))/g,
              'https://img.peru21.pe$1'
            )
            .replace(
              /https:\/\/gestion.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
              'https://img.gestion.pe$1'
            )
        }
      />
    )
  }

  const hasYoutubeVideo = /<iframe.+youtu\.be|youtube\.com/.test(embedHtml)
  if (hasYoutubeVideo) {
    const [, videoId] = embedHtml?.match(/\/embed\/([\w-]+)/) || []
    if (videoId) return <LiteYoutube videoId={videoId} loading="lazy" />
  }

  return (
    <>
      <div
        className={`${classImage}${classes.newsEmbed}`}
        dangerouslySetInnerHTML={{
          __html: embedHtml,
        }}
      />
      {caption && embedHtml && (
        <div className={`${classImage}${classes.caption}`}>{caption}</div>
      )}
    </>
  )
}

export default StoryContentChildHtml
