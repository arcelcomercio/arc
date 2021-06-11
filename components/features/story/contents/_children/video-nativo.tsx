import * as React from 'react'

interface Streams {
  url: string
  stream_type: string
}
const StoryContentChildVideoNativo: React.FC<{ streams?: Streams[] }> = ({
  streams = [],
}) => {
  const dataVideo = streams
    .map(({ url, stream_type: streamType }) => streamType === 'mp4'
        ? {
            url,
          }
        : [])
    .filter(String)
  const cantidadVideo = dataVideo.length
  const vdeoResul = dataVideo[cantidadVideo - 1]
  return (
    <>
      <video width="100%" controls>
        <source src={vdeoResul.url} type="video/mp4" />
      </video>
    </>
  )
}

export default StoryContentChildVideoNativo
