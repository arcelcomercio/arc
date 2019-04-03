import React, { Fragment } from 'react'

export default ({
  fbAppId,
  title,
  description,
  siteUrl,
  arcSite,
  requestUri,
  siteName,
  article,
  deployment = () => {},
}) => {
  return (
    <Fragment>
      {/* <!-- Facebook OG --> */}
      <meta property="fb:app_id" content={fbAppId} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={
          article // TODO: Img de articulo o logo
            ? deployment(
                `${siteUrl}/resources/dist/${arcSite}/images/logo-sitio.jpg`
              )
            : deployment(
                `${siteUrl}/resources/dist/${arcSite}/images/logo-sitio.jpg`
              )
        }
      />
      {article && (
        <Fragment>
          <meta property="og:image:width" content="696" />
          <meta property="og:image:height" content="418" />
          <meta property="og:image:type" content="image/jpeg" />
        </Fragment>
      )}
      <meta property="og:url" content={`${siteUrl}${requestUri}`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
    </Fragment>
  )
}
