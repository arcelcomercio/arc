import * as React from 'react'
import { useAppContext } from 'fusion:context'

import { taboolaConfig } from './_dependencies/scripts'
import customFields from './_dependencies/custom-fields'

const classes = {
  taboola: 'story-taboola ',
}

const StoryTaboolaLite = props => {
  const { customFields: { renderIfQueryParam } = {} } = props

  const {
    requestUri,
    siteProperties: {
      taboola: { mode },
    },
  } = useAppContext()

  const renderTaboola = renderIfQueryParam
    ? requestUri.includes('widgettaboola=true')
    : true

  return renderTaboola ? (
    <>
      <div className={classes.taboola} id="taboola-below-content-thumbnails" />
      <script dangerouslySetInnerHTML={{ __html: taboolaConfig(mode) }} />
    </>
  ) : null
}

StoryTaboolaLite.propTypes = {
  customFields,
}

StoryTaboolaLite.label = 'Artículo - Taboola'
StoryTaboolaLite.static = true

export default StoryTaboolaLite
