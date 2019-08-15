import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import ColumnistPremium from './_childen/columnist-premium'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const FeaturedStoryColumnist = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
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

  const lazyImage = deployment(
    `${contextPath}/resources/assets/author-grid/author.png`
  )

  const params = {
    lazyImage,
    authorImage,
    author,
    authorLink,
    primarySection,
    subTitle,
    isPremium,
    websiteLink,
    isAdmin,
  }

  return <ColumnistPremium {...params} />
}

FeaturedStoryColumnist.propTypes = {
  customFields,
}

FeaturedStoryColumnist.label = 'Columnista Premium'
FeaturedStoryColumnist.static = true

export default FeaturedStoryColumnist
