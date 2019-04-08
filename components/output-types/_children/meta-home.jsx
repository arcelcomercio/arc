import React, { Fragment } from 'react'

export default ({ siteName = '', siteUrl = '' }) => {
  const structuredData = `{
        "@context": "http://schema.org",
        "@type": "Website",
        "url": "${siteUrl}",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "${siteUrl}/buscar/{search_term}",
          "query-input": "required name=search_term"
        }
      }`

  return (
    <Fragment>
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${siteName} - Últimas noticias`}
        href="/feed"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </Fragment>
  )
}
