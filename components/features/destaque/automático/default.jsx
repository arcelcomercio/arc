import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import Destaque from '../../../../resources/components/destaque'
import { addResizedUrlItem } from '../../../../resources/utilsJs/thumbs'
import DataStory from '../../../../resources/components/utils/data-story'

@Consumer
class DestaqueAutomatico extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {},
      title: {},
      author: {},
      image: '',
    }
    this.fetch()
  }

  getImgResized(imgUrl, ratio, resolution) {
    const { arcSite } = this.props

    return addResizedUrlItem(arcSite, imgUrl, [`${ratio}|${resolution}`])
      .resized_urls[ratio]
  }

  fetch() {
    const { customFields, arcSite } = this.props
    const { section, imageSize, size } = customFields

    const source = 'stories__by-section'
    const params = {
      website: arcSite,
      section,
      news_number: 1,
    }
    const schema = `{ 
      headlines { basic }
      credits {
        by { name url type }
      }
      website_url
      promo_items {
        basic { url type }
        basic_video {
          promo_items {
            basic { url type }
          }
        }
        basic_gallery {
          promo_items {
            basic { url type }
          }
        }
      }
      websites {
        ${arcSite} {
          website_section {
            name
            path
          }
        }
      }
    }`

    const { fetched } = this.getContent(source, params, schema)

    fetched.then(response => {
      const element = new DataStory(response.content_elements[0], arcSite)
      this.setState({
        category: {
          name: element.section,
          url: element.sectionLink,
        },
        title: {
          name: element.title,
          url: element.link,
        },
        author: {
          name: element.author,
          url: element.authorLink,
        },
      })
      const imgUrl = element.multimedia
      this.setState({
        image: this.getImgResized(imgUrl, '3:4', '288x157'),
      })
      if (imgUrl) {
        if (size === 'twoCol') {
          this.setState({
            image: this.getImgResized(imgUrl, '3:4', '676x374'),
          })
        } else {
          switch (imageSize) {
            case 'parcialBot':
            case 'parcialTop':
              this.setState({
                image: this.getImgResized(imgUrl, '3:4', '288x157'),
              })
              break
            case 'complete':
              this.setState({
                image: this.getImgResized(imgUrl, '9:16', '328x374'),
              })
              break
            default:
              break
          }
        }
      }
      console.log(this.state)
    })
  }

  render() {
    const { category, title, author, image } = this.state
    const { customFields, editableField } = this.props
    const { imageSize, size, titleField, categoryField } = customFields
    const params = {
      title,
      category,
      author,
      image,
      imageSize,
      size,
      editableField,
      titleField,
      categoryField,
    }
    return <Destaque {...params} />
  }
}

DestaqueAutomatico.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.isRequired.tag({
      name: 'Path de la sección',
      description: 'Ejemplo: /deporte-total',
    }),
    imageSize: PropTypes.oneOf(['parcialBot', 'parcialTop', 'complete']).tag({
      name: 'Posición de la imagen',
      labels: {
        parcialBot: 'Parcial inferior',
        parcialTop: 'Parcial Superior',
        complete: 'Completa',
      },
      defaultValue: 'parcialBot',
    }),
    size: PropTypes.oneOf(['oneCol', 'twoCol']).tag({
      name: 'Tamaño del destaque',
      labels: {
        oneCol: '1 columna',
        twoCol: '2 columnas',
      },
      defaultValue: 'oneCol',
    }),
    categoryField: PropTypes.string.tag({
      name: 'Sección',
      group: 'Editar texto',
      description: 'Dejar vacío para tomar el valor original de la noticia.',
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar texto',
      description: 'Dejar vacío para tomar el valor original de la noticia.',
    }),
  }),
}

export default DestaqueAutomatico
