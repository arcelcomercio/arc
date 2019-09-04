import React from 'react'
import customFields from './_dependencies/custom-fields'
import { useFusionContext } from 'fusion:context'
import { defaultImage } from '../../../utilities/helpers'

const classes = {
  containerLive: 'facebook-live col-2 position-relative',
  containerMask: `bg-white flex justify-center items-center h-full w-full`,
  iframeVideo: 'overflow-hidden border-none',
}

const FacebookLive = props => {
  const { customFields: { urlVideo = '' } = {} } = props

  const encodeURLFace = encodeURIComponent(urlVideo)
  const formatURL = `https://www.facebook.com/plugins/video.php?href=${encodeURLFace}&show_text=false&appId=467845563244454`
  const { arcSite, contextPath, deployment } = useFusionContext()
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
          width="100%"
          height="400"
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

FacebookLive.label = 'Facebook En Vivo'
//FacebookLive.static = true;

FacebookLive.propTypes = {
  customFields,
}

export default FacebookLive
