import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import OpinionCard from './_children/card'
import schemaFilter from './_dependencies/schema-filter'

@Consumer
class CardOpinion extends PureComponent {
  constructor(props) {
    super(props)
    const { arcSite, customFields } = this.props || {}
    this.state = {
      ...customFields,
      arcSite,
      listNews: [],
    }
  }

  componentDidMount = () => {
    this.init()
  }

  init = () => {
    const { section1, section2, section3, section4 } = this.state

    const sections = [section1, section2, section3, section4]
    const listNews = {}
    listNews.data1 = {}
    listNews.data2 = {}
    listNews.data3 = {}
    listNews.data4 = {}

    sections.forEach((section, index) => {
      this.getContentApi(section, result => {
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
      const { arcSite } = this.props
      const { fetched } = this.getContent(
        'story-feed-by-section',
        {
          website: arcSite,
          section: seccion,
        },
        schemaFilter
      )

      fetched
        .then(response => {
          const { content_elements: contentElements = [] } = response || {}

          if (contentElements.length > 0) {
            const {
              headlines: { basic } = {},
              taxonomy: { sites, sections } = {},
              canonical_url: canonicalUrl,
            } = contentElements[0]
            const {
              additional_properties: {
                original: {
                  site_topper: { site_logo_image: siteLogo } = {},
                } = {},
              } = {},
            } = sites[0] || []

            const { name, path } = sections[0] || []

            const contenido = {
              title: `${basic}`,
              urlImg: siteLogo,
              urlNew: canonicalUrl,
              sectionName: name,
              urlSection: path,
            }
            callback(contenido)
          } else {
            callback(null)
          }
        })
        .catch(() => {
          callback(null)
        })
    } else {
      callback(null)
    }
  }

  render() {
    const { titleOpinion = '', arcSite, listNews = [] } = this.state

    return (
      <OpinionCard
        titleOpinion={titleOpinion}
        dataList={listNews}
        arcSite={arcSite}
      />
    )
  }
}

CardOpinion.label = 'Listado de Opinión + ícono'
CardOpinion.static = true

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
