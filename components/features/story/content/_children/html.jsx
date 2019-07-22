import React from 'react'
import { RawHtml } from '@arc-core-components/feature_article-body'
import Video from './video'

const classes = {
  newsEmbed: 'story-content__embed',
}

const StoryContentChildImage = ({ data }) => {
  return (
    <>
      {data.includes('id="powa-') ? (
        <Video data={data.replace('data-mp4="', 'data-stream="')} />
      ) : (
        <RawHtml content={data} className={classes.newsEmbed} />
      )}
    </>
  )
}

export default StoryContentChildImage
