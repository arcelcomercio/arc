import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeaturedMultimedia from './_children/featured-multimedia'
import customFields from './_dependencies/custom-fields'
import SchemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const CardFeaturedStoryMultimedia = props => {
  const { customFields: { section = '', freeHtml = '' } = {} } = props

  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const data = useContent({
    source: 'story-by-section',
    query: { section },
    filter: SchemaFilter(arcSite),
  })

  const { section_name: sectionName = '' } = data || {} // { section_name }

  const {
    websiteLink, // { websites { ${arcsite} { website_url } } }
    multimediaLandscapeMD,
    multimediaLazyDefault,
    title, // { headlines { basic } }
    multimediaType, // { promo_items }
    date, // { publish_date }
    primarySectionLink, // { taxonomy { primary_section { path } } }
    primarySection, // { taxonomy { primary_section { name } } }
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <FeaturedMultimedia
      {...{
        websiteLink,
        multimediaLandscapeMD,
        multimediaLazyDefault,
        title,
        multimediaType,
        date,
        sectionName:
          section === '' || section === '/' ? primarySection : sectionName,
        section:
          section === '' || section === '/'
            ? primarySectionLink
            : `${section}/`,
        freeHtml,
        isAdmin,
      }}
    />
  )
}

CardFeaturedStoryMultimedia.label = 'Destaque multimedia'
CardFeaturedStoryMultimedia.static = true

CardFeaturedStoryMultimedia.propTypes = {
  customFields,
}

export default CardFeaturedStoryMultimedia
