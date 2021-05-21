import { useFusionContext } from 'fusion:context'
import React from 'react'

import Image from './image'

const StoryContentChildVideoJwplayerList = ({
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
    thumbnail_url: image = '',
  } = data
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player
  const titleTxt = showSection ? section : title
  return (
    <>
      {mediaId && (
        <>
          <div
            data-time={time}
            className="jwplayer-lazy"
            id={`botr_${mediaId}_${jwplayerId}_div`}>
            <div className="jwplayer-lazy-icon-play" />
            <Image
              src={image}
              width={580}
              height={326}
              alt={titleTxt}
              style={{
                width: '100%',
              }}
              loading="lazy"
            />
          </div>
          {titleTxt && (
            <figcaption
              className={`${
                lite === true
                  ? `s-multimedia__caption`
                  : `story-content__caption`
              }`}
              dangerouslySetInnerHTML={{
                __html: titleTxt,
              }}
            />
          )}
        </>
      )}
    </>
  )
}
export default StoryContentChildVideoJwplayerList
