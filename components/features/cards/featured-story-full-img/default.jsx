import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeatureFullImageChild from './_children/feature-full-image'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import { getPhotoId } from '../../../utilities/helpers'

const PHOTO_SOURCE = 'photo-by-id'

const PHOTO_SCHEMA = `{
  resized_urls { 
    landscape_l 
    landscape_md
    portrait_md 
    square_xl
    lazy_default  
  }
}`

@Consumer
class FeatureStoryFullImage extends PureComponent {
  constructor(props) {
    super(props)
    const {
      deployment,
      contextPath,
      arcSite,
      customFields: {
        imgField,
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
    } = props

    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })
    if (contentConfigValues) {
      this.fetchContent({
        data: {
          source: contentService,
          query: contentConfigValues,
          filter: schemaFilter(arcSite),
        },
      })
    }
    const photoId = imgField ? getPhotoId(imgField) : ''
    if (photoId && photoId !== '') {
      this.fetchContent({
        customPhoto: {
          source: PHOTO_SOURCE,
          query: {
            _id: photoId,
          },
          filter: PHOTO_SCHEMA,
        },
      })
    }
  }

  render() {
    const {
      arcSite,
      contextPath,
      deployment,
      isAdmin,
      editableField,
      customFields: { crossY, crossX, model, categoryField, titleField } = {},
    } = this.props

    const { customPhoto = {}, data = {} } = this.state || {}

    const {
      author,
      authorLink,
      primarySection,
      primarySectionLink,
      title: titleStory,
      multimediaLandscapeL,
      multimediaSquareXL,
      multimediaPortraitMD,
      multimediaLazyDefault,
      multimediaType,
      websiteLink,
      multimediaSubtitle,
      multimediaCaption,
    } = new StoryData({
      data,
      arcSite,
      contextPath,
      deployment,
      defaultImgSize: 'sm',
    })

    const {
      resized_urls: {
        landscape_l: landscapeLCustom,
        lazy_default: lazyDefaultCustom,
        portrait_md: portraitMDCustom,
        square_xl: squareXLCustom,
      } = {},
    } = customPhoto || {}

    const params = {
      author,
      authorLink,
      primarySectionLink,
      title: titleField || titleStory,
      multimediaLandscapeL: landscapeLCustom || multimediaLandscapeL, //
      multimediaPortraitMD: portraitMDCustom || multimediaPortraitMD, //
      multimediaSquareXL: squareXLCustom || multimediaSquareXL, //
      multimediaLazyDefault: lazyDefaultCustom || multimediaLazyDefault,
      multimediaType,
      websiteLink,
      editableField,
      crossY,
      crossX,
      model,
      section: categoryField || primarySection,
      isAdmin,
      multimediaSubtitle,
      multimediaCaption,
    }

    return <FeatureFullImageChild {...params} />
  }
}

FeatureStoryFullImage.propTypes = {
  customFields,
}

FeatureStoryFullImage.label = 'Destaque Full Imagen'
FeatureStoryFullImage.static = true

export default FeatureStoryFullImage
