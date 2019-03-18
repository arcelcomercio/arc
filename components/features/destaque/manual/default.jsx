import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import Destaque from '../../../../resources/components/destaque'
import { addResizedUrlItem } from '../../../../resources/utilsJs/thumbs'
import DataStory from '../../../../resources/components/utils/data-story'

@Consumer
class DestaqueManual extends Component {
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
    const { path, imageSize, size } = customFields

    const source = 'story__by-websiteurl'
    const params = {
      website: arcSite,
      website_url: path,
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
      const element = new DataStory(response, arcSite)
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
    })
  }

  render() {
    const { customFields, editableField } = this.props
    const { category, title, author, image } = this.state
    const {
      imageSize,
      headband,
      size,
      titleField,
      categoryField,
    } = customFields
    const params = {
      title,
      category,
      author,
      image,
      imageSize,
      headband,
      size,
      editableField,
      titleField,
      categoryField,
    }
    return <Destaque {...params} />
  }
}

DestaqueManual.propTypes = {
  customFields: PropTypes.shape({
    path: PropTypes.string.isRequired.tag({
      name: 'Path',
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
    headband: PropTypes.oneOf(['normal', 'live']).tag({
      name: 'Cintillo',
      labels: {
        normal: 'Normal',
        live: 'En vivo',
      },
      defaultValue: 'normal',
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

export default DestaqueManual
