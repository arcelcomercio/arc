import React from 'react'
import { RawHtml } from '@arc-core-components/feature_article-body'
import Video from './video'

const classes = {
  newsEmbed: 'story-content__embed',
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
        <RawHtml content={data} className={classes.newsEmbed} />
      )}
    </>
  )
}

export default StoryContentChildImage
