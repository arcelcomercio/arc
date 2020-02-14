import React from 'react'

const getTypeVideo = (streams, typo = 'ts') => {
  const dataVideo = streams
    .map(({ url, stream_type: streamType }) => {
      if (streamType === typo) {
        return {
          url,
        }
      }
      return ''
    })
    .filter(String)
  return dataVideo
}

const StoryContentChildVideoAmp = ({ data }) => {
  const {
    _id: id = '',
    streams = [],
    promo_image: { url: urlImage = false } = {},
    promo_items: { basic: { resized_urls: { large = '' } = {} } = {} } = {},
    headlines: { basic: caption = '' } = {},
  } = data

  const imageVideo = urlImage === false ? large : urlImage
  const dataVideo = getTypeVideo(streams, 'mp4')
  const dataVideoTs = getTypeVideo(streams, 'ts')

  const [{ url } = {}] = dataVideo
  const [{ url: urlTs } = {}] = dataVideoTs

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
            width="720"
            height="405"
            layout="responsive"
            src={urlVideo}
            poster={imageVideo}
            class={`id-${id} classs_video`}
            title={caption}
            controls="controls"
            dock="#dock-slot"/>
   
          
          <div className="pt-10">{caption}</div>
        </>
      )}
    </>
  )
}
export default StoryContentChildVideoAmp
