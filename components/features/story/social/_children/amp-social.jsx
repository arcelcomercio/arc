import React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { SITE_ELCOMERCIOMAG } from '../../../../utilities/constants/sitenames'

const classes = {
  rounded: 'amp-sh__rounded',
  rect: 'amp-sh__rect',
  message: 'amp-sh__message',
}

const StoryHeaderAmp = () => {
  const {
    arcSite,
    globalContent: {
      website_url: postPermaLink,
      headlines: { basic: postTitle } = {},
    },
  } = useAppContext()

  const { siteUrl, fbAppId } = getProperties(arcSite)

  const isMag = arcSite === SITE_ELCOMERCIOMAG
  const shareButtonClass = isMag ? classes.rect : classes.rounded

  return (
    <>
      <amp-social-share
        class={shareButtonClass}
        width="32"
        height="32"
        type="facebook"
        aria-label="Compartir en facebook"
        data-param-app_id={fbAppId}></amp-social-share>
      <amp-social-share
        width="32"
        height="32"
        class={shareButtonClass}
        type="twitter"
        aria-label="Compartir en twitter"></amp-social-share>
      {!isMag && (
        <amp-social-share
          width="32"
          height="32"
          class={`${shareButtonClass} ${classes.message}`}
          type="facebookmessenger"
          aria-label="Compartir en messenger"
          data-share-endpoint="fb-messenger://share"
          data-param-text={` ${postTitle}: ${siteUrl}${postPermaLink
            .concat('&app_id=')
            .concat(fbAppId)}`}></amp-social-share>
      )}
      <amp-social-share
        width="32"
        height="32"
        class={shareButtonClass}
        type="whatsapp"
        aria-label="Compartir en whatsapp"></amp-social-share>
    </>
  )
}

export default React.memo(StoryHeaderAmp)
