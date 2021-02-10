import React from 'react'
import { useFusionContext } from 'fusion:context'

const StoryContentChildVideoJwplayer = ({
  data = {},
  lite = false,
  showSection = false,
}) => {
  const { siteProperties: { jwplayers = {} } = {} } = useFusionContext()

  const {
    key: mediaId = '',
    has_ads: hasAds = 0,
    account = 'gec',
    title = '',
    time = '',
    section,
  } = data
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player
  const titleTxt = showSection ? section : title
  return (
    <>
      {mediaId && (
        <>
          <>
            <div
              data-time={time}
              className="jwplayer-lazy"
              id={`botr_${mediaId}_${jwplayerId}_div`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="jw-svg-icon jw-svg-icon-play"
                viewBox="0 0 240 240"
                width="77"
                height="77"
                focusable="false">
                <path d="M62.8,199.5c-1,0.8-2.4,0.6-3.3-0.4c-0.4-0.5-0.6-1.1-0.5-1.8V42.6c-0.2-1.3,0.7-2.4,1.9-2.6c0.7-0.1,1.3,0.1,1.9,0.4l154.7,77.7c2.1,1.1,2.1,2.8,0,3.8L62.8,199.5z"></path>
              </svg>
            </div>
            {titleTxt && (
              <figcaption
                className={`${
                  lite === true
                    ? `s-multimedia__caption`
                    : `story-content__caption`
                }`}>
                {titleTxt}
              </figcaption>
            )}
          </>
        </>
      )}
    </>
  )
}
export default StoryContentChildVideoJwplayer
