import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

const classes = {
  rounded: 'amp-sh__rounded',
}

const StoryHeaderAmp = () => {
  const {
    arcSite,
    globalContent: {
      website_url: postPermaLink,
      headlines: { basic: postTitle } = {},
    },
  } = useFusionContext()

  const { siteUrl, fbAppId } = getProperties(arcSite)

  return (
    <>
      <amp-social-share
        class={classes.rounded}
        width="32"
        height="32"
        type="facebook"
        data-param-app_id={fbAppId}></amp-social-share>
      <amp-social-share
        width="32"
        height="32"
        class={classes.rounded}
        type="twitter"></amp-social-share>
      <amp-social-share
        width="32"
        height="32"
        class={`${classes.rounded} mesaje`}
        type="facebookmessenger"
        data-share-endpoint="fb-messenger://share"
        data-param-text={` ${postTitle}: ${siteUrl}${postPermaLink
          .concat('&app_id=')
          .concat(fbAppId)}`}></amp-social-share>
      <amp-social-share
        width="32"
        height="32"
        class={classes.rounded}
        type="whatsapp"></amp-social-share>
    </>
  )
}

export default React.memo(StoryHeaderAmp)
