import React from 'react'
import {
  metaPaginationUrl,
  getMetaPagesPagination,
  formatHtmlToText,
} from '../../utilities/helpers'

export default ({
  globalContent,
  siteName = '',
  siteUrl = '',
  requestUri = '',
  contextPath,
  arcSite,
}) => {
  const { content_elements: contentElements = [] } = globalContent || {}
  const [{ credits: { by = [] } = {} } = {}] = contentElements || {}
  const logoAutor = `${contextPath}/resources/dist/${arcSite}/images/author.png`
  const {
    url: authorPath = '',
    image: { url: authorImg = '' } = {},
    social_links: socialLinks = [],
    name = '',
    additional_properties: { original: { bio = '' } = {} } = {},
  } = by[0] || []

  const socialMedia = socialLinks
    .map(({ url, site }) => {
      const emailAuthor = site !== 'email' ? url : ''
      return `"${emailAuthor}"`
    })
    .filter(String)

  const emailAhutor = socialLinks
    .map(({ url, site }) => {
      const emailAuthor = site === 'email' ? url : ''
      return `${emailAuthor}`
    })
    .filter(String)

  const patternPagination = /\/[0-9]+\/?(?=\?|$)/
  const pages = getMetaPagesPagination(
    requestUri,
    globalContent,
    patternPagination
  )

  const urlNextPage = metaPaginationUrl(
    pages.next,
    patternPagination,
    requestUri,
    siteUrl
  )
  const urlPrevPage = metaPaginationUrl(
    pages.prev,
    patternPagination,
    requestUri,
    siteUrl
  )

  const authorUrl = `${siteUrl}${authorPath}`
  const listItems = contentElements.map(({ websites = {} }, index) => {
    return `{
      "@type":"ListItem",
      "position":${index + 1}, 
      "url":"${websites[arcSite].website_url}"
    }`
  })

  const UrlRedesSocial =
    (socialMedia[0] !== '""' &&
      `"sameAs": [
    ${socialMedia}
  ],`) ||
    ''

  const structuredAutor = `
  {
    "@context": "http://schema.org/",
    "@type": "Person",
    "name": "${formatHtmlToText(name)}",
    "url": "${authorUrl}", 
    "image": "${authorImg || logoAutor}",
    "email": "${emailAhutor}",
    ${UrlRedesSocial}
    "jobTitle": "${bio}",
      "worksFor": {
        "@type": "Organization",
        "name": "${siteName}"
      }
  }`

  const structuredNews = `{
    "@context":"http://schema.org",
    "url":"${authorUrl}",
    "@type":"ItemList",
    "itemListElement":[
      ${listItems.map(item => item)}
    ]
  }`

  return (
    <>
      {pages.prev && (
        <>
          <link rel="prev" href={urlPrevPage} />
          {/* <link rel="prefetch" href={urlPrevPage} /> */}
        </>
      )}
      {pages.next && (
        <>
          <link rel="next" href={urlNextPage} />
          {/* <link rel="prefetch" href={urlNextPage} /> */}
        </>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredAutor }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredNews }}
      />
    </>
  )
}
