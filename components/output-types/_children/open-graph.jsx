import React from 'react'

import { getAssetsPath, getAssetsPathVideo } from '../../utilities/assets'
import {
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIO,
  SITE_TROME,
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
  isTrivia,
  isAmp = false,
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

  const { promo_items: { basic_movil: { url: movilImage = '' } = {} } = {} } =
    data || {}

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
  const imges = { '360x550': { width: 360, height: 550 } }
  const imagenAmp = arcSite !== SITE_TROME ? 'large:420x250' : 'large:600x360'
  const imagenPreloadAmp = isAmp ? imagenAmp : 'large:280x159'
  const imagePreload =
    story &&
    multimediaLarge &&
    !idYoutube &&
    createResizedParams({
      url: isTrivia ? movilImage : multimediaLarge,
      presets: isTrivia ? imges : imagenPreloadAmp,
      arcSite,
    })
  if (arcSite === SITE_DIARIOCORREO && primarySectionLink === '/opinion/') {
    image = authorImage
  }
  if (arcSite === SITE_ELCOMERCIO && !story) {
    const isSaltarIntro = /^\/saltar-intro\//.test(requestUri)
    const isProvecho = /^\/provecho\//.test(requestUri)
    if (isSaltarIntro) {
      image = `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/logo_saltar-intro.jpg?d=1`
    } else if (isProvecho) {
      image = `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/logo_provecho.png?d=1`
    }
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
      {story && (
        <link
          rel="preload"
          as="image"
          href={imagePreload[`360x550`] || imagePreload.large}
        />
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
