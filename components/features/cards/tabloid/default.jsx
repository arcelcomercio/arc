import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { formatSlugToText } from '../../../utilities/helpers'
import CustomFieldsImport from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const classes = {
  tabloid: 'tabloid row-1 flex flex-col',
  header: 'tabloid__header flex items-center justify-center',
  headerLink:
    'tabloid__header-link text-white uppercase font-bold text-xl primary-font',
  body:
    'tabloid__body flex items-center justify-center h-full position-relative pt-30 pb-20 pr-30 pl-30',
  date: 'tabloid__date flex items-center justify-center position-absolute p-20',
  dateLink: 'tabloid__date-link text-sm text-gray-300 font-bold',
  face: 'tabloid__face object-contain',
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
    const { deployment, contextPath, arcSite } = this.props

    const { fetched } = this.getContent(
      'story-feed-by-section',
      {
        website: arcSite,
        section,
        stories_qty: 1,
      },

      schemaFilter(arcSite)
    )

    fetched
      .then(response => {
        const { content_elements: contentElements = [] } = response || {}

        const data = new StoryData({
          data: contentElements[0],
          deployment,
          contextPath,
          arcSite,
          defaultImgSize: 'sm',
        })
        this.setState({
          data,
        })
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

  render() {
    const {
      sectionName,
      data: { multimedia, title, date, section, link = '' },
    } = this.state

    const nameDate = this.nameDate(date)

    return (
      <div className={classes.tabloid}>
        <div className={classes.header}>
          <h4>
            <a className={classes.headerLink} href={link}>
              {sectionName || formatSlugToText(section)}
            </a>
          </h4>
        </div>
        <div className={classes.body}>
          <figure>
            <picture>
              <a href={link}>
                <img className={classes.face} src={multimedia} alt={title} />
              </a>
            </picture>
          </figure>
          <h3 className={classes.date}>
            <a className={classes.dateLink} href={link}>
              {nameDate}
            </a>
          </h3>
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
