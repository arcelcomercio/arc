import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import customFieldsExtern from './_dependencies/custom-fields'
import schemaFilter from '../_dependencies/schema-filter'
import Data from '../_dependencies/data'
import ExtraordinaryStory from '../../../global-components/extraordinary-story'
import { getPhotoId } from '../../../utilities/helpers'

const API_URL = 'story-by-url'

const PHOTO_SOURCE = 'photo-by-id'

const PHOTO_SCHEMA = `{
  resized_urls { 
    landscape_xl
    landscape_l
    square_l
  }
}`
@Consumer
class ExtraordinaryStoryByUrl extends PureComponent {
  constructor(props) {
    super(props)
    // this.isVideo = ''

    const {
      customFields: { link = '', showExtraordinaryStory, multimediaSource },
      arcSite,
    } = this.props
    if (showExtraordinaryStory) {
      this.fetchContent({
        data: {
          source: API_URL,
          query: { website_url: link },
          filter: schemaFilter(arcSite),
        },
      })
    }
    if (multimediaSource) {
      const photoId = getPhotoId(multimediaSource)
      if (photoId) {
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
  }

  componentDidMount() {
    if (window.powaBoot) {
      window.powaBoot()
    }
  }

  render() {
    const { deployment, contextPath, arcSite, customFields } = this.props
    const {
      customFields: { showExtraordinaryStory },
    } = this.props
    const { data = {}, customPhoto = {} } = this.state || {}

    const formattedData = new Data({
      data,
      deployment,
      contextPath,
      arcSite,
      customFields,
      defaultImgSize: 'md',
      customPhoto,
    })
    // this.isVideo = formattedData.isVideo

    const params = {
      data: formattedData,
      multimediaType: formattedData.multimediaType,
      multimediaOrientation: formattedData.multimediaOrientation,
      contentOrientation: formattedData.contentOrientation,
      deployment,
      contextPath,
      arcSite,
      showExtraordinaryStory,
    }
    return <ExtraordinaryStory {...params} />
  }
}

ExtraordinaryStoryByUrl.propTypes = {
  customFields: customFieldsExtern,
}

ExtraordinaryStoryByUrl.label = 'Apertura extraordinaria por historia'
ExtraordinaryStoryByUrl.static = true

export default ExtraordinaryStoryByUrl
