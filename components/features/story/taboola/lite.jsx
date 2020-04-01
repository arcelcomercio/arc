import React from 'react'
import { useFusionContext } from 'fusion:context'

const classes = {
  taboola: 'story-taboola ',
}

const StoryTaboolaLite = () => {
  const {
    siteProperties: {
      taboola: { mode },
    },
  } = useFusionContext()

  const structuredTaboola = `
      window._taboola = window._taboola || [];
      _taboola.push({
      mode: '${mode}',
      container: 'taboola-below-content-thumbnails',
      placement: 'Below Content Thumbnails',
      target_type: 'mix'
      });`

  return (
    <>
      <div className={classes.taboola} id="taboola-below-content-thumbnails" />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: structuredTaboola }}
      />
    </>
  )
}

StoryTaboolaLite.label = 'Artículo - Taboola'
StoryTaboolaLite.static = true

export default StoryTaboolaLite
