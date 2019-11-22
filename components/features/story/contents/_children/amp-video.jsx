import React from 'react'

const StoryContentChildVideoAmp = ({ data }) => {
  const {
    _id: id = '',
    streams = [],
    promo_image: { url: urlImage = '' } = {},
    publish_date: date = '',
    headlines: { basic: caption = '' } = {},
  } = data
  const dataVideo = streams
    .map(({ url, stream_type: streamType }) => {
      if (streamType === 'mp4') {
        return {
          url,
          date,
        }
      }
      return ''
    })
    .filter(String)

  const [{ url } = {}] = dataVideo
  const videoMatch = !url && data.match(/(https:\/\/(.*)\/(.*).mp4)/g)
  const urlVideo = videoMatch
    ? videoMatch[0]
        .replace('peru21.pe', 'img.peru21.pe')
        .replace('elcomercio.pe', 'img.elcomercio.pe')
        .replace('trome.pe', 'img.trome.pe')
        .replace('depor.com', 'img.depor.com')
    : url
  return (
    <>
      {urlVideo && (
        <>
          <amp-video
            src={urlVideo}
            poster={urlImage}
            artwork={urlImage}
            class={`id-${id}`}
            title={caption}
            album="Blender"
            width="720"
            height="405"
            layout="responsive"
            controls="controls"
            dock="#dock-slot"
          />
          <div className="pt-10">{caption}</div>
        </>
      )}
    </>
  )
}
export default StoryContentChildVideoAmp
