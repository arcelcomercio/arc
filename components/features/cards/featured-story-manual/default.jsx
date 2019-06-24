import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'

// TODO: usar fetchContent en lugar de getContent

@Consumer
class CardFeaturedStoryManual extends PureComponent {
  constructor(props) {
    super(props)
    const { deployment, contextPath, arcSite } = props
    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })
    this.state = this.storyFormatter.initialState
    this.fetch()
  }

  fetch() {
    const { arcSite, customFields: { path, imgField } = {} } = this.props

    const { schema } = this.storyFormatter

    const source = 'story-by-url'
    const params = {
      website: arcSite,
      website_url: path,
    }

    const { fetched } = this.getContent(source, params, schema)
    fetched.then(response => {
      const newState = this.storyFormatter.formatStory(response, imgField)
      this.setState(newState)
    })
  }

  render() {
    const {
      editableField,
      customFields: {
        imageSize,
        headband,
        size,
        hightlightOnMobile,
        titleField,
        categoryField,
      } = {},
    } = this.props
    const { category, title, author, image, multimediaType } = this.state

    const params = {
      title,
      category,
      author,
      image,
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      editableField,
      titleField,
      categoryField,
      multimediaType,
    }
    return <FeaturedStory {...params} />
  }
}

CardFeaturedStoryManual.propTypes = {
  customFields,
}

CardFeaturedStoryManual.label = 'Destaque por URL'
CardFeaturedStoryManual.static = true

export default CardFeaturedStoryManual
