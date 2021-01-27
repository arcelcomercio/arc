import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import VideoJwplayer from '../../../../global-components/video-jwplayer'

const classes = {
  listItemText:
    'stories-video__content pt-10 lg:pt-20 pl-10 lg:pl-20 pr-10 lg:pr-20 pb-10 w-full position-relative',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  closeSticky:
    'stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold',
}

const JwPlayerVideo = ({
  title,
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
    title,
  }
  const { siteProperties: { jwplayers = {} } = {} } = useFusionContext()
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player
  return (
    <>
      <div
        data-img={image}
        data-time={time}
        data-live={liveStory}
        data-stream={jwplayerId}
        data-uuid={videoID}
        data-account={account}>
        <VideoJwplayer data={promoItemJwplayer}></VideoJwplayer>
      </div>

      <div className={classes.listItemText}>
        <div className={classes.listBorder}>
          <h2 itemProp="name" className={classes.listItemTitleDest}>
            {title}
          </h2>
        </div>
        <span role="button" tabIndex="0" className={classes.closeSticky}>
          X
        </span>
      </div>
    </>
  )
}

JwPlayerVideo.propTypes = {
  title: PropTypes.string.isRequired,
  videoID: PropTypes.string.isRequired,
}

export default JwPlayerVideo
