import React, { Component, Fragment } from 'react'

/**
 *  TODO: Este componente puede ser una función en lugar de clase
 *  revisar meta-search
 */

// @Consumer
class MetaAuthor extends Component {
  componentDidMount = () => {}

  render() {
    const {
      globalContent,
      /** TODO:
       *  Se está recibiendo todo el objeto "propiedades" pero sólo
       *  se usa siteName y siteUrl, sería más eficiente enviar
       *  estas dos propiedades sólamente por separado desde "default"
       * 
       *  const metaAuthorData = {
            siteName: siteProperties.siteName,
            siteUrl: siteProperties.siteUrl,
            globalContent,
          } 
       *  <MetaAuthor {...metaAuthorData} />
       *
       */
      properties: { siteName = '', siteUrl = '' } = {},
    } = this.props

    /**
     *  TODO
     *  Recuerda manejar los errores en caso de recibir "undefined".
     *  También que globalContent suele responder "null" cuando no tiene
     *  contenido, por lo cual no debe validarse en la misma destructuración
     *  sino al asignar.
     *
     *  EJ.
     *  const { content_elements: contentElements = [] } = globalContent || {}
     *  const [{ credits: { by = []} } = {}] = contentElements
     */
    const {
      content_elements: [{ credits }],
    } = globalContent

    const { content_elements } = globalContent

    const {
      url, // url: authorPath,  Haría esto para tener mayor legibilidad
      image = {}, // image: { url: authorImg = '' } = {},
      social_links = [], // TODO: social_links: socialLinks = [],
      name = '',
      additional_properties: { original: { bio = '' } = {} } = {},
    } = credits.by[0] // = by[0] podría quedar así con el cambio de arriba

    const imgAutor = image.url // Podría eliminarse con el comentario 3 lineas arriba

    /**
     * TODO
     * Para tener mejor legibilidad llamaría "social" o "socialLink" a "element"
     * TODO
     * Cambiaría "redes" por "socialMedias" o "socials"
     */
    let redes = ''
    social_links.forEach(element => {
      //
      redes += `"${element.url}", \n`
    })

    /**
     * TODO
     * const authorUrl = `${siteUrl}${authorPath}
     */
    const urlAutor = `${siteUrl}${url}`

    // Cambiaría "itemNews" por "listItems"
    // Movería "const listItems" justo sobre "const structuredNews" para legibilidad
    const itemNews = content_elements.map((news, index) => {
      /**
       * TODO
       * Puedes hacer la destructuración de "news" directamente en el param
       * del map
       *
       * Ej.
       * contentElements.map(({canonical_url: canonicalUrl}, index) => {...
       */
      let { canonical_url } = news

      // TODO: No hay "position" 0, creo que se debería sumar 1 al index.
      return `{
        "@type":"ListItem",
        "position":${index}, 
        "url":"${canonical_url}"
      }${content_elements.lenght - 1 > index ? ',' : ''}`
    })

    // TODO: Revisar como se construye alternateName
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
