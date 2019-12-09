import React from 'react'
import { RawHtml } from '@arc-core-components/feature_article-body'
import { ampHtml } from '../../../../utilities/helpers'

const StoryContentChildHtml = ({
  data: {
    caption,
    resized_urls: { landscape_xl: landscapeXl },
  },
  basicHtml: { content },
}) => {
  const urlMp4 = content
    .replace('data-mp4="', 'data-stream="')
    .replace(/(.*)data-stream="(.*?)"(.*)/, '$2')
    .replace('http://', 'https://')
    .replace('peru21.pe', 'img.peru21.pe')
    .replace('elcomercio.pe', 'img.elcomercio.pe')
    .replace('trome.pe', 'img.trome.pe')
    .replace('depor.com', 'img.depor.com')

  return (
    <>
      {content.includes('id="powa-') ? (
        <amp-video
          src={urlMp4}
          poster={landscapeXl}
          artwork={landscapeXl}
          title={caption}
          album="Blender"
          width="720"
          height="405"
          layout="responsive"
          controls="controls"
          dock="#dock-slot"
        />
      ) : (
        <RawHtml content={ampHtml(content)} rawHtmlClasses="" />
      )}
    </>
  )
}

export default StoryContentChildHtml
