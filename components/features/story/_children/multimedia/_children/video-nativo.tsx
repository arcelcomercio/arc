/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import { FC } from 'types/features'
import { Streams } from 'types/story'

interface FeatureProps {
  streams?: Streams[]
}
const StoryContentChildVideoNativo: FC<FeatureProps> = (data) => {
  const { streams = [] } = data
  const dataVideo = streams
    .map((video) => {
      const { stream_type: streamType } = video
      return streamType === 'mp4' && video
    })
    .filter(String)
  const cantidadVideo = dataVideo?.length || 1
  const vdeoResul = dataVideo[cantidadVideo - 1]
  const urlx = vdeoResul && vdeoResul.url
  return (
    <>
      <video width="100%" controls>
        <source src={urlx || ''} type="video/mp4" />
      </video>
    </>
  )
}

export default StoryContentChildVideoNativo
