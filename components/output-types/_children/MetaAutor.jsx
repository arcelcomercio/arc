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

    let itemNews = content_elements.map((news, index) => {
      let { canonical_url } = news

      return `{
        "@type":"ListItem",
        "position":${index},
        "url":"${canonical_url}"
      }${content_elements.lenght - 1 > index ? ',' : ''}`
    })
    console.log('>>>>>>>>>>>>>>>>>itemsssssss>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(itemNews)

    const {
      url,
      image = {},
      social_links = [],
      additional_properties: {
        original: { role = '', bio = '' } = {},
        name = '',
      } = {},
    } = credits.by[0]

    const imgAutor = image.url

    let redes = ''
    social_links.forEach(element => {
      redes += `"${element.url}", \n`
    })

    const urlAutor = `${siteUrl}${url}`
    // console.log('>>>>>>>>>>>>>>>>>>>>siteName')
    // console.log( `url Autor ${url}`)
    // console.log(siteName)
    // console.log(imgAutor)
    // console.log(siteUrl)
    // console.log(url)
    // console.log(urlAutor)
    // console.log('>>>>>>>>>>>>>>>>>>>>redes')
    // console.log(redes)

    // console.log('>>>>>>>>>>>>>>>>>>>>roles')
    // console.log(role)
    // console.log(bio)

    // {
    //   "@type":"ListItem",
    //   "position":1,
    //   "url":"https://sitio.pe/category/nota-1"
    // }

    const structuredAutor = `
    {
      "@context": "http://schema.org/",
      "@type": "Person",
      "name": "${name}",
      "alternateName": "${'algo'}",
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
        ${itemNews.map(item =>item)}
      ]
    }`
    return (
      <Fragment>
        <script type="application/ld+json">{structuredAutor}</script>
        <script type="application/ld+json">{structuredNews}</script>
      </Fragment>
    )
  }
}

export default MetaAutor
