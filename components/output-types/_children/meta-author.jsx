import React, { Fragment } from 'react'

export default ({
  globalContent,
  siteName = '',
  siteUrl = '',
  requestUri = '',
}) => {
  const { next, previous, content_elements: contentElements = [] } =
    globalContent || {}
  const [{ credits: { by = [] } = {} } = {}] = contentElements || {}
  const patternPagination = /\/[0-9]+$|\/[0-9]+?(?=\?|\/$)/

  const paginationUrl = pageNumber => {
    return requestUri.match(patternPagination) !== null
      ? `${siteUrl}${requestUri.replace(patternPagination, `/${pageNumber}`)}`
      : `${siteUrl}${requestUri}/${pageNumber}`
  }

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
    //
    socialMedia += `"${social.url}", \n`
  })

  const currentPage = requestUri.match(patternPagination)
    ? parseInt(requestUri.match(patternPagination)[0].split('/')[1], 10)
    : 1

  const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
  const prevPage = currentPage - 1

  const hasNext = next !== undefined
  const hasPrev = previous !== undefined
  const urlNextPage = paginationUrl(nextPage)
  const urlPrevPage = paginationUrl(prevPage)

  const authorUrl = `${siteUrl}${authorPath}`
  const listItems = contentElements.map(
    ({ canonical_url: canonicalUrl }, index) => {
      return `{
      "@type":"ListItem",
      "position":${index}, 
      "url":"${canonicalUrl}"
    }${contentElements.lenght - 1 > index ? ',' : ''}`
    }
  )

  // TODO: Revisar como se construye alternateName
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
      {hasPrev && (
        <Fragment>
          <link rel="prev" href={urlPrevPage} />
          <link rel="prefetch" href={urlPrevPage} />
        </Fragment>
      )}
      {hasNext && (
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
