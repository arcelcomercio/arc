import React, { Fragment } from 'react'

const getUrlPagination = url => {
  const getNumberPage = url.match(/\/[0-9]+$|\/[0-9]+?(?=\?|\/$)/)
  let NumerPage = 0
  let prevPage = ''
  let nextPage = ''
  let pages = []
  if (getNumberPage) {
    getNumberPage[0].replace('/', '')

    NumerPage = parseInt(getNumberPage[0].replace('/', ''), 10)

    nextPage = url.replace(
      url.match(/\/[0-9]+$|\/[0-9]+?(?=\?|\/$)/)[0],
      `/${NumerPage + 1}`
    )
    prevPage = url.replace(
      url.match(/\/[0-9]+$|\/[0-9]+?(?=\?|\/$)/)[0],
      `/${NumerPage === 1 ? '' : NumerPage - 1}`
    )
    pages.push(nextPage)
    pages.push(prevPage)
  }
  return pages
}

const MetaAuthor = ({ globalContent, siteName, siteUrl, requestUri }) => {
  const {
    content_elements: [{ credits }],
  } = globalContent

  const { content_elements } = globalContent

  const {
    url,
    image: { url: authorImg = '' } = {},
    social_links: socialLinks = [],
    name = '',
    additional_properties: { original: { bio = '' } = {} } = {},
  } = credits.by[0]

  let redes = ''
  socialLinks.forEach(social => {
    //
    redes += `"${social.url}", \n`
  })

  const pagesPagination = getUrlPagination(requestUri)
  let nextPage = ''
  let prefetch = ''
  if (getUrlPagination(requestUri).length > 0) {
    nextPage = `${siteUrl}${pagesPagination[0]}`
    prefetch = `${siteUrl}${pagesPagination[1]}`
  }

  const authorUrl = `${siteUrl}${url}`
  const listItems = content_elements.map(
    ({ canonical_url: canonicalUrl }, index) => {
      return `{
      "@type":"ListItem",
      "position":${index}, 
      "url":"${canonicalUrl}"
    }${content_elements.lenght - 1 > index ? ',' : ''}`
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
      ${redes}
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
