import React from 'react'
import { RawHtml } from '@arc-core-components/feature_article-body'
import Video from './video'

const classes = {
  newsEmbed: 'story-content__embed',
  caption:
    'story-content__caption pt-10 secondary-font text-md pb-10 pr-20 pl-20',
}

const StoryContentChildImage = ({ data, caption, header = false }) => {
  return (
    <>
      {data.includes('id="powa-') && !header ? (
        <Video
          data={data.replace('data-mp4="', 'data-stream="')}
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

export default StoryContentChildImage
