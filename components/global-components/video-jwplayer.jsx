import React from 'react'
import { useFusionContext } from 'fusion:context'

const StoryContentChildVideoJwplayer = ({ data = {} }) => {
  const {
    siteProperties: { jwplayerId = '', jwplayerIdAds = '' } = {},
  } = useFusionContext()

  const { key: mediaId = '', duration = '', has_ads: hasAds = 0 } = data

  const player = hasAds ? jwplayerIdAds : jwplayerId

  return (
    <>
      {mediaId && (
        <>
          <>
            <script
              src={`https://cdn.jwplayer.com/players/${mediaId}-${player}.js`}></script>
            <div
              data-time={duration}
              className="jwplayer-lazy"
              id={`botr_${mediaId}_${player}_div`}></div>
          </>
        </>
      )}
    </>
  )
}
export default StoryContentChildVideoJwplayer
