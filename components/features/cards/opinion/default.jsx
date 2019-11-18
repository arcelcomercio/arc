import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import OpinionChildCard from './_children/card'
import filterSchema from './_dependencies/schema-filter'
import { defaultImage } from '../../../utilities/helpers'

@Consumer
class CardOpinion extends PureComponent {
  constructor(props) {
    super(props)

    const { arcSite, customFields: { titleOpinion } = {} } = this.props || {}

    this.state = {
      titleOpinion,
      arcSite,
      section1: {},
      section2: {},
      section3: {},
      section4: {},
    }
  }

  componentDidMount = () => {
    this.init()
  }

  init = () => {
    const sections = {}
    const sectionsFetch = []
    const { customFields, arcSite, deployment, contextPath } = this.props || {}
    for (let i = 1; i <= 4; i++) {
      const sec = customFields[`section${i}`]
      if (sec !== '') {
        sections[`section${i}`] = sec
        const { fetched } = this.getContentApi(sec)
        sectionsFetch.push(fetched)
      }
    }

    if (sectionsFetch.length > 0) {
      Promise.all(sectionsFetch)
        .then(results => {
          const jsonSections = {}
          results.forEach(res => {
            const { content_elements: contentElements = [] } = res || {}
            if (contentElements.length > 0) {
              
              const {
                headlines: { basic = '' } = {},
                taxonomy: { sections: secs = [] } = {},
                website_url: websiteUrl = '',
              } = contentElements[0] || {}

              const {
                name = '', 
                path = '',
                additional_properties: {
                  original: {
                    site_topper: { site_logo_image: siteLogo = '' } = {},
                  } = {},
                } = {},
              } = secs[0] ||{}

              const indexSec = Object.values(sections).indexOf(path)
              const sectionActive = Object.keys(sections)[indexSec]

              const urlImg =
                customFields[`uriImageSection${indexSec}`] ||
                siteLogo ||
                defaultImage({
                  deployment,
                  contextPath,
                  arcSite,
                  size: 'sm',
                })

              jsonSections[sectionActive] = {
                title: basic,
                urlImg,
                urlNew: websiteUrl,
                sectionName: name,
                urlSection: path,
              }
            }
          })
          this.setState(jsonSections)
        })
        .catch(err => {
          throw new Error(err)
        })
    }
  }

  getContentApi = section => {
    const { arcSite } = this.props
    return this.getContent(
      'story-feed-by-section',
      {
        website: arcSite,
        section,
      },
      filterSchema
    )
  }

  render() {
    const {
      titleOpinion = '',
      arcSite,
      section1,
      section2,
      section3,
      section4,
    } = this.state

    const params = {
      titleOpinion,
      arcSite,
      dataList: [section1, section2, section3, section4],
    }
    return <OpinionChildCard {...params} />
  }
}

CardOpinion.label = 'Listado de Opinión + ícono'

CardOpinion.propTypes = {
  customFields: PropTypes.shape({
    titleOpinion: PropTypes.string.isRequired.tag({
      name: 'Título: ',
    }),
    section1: PropTypes.string.isRequired.tag({
      name: 'Path de sección:',
      group: 'Seccion 1',
    }),
    uriImageSection1: PropTypes.string.tag({
      name: 'URL de imagen:',
      group: 'Seccion 1',
    }),
    section2: PropTypes.string.isRequired.tag({
      name: 'Path de sección:',
      group: 'Seccion 2',
    }),
    uriImageSection2: PropTypes.string.tag({
      name: 'URL de imagen:',
      group: 'Seccion 2',
    }),
    section3: PropTypes.string.isRequired.tag({
      name: 'Path de sección:',
      group: 'Seccion 3',
    }),
    uriImageSection3: PropTypes.string.tag({
      name: 'URL de imagen:',
      group: 'Seccion 3',
    }),
    section4: PropTypes.string.isRequired.tag({
      name: 'Path de sección:',
      group: 'Seccion 4',
    }),
    uriImageSection4: PropTypes.string.tag({
      name: 'URL de imagen:',
      group: 'Seccion 4',
    }),
  }),
}

export default CardOpinion
