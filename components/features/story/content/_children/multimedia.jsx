import React from 'react'
import Video from './video'
import Imagen from './image'
import Html from './html'

const StoryContentChildMultimedia = ({ data }) => {
  const {
    basic_video: {
      embed_html: embedHtml = '',
      description: { basic: descriptionVideo = '' } = {},
    } = {},
    basic = {},
    infografia: { type: typeInfo = '' } = {},
    basic_html: {
      type: typeEmbed = '',
      content: embedHtmlPromoItems = '',
    } = {},
  } = data
  const { type: typeImage, caption = '' } = basic || {}
  return (
    <>
      {!typeInfo && !typeEmbed && typeImage ? (
        <Imagen data={basic} />
      ) : (
        <Html data={embedHtmlPromoItems} caption={caption} />
      )}
      {embedHtml && <Video data={embedHtml} description={descriptionVideo} />}
    </>
  )
}

export default StoryContentChildMultimedia
