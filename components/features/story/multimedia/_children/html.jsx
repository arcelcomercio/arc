import React from 'react'
import { RawHtml } from '@arc-core-components/feature_article-body'
import Video from './video'

const classes = {
  newsEmbed: '__embed',
  caption: '__caption ',
}

const StoryContentChildHtml = ({
  data,
  caption,
  basic = {},
  header = false,
  classImage = 'story-contents',
}) => {
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
            )
            .replace(
              /https:\/\/gestion.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
              'https://img.gestion.pe$1'
            )}
          description={caption}
          {...basic}
        />
      ) : (
        <>
          <RawHtml
            content={data}
            className={`${classImage}${classes.newsEmbed}`}
          />
          {caption && data && (
            <div className={`${classImage}${classes.caption}`}>{caption}</div>
          )}
        </>
      )}
    </>
  )
}

export default StoryContentChildHtml
