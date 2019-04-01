/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react'

export default ({ data }) => {

  const structuredData = `{
    "@context" : "http://schema.org",
    "@type" : "Organization",
    "name" : "${data.siteName}",
    "url" : "https://${data.siteUrl}/",
    "logo": "https://${data.siteUrl}/resources/dist/${data.arcSite}/images/logo-sitio.jpg",
    "sameAs" : [
      "${data.social.facebook.url}",
      "${data.social.twitter.url}",
      "${data.social.youtube.url}",
    ]
  }`

  return (
    <Fragment>
      <link
        rel="shortcut icon"
        href={data.deployment(
          `${data.contextPath}/resources/dist/${data.arcSite}/favicon.ico`
        )}
      />
      <link
        rel="apple-touch-icon"
        href={data.deployment(
          `${data.contextPath}/resources/dist/${data.arcSite}/apple-touch-icon.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={data.deployment(
          `${data.contextPath}/resources/dist/${data.arcSite}/apple-touch-icon-76x76.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={data.deployment(
          `${data.contextPath}/resources/dist/${data.arcSite}/apple-touch-icon-120x120.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={data.deployment(
          `${data.contextPath}/resources/dist/${data.arcSite}/apple-touch-icon-144x144.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={data.deployment(
          `${data.contextPath}/resources/dist/${data.arcSite}/apple-touch-icon-152x152.png`
        )}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={data.deployment(
          `${data.contextPath}/resources/dist/${data.arcSite}/apple-touch-icon-180x180.png`
        )}
      />
      <link
        rel="canonical"
        href={`https://${data.siteUrl}${data.requestUri}`}
      />
      <meta name="theme-color" content={data.colorPrimary} />
      <meta
        name="msapplication-TileColor"
        content={data.colorPrimary}
      />
      <meta
        name="apple-mobile-web-app-title"
        content={data.siteName}
      />
      <meta name="application-name" content={data.siteName} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </Fragment >
  )
}
