import React from 'react'
import { RawHtml } from '@arc-core-components/feature_article-body'
import Video from './video'

const classes = {
  newsEmbed: 'story-content__embed',
  caption:
    'story-content__caption pt-10 secondary-font text-md pb-10 pr-20 pl-20',
}

const StoryContentChildHtml = ({ data, caption, header = false }) => {
  return (
    <>
      {data.includes('id="powa-') && !header ? (
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
            )}
          description={caption}
        />
      ) : (
        <>
          <RawHtml content={data} className={classes.newsEmbed} />
          {caption && data && <div className={classes.caption}>{caption}</div>}
        </>
      )}
    </>
  )
}

export default StoryContentChildHtml
