import React, { Component, Fragment } from 'react'
// import Consumer from 'fusion:consumer'

const metaDescription = (value = 'prueba tag') => {
  return `Todas las noticias de ${value} en Nombre Sitio`
}

// @Consumer
class MetaAutor extends Component {
  componentDidMount = () => {}

  render() {
    const description = `Todas las noticias de ${metaDescription()} en Nombre Sitio`
    const { globalContent } = this.props

    const {
      content_elements: [{ credits }],
    } = globalContent

    return (
      <Fragment>
        <meta name="description" content={description} />
        <meta name="twitter:title" content={`${credits.by[0].name || ''} | El Comercio Perú`} />
      </Fragment>
    )
  }
}

export default MetaAutor
