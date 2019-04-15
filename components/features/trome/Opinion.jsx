import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import OpinionComponent from './_children/OpinionComponent'
import filterSchema from './_children/filterSchema'
import customFieldsImp from './_children/customField'

@Consumer
class Opinion extends Component {
  constructor(props) {
    super(props)

    const {
      customFields: {
        titleOpinion,
        numLineTitle,
        section1,
        section2,
        section3,
        section4,
      } = {},
    } = this.props || {}

    this.state = {
      titleOpinion,
      numLineTitle,
      section1,
      section2,
      section3,
      section4,
      listNews: [],
    }
  }

  componentDidMount = () => {
    const { section1, section2, section3, section4 } = this.state

    const listaSecciones = [section1, section2, section3, section4]
    const listNews = []
    listaSecciones.forEach(element => {
      this.getContentApi(element, result => {
        listNews.push(result)
        if (listNews.length === 4) {
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

        filterSchema()
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
              title: basic,
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
    const { titleOpinion ='',numLineTitle = 1, listNews=[] } = this.state

    return <OpinionComponent titleOpinion={titleOpinion} dataList={listNews} numLineTitle={numLineTitle} />
  }
}

Opinion.propTypes = {
  customFields: customFieldsImp,
}
export default Opinion
