import React from 'react'

import FeatureFullImageChild from './_children/feature-full-image'
import customFields from './_dependencies/custom-fields'

const FeatureStoryFullImage = props => {
  const { customFields: { crossY, crossX, model } = {} } = props
  const params = {
    crossY,
    crossX,
    model,
  }
  return <FeatureFullImageChild {...params} />
}

FeatureStoryFullImage.propTypes = {
  customFields,
}

FeatureStoryFullImage.label = 'Destaque Full Imagén'
export default FeatureStoryFullImage
