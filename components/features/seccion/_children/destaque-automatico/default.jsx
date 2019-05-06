import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import FeaturedStory from '../../../../global-components/featured-story'
import { addResizedUrlItem } from '../../../../utilities/thumbs'

@Consumer
class AutomaticGridFeaturedStories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {},
      title: {},
      author: {},
      image: '',
      multimediaType: '',
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
        url: story.authorLink,
      },
      multimediaType: story.multimediaType,
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
    const { category, title, author, image, multimediaType } = this.state

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
      multimediaType,
    }
    return <FeaturedStory {...params} />
  }
}

export default AutomaticGridFeaturedStories
