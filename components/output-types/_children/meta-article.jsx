import React, { Fragment } from 'react'
import StoryData from '../../utilities/story-data'

export default ({
  globalContent: data,
  arcSite,
  contextPath,
  siteName = '',
  siteUrl = '',
}) => {
  const {
    title,
    tags,
    link,
    publishDate,
    subTitle,
    author,
    imagesSeo,
    videoSeo,
    contentElementsText: dataElement,
    relatedContent,
  } = new StoryData({ data, arcSite }) || {}

  console.log(
    '====================================================================='
  )
  console.log(videoSeo)
  console.log(
    '====================================================================='
  )

  const videoSeoItems = videoSeo.map(({ url, subtitle }) => {
    return `{ 
        "VideoObject:true,
        "name":"ImageObject",
        "thumbnailUrl": "${url}",
        "description":"${subtitle}",
        "contentUrl":,
        "height":418,
        "width":696
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
    ({ canonical_url: link = '' }, i) => {
      return `{  
      "@type":"ListItem",
      "position":${i + 1},
      "url":"${contextPath}${link}"
      }`
    }
  )

  const relatedContentData = `{  
      "@context":"https://schema.org",
      "@type":"ItemList",
      "itemListElement":[${relatedContentItem}]  
   }`

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
          "url":"${siteUrl}/resources/dist/${arcSite}/images/logo.png?1558370958",
          "height":60,
          "width":316
       }
    },
    "keywords":[${listItems.map(item => item)}]
 }`

  return (
    <Fragment>
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
