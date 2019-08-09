import React from 'react'
import { createMarkup } from '../../../../utilities/helpers'

const StoryContentChildVideo = ({ data }) => {
  const {
    streams = [],
    publish_date: date = '',
    headlines: { basic: caption = '' } = {},
  } = data

  const dataVideo = streams
    .map(({ url, urlImage, stream_type: streamType }) => {
      if (streamType === 'mp4') {
        return {
          url,
          caption,
          urlImage,
          date,
        }
      }
      return ''
    })
    .filter(String)

  const [{ url, urlImage } = {}] = dataVideo

  return (
    <amp-video
      src={url}
      poster={urlImage}
      artwork={urlImage}
      title={caption}
      album="Blender"
      width="720"
      height="405"
      layout="responsive"
      controls="controls"
      dock="#dock-slot"
    />
  )
}
export default StoryContentChildVideo
