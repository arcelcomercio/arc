import React from 'react'
import StoryData from '../../utilities/story-data'
import { deleteQueryString } from '../../utilities/helpers'
import ConfigParams from '../../utilities/config-params'
import { getAssetsPath } from '../../utilities/constants'
import { getResizedUrl } from '../../utilities/resizer'
import { getAssetsPathVideo } from '../../utilities/assets'

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
  } = new StoryData({
    data,
    arcSite,
  })

  let image =
    story && multimediaLarge
      ? getResizedUrl({
          url: multimediaLarge,
          presets: 'large:980x528',
          arcSite,
        }).large
      : `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/logo_fb.jpg?d=1`

  if (
    arcSite === ConfigParams.SITE_DIARIOCORREO &&
    primarySectionLink === '/opinion/'
  ) {
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
