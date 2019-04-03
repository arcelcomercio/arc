import React, { Component, Fragment } from 'react'
// import Consumer from 'fusion:consumer'

const metaDescription = (value = 'prueba tag') => {
  return `Todas las noticias de ${value} en Nombre Sitio`
}

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

    const urlAutor =`${siteUrl}${url}`
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

    const structuredData = `
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

    return (
      <Fragment>
        <script>
          {structuredData}
        </script>
      </Fragment>
    )
  }
}

export default MetaAutor
