import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import Destaque from '../../../../resources/components/destaque'
import { addResizedUrlItem } from '../../../../resources/utilsJs/thumbs'

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

    const source = 'story__resized-by-section'
    const params = {
      section,
      website: arcSite,
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
    const { category, title, author, image } = this.state
    const { customFields, editableField } = this.props
    const { imageSize, size, titleField, categoryField } = customFields
    return (
      <Destaque
        title={title}
        category={category}
        author={author}
        image={image}
        imageSize={imageSize}
        size={size}
        editableField={editableField}
        titleField={titleField}
        categoryField={categoryField}
      />
    )
  }
}

DestaqueAutomatico.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.isRequired.tag({
      name: 'Sección',
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
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar texto',
    }),
  }),
}

export default DestaqueAutomatico
