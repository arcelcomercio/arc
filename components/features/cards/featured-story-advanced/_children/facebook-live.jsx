import React from 'react'
import { defaultImage } from '../../../../utilities/helpers'

const classes = {
  containerLive: `facebook-live col-2 position-relative flex justify-center h-0`,
  containerMask: `bg-white flex justify-center items-center h-full w-full`,
  iframeVideo: `facebook-live__iframe overflow-hidden border-none position-absolute top-0 left-0`,
}

const FacebookLive = props => {
  const { arcSite, contextPath, deployment, urlVideoFacebook } = props

  const encodeURLFace = encodeURIComponent(urlVideoFacebook)
  const formatURL = `https://www.facebook.com/plugins/video.php?href=${encodeURLFace}&show_text=false&appId=467845563244454`

  const urlImageDefault = defaultImage({
    deployment,
    contextPath,
    arcSite,
    size: 'md',
  })

  return (
    <div className={classes.containerLive}>
      {!encodeURLFace && (
        <div className={classes.containerMask}>
          <img src={urlImageDefault} alt={arcSite} />
        </div>
      )}
      {encodeURLFace && (
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
