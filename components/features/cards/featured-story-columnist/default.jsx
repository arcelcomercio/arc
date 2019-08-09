import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import ColumnistPremium from './_childen/columnist-premium'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const FeaturedStoryColumnist = props => {
  const { arcSite, contextPath, deployment } = useFusionContext()
  const { customFields: { slug, story } = {} } = props

  const data =
    useContent({
      source: 'story-by-author',
      query: { name: slug, feedOffset: story },
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    authorImage,
    author,
    authorLink,
    primarySection,
    subTitle,
    isPremium,
    websiteLink,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const params = {
    authorImage,
    author,
    authorLink,
    primarySection,
    subTitle,
    isPremium,
    websiteLink,
  }

  return <ColumnistPremium {...params} />
}

FeaturedStoryColumnist.propTypes = {
  customFields,
}

FeaturedStoryColumnist.label = 'Columnista Premium'
export default FeaturedStoryColumnist
