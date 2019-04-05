import React, { Fragment } from 'react'

const getPaginationUrl = url => {
  const getPageNumber = url.match(/\/[0-9]+$|\/[0-9]+?(?=\?|\/$)/)
  let pageNumber = 0
  let prevPage = ''
  let nextPage = ''
  const pages = []

  if (getPageNumber) {
    getPageNumber[0].replace('/', '')

    pageNumber = parseInt(getPageNumber[0].replace('/', ''), 10)

    nextPage = url.replace(
      url.match(/\/[0-9]+$|\/[0-9]+?(?=\?|\/$)/)[0],
      `/${pageNumber + 1}`
    )
    prevPage = url.replace(
      url.match(/\/[0-9]+$|\/[0-9]+?(?=\?|\/$)/)[0],
      `/${pageNumber === 1 ? '' : pageNumber - 1}`
    )
    pages.push(nextPage)
    pages.push(prevPage)
  }
  return pages
}

const MetaAuthor = ({ globalContent, siteName, siteUrl, requestUri }) => {
  const { content_elements: contentElements } = globalContent || {}
  const [{ credits: { by = [] } = {} } = {}] = contentElements || []
  const {
    url: authorPath = '',
    image: { url: authorImg = '' } = {},
    social_links: socialLinks = [],
    name = '',
    additional_properties: { original: { bio = '' } = {} } = {},
  } = by[0]

  let socialMedia = ''
  socialLinks.forEach(social => {
    //
    socialMedia += `"${social.url}", \n`
  })

  const pagesPagination = getPaginationUrl(requestUri)
  let nextPage = ''
  let prefetch = ''

  if (getPaginationUrl(requestUri).length > 0) {
    nextPage = `${siteUrl}${pagesPagination[0]}`
    prefetch = `${siteUrl}${pagesPagination[1]}`
  }

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
    "alternateName": "${name.replace(' ', '').replace(' ', '')}",
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
      <link rel="next" href={nextPage} />
      <link rel="prefetch" href={prefetch} />
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

export default MetaAuthor
