import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const clasess = {
  opinion: 'opiniontrome',
  head: 'opiniontrome__head',
  title: 'opiniontrome__title',
  body: 'opiniontrome__body',
  item: 'opiniontrome__item',
  seccion: 'opiniontrome__seccion',
  icono: 'opiniontrome__icono',
  nombreSeccion: 'opiniontrome__nombreseccion',
  titleNew: 'opiniontrome__titleNew',
  orange: 'text_orange',
}

const OpinionItem = ({ titulo, urlImg, urlNew, sectionName, urlSection }) => {
  
  return (
    <div className={clasess.item}>
      <div className={clasess.seccion}>
        <h3 className={clasess.nombreSeccion}>
          <a href={urlSection}>{ sectionName}</a>
        </h3>
        <div className={clasess.titleNew}>
          <h2>
            <a href={urlNew}>{titulo}</a>
          </h2>
        </div>
      </div>
      <div className={clasess.icono}>
        <img data-type="src" src={urlImg} data-src={urlImg} alt="" />
      </div>
    </div>
  )
}
@Consumer
class Opinion extends Component {
  constructor(props) {
    super(props)

    const {
      customFields: {
        titleOpinion,
        section1,
        section2,
        section3,
        section4,
      },
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
        this.filterSchema()
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

  filterSchema = () => {
    return `
    {
      content_elements{
        headlines {
            basic
        }
        canonical_url
        taxonomy{
          sites{
            additional_properties{
              original{
                site_topper{
                  site_logo_image
                }
              }
            }
          }
          sections{
            name
            path
          }
        }
        subheadlines{
          basic
        }
      }
    }
    `
  }

  render() {
    const {
      titleOpinion,
      data1,
      data2,
      data3,
      data4,
    } = this.state
    
    return (
      <div className={clasess.opinion}>
        <div className={clasess.head}>
          <h3 className={clasess.title}>{titleOpinion}</h3>
        </div>
        <div className={clasess.body}>
          {data1 && (
            <OpinionItem
              titulo={data1.title}
              urlImg={data1.urlImg}
              urlNew={data1.urlNew}
              sectionName={data1.sectionName}
              urlSection={data1.urlSection}
            />
          )}
          {data2 && (
            <OpinionItem
              titulo={data2.title}
              urlImg={data2.urlImg}
              urlNew={data2.urlNew}
              sectionName={data2.sectionName}
              urlSection={data2.urlSection}
            />
          )}
          {data3 && (
            <OpinionItem
              titulo={data3.title}
              urlImg={data3.urlImg}
              urlNew={data3.urlNew}
              sectionName={data3.sectionName}
              urlSection={data3.urlSection}
            />
          )}
          {data4 && (
            <OpinionItem
              titulo={data4.title}
              urlImg={data4.urlImg}
              urlNew={data4.urlNew}
              sectionName={data4.sectionName}
              urlSection={data4.urlSection}
            />
          )}
        </div>
      </div>
    )
  }
}

Opinion.propTypes = {
  customFields: PropTypes.shape({
    titleOpinion: PropTypes.string.isRequired.tag({ name: 'Título' }),
    section1: PropTypes.string.isRequired.tag({ name: 'Sección 1:' }),
    section2: PropTypes.string.isRequired.tag({ name: 'Sección 2:' }),
    section3: PropTypes.string.isRequired.tag({ name: 'Sección 3:' }),
    section4: PropTypes.string.isRequired.tag({ name: 'Sección 4:' }),
  }),
}
export default Opinion
