import React from 'react'

import { getAssetsPath, getAssetsPathVideo } from '../../utilities/assets'
import {
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIO,
} from '../../utilities/constants/sitenames'
import { deleteQueryString } from '../../utilities/parse/queries'
import { createResizedParams } from '../../utilities/resizer/resizer'
import { getResultJwplayer } from '../../utilities/story/helpers'
import StoryData from '../../utilities/story-data'

export default ({
  fbAppId,
  title,
  description,
  siteUrl,
  contextPath,
  arcSite,
  siteName,
  story,
  globalContent: data,
  requestUri,
}) => {
  let link = deleteQueryString(requestUri)
  link = link.replace(/\/homepage[/]?$/, '/')
  const {
    multimediaLarge,
    videoSeo: [{ url = '' } = {}] = [],
    title: seoTitle,
    authorImage,
    primarySectionLink,
    idYoutube,
    jwplayerSeo: [{ conversions = [] } = {}] = [],
  } = new StoryData({
    data,
    arcSite,
  })

  const imageYoutube = idYoutube
    ? `https://i.ytimg.com/vi/${idYoutube}/hqdefault.jpg`
    : `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/logo_fb.jpg?d=1`

  let image =
    story && multimediaLarge && !idYoutube
      ? createResizedParams({
          url: multimediaLarge,
          presets: 'large:980x528',
          arcSite,
        }).large
      : `${imageYoutube}`
  const imagePreloac =
    story && multimediaLarge && !idYoutube
      ? createResizedParams({
          url: multimediaLarge,
          presets: 'large:280x159',
          arcSite,
        }).large
      : `${imageYoutube}`
  if (arcSite === SITE_DIARIOCORREO && primarySectionLink === '/opinion/') {
    image = authorImage
  }
  const isSaltarIntro = /^\/saltar-intro\//.test(requestUri)
  if (arcSite === SITE_ELCOMERCIO && isSaltarIntro && !story) {
    image = `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/logo_saltar-intro.jpg?d=1`
  }

  const urlVideo = getAssetsPathVideo(arcSite, url)
  const ulrJwplayer = getResultJwplayer(conversions)
  return (
    <>
      {/* <!-- Facebook OG --> */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_PE" />
      <meta property="fb:app_id" content={fbAppId} />
      <meta property="og:title" content={story ? seoTitle : title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <link rel="preload" as="image" href={imagePreloac} />

      {arcSite === SITE_ELCOMERCIO && (
        <>
          <link
            rel="preload"
            href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/roboto-v20-latin-700.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/roboto-v20-latin-regular.woff2"
            as="font"
            type="font/woff2"
          />
        </>
      )}
      <meta property="og:image:secure_url" content={image} />

      {story && (
        <>
          <meta property="og:image:width" content="980" />
          <meta property="og:image:height" content="528" />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      )}

      {(urlVideo || ulrJwplayer) && (
        <>
          <meta property="og:video" content={urlVideo || ulrJwplayer} />
          <meta
            property="og:video:secure_url"
            content={urlVideo || ulrJwplayer}
          />
          <meta property="og:video:width" content="980" />
          <meta property="og:video:height" content="528" />
          <meta property="og:video:stream:content_type" content="video/mp4" />
          <meta property="og:video:type" content="video/mp4" />
        </>
      )}

      <meta property="og:url" content={`${siteUrl}${link}`} />
      <meta property="og:type" content={story ? 'article' : 'website'} />
    </>
  )
}
