import React from 'react'
import Video from './video'
import Imagen from './image'
import ConfigParams from '../../../../utilities/config-params'

const StoryContentChildMultimedia = props => {
  const {
    data: {
      basic_video: { type, embed_html: embedHtml } = {},
      basic = {},
    } = {},
  } = props
  const { type: typeImage } = basic || {}
  return (
    <>
      {typeImage === ConfigParams.ELEMENT_IMAGE && <Imagen data={basic} />}
      {type === ConfigParams.ELEMENT_VIDEO && <Video data={embedHtml} />}
    </>
  )
}

export default StoryContentChildMultimedia
