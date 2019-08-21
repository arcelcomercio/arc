import React from 'react'

export default ({ siteName = '', siteUrl = '' }) => {
  const structuredData = `{
        "@context": "http://schema.org",
        "@type": "Website",
        "url": "${siteUrl}",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "${siteUrl}/buscar/{search_term_string}/",
          "query-input": "required name=search_term_string"
        }
      }`

  return (
    <>
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${siteName} - Últimas noticias`}
        href={`${siteUrl}//feeds/?outputType=fb-instant-article`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </>
  )
}
