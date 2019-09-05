import React from 'react'

const StoryContentChildVideo = ({ data }) => {
  const {
    _id: id = '',
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
  const videoMatch = !url && data.match(/(https:\/\/peru21.pe(.*).mp4)/g)
  const urlVideo = videoMatch
    ? videoMatch[0].replace('peru21.pe', 'g21.peru21.pe')
    : url
  return (
    <amp-video
      src={urlVideo}
      poster={urlImage}
      artwork={urlImage}
      class={id}
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
