import * as React from 'react'
import { useAppContext } from 'fusion:context'

import { taboolaConfig } from './_dependencies/scripts'

const classes = {
  taboola: 'story-content__taboola pt-20  pr-20 pl-20',
}

const StoryTaboola = () => {
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

StoryTaboola.label = 'Artículo - Taboola'
StoryTaboola.static = true

export default StoryTaboola
