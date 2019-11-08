import React from 'react'
import {
  metaPaginationUrl,
  getMetaPagesPagination,
} from '../../utilities/helpers'

export default ({
  globalContent,
  siteName = '',
  siteUrl = '',
  requestUri = '',
}) => {
  const { content_elements: contentElements = [] } = globalContent || {}
  const [{ credits: { by = [] } = {} } = {}] = contentElements || {}

  const {
    url: authorPath = '',
    image: { url: authorImg = '' } = {},
    social_links: socialLinks = [],
    name = '',
    additional_properties: {
      original: { bio = '', firstName = '', lastName = '' } = {},
    } = {},
  } = by[0] || []

  const socialMedia = socialLinks.map(({ url }) => {
    return `"${url}"`
  })

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
  const listItems = contentElements.map(
    ({ canonical_url: canonicalUrl }, index) => {
      return `{
      "@type":"ListItem",
      "position":${index + 1}, 
      "url":"${canonicalUrl}"
    }${contentElements.lenght - 1 > index ? ',' : ''}`
    }
  )

  const structuredAutor = `
  {
    "@context": "http://schema.org/",
    "@type": "Person",
    "name": "${name}",
    "alternateName": "${firstName}${lastName}",
    "url": "${authorUrl}", 
    "image": "${authorImg}",
    "sameAs": [
      ${socialMedia}
    ],
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
