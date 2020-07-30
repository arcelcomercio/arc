import React from 'react'

export default({authorPath = '', stories = [], arcSite = ''}) =>{

    const authorUrl = `https://elcomercio.pe${authorPath}`
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