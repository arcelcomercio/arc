import React from 'react'
import { defaultImage } from '../../../../utilities/helpers'

const classes = {
  containerLive: `facebook-live col-2 position-relative flex justify-center h-0`,
  containerMask: `bg-white flex justify-center items-center h-full w-full flex-col`,
  iframeVideo: `facebook-live__iframe overflow-hidden border-none position-absolute top-0 left-0`,
  label: 'position-absolute',
}

const FacebookLive = props => {
  const { arcSite, contextPath, deployment, urlVideoFacebook } = props

  const pattern = /^(https:\/\/www\.facebook\.com\/).*(\/videos\/).*/
  const isValidUrl = pattern.test(urlVideoFacebook)

  const encodeURLFace = isValidUrl ? encodeURIComponent(urlVideoFacebook) : ''
  const formatURL = `https://www.facebook.com/plugins/video.php?href=${encodeURLFace}&show_text=false&appId=467845563244454`

  const urlImageDefault = defaultImage({
    deployment,
    contextPath,
    arcSite,
    size: 'md',
  })

  const showVideo = encodeURLFace && isValidUrl
  let textError
  if (!encodeURLFace) textError = 'Por favor ingrese la URL del En Vivo.'
  else if (!isValidUrl) textError = 'Por favor ingrese una URL válida.'

  console.log(encodeURLFace, isValidUrl)
  return (
    <div className={`${classes.containerLive}${!showVideo ? '' : ' hasVideo'}`}>
      {!showVideo && (
        <div className={classes.containerMask}>
          <img src={urlImageDefault} alt={arcSite} />
          {!showVideo && <label class={classes.label}>{textError}</label>}
        </div>
      )}
      {showVideo && (
        <iframe
          src={formatURL}
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
          allow="encrypted-media"
          allowFullScreen="true"
          className={classes.iframeVideo}
        />
      )}
    </div>
  )
}

export default FacebookLive
