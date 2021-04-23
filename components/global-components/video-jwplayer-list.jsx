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

  const customWidth = 580
  const customHeight = 330
  const sizes = `(max-width: 360px) 280px, (max-width: 639px) 482px, ${customWidth}px`
  return (
    <>
      {mediaId && (
        <>
          <div
            data-time={time}
            className="jwplayer-lazy"
            id={`botr_${mediaId}_${jwplayerId}_div`}>
            <div className="jwplayer-lazy-icon-play">{` `}</div>
            <figure>
              <Image
                src={image}
                width={customWidth}
                height={customHeight}
                sizes={sizes}
                alt={titleTxt}
                style={{
                  width: '100%',
                }}
                loading="lazy"
              />
            </figure>
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
      )}
    </>
  )
}
export default StoryContentChildVideoJwplayerList
