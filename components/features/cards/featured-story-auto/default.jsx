import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'

@Consumer
class CardFeaturedStoryAuto extends PureComponent {
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
    const {
      arcSite,
      customFields: { section, storyNumber, imgField } = {},
    } = this.props

    const { schema } = this.storyFormatter
    const storiesSchema = `{ content_elements ${schema} }`

    const source = 'story-feed-by-section'
    const params = {
      website: arcSite,
      section,
      feedOffset: storyNumber || 0,
      stories_qty: 1,
    }

    const { fetched } = this.getContent(source, params, storiesSchema)
    fetched.then(response => {
      const { content_elements: contentElements = [] } = response || {}
      const newState = this.storyFormatter.formatStory(
        contentElements[0],
        imgField
      )
      this.setState(newState)
    })
  }

  render() {
    const { category, title, author, image, multimediaType } = this.state
    const {
      editableField,
      arcSite,
      customFields: {
        imageSize,
        size,
        hightlightOnMobile,
        titleField,
        categoryField,
      } = {},
    } = this.props

    const params = {
      title,
      category,
      author,
      image,
      imageSize,
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

CardFeaturedStoryAuto.propTypes = {
  customFields,
}

CardFeaturedStoryAuto.label = 'Destaque por Sección'

export default CardFeaturedStoryAuto
