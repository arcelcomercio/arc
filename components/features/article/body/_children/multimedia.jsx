import React from 'react'
import Video from './video'
import Imagen from './image'

const ArticleBodyChildMultimedia = props => {
  const { data: { basic_video: basicVideo = {}, basic = {} } = {} } = props
  return (
    <>
      {basic.type === 'image' && <Imagen data={basic} />}
      {basicVideo.type === 'video' && <Video data={basicVideo.embed_html} />}
    </>
  )
}

export default ArticleBodyChildMultimedia
