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
      customFields: { titleOpinion, section1, section2, section3, section4 },
    } = this.props || {}

    this.state = {
      titleOpinion,
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
        'historias-por-seccion',
        {
          website: arcSite,
          section: seccion,
        },

        filterSchema()
      )

      fetched
        .then(response => {
          if (!response) {
            // eslint-disable-next-line no-param-reassign
            response = []
            console.log(
              'No hay respuesta del servicio para obtener la ultima historia.'
            )
          }

          if (!response.content_elements) {
            response.content_elements = []
            console.log(
              'No hay respuesta del servicio para obtener la ultima historia.'
            )
          }

          if (response.content_elements.length > 0) {
            const {
              headlines: { basic },
              taxonomy: { sites, sections },
              canonical_url,
            } = response.content_elements[0]
            const {
              additional_properties: {
                original: {
                  site_topper: { site_logo_image },
                },
              },
            } = sites[0]

            const { name, path } = sections[0]

            const contenido = {
              title: basic,
              urlImg: site_logo_image,
              urlNew: canonical_url,
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
    const { titleOpinion, listNews } = this.state

    return <OpinionComponent titleOpinion={titleOpinion} dataList={listNews} />
  }
}

Opinion.propTypes = {
  customFields: customFieldsImp,
}
export default Opinion
