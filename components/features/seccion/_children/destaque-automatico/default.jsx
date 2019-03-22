import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import Destaque from '../../../../../resources/components/destaque'
import { addResizedUrlItem } from '../../../../../resources/utilsJs/thumbs'

@Consumer
class DestaqueGrillaAuto extends Component {
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
    const { story, imageSize, size } = this.props

    this.setState({
      category: {
        name: story.section,
        url: story.sectionLink,
      },
      title: {
        name: story.title,
        url: story.link,
      },
      author: {
        name: story.author,
        url: `/autor/${story.authorSlug}`,
      },
    })

    const imgUrl = story.multimedia
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

    const {
      imageSize,
      size,
      titleField,
      categoryField,
      editableField,
    } = this.props

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

export default DestaqueGrillaAuto
