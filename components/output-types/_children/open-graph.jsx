import React from 'react'
import StoryData from '../../utilities/story-data'

export default ({
  fbAppId,
  title,
  description,
  siteUrl,
  contextPath,
  arcSite,
  requestUri,
  siteName,
  article,
  deployment = () => {},
  globalContent: data,
}) => {
  const { multimedia, videoSeo: [{ url = '' } = {}] = [] } =
    new StoryData({ data, arcSite }) 
  const image =
    article && multimedia
      ? multimedia
      : `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/story-image.jpg`
  return (
    <>
      {/* <!-- Facebook OG --> */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_PE" />

      <meta property="fb:app_id" content={fbAppId} />
      <meta property="fb:app_id" content={fbAppId} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={deployment(image)} />
      <meta property="og:image:secure_url" content={deployment(image)} />

      {article && (
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

      <meta property="og:url" content={`${siteUrl}${requestUri}`} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
    </>
  )
}
