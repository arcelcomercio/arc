import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'
import FacebookLive from './_children/facebook-live'

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
      isAdmin,
      contextPath,
      deployment,
      customFields: {
        imageSize,
        headband,
        size,
        hightlightOnMobile,
        titleField,
        categoryField,
        imgField,
        flagLive,
        urlVideoFacebook,
      } = {},
      siteProperties: { siteName = '' } = {},
    } = this.props
    const { data = {} } = this.state || {}
    const formattedData = this.storyFormatter.formatStory(data, imgField)
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

    const paramsFeaturedStory = {
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

    const paramsFacebook = {
      arcSite,
      contextPath,
      deployment,
      urlVideoFacebook,
    }
    return (
      <>
        {!flagLive && <FeaturedStory {...paramsFeaturedStory} />}
        {flagLive && <FacebookLive {...paramsFacebook} />}
      </>
    )
  }
}

CardFeaturedStoryAdvanced.propTypes = {
  customFields,
}

CardFeaturedStoryAdvanced.label = 'Destaque Avanzado'
CardFeaturedStoryAdvanced.static = true

export default CardFeaturedStoryAdvanced
