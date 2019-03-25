import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import CustomFieldsImport from './_children/customFields'
import filterSchema from './_children/filterSchema'
import DataStory from './../../../resources/components/utils/data-story'

const classes = {
  tabloide: 'tabloide',
  header: 'tabloide__header',
  body: 'tabloide__body',
  imgContent: 'tabloide__imgContent',
  imgPortada: 'tabloide__imgPortada',
}
@Consumer
class Tabloide extends Component {
  constructor(props) {
    super(props)

    const {
      customFields: { seccion },
    } = this.props || {}

    this.state = {
      seccion,
      data: {},
    }
  }

  componentDidMount = () => {
    const { seccion } = this.state
    this.getContentApi(seccion)
  }

  getContentApi = seccion => {
    if (seccion) {
      const { arcSite } = this.props
      const { fetched } = this.getContent(
        'stories__by-section',
        {
          website: arcSite,
          section: seccion,
          news_number:1
        },

        filterSchema()
      )
      
      fetched.then(response => {
        debugger
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
          debugger
          console.log(response)
          const prueba = new DataStory(response.content_elements[0], arcSite)
          
          this.setState({
            data: contenido,
          })
        }
      })
    }
  }

  // filterSchema = () => {
  //   return `
  //     {
  //       content_elements{
  //         headlines {
  //             basic
  //         }
  //         canonical_url
  //         taxonomy{
  //           sites{
  //             additional_properties{
  //               original{
  //                 site_topper{
  //                   site_logo_image
  //                 }
  //               }
  //             }
  //           }
  //           sections{
  //             name
  //             path
  //           }
  //         }
  //         subheadlines{
  //           basic
  //         }
  //       }
  //     }
  //     `
  // }

  render() {
    return (
      <div className={classes.tabloide}>
        <div className={classes.header}>
          <h4>El Otorongo</h4>
        </div>
        <div className={classes.body}>
          <h3>
            <a href="https://www.hbo.com/game-of-thrones">
              Viernes 08 de marzo de 2019
            </a>
          </h3>
          <div className={classes.imgContent}>
            <figure>
              <picture>
                <a href="https://www.hbo.com/game-of-thrones">
                  <img
                    className={classes.imgPortada}
                    src="https://postparaprogramadores.com/wp-content/uploads/2018/04/php-vs-java.png"
                    alt="ejemplo"
                  />
                </a>
              </picture>
            </figure>
          </div>
        </div>
      </div>
    )
  }
}

Tabloide.propTypes = {
  customFields: CustomFieldsImport,
}
export default Tabloide
