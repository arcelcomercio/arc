import React, { Component, Fragment } from 'react'
// import Consumer from 'fusion:consumer'

// const metaDescription = (value = 'prueba tag') => {
//   return `Todas las noticias de ${value} en Nombre Sitio`
// }

// @Consumer
class MetaAutor extends Component {
  componentDidMount = () => {}

  render() {
    // const description = `Todas las noticias de ${metaDescription()} en Nombre Sitio`
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
      name='',
      additional_properties: {
        original: { role = '', bio = '',byline='' } = {},
        
      } = {},
    } = credits.by[0]

    const imgAutor = image.url

    let redes = ''
    social_links.forEach(element => {
      redes += `"${element.url}", \n`
    })

    const urlAutor = `${siteUrl}${url}`
    
    

    let itemNews = content_elements.map((news, index) => {
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
      "alternateName": "${name.replace(' ','').replace(' ','')}",
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


    console.log("<<<>>>>><<<<<<<<<<<<<<<<<<<<<<name")
    ;

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

export default MetaAutor
