import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import CustomFieldsImport from './_children/customFields'
import filterSchema from './_children/filterSchema'
import DataStory from './../../../resources/components/utils/data-story'

const classes = {
  tabloide: 'tabloide',
  header: 'tabloide__header',
  body: 'tabloide__body',
  imgContent: 'tabloide__imgContent',
  imgPortada: 'tabloide__imgPortada',
}
@Consumer
class Tabloide extends Component {
  constructor(props) {
    super(props)

    const {
      customFields: { seccion, secctionName },
    } = this.props || {}

    this.state = {
      seccion,
      secctionName,
      data: {},
    }
  }

  componentDidMount = () => {
    const { seccion } = this.state
    this.getContentApi(seccion)
  }

  getContentApi = seccion => {
    if (seccion) {
      const { arcSite } = this.props

      const { fetched } = this.getContent(
        'stories__by-section',
        {
          website: arcSite,
          section: seccion,
          news_number: 1,
        },

        filterSchema(arcSite)
      )

      fetched.then(response => {
        if (!response) {
          // eslint-disable-next-line no-param-reassign
          response = []
          console.log(
            'No hay respuesta del servicio para obtener la ultima noticia'
          )
        }

        if (!response.content_elements) {
          response.content_elements = []
          console.log(
            'No hay respuesta del servicio para obtener la ultima noticia'
          )
        }

        if (response.content_elements.length > 0) {
          const prueba = new DataStory(response.content_elements[0], arcSite)
          
          this.setState({
            data: prueba,
          })
        }
      })
      .catch(e => console.log(e))
    }
  }

  nameDate = datestring => {
    const dias = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ]
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]
    const date = new Date(datestring)
    const name = `${dias[date.getDay()]} ${date.getDate()} de ${
      meses[date.getMonth()]
    } de ${date.getFullYear()}`

    return name
  }

  render() {
    const {
      secctionName,
      data: { link, multimedia, title, date, section },
    } = this.state

    const nameDate = this.nameDate(date)

    return (
      <div className={classes.tabloide}>
        <div className={classes.header}>
          <h4>
            <a href={link}>{secctionName || section}</a>
          </h4>
        </div>
        <div className={classes.body}>
          <h3>
            <a href={link}>{nameDate}</a>
          </h3>
          <div className={classes.imgContent}>
            <figure>
              <picture>
                <a href={link}>
                  <img
                    className={classes.imgPortada}
                    src={multimedia}
                    alt={title}
                  />
                </a>
              </picture>
            </figure>
          </div>
        </div>
      </div>
    )
  }
}

Tabloide.propTypes = {
  customFields: CustomFieldsImport,
}
export default Tabloide
