import React, { Fragment } from 'react'
import {
  metaPaginationUrl,
  getMetaPagesPagination,
} from '../../../resources/utilsJs/helpers'

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

  let socialMedia = ''
  socialLinks.forEach(social => {
    socialMedia += `"${social.url}", \n`
  })

  const patternPagination = /\/[0-9]+$|\/[0-9]+?(?=\?|\/$)/
  const pages = getMetaPagesPagination(
    requestUri,
    false,
    globalContent,
    patternPagination
  )

  const urlNextPage = metaPaginationUrl(
    pages.next,
    patternPagination,
    requestUri,
    siteUrl,
    false
  )
  const urlPrevPage = metaPaginationUrl(
    pages.prev,
    patternPagination,
    requestUri,
    siteUrl,
    false
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
    <Fragment>
      {pages.prev && (
        <Fragment>
          <link rel="prev" href={urlPrevPage} />
          <link rel="prefetch" href={urlPrevPage} />
        </Fragment>
      )}
      {pages.next && (
        <Fragment>
          <link rel="next" href={urlNextPage} />
          <link rel="prefetch" href={urlNextPage} />
        </Fragment>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredAutor }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredNews }}
      />
    </Fragment>
  )
}
