import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OpinionChildCard from './_children/card'
import filterSchema from './_dependencies/schema-filter'
import { defaultImage } from '../../../utilities/helpers'

@Consumer
class CardOpinion extends Component {
  constructor(props) {
    super(props)

    const {
      arcSite,
      customFields: {
        titleOpinion,
        section1,
        section2,
        section3,
        section4,
      } = {},
    } = this.props || {}

    this.state = {
      titleOpinion,
      arcSite,
      section1,
      section2,
      section3,
      section4,

      listNews: [],
    }
  }

  componentDidMount = () => {
    this.init()
  }

  init = () => {
    const { section1, section2, section3, section4 } = this.state

    const listaSecciones = [section1, section2, section3, section4]
    const listNews = {}
    listNews.data1 = {}
    listNews.data2 = {}
    listNews.data3 = {}
    listNews.data4 = {}

    listaSecciones.forEach((element, index) => {
      this.getContentApi(element, result => {
        listNews[`data${index + 1}`] = result
        if (listNews[`data${index + 1}`] !== {}) {
          this.setState({
            listNews,
          })
        }
      })
    })
  }

  getContentApi = (seccion, callback) => {
    if (seccion) {
      const { arcSite, deployment, contextPath } = this.props
      const { fetched } = this.getContent(
        'story-feed-by-section',
        {
          website: arcSite,
          section: seccion,
        },

        filterSchema
      )

      fetched
        .then(response => {
          const { content_elements: contentElements = [] } = response || {}

          if (contentElements.length > 0) {
            const {
              headlines: { basic } = {},
              taxonomy: { sites, sections } = {},
              website_url: websiteUrl,
            } = contentElements[0]
            const {
              additional_properties: {
                original: {
                  site_topper: { site_logo_image: siteLogo } = {},
                } = {},
              } = {},
            } = sites[0] || []

            const { name, path } = sections[0] || []

            const urlImg =
              siteLogo ||
              defaultImage({
                deployment,
                contextPath,
                arcSite,
                size: 'sm',
              })

            const contenido = {
              title: `${basic}`,
              urlImg,
              urlNew: websiteUrl,
              sectionName: name,
              urlSection: path,
            }
            callback(contenido)
          } else {
            callback(null)
          }
        })
        .catch(err => {
          console.log(err)
          callback(null)
        })
    } else {
      callback(null)
    }
  }

  render() {
    const { titleOpinion = '', arcSite, listNews = [] } = this.state

    return (
      <OpinionChildCard
        titleOpinion={titleOpinion}
        dataList={listNews}
        arcSite={arcSite}
      />
    )
  }
}

CardOpinion.label = 'Listado de Opinión + ícono'

CardOpinion.propTypes = {
  customFields: PropTypes.shape({
    titleOpinion: PropTypes.string.isRequired.tag({
      name: 'Título: ',
    }),
    section1: PropTypes.string.isRequired.tag({
      name: 'Sección 1:',
    }),
    section2: PropTypes.string.isRequired.tag({
      name: 'Sección 2:',
    }),
    section3: PropTypes.string.isRequired.tag({
      name: 'Sección 3:',
    }),
    section4: PropTypes.string.isRequired.tag({
      name: 'Sección 4:',
    }),
  }),
}

export default CardOpinion
