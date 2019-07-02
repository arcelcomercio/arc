import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'

@Consumer
class CardFeaturedStoryManual extends PureComponent {
  constructor(props) {
    super(props)
    const {
      arcSite,
      deployment,
      contextPath,
      customFields: { path } = {},
    } = this.props
    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })

    const { schema } = this.storyFormatter

    const source = 'story-by-url'
    const params = {
      website: arcSite,
      website_url: path,
    }
    this.fetchContent({
      data: {
        source,
        query: params,
        filter: schema,
      },
    })
  }

  render() {
    const {
      editableField,
      arcSite,
      customFields: {
        imageSize,
        headband,
        size,
        hightlightOnMobile,
        titleField,
        categoryField,
        imgField,
      } = {},
    } = this.props

    const { data = {} } = this.state || {}

    const formattedData = this.storyFormatter.formatStory(data, imgField)
    const { category, title, author, image, multimediaType } = formattedData

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
      arcSite,
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
