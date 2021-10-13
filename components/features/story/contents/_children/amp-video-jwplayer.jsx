import { useFusionContext } from 'fusion:context'
import React from 'react'

const StoryContentChildVideoAmp = ({ data = {} }) => {
  const { siteProperties: { jwplayers = '' } = {} } = useFusionContext()
  const {
    key: mediaId = '',
    account = 'gec',
    has_ads: hasAds,
    title = '',
    thumbnail_url: image = '',
  } = data
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player

  const url = `/media/${jwplayerId}/${mediaId}/${title}/${image}/?outputType=html`
  return (
    <>
      {mediaId && (
        <>
          <amp-iframe
            width="500"
            height="281"
            layout="responsive"
            allowfullscreen
            frameborder="0"
            src={url}
          />
          {title && (
            <>
              <div className="pt-10"> {title}</div>
            </>
          )}
        </>
      )}
    </>
  )
}
export default StoryContentChildVideoAmp
