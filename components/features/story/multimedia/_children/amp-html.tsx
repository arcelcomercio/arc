import { RawHtml } from '@arc-core-components/feature_article-body'
import { useFusionContext } from 'fusion:context'
import React from 'react'

import { ampHtml } from '../../../../utilities/story/helpers-amp'

const StoryContentChildHtml = ({
  data: {
    caption = '',
    resized_urls: { landscape_xl: landscapeXl = '' } = {},
  } = {},
  basicHtml: { content = '' } = {},
}) => {
  const { siteProperties: { urlPrerollAmp } = {} } = useFusionContext()

  const VideoPowa = () => {
    const urlMp4 = content
      .replace('data-mp4="', 'data-stream="')
      .replace(/(.*)data-stream="(.*?)"(.*)/, '$2')
      .replace('http://', 'https://')
      .replace('peru21.pe', 'img.peru21.pe')
      .replace('elcomercio.pe', 'img.elcomercio.pe')
      .replace('trome.pe', 'opta.minoticia.pe')
      .replace('depor.com', 'img.depor.com')
      .replace('gestion.pe', 'img.gestion.pe')
    return (
      <amp-ima-video
        data-src={urlMp4.replace('cde.3.img.', 'cde.3.')}
        data-poster={landscapeXl}
        data-tag={urlPrerollAmp}
        title={caption}
        width="720"
        height="405"
        layout="responsive"
        dock="#dock-slot"
      />
    )
  }

  return (
    <>
      {content.includes('id="powa-') ? (
        <VideoPowa />
      ) : (
        <RawHtml content={ampHtml(content)} rawHtmlClasses="" />
      )}
    </>
  )
}

export default StoryContentChildHtml
