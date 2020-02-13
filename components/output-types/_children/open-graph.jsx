import React from 'react'
import StoryData from '../../utilities/story-data'
import { deleteQueryString } from '../../utilities/helpers'
import ConfigParams from '../../utilities/config-params'
import { getAssetsPath } from '../../utilities/constants'

export default ({
  fbAppId,
  title,
  description,
  siteUrl,
  contextPath,
  arcSite,
  siteName,
  story,
  deployment = () => {},
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
      ? multimediaLarge
      : deployment(
          `${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/${arcSite}/images/logo_fb.jpg`
        )

  if (
    arcSite === ConfigParams.SITE_DIARIOCORREO &&
    primarySectionLink === '/opinion/'
  ) {
    image = authorImage
  }

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
          <meta property="og:image:width" content="696" />
          <meta property="og:image:height" content="418" />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      )}

      {url && (
        <>
          <meta property="og:video" content={url} />
          <meta property="og:video:secure_url" content={url} />
          <meta property="og:video:width" content="696" />
          <meta property="og:video:height" content="418" />
          <meta property="og:video:stream:content_type" content="video/mp4" />
          <meta property="og:video:type" content="video/mp4" />
        </>
      )}

      <meta property="og:url" content={`${siteUrl}${link}`} />
      <meta property="og:type" content={story ? 'article' : 'website'} />
    </>
  )
}
