import { RawHtml } from '@arc-core-components/feature_article-body'
import * as React from 'react'

import LiteYoutube from '../../../../global-components/lite-youtube'
import Video from './video'

const classes = {
  newsEmbed: 'story-content__embed',
  caption:
    'story-content__caption pt-10 secondary-font text-md pb-10 pr-20 pl-20',
}

const StoryContentChildHtml: React.FC<{
  data: any
  caption: string
  primaryImage: boolean
  basic: any
  header?: boolean
}> = ({ data, caption, primaryImage, basic = {}, header = false }) => {
  if (data.includes('id="powa-') && !header) {
    return (
      <Video
        data={data
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
          )}
        description={caption}
        {...basic}
      />
    )
  }

  const hasYoutubeVideo = /<iframe.+youtu\.be|youtube\.com/.test(data)
  if (hasYoutubeVideo) {
    const [, videoId] = data.match(/\/embed\/([\w-]+)/) || []
    if (videoId)
      return (
        <LiteYoutube
          videoId={videoId}
          loading={primaryImage ? 'auto' : 'lazy'}
        />
      )
  }

  return (
    <>
      <RawHtml content={data} className={classes.newsEmbed} />
      {caption && data && <div className={classes.caption}>{caption}</div>}
    </>
  )
}

export default StoryContentChildHtml
