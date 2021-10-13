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

  const url = `https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/media/${jwplayerId}/${mediaId}/${title}/${image}/?outputType=html`
  return (
    <>
      {mediaId && (
        <>
          <amp-iframe
            class="media"
            width="600"
            height="340"
            layout="responsive"
            sandbox="allow-scripts allow-same-origin allow-popups"
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
