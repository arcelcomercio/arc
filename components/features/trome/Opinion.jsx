import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import OpinionComponent from './_children/OpinionComponent'
import filterSchema from './_children/filterSchema'
import customFields from './_children/customField'

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
      data1: {},
      data2: {},
      data3: {},
      data4: {},
    }
  }

  componentDidMount = () => {
    const { section1, section2, section3, section4 } = this.state
    this.getContentApi(section1, result => {
      this.setState({
        data1: result,
      })
    })

    this.getContentApi(section2, result => {
      this.setState({
        data2: result,
      })
    })

    this.getContentApi(section3, result => {
      this.setState({
        data3: result,
      })
    })

    this.getContentApi(section4, result => {
      this.setState({
        data4: result,
      })
    })
  }

  getContentApi = (seccion, callback) => {
    if (seccion) {
      const { arcSite } = this.props
      const { fetched } = this.getContent(
        'stories__by-section',
        {
          website: arcSite,
          section: seccion,
        },
        
        filterSchema()
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
    } else {
      callback(null)
    }
  }

  render() {
    const { titleOpinion, data1, data2, data3, data4 } = this.state
    const dataList = [data1, data2, data3, data4]
    return (
      <OpinionComponent
        titleOpinion={titleOpinion}
        dataList={dataList}
      />
    )
  }
}

Opinion.propTypes = {
  customFields,
}
export default Opinion
