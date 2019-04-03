/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react'

export default ({
  data: {
    siteName = '',
    siteUrl = '',
    colorPrimary = '',
    social: { facebook = {}, twitter = {}, youtube = {} } = {},
    requestUri = '',
    arcSite = '',
    contextPath = '',
    deployment = () => {},
  },
} = {}) => {
  const structuredData = `{
    "@context" : "http://schema.org",
    "@type" : "Organization",
    "name" : "${siteName}",
    "url" : "https://${siteUrl}/",
    "logo": "https://${siteUrl}/resources/dist/${arcSite}/images/logo-sitio.jpg",
    "sameAs" : [
      "${facebook.url || ''}",
      "${twitter.url || ''}",
      "${youtube.url || ''}",
    ]
  }`

  return (
    <Fragment>
      <link
        rel="stylesheet"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/css/style.css`
        )}
      />
      <link
        rel="icon"
        type="image/x-icon"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/favicon.ico`
        )}
      />
      <link
        rel="shortcut icon"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/favicon.ico`
        )}
      />
      <link
        rel="apple-touch-icon"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/apple-touch-icon.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/apple-touch-icon-76x76.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/apple-touch-icon-120x120.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/apple-touch-icon-144x144.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/apple-touch-icon-152x152.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/apple-touch-icon-180x180.png`
        )}
      />
      <link rel="canonical" href={`https://${siteUrl}${requestUri}`} />
      <meta name="theme-color" content={colorPrimary} />
      <meta name="msapplication-TileColor" content={colorPrimary} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="application-name" content={siteName} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </Fragment>
  )
}
