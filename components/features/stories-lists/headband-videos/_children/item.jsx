import React from 'react'

const classes = {
  containerItem: 'headband__container-item flex flex-row',
  boxVideo: 'headband__box-video',
  titleStory: 'headband__title-story',
  image: 'headband__image',
  boxTimerLive: 'headband__box-timer-live',
  timer: 'headband__timer',
  live: 'headband__live',
  iconPlay: 'headband__icon-play',
}

export default function VideoItem(props) {
  const {
    data: { isAdmin, image, title, jwplayerId, videoID, account, time },
  } = props
  return (
    <div className={classes.containerItem}>
      <div className={classes.boxVideo}>
        <img
          src={isAdmin ? image : ''}
          data-src={image}
          alt={title}
          className={`${classes.image} ${isAdmin ? '' : 'lazy'}`}
          data-stream={jwplayerId}
          data-uuid={videoID}
          data-account={account}
          data-time={time}
        />
        <div className={classes.boxTimerLive}>
          <span className={classes.timer}>{time}</span>
          <div className={classes.live}>EN VIVO</div>
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
