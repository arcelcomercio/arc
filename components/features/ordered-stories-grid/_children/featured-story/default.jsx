import React, { PureComponent } from 'react'
import FeaturedStory from '../../../../global-components/featured-story'

class OrderedStoriesGridFeaturedStory extends PureComponent {
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
    const { story /*  imageSize, size */ } = this.props

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
    // TODO: Verificar con nuevo resizer, hay que eliminar comentarios.
    const imgUrl = story.multimedia
    this.setState({
      image: imgUrl,
    })
    /*  if (imgUrl) {
      if (size === 'twoCol') {
        this.setState({
          image: imgUrl,
        })
      } else {
        switch (imageSize) {
          case 'parcialBot':
          case 'parcialTop':
            this.setState({
              image: imgUrl,
            })
            break
          case 'complete':
            this.setState({
              image: imgUrl,
            })
            break
          default:
            break
        }
      }
    } */
  }

  render() {
    const { category, title, author, image, multimediaType } = this.state
    const { imageSize, size } = this.props
    const params = {
      title,
      category,
      author,
      image,
      imageSize,
      size,
      multimediaType,
    }

    return <FeaturedStory {...params} />
  }
}

export default OrderedStoriesGridFeaturedStory
