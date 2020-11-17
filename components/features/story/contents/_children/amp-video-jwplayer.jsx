import React from 'react'
import { useFusionContext } from 'fusion:context'

const StoryContentChildVideoAmp = ({ data = {} }) => {
  const { siteProperties: { jwplayers = '' } = {} } = useFusionContext()
  const {
    key: mediaId = '',
    account = 'gec',
    has_ads: hasAds,
    description = '',
  } = data
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player
  return (
    <>
      {mediaId && (
        <>
          <amp-jwplayer
            data-player-id={jwplayerId}
            data-media-id={`${mediaId}`}
            layout="responsive"
            width="16"
            dock="#my-dock-slot"
            height="9"></amp-jwplayer>
          {description && (
            <>
              <div className="pt-10"> {description}</div>
            </>
          )}
        </>
      )}
    </>
  )
}
export default StoryContentChildVideoAmp
