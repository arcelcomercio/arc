import React from 'react'
import Video from './video'
import Imagen from './image'
import Html from './html'
import ConfigParams from '../../../../utilities/config-params'

const StoryContentChildMultimedia = ({ data }) => {
  const {
    basic_video: {
      type,
      embed_html: embedHtml,
      description: { basic: descriptionVideo = '' } = {},
    } = {},
    basic = {},
    basic_html: {
      type: typeEmbed = '',
      content: embedHtmlPromoItems = '',
    } = {},
  } = data
  const { type: typeImage, caption = '' } = basic || {}
  return (
    <>
      {typeImage === ConfigParams.ELEMENT_IMAGE &&
        typeEmbed !== ConfigParams.ELEMENT_RAW_HTML && <Imagen data={basic} />}
      {typeEmbed === ConfigParams.ELEMENT_RAW_HTML && (
        <Html data={embedHtmlPromoItems} caption={caption} />
      )}
      {type === ConfigParams.ELEMENT_VIDEO &&
        typeEmbed !== ConfigParams.ELEMENT_RAW_HTML && (
          <Video data={embedHtml} description={descriptionVideo} />
        )}
    </>
  )
}

export default StoryContentChildMultimedia
