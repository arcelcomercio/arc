import React from 'react'

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
    <>
      <amp-video
        width="640"
        height="360"
        layout="responsive"
        poster={urlImage}
        src={url}
      />
    </>
  )
}
export default StoryContentChildVideo
