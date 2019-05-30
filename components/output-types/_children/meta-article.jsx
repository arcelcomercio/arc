import React, { Fragment } from 'react'
import StoryData from '../../utilities/story-data'

export default ({
  globalContent: data,
  arcSite,
  contextPath,
  siteName = '',
  siteUrl = '',
  deployment,
}) => {
  const {
    title,
    tags,
    link,
    publishDate,
    subTitle,
    author,
    imagesSeo,
    section,
    videoSeo,
    contentElementsText: dataElement,
    relatedContent,
  } = new StoryData({ data, arcSite }) || {}

  const videoSeoItems = videoSeo.map(({ url, caption, urlImage, date }) => {
    return `{ 
      "@type":"VideoObject",
        "name":"${caption}",
        "thumbnailUrl": "${urlImage}",
        "description":"${caption}",
        "contentUrl": "${url}",
        "uploadDate": "${date}"
     }
     `
  })

  const imagesSeoItems = imagesSeo.map(({ url, subtitle }) => {
    return `{ 
         "representativeOfPage":true,
         "@type":"ImageObject",
         "url": "${url}",
         "description":"${subtitle}",
         "height":418,
         "width":696
      }
      `
  })

  const listItems = tags.map(({ description }) => {
    return `"${description}"`
  })

  const relatedContentItem = relatedContent.map(
    ({ canonical_url: urlItem = '' }, i) => {
      return `{  
      "@type":"ListItem",
      "position":${i + 1},
      "url":"${contextPath}${urlItem}"
      }`
    }
  )

  const relatedContentData = relatedContentItem[0]
    ? `{  
      "@context":"https://schema.org",
      "@type":"ItemList",
      "itemListElement":[${relatedContentItem}]  
   }`
    : ''

  const structuredData = `{  
    "@context":"http://schema.org",
    "@type":"NewsArticle",
    "datePublished":"${publishDate}",
    "dateModified":"${publishDate}",
    "headline":"${title}",
    "description":"${subTitle}",
    "articleBody":"${dataElement}",
    "mainEntityOfPage":{  
       "@type":"WebPage",
       "@id":"${link}"
    },
    "image":[  
       ${imagesSeoItems}
    ],
    "video":[ ${videoSeoItems}
    ],
    "author":{  
       "@type":"Person",
       "name":"${author}"
    },
    "publisher":{  
       "@type":"Organization",
       "name":"${siteName}",
       "logo":{  
          "@type":"ImageObject",
          "url":"${deployment(
            `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo.png`
          )}",
          "height":60,
          "width":316
       }
    },
    "keywords":[${listItems.map(item => item)}]
 }`

  return (
    <Fragment>
      <meta
        property="article:publisher"
        content={`http://www.facebook.com/${siteUrl}`}
      />
      <meta name="author" content={`Redacción ${siteName}`} />

      <meta name="bi3dPubDate" content={publishDate} />
      <meta name="bi3dArtId" content="639992" />
      <meta name="bi3dSection" content={section} />
      <meta name="bi3dArtTitle" content={title} />
      <meta name="cXenseParse:per-categories" content={section} />

      <meta property="article:published_time" content={publishDate} />
      <meta property="article:modified_time" content={publishDate} />
      <meta property="article:author" content={`Redacción ${siteName}`} />
      <meta property="article:section" content={section} />
      <meta property="article:tag" content={listItems.map(item => item)} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: relatedContentData }}
      />
    </Fragment>
  )
}
