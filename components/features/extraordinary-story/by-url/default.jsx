import React, { useEffect } from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFieldsExtern from './_dependencies/custom-fields'
import schemaFilter from '../_dependencies/schema-filter'
import Data from '../_dependencies/data'
import ExtraordinaryStory from '../../../global-components/extraordinary-story'

const API_URL = 'story-by-url'
const PHOTO_SOURCE = 'photo-resizer'

const getPhotoId = photoUrl => {
  if (!photoUrl) return ''
  const customPhotoUrl = photoUrl.match(/\/([A-Z0-9]{26})(:?.[\w]+)?$/)
  const [, photoId] = customPhotoUrl || []
  return photoId
}

const ExtraordinaryStoryByUrl = props => {
  const { customFields } = props
  const { link = '', showExtraordinaryStory, multimediaSource } = customFields
  const { deployment, contextPath, arcSite } = useFusionContext()

  const presets = 'landscape_xl:980x355,square_l:600x600'

  const data =
    useContent(
      showExtraordinaryStory
        ? {
            source: API_URL,
            query: { website_url: link, presets },
            filter: schemaFilter(arcSite),
          }
        : {}
    ) || {}

  // Solo acepta custom image desde Photo Center
  const photoId = multimediaSource ? getPhotoId(multimediaSource) : ''
  const customPhoto =
    useContent(
      photoId
        ? {
            source: PHOTO_SOURCE,
            query: {
              url: multimediaSource,
              presets,
            },
          }
        : {}
    ) || {}

  useEffect(() => {
    if (window.powaBoot) {
      window.powaBoot()
    }
  }, [])

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

ExtraordinaryStoryByUrl.propTypes = {
  customFields: customFieldsExtern,
}

ExtraordinaryStoryByUrl.label = 'Apertura extraordinaria por historia'
ExtraordinaryStoryByUrl.static = true

export default ExtraordinaryStoryByUrl
