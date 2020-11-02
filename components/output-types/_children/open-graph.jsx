import React from 'react'
import StoryData from '../../utilities/story-data'
import { deleteQueryString } from '../../utilities/parse/queries'
import { SITE_DIARIOCORREO } from '../../utilities/constants/sitenames'
import { createResizedParams } from '../../utilities/resizer/resizer'
import { getAssetsPathVideo, getAssetsPath } from '../../utilities/assets'

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

  if (arcSite === SITE_DIARIOCORREO && primarySectionLink === '/opinion/') {
    image = authorImage
  }
  const urlVideo = getAssetsPathVideo(arcSite, url)
  return (
    <>
      {/* <!-- Facebook OG --> */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_PE" />
      <meta property="fb:app_id" content={fbAppId} />
      <meta property="og:title" content={story ? seoTitle : title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />

      {story && (
        <>
          <meta property="og:image:width" content="980" />
          <meta property="og:image:height" content="528" />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      )}

      {urlVideo && (
        <>
          <meta property="og:video" content={urlVideo} />
          <meta property="og:video:secure_url" content={urlVideo} />
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
