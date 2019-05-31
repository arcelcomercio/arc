import React from 'react'

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
}) => {
  return (
    <>
      {/* <!-- Facebook OG --> */}
      <meta property="fb:app_id" content={fbAppId} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={
          article // TODO: Falta agregar Img de articulo dinámica
            ? deployment(
                `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/story-image.jpg`
              )
            : deployment(
                `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo-sitio.jpg`
              )
        }
      />
      {article && (
        <>
          <meta property="og:image:width" content="696" />
          <meta property="og:image:height" content="418" />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      )}
      <meta property="og:url" content={`${siteUrl}${requestUri}`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
    </>
  )
}
