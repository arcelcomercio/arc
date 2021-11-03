import * as React from 'react'

import JwPlayerVideo from './jwplayer-video'
import YoutubeVideo from './youtube-video'

const classes = {
  container: 'headband__fixedvideo__container',
  firstBox: 'headband__fixedvideo__firstBox',
  boxVideo: 'headband__fixedvideo__box-video',
  boxStory: 'headband__fixedvideo__box-story',
  titleStory: 'headband__fixedvideo__title-story',
  image: 'headband__fixedvideo__image',
  boxTimerLive: 'headband__fixedvideo__box-timer-live',
  timer: 'headband__fixedvideo__timer',
  live: 'headband__fixedvideo__live',
  close: 'headband__fixedvideo__close',
  resize: 'headband__fixedvideo__resize',
}

const FixedVideo = (props) => {
  const {
    active,
    setActive,
    dataVideo: {
      videoID,
      videoTime,
      title,
      liveStory,
      isAdmin,
      account,
      videoType = '',
      image,
    } = {},
  } = props

  const [scrolled, setScrolled] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)

  const handleScroll = () => {
    const { body = {}, documentElement = {} } = document
    const { scrollTop: scrollBody = 0 } = body
    const { scrollTop: scrollElement = 0 } = documentElement
    const scroll = scrollBody || scrollElement

    const header = Array.from(document.getElementsByTagName('header'))
    const headerTop = (header[0] && header[0].offsetTop) || 0

    if (!scrolled && scroll > headerTop) {
      setScrolled(true)
    } else if (scrolled && scroll <= headerTop) {
      setScrolled(false)
    }
  }

  const resizeVideo = () => {
    setExpanded(!expanded)
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
  }

  const playerProps = {
    isAdmin,
    title,
    liveStory,
    videoID,
    account,
    videoTime,
    hasAds: false,
    image,
    imageDefault: image,
    autoPlayVideo: true,
  }

  const handleClose = () => {
    const boxVideo = document.body.querySelector(
      '.headband__fixedvideo__container'
    ).children
    for (let i = 0; i < boxVideo.length; i++) {
      if (boxVideo[i].tagName === 'SCRIPT') {
        boxVideo[i].remove()
        break
      }
    }

    setActive(false)
  }

  return (
    <div
      className={`${classes.container} ${active ? 'active' : ''} ${
        scrolled ? 'scrolled' : ''
      }`}>
      {active && (
        <>
          <div className={`${classes.firstBox} ${expanded ? 'expanded' : ''}`}>
            <div className={classes.boxVideo}>
              {active && videoType === 'youtube_id' && (
                <YoutubeVideo {...playerProps} />
              )}

              {active && videoType === 'basic_jwplayer' && (
                <JwPlayerVideo {...playerProps} />
              )}
            </div>
            <div className={classes.boxStory}>
              <div className={classes.titleStory}>{title}</div>
              <button
                className={classes.close}
                type="button"
                onClick={() => handleClose()}>
                x
              </button>
            </div>
          </div>
          <div className={`${classes.resize} ${expanded ? 'expanded' : ''}`}>
            <button type="button" onClick={resizeVideo}>
              <svg width="8" fill="#fff" viewBox="0 0 8 14">
                <path
                  d="M2.079,14.713,9.289,7.5,2.079.293.293,2.079,5.717,7.5.293,12.927Z"
                  transform="translate(-0.293 -0.293)"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default FixedVideo
