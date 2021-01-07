import * as React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { socialMediaUrlShareList } from '../../../utilities/social-media'

import { popup, copyLink } from './utils'

const classes = {
  share: '',
  btn: 'share-btn f f-center',
  gnews: 'share-btn--gnews',
  gnewsTxt: 'share-btn--gnews-txt',
  copy: 'share-btn--copy f f-center',
  btnStroke: 'share-btn--stroke',
  ws: 'share-btn--ws',
}

const ShareButtons = ({
  activeGoogleNews = false,
  activeCopyLink = false,
  activeLinkedin = true,
}) => {
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
    googleNewsUrl,
  } = getProperties(arcSite)

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    postPermaLink,
    postTitle,
    siteNameRedSocial
  )

  return (
    <>
      {activeGoogleNews ? (
        <a
          itemProp="url"
          href={googleNewsUrl}
          className={`${classes.btn} ${classes.gnews}`}
          rel="noreferrer"
          target="_blank">
          <span className={classes.gnewsTxt}>Síguenos en Google News</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25"
            viewBox="0 100 512.3 512.3">
            <path d="m444.6 231.6h-377v265h377zm-127 117.5h82v30h-82zm82-60v30h-82v-30zm-199.5 162.5c-48.2 0-87.5-39.3-87.5-87.5s39.3-87.5 87.5-87.5c22.6 0 44 8.6 60.3 24.1l-20.7 21.7c-10.7-10.2-24.8-15.9-39.7-15.9-31.7 0-57.5 25.8-57.5 57.5s25.8 57.5 57.5 57.5c26.5 0 48.9-18 55.5-42.5h-55.5v-30h87.5v15c0 48.2-39.3 87.5-87.5 87.5zm117.5-42.5h82v30h-82z" />
          </svg>
        </a>
      ) : null}
      <a
        itemProp="url"
        href={urlsShareList.facebook}
        className={`${classes.btn} s-fb`}
        data-share="">
        <title>Compartir en facebook</title>
        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 10 21">
          <path d="M2.6 21V11.1H0V7.6H2.6V4.6C2.6 2.2 4.1 0 7.5 0 8.9 0 10 0.1 10 0.1L9.9 3.5C9.9 3.5 8.8 3.4 7.7 3.4 6.4 3.4 6.2 4 6.2 5V7.6H10L9.8 11.1H6.2V21H2.6Z" />
        </svg>
      </a>
      <a
        itemProp="url"
        href={urlsShareList.twitter}
        className={`${classes.btn} s-tw`}
        data-share="">
        <title>Compartir en twitter</title>
        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 12">
          <path d="M13.5 2C13 2.2 12.5 2.3 12 2.4 12.5 2.1 12.9 1.5 13.1 0.9 12.6 1.2 12 1.4 11.4 1.6 11.2 1.3 10.9 1.1 10.6 0.9 10.2 0.8 9.9 0.7 9.5 0.7 8 0.7 6.8 1.9 6.8 3.4 6.8 3.6 6.9 3.8 6.9 4 4.7 3.9 2.7 2.8 1.4 1.2 1.2 1.6 1 2.1 1 2.6 1 3.5 1.5 4.3 2.2 4.8 1.8 4.8 1.4 4.6 1 4.4V4.5C1 5.8 1.9 6.8 3.2 7.1 2.9 7.1 2.7 7.2 2.5 7.2 2.3 7.2 2.1 7.2 2 7.1 2.3 8.2 3.3 9 4.5 9 3.5 9.7 2.4 10.1 1.1 10.1 0.9 10.1 0.7 10.1 0.5 10.1 1.7 10.8 3.1 11.3 4.6 11.3 9.5 11.3 12.2 7.2 12.2 3.7 12.2 3.6 12.2 3.5 12.2 3.4 12.7 3 13.1 2.5 13.5 2Z" />
        </svg>
      </a>
      {activeLinkedin && (
        <a
          itemProp="url"
          href={urlsShareList.linkedin}
          className={`${classes.btn} s-lk`}
          data-share="">
          <title>Compartir en LinkedIn</title>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 0 24 24">
            <path d="M5 7.2C6.2 7.2 7.2 6.2 7.2 5 7.2 3.8 6.2 2.8 5 2.8 3.8 2.8 2.8 3.8 2.8 5 2.8 6.2 3.8 7.2 5 7.2Z" />
            <path d="M9.2 8.9V21H13V15C13 13.4 13.3 11.9 15.3 11.9 17.2 11.9 17.2 13.7 17.2 15.1V21H21V14.3C21 11.1 20.3 8.6 16.5 8.6 14.6 8.6 13.4 9.6 12.9 10.5H12.9V8.9H9.2V8.9ZM3.1 8.9H6.9V21H3.1V8.9Z" />
          </svg>
        </a>
      )}
      <a
        itemProp="url"
        href={urlsShareList.whatsapp}
        className={`${classes.btn} ${classes.ws}`}
        data-share="">
        <title>Compartir en WhatsApp</title>
        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 31 32">
          <path
            d="M8 28.4L3.3 30.5 4.5 25.4C2.3 22.9 1 19.6 1 16 1 8 7.5 1.5 15.5 1.5 23.5 1.5 30 8 30 16 30 24 23.5 30.5 15.5 30.5 12.8 30.5 10.2 29.7 8 28.4Z"
            className={classes.btnStroke}
          />
          <path d="M8.5 10.7C8.5 10.7 9.3 9.1 10.1 9.1 10.8 9 11.7 9 12 9.4 12.2 9.9 13.3 12.7 13.3 12.7 13.3 12.7 13.5 13.2 13.2 13.6 12.9 14.1 12.3 14.8 12.3 14.8 12.3 14.8 11.9 15.3 12.3 15.8 12.6 16.3 13.2 17.2 14.4 18.4 15.5 19.6 17.8 20.5 17.8 20.5 17.8 20.5 18.1 20.5 18.3 20.3 18.5 20.1 19.7 18.7 19.7 18.7 19.7 18.7 20 18.2 20.6 18.5 21.2 18.7 23.8 20.1 23.8 20.1 23.8 20.1 24.1 20.2 24.1 20.6 24.1 21.1 23.9 22.2 23.5 22.6 23.1 23 22 24.2 20.4 24.2 18.7 24.2 14.8 22.8 12.7 20.7 10.6 18.5 8.7 16.4 8.3 14.4 7.9 12.4 7.9 11.5 8.5 10.7Z" />
        </svg>
      </a>
      {activeCopyLink ? (
        <button type="button" className={classes.copy} id="copy-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M4.2 19.8C4.7 20.2 5.2 20.6 5.8 20.9 6.5 21.1 7.1 21.2 7.8 21.2 8.4 21.2 9.1 21.1 9.7 20.9 10.3 20.6 10.8 20.2 11.3 19.8L14.1 16.9 12.7 15.5 9.9 18.4C9.3 18.9 8.6 19.2 7.8 19.2 7 19.2 6.2 18.9 5.6 18.4 5.1 17.8 4.8 17 4.8 16.2 4.8 15.4 5.1 14.7 5.6 14.1L8.5 11.3 7.1 9.9 4.2 12.7C3.3 13.6 2.8 14.9 2.8 16.2 2.8 17.6 3.3 18.8 4.2 19.8V19.8ZM19.8 11.3C20.7 10.4 21.2 9.1 21.2 7.8 21.2 6.4 20.7 5.2 19.8 4.2 18.8 3.3 17.6 2.8 16.2 2.8 14.9 2.8 13.6 3.3 12.7 4.2L9.9 7.1 11.3 8.5 14.1 5.6C14.7 5.1 15.4 4.8 16.2 4.8 17 4.8 17.8 5.1 18.4 5.6 18.9 6.2 19.2 7 19.2 7.8 19.2 8.6 18.9 9.3 18.4 9.9L15.5 12.7 16.9 14.1 19.8 11.3Z" />
            <path d="M8.5 17L7 15.5 15.5 7.1 17 8.5 8.5 17Z" />
          </svg>
          Copiar enlace
        </button>
      ) : null}
      <script
        dangerouslySetInnerHTML={{
          __html: `${popup}${activeCopyLink ? copyLink : ''}`,
        }}></script>
    </>
  )
}

export default ShareButtons
