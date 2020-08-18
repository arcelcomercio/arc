import React from 'react'
import {
  metaPaginationUrl,
  getMetaPagesPagination,
} from '../_dependencies/pagination'

export default ({
  globalContent,
  siteName = '',
  siteUrl = '',
  requestUri = '',
  contextPath,
  arcSite,
}) => {
  const { content_elements: contentElements = [] } = globalContent || {}
  // const [{ credits: { by = [] } = {} } = {}] = contentElements || {}
  const logoAuthor = `${contextPath}/resources/dist/${arcSite}/images/author.png`
  const { author: {
    bio_page: authorPath = '',
    image: authorImg = '',
    byline: name = '',
    email = '', 
    bio = '',
    languages = '', 
    location = '', 
    twitter = '', 
    role = '', 
    books = [],
    expertise = ''
  } = {} } = globalContent || {}

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

  let sameAs = []
  const authorUrl = `${siteUrl}${authorPath}`
  const authorUrlSameAs = (authorUrl && `"${authorUrl}"`)
  sameAs.push(authorUrlSameAs)
  const authorLanguages = (languages && languages.split(','))
  const twitterData = (twitter && twitter.split(','))
  const twitterUrl = (twitterData && twitterData[1] && `"${twitterData[1]}"`)
  sameAs.push(twitterUrl)
  const booksData = (books && books.map(item => `"${item.url}"`).join(','))
  sameAs.push(booksData)

  const expertiseData = expertise.split(',').map(item => {
    let text = `"${item}"`
    const itemMatch = item.match("^{([^}]+)}(.+)")
    if( itemMatch != null){
      text = `{
        "@type":"${itemMatch[1]}",
        "name":"${itemMatch[2]}"
      }`
    }
    return text
  })

  const structuredAutor = `
  {
    "@context": "http://schema.org/",
    "@type": "Person",
    "name": "${name}",
    "url": "${authorUrl}", 
    "image": "${authorImg || logoAuthor}",
    "workLocation" : {
      "@type": "Place",
      "name" : "${location}"
    },
    "description" : "${bio}", 
    "contactPoint"     : {
      "@type"        : "ContactPoint",
      "contactType"  : "Journalist",
      "email"        : "${email}"
    },
    "email": "${email}",
    "worksFor": {
      "@type": "Organization",
      "name": "${siteName}"
    }, 
    "knowsAbout": [${expertiseData}], 
    "knowsLanguage": [
      ${authorLanguages && (authorLanguages.map(language => {
        return `{"@type": "Language",
                 "name": "${language}"
                }`
        }))}
      ],
    "sameAs" : [${sameAs.filter(item => !(item === ''))}], 
    "jobTitle"	: "${role}"
  }`

  const listItems = contentElements.map(({ websites = {} }, index) => {
    return `{
      "@type":"ListItem",
      "position":${index + 1}, 
      "url":"${websites[arcSite].website_url}"
    }`
  })

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
      { contentElements.length >0 && 
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredNews }}
      />
      }
    </>
  )
}
