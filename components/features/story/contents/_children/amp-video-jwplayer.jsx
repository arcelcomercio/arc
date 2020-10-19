import React from 'react'
import { useFusionContext } from 'fusion:context'

const StoryContentChildVideoAmp = ({ data = {} }) => {
  const { siteProperties: { jwplayerId } = {} } = useFusionContext()
  const { key: mediaId = '' } = data

  return (
    <>
      {mediaId && (
        <amp-jwplayer
          data-player-id={jwplayerId}
          data-media-id={`${mediaId}`}
          layout="responsive"
          width="16"
          dock="#my-dock-slot"
          height="9"></amp-jwplayer>
      )}
    </>
  )
}
export default StoryContentChildVideoAmp
