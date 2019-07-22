import React from 'react'
import Video from './video'
import Imagen from './image'
import Html from './html'
import ConfigParams from '../../../../utilities/config-params'

const StoryContentChildMultimedia = props => {
  const {
    data: {
      basic_video: { type, embed_html: embedHtml } = {},
      basic = {},
      basic_html: {
        type: typeEmbed = '',
        content: embedHtmlPromoItems = '',
      } = {},
    } = {},
  } = props
  const { type: typeImage } = basic || {}
  return (
    <>
      {typeImage === ConfigParams.ELEMENT_IMAGE &&
        typeEmbed !== ConfigParams.ELEMENT_RAW_HTML && <Imagen data={basic} />}
      {typeEmbed === ConfigParams.ELEMENT_RAW_HTML && (
        <Html data={embedHtmlPromoItems} />
      )}
      {type === ConfigParams.ELEMENT_VIDEO && <Video data={embedHtml} />}
    </>
  )
}

export default StoryContentChildMultimedia
