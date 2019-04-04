import React, { Component, Fragment } from 'react'

// @Consumer
class MetaAuthor extends Component {
  componentDidMount = () => {}

  render() {
    const {
      globalContent,
      properties: { siteName = '', siteUrl = '' } = {},
    } = this.props

    const {
      content_elements: [{ credits }],
    } = globalContent

    const { content_elements } = globalContent

    const {
      url,
      image = {},
      social_links = [],
      name = '',
      additional_properties: { original: { bio = '' } = {} } = {},
    } = credits.by[0]

    const imgAutor = image.url

    let redes = ''
    social_links.forEach(element => {
      redes += `"${element.url}", \n`
    })

    const urlAutor = `${siteUrl}${url}`

    const itemNews = content_elements.map((news, index) => {
      let { canonical_url } = news

      return `{
        "@type":"ListItem",
        "position":${index},
        "url":"${canonical_url}"
      }${content_elements.lenght - 1 > index ? ',' : ''}`
    })

    const structuredAutor = `
    {
      "@context": "http://schema.org/",
      "@type": "Person",
      "name": "${name}",
      "alternateName": "${name.replace(' ', '').replace(' ', '')}",
      "url": "${urlAutor}", 
      "image": "${imgAutor}",
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
      "url":"${urlAutor}",
      "@type":"ItemList",
      "itemListElement":[
        ${itemNews.map(item => item)}
      ]
    }`

    return (
      <Fragment>
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
}

export default MetaAuthor
