import React from 'react'

const classes = {
  taboola: 'story-content__taboola pt-20  pr-20 pl-20',
}

const StoryComentario = () => {
  const structuredTaboola = `
      window._taboola = window._taboola || [];
      _taboola.push({
      mode: 'thumbnails-a',
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

StoryComentario.label = 'Artículo - Taboola'
StoryComentario.static = true

export default StoryComentario
