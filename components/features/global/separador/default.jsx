import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import filterSchema from './_children/filterSchema'
import customFieldsImport from './_children/customFields'
import SeparatorListItem from './_children/separadorLista'

const classes = {
  separator: 'separator',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle',
  body: 'separator__body',
}

@Consumer
class Separador extends Component {
  constructor(props) {
    super(props)

    const { customFields, apliFields } = this.props || {}
    let tituloSeparador
    let tituloLink
    let seccion
    let htmlCodigo

    
    if (apliFields) {
      const { titleSeparator, titleLink, section, htmlCode } = apliFields || {}
      tituloSeparador = titleSeparator
      tituloLink = titleLink
      seccion = section
      htmlCodigo = htmlCode
    } else {
      const { titleSeparator, titleLink, section, htmlCode } =
        customFields || {}
      tituloSeparador = titleSeparator
      tituloLink = titleLink
      seccion = section
      htmlCodigo = htmlCode
    }
    
    this.state = {
      device: this.setDevice(),
      titleSeparator:tituloSeparador,
      titleLink: tituloLink,
      section: seccion,
      htmlCode: htmlCodigo,
      data: [],
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
    this.getContentApi()
  }

  getContentApi = () => {
    let newsNumber = 4
    const { device } = this.state

    if (device === 'mobile') {
      newsNumber = 1
    } else if (device === 'desktop') {
      newsNumber = 4
    } else if (device === 'tablet') {
      newsNumber = 4
    }

    const { arcSite } = this.props
    const { section } = this.state

    const { fetched } = this.getContent(
      'stories__by-section',
      {
        website: arcSite,
        section,
        news_number: newsNumber,
      },
      filterSchema()
    )
    fetched.then(response => {
      if (!response) {
        // eslint-disable-next-line no-param-reassign
        response = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      if (!response.content_elements) {
        response.content_elements = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      this.setState({
        data: response.content_elements,
      })
    })
  }

  handleResize = () => {
    const wsize = window.innerWidth
    const { device } = this.state

    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.getContentApi()
      // ------ Set the new state if you change from desktop to mobile
    } else if (wsize < 1024 && wsize >= 640 && device !== 'tablet') {
      this.setState({
        device: 'tablet',
      })
      this.getContentApi()
    } else if (wsize < 640 && device !== 'mobile') {
      // ------ Set the new state if you change from desktop to mobile
      this.setState({
        device: 'mobile',
      })
      this.getContentApi()
    }
  }

  setDevice = () => {
    const wsize = window.innerWidth

    if (wsize < 640) {
      return 'mobile'
    }
    if (wsize >= 640 && wsize < 1024) {
      return 'tablet'
    }
    return 'desktop'
  }

  createMarkup = html => {
    return { __html: html }
  }

  render() {
    const { titleSeparator, titleLink, htmlCode, data } = this.state

    return (
      <div className={classes.separator}>
        {titleSeparator ? (
          <h1 className={classes.title}>
            <a href={titleLink}>{titleSeparator}</a>
          </h1>
        ) : (
          <div
            className={classes.title}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={this.createMarkup(htmlCode)}
          />
        )}

        <div className={classes.body}>
          <SeparatorListItem data={data} />
        </div>
      </div>
    )
  }
}

Separador.propTypes = {
  customFieldsImport,
}
export default Separador
