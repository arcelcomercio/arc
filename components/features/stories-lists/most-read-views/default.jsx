import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import MostReadViewChildren from './_children/most-read-view'

const MostReadView = props => {
  const { arcSite } = useFusionContext()
  const {
    customFields: {
      title,
      urlTitle,
      showViews,
      showMore,
      urlShowMore,
      freeHTML,
      storiesQty,
    } = {},
  } = props

  const data =
    useContent({
      source: 'story-feed-by-section',
      query: {
        section: '/',
        stories_qty: storiesQty || 3,
      },
      filter: schemaFilter(arcSite),
    }) || {}

  const params = {
    data,
    title,
    urlTitle,
    showViews,
    showMore,
    urlShowMore,
    freeHTML,
    arcSite,
  }
  return <MostReadViewChildren {...params} />
}

MostReadView.propTypes = {
  customFields,
}
MostReadView.label = 'Mas Vistas con Publicidad'
export default MostReadView
