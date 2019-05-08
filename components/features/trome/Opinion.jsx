import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import OpinionComponent from './_children/OpinionComponent'
import schemaFilter from './_children/schemaFilter'
import customFieldsImp from './_children/customField'

@Consumer
class Opinion extends Component {
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
      const { arcSite } = this.props
      const { fetched } = this.getContent(
        'story-feed-by-section',
        {
          website: arcSite,
          section: seccion,
        },

        schemaFilter()
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
      <OpinionComponent
        titleOpinion={titleOpinion}
        dataList={listNews}
        arcSite={arcSite}
      />
    )
  }
}

Opinion.propTypes = {
  customFields: customFieldsImp,
}
export default Opinion
