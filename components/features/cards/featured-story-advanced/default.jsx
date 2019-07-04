import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'

@Consumer
class CardFeaturedStoryAdvanced extends PureComponent {
  constructor(props) {
    super(props)
    const {
      deployment,
      contextPath,
      arcSite,
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
    } = props
    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })
    const { schema } = this.storyFormatter
    this.fetchContent({
      data: {
        source: contentService,
        query: contentConfigValues,
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

CardFeaturedStoryAdvanced.propTypes = {
  customFields,
}

CardFeaturedStoryAdvanced.label = 'Destaque Avanzado'
CardFeaturedStoryAdvanced.static = true

export default CardFeaturedStoryAdvanced
