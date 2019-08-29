import React from 'react'

const StoryContentChildVideoNativo = ({ streams } = []) => {
  const dataVideo = streams
    .map(({ url, stream_type: streamType }) => {
      return streamType === 'mp4'
        ? {
            url,
          }
        : []
    })
    .filter(String)
  const cantidadVideo = dataVideo.length
  const vdeoResul = dataVideo[cantidadVideo - 1]
  return (
    <>
<<<<<<< HEAD
      <video width="580" controls>
=======
      <video width="100%" controls>
>>>>>>> master
        <source src={vdeoResul.url} type="video/mp4" />
      </video>
    </>
  )
}

export default StoryContentChildVideoNativo
