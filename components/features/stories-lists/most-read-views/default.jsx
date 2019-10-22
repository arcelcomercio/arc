import React from 'react'
import customFields from './_dependencies/custom-fields'
import MostReadViewChildren from './_children/most-read-view'

const MostReadView = props => {
  const {
    customFields: {
      title,
      urlTitle,
      showViews,
      showMore,
      urlShowMore,
      freeHTML,
    } = {},
  } = props

  const params = {
    title,
    urlTitle,
    showViews,
    showMore,
    urlShowMore,
    freeHTML,
  }
  return <MostReadViewChildren {...params} />
}

MostReadView.propTypes = {
  customFields,
}
MostReadView.label = 'Mas Vistas con Publicidad'
export default MostReadView
