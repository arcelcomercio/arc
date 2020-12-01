import * as React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { socialMediaUrlShareList } from '../../../utilities/social-media'

const classes = {
  share: '',
  btn: 'share-btn f f-center',
  gnews: 'share-btn--gnews',
  gnewsTxt: 'share-btn--gnews-txt',
  copy: 'share-btn--copy f f-center',
  btnStroke: 'share-btn--stroke',
  ws: 'share-btn--ws',
}

const DynamicShareButtons = () => {
  const { globalContent, arcSite } = useAppContext()

  const urlRoot = () => {
    const { websites = {} } = globalContent || {}
    return websites[arcSite] || globalContent || {}
  }

  const { headlines: { basic: postTitle = '' } = {} } = globalContent || {}
  const { website_url: postPermaLink = '' } = urlRoot()

  const {
    social: { twitter: { user: siteNameRedSocial = '' } = {} } = {},
    siteUrl,
  } = getProperties(arcSite)

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    postPermaLink,
    postTitle,
    siteNameRedSocial
  )

  return (
    <>
      <a
        itemProp="url"
        href={urlsShareList.facebook}
        className={classes.btn}
        data-share="">
        <title>Compartir en facebook</title>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 40 40">
          <path
            d="M20.4.4a20,20,0,1,0,20,20A20,20,0,0,0,20.4.4Zm4.738,13.821H22.131c-.356,0-.752.469-.752,1.092v2.171h3.76l-.569,3.1H21.379v9.294H17.831V20.579H14.612v-3.1h3.219V15.662a4.463,4.463,0,0,1,4.3-4.735h3.006v3.294Z"
            transform="translate(-0.4 -0.4)"
            fill="#21589b"
          />
        </svg>
      </a>
      <a
        itemProp="url"
        href={urlsShareList.twitter}
        className={classes.btn}
        data-share="">
        <title>Compartir en twitter</title>
        <svg viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
          <path
            transform="translate(-.4 -.4)"
            d="M20.4.4a20,20,0,1,0,20,20A20,20,0,0,0,20.4.4Zm8.135,16.383c.008.171.01.342.01.508A11.2,11.2,0,0,1,11.3,26.731a7.747,7.747,0,0,0,.94.052A7.889,7.889,0,0,0,17.133,25.1a3.948,3.948,0,0,1-3.679-2.733,3.958,3.958,0,0,0,1.777-.069,3.942,3.942,0,0,1-3.16-3.862v-.048a3.95,3.95,0,0,0,1.785.494,3.938,3.938,0,0,1-1.219-5.263,11.2,11.2,0,0,0,8.119,4.119,3.94,3.94,0,0,1,6.712-3.594,7.909,7.909,0,0,0,2.5-.956,3.958,3.958,0,0,1-1.731,2.181,7.915,7.915,0,0,0,2.262-.623,7.988,7.988,0,0,1-1.965,2.04Z"
            fill="#00aef0"
          />
        </svg>
      </a>
      <a
        itemProp="url"
        href={urlsShareList.linkedin}
        className={classes.btn}
        data-share="">
        <title>Compartir en LinkedIn</title>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none">
          <path
            d="M16 0.6C7.5 0.6 0.6 7.5 0.6 16 0.6 24.5 7.5 31.4 16 31.4 24.5 31.4 31.4 24.5 31.4 16 31.4 7.5 24.5 0.6 16 0.6ZM12.2 22.4H9.1V12.4H12.2V22.4ZM10.7 11.1C9.7 11.1 9 10.4 9 9.6 9 8.7 9.7 8 10.7 8 11.7 8 12.3 8.7 12.3 9.6 12.3 10.4 11.7 11.1 10.7 11.1ZM23.6 22.4H20.5V16.8C20.5 15.5 20 14.7 18.9 14.7 18.1 14.7 17.5 15.2 17.3 15.8 17.2 16 17.2 16.3 17.2 16.6V22.4H14.1V15.5C14.1 14.3 14.1 13.3 14 12.4H16.7L16.9 13.7H16.9C17.3 13.1 18.3 12.1 20 12.1 22.1 12.1 23.6 13.5 23.6 16.4V22.4 22.4Z"
            fill="#0A66C2"
          />
        </svg>
      </a>
      <a
        itemProp="url"
        href={urlsShareList.whatsapp}
        className={`${classes.btn} ${classes.ws}`}
        data-share="">
        <title>Compartir en WhatsApp</title>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32">
          <path
            d="M.7,32.7l2.165-7.94A15.569,15.569,0,0,1,.7,16.7a15.917,15.917,0,0,1,16-16,15.917,15.917,0,0,1,16,16,15.917,15.917,0,0,1-16,16,15.569,15.569,0,0,1-8.06-2.165ZM10.926,9.121c-.241.12-.481.12-.6.241a1.661,1.661,0,0,0-.481.361c-.241.12-.241.361-.361.481A4.2,4.2,0,0,0,8.52,12.85,7.034,7.034,0,0,0,9,15.136a17.41,17.41,0,0,0,3.248,4.451l.962.962A15.6,15.6,0,0,0,19.467,23.8l.842.12a2.589,2.589,0,0,0,.962,0,3.136,3.136,0,0,0,1.323-.361,2.631,2.631,0,0,1,.6-.361l.12-.12a2.111,2.111,0,0,0,.6-.481,1.661,1.661,0,0,0,.361-.481,3.019,3.019,0,0,0,.241-1.2v-.6c0-.12-.12-.241-.241-.361l-.962-.481s-1.444-.6-2.286-.962h-.6c-.12,0-.12.12-.241.12,0,0-.12.12-1.323,1.564a.42.42,0,0,1-.241.12.226.226,0,0,1-.361,0h-.241a.925.925,0,0,1-.361-.241h-.12A10.319,10.319,0,0,1,15.136,18.5c-.241-.241-.481-.361-.6-.6a8.97,8.97,0,0,1-1.684-2.045l-.12-.12c0-.12-.12-.241-.12-.361a.263.263,0,0,1,.12-.361,7.125,7.125,0,0,0,.481-.722,1.2,1.2,0,0,0,.481-.6.741.741,0,0,0,.12-.842c-.481-1.083-.842-2.165-1.323-3.248a.727.727,0,0,0-.722-.361.42.42,0,0,0-.241-.12Z"
            transform="translate(-0.7 -0.7)"
            fill="#24d165"
          />
        </svg>
      </a>
    </>
  )
}

DynamicShareButtons.label = 'Header - botones compartir historia continua'
export default DynamicShareButtons
