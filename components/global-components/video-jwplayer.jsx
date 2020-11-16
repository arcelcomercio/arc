import React from 'react'
import { useFusionContext } from 'fusion:context'

const StoryContentChildVideoJwplayer = ({ data = {}, lite = false }) => {
  const { siteProperties: { jwplayers = {} } = {} } = useFusionContext()

  const {
    key: mediaId = '',
    duration = '',
    has_ads: hasAds = 0,
    account = 'gec',
    description = '',
  } = data
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player

  return (
    <>
      {mediaId && (
        <>
          <>
            <script
              src={`https://cdn.jwplayer.com/players/${mediaId}-${jwplayerId}.js`}></script>
            <div
              data-time={duration}
              className="jwplayer-lazy"
              id={`botr_${mediaId}_${jwplayerId}_div`}></div>
            {description && (
              <figcaption
                className={`${
                  lite === true
                    ? `s-multimedia__caption`
                    : `story-content__caption`
                }`}>
                {description}
              </figcaption>
            )}
          </>
        </>
      )}
    </>
  )
}
export default StoryContentChildVideoJwplayer
