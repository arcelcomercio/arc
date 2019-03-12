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
}

const OpinionItem = ({ seccion, titulo, urlImg }) => {
  return (
    <div className={clasess.item}>
      <div className={clasess.seccion}>
        <h3 className={clasess.nombreSeccion}>{seccion}</h3>
        <div className={clasess.titleNew}> 
          <h2 >{titulo} </h2>
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
        titleSection1,
        section1,
        titleSection2,
        section2,
        titleSection3,
        section3,
        titleSection4,
        section4,
      },
    } = this.props || {}

    this.state = {
      titleOpinion,
      titleSection1,
      section1,
      titleSection2,
      section2,
      titleSection3,
      section3,
      titleSection4,
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
        let {
          headlines: { basic },
          taxonomy: { sites },
        } = response.content_elements[0]
        let {
          additional_properties: {
            original: {
              site_topper: { site_logo_image },
            },
          },
        } = sites[0]

        const contenido = {
          title: basic,
          urlImg: site_logo_image,
        }
        callback(contenido)
      } else {
        callback(null)
      }
    })
  }

  filterSchema = () => {
    return `
    {
      content_elements{
        headlines {
            basic
        }
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
      titleSection1,
      titleSection2,
      titleSection3,
      titleSection4,
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
              seccion={titleSection1}
              titulo={data1.title}
              urlImg={data1.urlImg}
            />
          )}
          {data2 && (
            <OpinionItem
              seccion={titleSection2}
              titulo={data2.title}
              urlImg={data2.urlImg}
            />
          )}
          {data3 && (
            <OpinionItem
              seccion={titleSection3}
              titulo={data3.title}
              urlImg={data3.urlImg}
            />
          )}
          {data4 && (
            <OpinionItem
              seccion={titleSection4}
              titulo={data4.title}
              urlImg={data4.urlImg}
            />
          )}
        </div>
      </div>
    )
  }
}

Opinion.propTypes = {
  customFields: PropTypes.shape({
    titleOpinion: PropTypes.string.tag({ name: 'Título' }),

    titleSection1: PropTypes.string.tag({ name: 'Título sección 1' }),
    section1: PropTypes.string.tag({ name: 'Sección 1:' }),

    titleSection2: PropTypes.string.tag({ name: 'Título sección 2' }),
    section2: PropTypes.string.tag({ name: 'Sección 2:' }),

    titleSection3: PropTypes.string.tag({ name: 'Título sección 3' }),
    section3: PropTypes.string.tag({ name: 'Sección 3:' }),

    titleSection4: PropTypes.string.tag({ name: 'Título sección 4' }),
    section4: PropTypes.string.tag({ name: 'Sección 4:' }),
  }),
}
export default Opinion
