import React from 'react'
import getProperties from 'fusion:properties'

export default({authorPath = '', stories = [], arcSite = ''}) =>{

    const { siteUrl } = getProperties(arcSite)
    const authorUrl = `${siteUrl}${authorPath}`
    const listItems = stories.map(({ websites = {} }, index) => {
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

    return(
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredNews }}
      />
    )
}