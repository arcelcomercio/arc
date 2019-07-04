import React from 'react'

export default ({
  deployment,
  isStory,
  isAmp,
  siteName = '',
  siteUrl = '',
  colorPrimary = '',
  social: { facebook = {}, twitter = {} } = {},
  charbeatAccountNumber = '',
  siteDomain = '',
  requestUri = '',
  arcSite = '',
  contextPath = '',
} = {}) => {
  const structuredData = `{
    "@context" : "http://schema.org",
    "@type" : "Organization",
    "name" : "${siteName}",
    "url" : "${siteUrl}/",
    "logo": "${deployment(
      `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo-${arcSite}.jpg`
    )}",
    "sameAs" : [
      "${facebook.url || ''}",
      "${twitter.url || ''}"
    ]
  }`

  const charbeatScript = `
          var _sf_async_config = _sf_async_config || {}
          /** CONFIGURATION START **/
          _sf_async_config.uid = ${charbeatAccountNumber} // ACCOUNT NUMBER
          _sf_async_config.domain = "${siteDomain}" // DOMAIN TRACKED
          _sf_async_config.useCanonical = true
          var _sf_startpt = new Date().getTime()
          /** CONFIGURATION END **/`

  return (
    <>
      {isAmp === false && (
        <link
          rel="stylesheet"
          href={deployment(
            `${contextPath}/resources/dist/${arcSite}/css/style.css`
          )}
        />
      )}
      <link
        rel="icon"
        type="image/x-icon"
        href={deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/favicon.ico`
        )}
      />
      <link
        rel="shortcut icon"
        href={deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/favicon.ico`
        )}
      />
      <link
        rel="apple-touch-icon"
        href={deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/apple-touch-icon.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/apple-touch-icon-76x76.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/apple-touch-icon-120x120.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/apple-touch-icon-144x144.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/apple-touch-icon-152x152.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/apple-touch-icon-180x180.png`
        )}
      />
      {isAmp !== true && (
        <link rel="canonical" href={`${siteUrl}${requestUri}`} />
      )}
      {isStory && (
        <link rel="amphtml" href={`${siteUrl}${requestUri}?outputType=amp`} />
      )}
      <meta name="theme-color" content={colorPrimary} />
      <meta name="msapplication-TileColor" content={colorPrimary} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="application-name" content={siteName} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      {isAmp !== true && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: charbeatScript }}
        />
      )}
    </>
  )
}
