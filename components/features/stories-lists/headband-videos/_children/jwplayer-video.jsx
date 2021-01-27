import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import VideoJwplayer from '../../../../global-components/video-jwplayer'

const JwPlayerVideo = ({
  liveStory,
  image,
  videoID,
  time,
  hasAds,
  account,
}) => {
  const promoItemJwplayer = {
    key: videoID,
    time,
    has_ads: hasAds,
    account,
  }
  const { siteProperties: { jwplayers = {} } = {} } = useFusionContext()
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player
  return (
    <>
      <div
        className='stories-video__box-jwplayer'
        data-img={image}
        data-time={time}
        data-live={liveStory}
        data-stream={jwplayerId}
        data-uuid={videoID}
        data-account={account}>
        <VideoJwplayer data={promoItemJwplayer}></VideoJwplayer>
        <script
          src={`https://cdn.jwplayer.com/players/${videoID}-${jwplayerId}.js`}></script>
      </div>
    </>
  )
}

JwPlayerVideo.propTypes = {
  videoID: PropTypes.string.isRequired,
}

export default JwPlayerVideo
