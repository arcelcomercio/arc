import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import React from 'react'

import {
  SITE_ELCOMERCIOMAG,
  SITE_TROME,
} from '../../../../utilities/constants/sitenames'

const classes = {
  rounded: 'amp-sh__rounded',
  rect: 'amp-sh__rect',
  message: 'amp-sh__message',
  google: 'amp-sh__google-news',
}

const StoryHeaderAmp = ({ isContent = false }) => {
  const {
    arcSite,
    globalContent: {
      website_url: postPermaLink,
      headlines: { basic: postTitle } = {},
    },
  } = useAppContext()

  const { siteUrl, fbAppId, googleNewsUrl } = getProperties(arcSite)

  const isMag = arcSite === SITE_ELCOMERCIOMAG
  const isTrome = arcSite === SITE_TROME

  const shareButtonClass = isMag ? classes.rect : classes.rounded

  return isContent ? (
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
    </>
  ) : (
    <>
      {isTrome && (
        <a
          itemProp="url"
          href={googleNewsUrl}
          className={`${shareButtonClass} ${classes.google}`}
          rel="noreferrer"
          target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25"
            viewBox="0 100 512.3 512.3">
            <path d="m444.6 231.6h-377v265h377zm-127 117.5h82v30h-82zm82-60v30h-82v-30zm-199.5 162.5c-48.2 0-87.5-39.3-87.5-87.5s39.3-87.5 87.5-87.5c22.6 0 44 8.6 60.3 24.1l-20.7 21.7c-10.7-10.2-24.8-15.9-39.7-15.9-31.7 0-57.5 25.8-57.5 57.5s25.8 57.5 57.5 57.5c26.5 0 48.9-18 55.5-42.5h-55.5v-30h87.5v15c0 48.2-39.3 87.5-87.5 87.5zm117.5-42.5h82v30h-82z" />
          </svg>
        </a>
      )}
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
