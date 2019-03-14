import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import Destaque from '../../../../resources/components/destaque'
import { addResizedUrlItem } from '../../../../resources/utilsJs/thumbs'

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

    const source = 'story'
    const params = {
      website: arcSite,
      website_url: path,
    }
    const schema = `{ 
      headlines { basic }
      credits {
        by { name  url }
      }
      website_url
      promo_items {
        basic { url resized_urls }
        basic_video {
          promo_items {
            basic {
              url
              resized_urls
            }
          }
        }
        basic_gallery {
          promo_items {
            basic {
              url
              resized_urls
            }
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
      this.setState({
        category: {
          name: response.websites[`${arcSite}`]
            ? response.websites[`${arcSite}`].website_section.name
            : '',
          url: response.websites[`${arcSite}`]
            ? response.websites[`${arcSite}`].website_section.path
            : '',
        },
        title: {
          name: response.headlines.basic,
          url: response.website_url,
        },
        author: {
          name: response.credits.by.length ? response.credits.by[0].name : '',
          url: response.credits.by.length ? response.credits.by[0].url : '',
        },
      })

      let storyTypePath = ''
      if (response.promo_items.basic) {
        storyTypePath = response.promo_items.basic.url
      } else if (response.promo_items.basic_gallery) {
        storyTypePath = response.promo_items.basic_gallery.promo_items.basic.url
      } else if (response.promo_items.basic_video) {
        storyTypePath = response.promo_items.basic_video.promo_items.basic.url
      }
      if (!storyTypePath) return

      if (size === 'twoCol') {
        this.setState({
          image: this.getImgResized(storyTypePath, '3:4', '676x374'),
        })
      } else {
        switch (imageSize) {
          case 'parcialBot':
          case 'parcialTop':
            this.setState({
              image: this.getImgResized(storyTypePath, '3:4', '288x157'),
            })
            break
          case 'complete':
            this.setState({
              image: this.getImgResized(storyTypePath, '9:16', '328x374'),
            })
            break
          default:
            break
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

    return (
      <Destaque
        title={title}
        category={category}
        author={author}
        image={image}
        imageSize={imageSize}
        headband={headband}
        size={size}
        editableField={editableField}
        titleField={titleField}
        categoryField={categoryField}
      />
    )
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
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar texto',
    }),
  }),
}

export default DestaqueManual
