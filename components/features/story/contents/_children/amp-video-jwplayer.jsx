import { useFusionContext } from 'fusion:context'
import React from 'react'

const StoryContentChildVideoAmp = ({ data = {} }) => {
  const { siteProperties: { jwplayers = '' } = {} } = useFusionContext()
  const {
    key: mediaId = '',
    account = 'gec',
    has_ads: hasAds,
    title = '',
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
            height="9"
          />
          {title && (
            <>
              <div className="amp-story-content__multimedia-caption pt-10"> {title}</div>
            </>
          )}
        </>
      )}
    </>
  )
}
export default StoryContentChildVideoAmp
