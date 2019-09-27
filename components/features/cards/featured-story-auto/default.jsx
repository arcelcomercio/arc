import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'

@Consumer
class CardFeaturedStoryAuto extends PureComponent {
  constructor(props) {
    super(props)
    const {
      arcSite,
      deployment,
      contextPath,
      customFields: { section, storyNumber } = {},
    } = this.props
    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })

    const { schema } = this.storyFormatter
    const storiesSchema = `{ content_elements ${schema} }`

    const source = 'story-feed-by-section'
    const params = {
      website: arcSite,
      section,
      feedOffset: storyNumber || 0,
      stories_qty: 1,
    }
    this.fetchContent({
      data: {
        source,
        query: params,
        filter: storiesSchema,
      },
    })
  }

  render() {
    const {
      editableField,
      arcSite,
      isAdmin,
      customFields: {
        imageSize,
        headband,
        size,
        hightlightOnMobile,
        titleField,
        categoryField,
        imgField,
      } = {},
      siteProperties: { siteName = '' } = {},
    } = this.props

    const { data: { content_elements: contentElements = [] } = {} } =
      this.state || {}

    const formattedData = this.storyFormatter.formatStory(
      contentElements[0],
      imgField
    )
    const {
      category,
      title,
      author,
      multimediaLandscapeL,
      multimediaLandscapeMD,
      multimediaPortraitMD,
      multimediaSquareS,
      multimediaLazyDefault,
      multimediaType,
    } = formattedData

    const params = {
      title,
      category,
      author,
      multimediaLandscapeL,
      multimediaLandscapeMD,
      multimediaPortraitMD,
      multimediaSquareS,
      multimediaLazyDefault,
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      editableField,
      titleField,
      categoryField,
      arcSite,
      multimediaType,
      isAdmin,
      siteName,
    }
    return <FeaturedStory {...params} />
  }
}

CardFeaturedStoryAuto.propTypes = {
  customFields,
}

CardFeaturedStoryAuto.label = 'Destaque por Sección'
CardFeaturedStoryAuto.static = true

export default CardFeaturedStoryAuto
