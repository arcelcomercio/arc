import React from 'react'
import { defaultImage } from '../../../../utilities/helpers'

const classes = {
  containerLive: `featured-story-manual-live col-2 position-relative flex justify-center`,
  containerMask: `bg-white flex justify-center items-center h-full w-full flex-col`,
  iframeVideo: `featured-story-manual-live__iframe overflow-hidden border-none position-absolute top-0 left-0`,
  label: 'position-absolute',
}

const PLATFORM_FACEBOOK = 'facebook'
const PLATFORM_YOUTUBE = 'youtube'

const LiveStreaming = props => {
  const { arcSite, contextPath, deployment, platformLive, urlVideo } = props

  const getFormatUrl = (platform, urlVideo) => {
    return platform === PLATFORM_FACEBOOK
      ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          urlVideo
        )}&show_text=false&appId=467845563244454`
      : `https://www.youtube.com/embed/${urlVideo}`
  }

  const patterYt = /(https|www|facebook\.com)/
  const isValidUrl =
    platformLive === PLATFORM_FACEBOOK
      ? /^(https:\/\/www\.facebook\.com\/).*(\/videos\/).*/.test(urlVideo)
      : !patterYt.test(urlVideo) && /.{11}/.test(urlVideo)

  const formatURL = isValidUrl ? getFormatUrl(platformLive, urlVideo) : ''

  const urlImageDefault = defaultImage({
    deployment,
    contextPath,
    arcSite,
    size: 'md',
  })

  const showVideo = urlVideo && isValidUrl
  const isFacebook = showVideo && platformLive === PLATFORM_FACEBOOK
  const isYoutube = showVideo && platformLive === PLATFORM_YOUTUBE
  let textError

  if (urlVideo === '') textError = 'Por favor ingrese la URL del En Vivo.'
  else if (formatURL === '' && platformLive === PLATFORM_FACEBOOK)
    textError = 'Por favor ingrese una URL de video válida.'
  else if (platformLive === PLATFORM_YOUTUBE && formatURL === '')
    textError = 'Por favor ingrese un id de youtube válido.'
  return (
    <div className={`${classes.containerLive}${!showVideo ? '' : ' hasVideo'}`}>
      {!showVideo && (
        <div className={classes.containerMask}>
          <img src={urlImageDefault} alt={arcSite} />
          {!showVideo && <label class={classes.label}>{textError}</label>}
        </div>
      )}
      {isFacebook && (
        <iframe
          src={formatURL}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen="true"
          className={classes.iframeVideo}
        />
      )}
      {isYoutube && (
        <iframe
          src={formatURL}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen="true"
          className={classes.iframeVideo}
        />
      )}
    </div>
  )
}

export default LiveStreaming
