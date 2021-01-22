import React from 'react'
import { useFusionContext } from 'fusion:context'

const classes = {
  containerItem: 'headband__container-item flex flex-row',
  boxVideo: 'headband__box-video position-relative',
  titleStory: 'headband__title-story',
  image: 'headband__image w-full h-full',
  boxTimerLive: 'headband__box-timer-live position-absolute',
  timer: 'headband__timer',
  live: 'headband__live uppercase',
  iconPlay: 'headband__icon-play position-absolute',
}

export default function VideoItem(props) {
  const {
    data: {
      isAdmin,
      image: { payload: urlImg = '' } = {},
      title,
      hasAds,
      videoID,
      account,
      time,
      liveStory,
    },
  } = props
  const { siteProperties: { jwplayers = {} } = {} } = useFusionContext()
  const playerId = jwplayers[account] || jwplayers.gec
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player
  return (
    <div className={classes.containerItem}>
      <div className={classes.boxVideo}>
        <img
          src={isAdmin ? urlImg : ''}
          data-src={urlImg}
          alt={title}
          className={`${classes.image} ${isAdmin ? '' : 'lazy'}`}
          data-stream={jwplayerId}
          data-uuid={videoID}
          data-account={account}
          data-time={time}
        />
        <div className={classes.boxTimerLive}>
          {liveStory ? (
            <div className={classes.live}>EN VIVO</div>
          ) : (
            <div className={classes.timer}>{time}</div>
          )}
        </div>
        <div className={classes.iconPlay}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#fff"
            viewBox="0 0 20 20">
            <path
              d="M12,20a8,8,0,1,1,8-8A8.011,8.011,0,0,1,12,20ZM12,2a10,10,0,1,0,3.827.761A10,10,0,0,0,12,2ZM10,16.5,16,12,10,7.5Z"
              transform="translate(-2 -2)"
            />
          </svg>
        </div>
      </div>
      <div className={classes.titleStory}>{title}</div>
    </div>
  )
}
