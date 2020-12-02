import * as React from 'react'
import { useAppContext } from 'fusion:context'

import { taboolaConfig } from './_dependencies/scripts'

const classes = {
  taboola: 'story-taboola ',
}

const StoryTaboolaLite = () => {
  const {
    siteProperties: {
      taboola: { mode },
    },
  } = useAppContext()

  return (
    <>
      <div className={classes.taboola} id="taboola-below-content-thumbnails" />
      <script dangerouslySetInnerHTML={{ __html: taboolaConfig(mode) }} />
    </>
  )
}

StoryTaboolaLite.label = 'Artículo - Taboola'
StoryTaboolaLite.static = true

export default StoryTaboolaLite
