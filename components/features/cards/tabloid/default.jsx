import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import CustomFieldsImport from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const classes = {
  tabloide: 'tabloide',
  header: 'tabloide__header',
  body: 'tabloide__body',
  imgContent: 'tabloide__imgContent',
  imgPortada: 'tabloide__imgPortada',
}
@Consumer
class CardTabloid extends PureComponent {
  constructor(props) {
    super(props)

    const {
      customFields: { seccion = '', secctionName = '' } = {},
    } = this.props

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
    // if (seccion) {
    const { arcSite } = this.props

    const { fetched } = this.getContent(
      'story-feed-by-section',
      {
        website: arcSite,
        section: seccion,
        news_number: 1,
      },

      schemaFilter(arcSite)
    )

    fetched
      .then(response => {
        const { content_elements: contentElements = [] } = response || {}

        if (contentElements.length > 0) {
          const prueba = new StoryData(contentElements[0], arcSite)
          this.setState({
            data: prueba,
          })
        }
      })
      .catch(e => console.log(e))
    // }
  }

  nameDate = datestring => {
    let name = ''
    if (datestring) {
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
      name = `${dias[date.getDay()]} ${date.getDate()} de ${
        meses[date.getMonth()]
      } del ${date.getFullYear()}`
    }
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

CardTabloid.label = 'Tabloide'

CardTabloid.propTypes = {
  customFields: CustomFieldsImport,
}

export default CardTabloid
