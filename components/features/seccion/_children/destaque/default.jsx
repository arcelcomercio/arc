import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import FeaturedStory from '../../../../global-components/featured-story'
import { addResizedUrlItem } from '../../../../utilities/thumbs'
import DataStory from '../../../../../resources/components/utils/data-story'

/* **************** SIN USO ****************** */

@Consumer
class GridFeaturedStories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {},
      title: {},
      author: {},
      image: '',
    }
  }

  componentDidMount() {
    const {
      customFields: { imageSize, size },
      arcSite,
      globalContent,
      storyNumber,
    } = this.props
    const { content_elements: contentElements } = globalContent || {}
    const stories = contentElements

    const element = new DataStory(stories[storyNumber], arcSite)
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
  }

  getImgResized(imgUrl, ratio, resolution) {
    const { arcSite } = this.props

    return addResizedUrlItem(arcSite, imgUrl, [`${ratio}|${resolution}`])
      .resized_urls[ratio]
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
    return <FeaturedStory {...params} />
  }
}

GridFeaturedStories.propTypes = {
  customFields: PropTypes.shape({
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
      description: 'Dejar vacío para tomar el valor original de la historias.',
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar texto',
      description: 'Dejar vacío para tomar el valor original de la historias.',
    }),
  }),
}

export default GridFeaturedStories
