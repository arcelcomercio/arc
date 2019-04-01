import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import filterSchema from './_children/filterSchema'
import customFieldsImport from './_children/CustomFieldsImport'
import SeparatorListItem from './_children/separadorLista'

const classes = {
  separator: 'separator margin-top',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle text-uppercase',
  body: 'separator__body',
}

/** TODO: Agregar editableField() al título del separador */

@Consumer
class Separador extends Component {
  constructor(props) {
    super(props)

    /*     const { customFields, apliFields } = this.props || {}
    const { titleSeparator, titleLink, section, htmlCode } = apliFields || {}

    let tituloSeparador = titleSeparator
    let tituloLink = titleLink
    let seccion = section
    let htmlCodigo = htmlCode

    if (customFields) {
      const { titleSeparator, titleLink, section, htmlCode } =
        customFields || {}

      tituloSeparador = titleSeparator
      tituloLink = titleLink
      seccion = section
      htmlCodigo = htmlCode
    }

    this.state = {
      device: this.setDevice(),
      titleSeparator: tituloSeparador,
      titleLink: tituloLink,
      section: seccion,
      htmlCode: htmlCodigo,
      data: [],
    } */

    const {
      customFields: {
        titleSeparator = '',
        titleLink = '/',
        section = '',
        htmlCode = '',
      } = {},
    } = props

    this.state = {
      device: this.setDevice(),
      titleSeparator,
      titleLink,
      section,
      htmlCode,
      data: [],
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
    this.getContentApi()
  }

  getContentApi = () => {
    let newsNumber = 4
    const { device, section, titleSeparator } = this.state
    const { arcSite } = this.props

    if (device === 'mobile') newsNumber = 1
    else if (device === 'desktop' || device === 'tablet') newsNumber = 4

    const { fetched } = this.getContent(
      'historias-por-seccion',
      {
        website: arcSite,
        section,
        news_number: newsNumber,
      },
      filterSchema()
    )
    fetched
      .then(
        ({
          content_elements: contentElements = [],
          section_name: sectionName = '',
        }) => {
          this.setState({
            data: contentElements,
            titleSeparator: titleSeparator || sectionName,
          })
        }
      )
      .catch(error => {
        console.log(error)
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
  customFields: customFieldsImport,
}
export default Separador
