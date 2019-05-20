import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import CustomFieldsImport from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const classes = {
  tabloide: 'tabloide row-1 flex flex--column',
  header: 'tabloide__header flex-center',
  body: 'tabloide__body flex-center flex--column',
  content: 'flex-center',
  date: 'tabloide__date flex-center',
  face: 'tabloide__face',
  defaultImage: 'bg-color--gray tabloide__face',
}
@Consumer
class CardTabloid extends PureComponent {
  constructor(props) {
    super(props)

    const { customFields: { section = '', sectionName = '' } = {} } = this.props

    this.state = {
      section,
      sectionName,
      data: {},
    }
  }

  componentDidMount = () => {
    const { section } = this.state
    this.getContentApi(section)
  }

  getContentApi = section => {
    // if (section) {
    const { arcSite: website } = this.props

    const { fetched } = this.getContent(
      'story-feed-by-section',
      {
        website,
        section,
        news_number: 1,
      },

      schemaFilter(website)
    )

    fetched
      .then(response => {
        const { content_elements: contentElements = [] } = response || {}

        if (contentElements.length > 0) {
          // TODO: pf
          const data = new StoryData(contentElements[0], website)
          this.setState({
            data,
          })
        }
      })
      .catch(e => {
        throw new Error(e)
      })
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

  defaultImage() {
    const { arcSite, contextPath, deployment } = this.props
    const defaultImg = true
    /**
     *
     */
    return defaultImg ? (
      <img
        className={classes.face}
        src={deployment(
          `${contextPath}/resources/dist/${arcSite}/images/default-sm.png`
        )}
        alt="Imagen por defecto"
      />
    ) : (
      <div className={classes.defaultImage} />
    )
  }

  render() {
    const {
      sectionName,
      data: { link: rawLink, multimedia, title, date, section },
    } = this.state
    const { contextPath } = this.props
    // TODO: Esto debe ser eliminado al agregar contextPath a StoryData
    const link = `${contextPath}${rawLink}`

    const nameDate = this.nameDate(date)

    return (
      <div className={classes.tabloide}>
        <div className={classes.header}>
          <h4>
            <a href={link}>{sectionName || section}</a>
          </h4>
        </div>
        <div className={classes.body}>
          <h3 className={classes.date}>
            <a href={link}>{nameDate}</a>
          </h3>
          <div className={classes.content}>
            <figure>
              <picture>
                <a href={link}>
                  {multimedia ? (
                    <img
                      className={classes.face}
                      src={multimedia}
                      alt={title}
                    />
                  ) : (
                    this.defaultImage()
                  )}
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
