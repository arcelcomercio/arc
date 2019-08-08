import React from 'react'
import StoryData from '../../utilities/story-data'
import { deleteQueryString } from '../../utilities/helpers'

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
    multimediaLandscapeXL,
    videoSeo: [{ url = '' } = {}] = [],
  } = new StoryData({
    data,
    arcSite,
  })

  const image =
    story && multimediaLandscapeXL
      ? multimediaLandscapeXL
      : deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo_fb.jpg`
        )
  return (
    <>
      {/* <!-- Facebook OG --> */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_PE" />

      <meta property="fb:app_id" content={fbAppId} />
      <meta property="og:title" content={title} />
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
