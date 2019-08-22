import React from 'react'

const classes = {
  story: 'w-full text-white ',
  taboola: 'story-content__taboola',
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

StoryComentario.label = 'Artículo - Comentario'
StoryComentario.static = true

export default StoryComentario
