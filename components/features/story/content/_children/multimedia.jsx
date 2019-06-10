import React from 'react'
import Video from './video'
import Imagen from './image'

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
      {typeImage === 'image' && <Imagen data={basic} />}
      {type === 'video' && <Video data={embedHtml} />}
    </>
  )
}

export default StoryContentChildMultimedia
