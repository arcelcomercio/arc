import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'

const classes = {
  story: 'w-full text-white ',
}

const StoryComentario = () => {
  const {
    contextPath,
    globalContent: data,
    siteProperties: { siteUrl },
  } = useFusionContext()

  const { websiteUrl } = new StoryData({
    data,
    contextPath,
  })

  return (
    <div className={classes.story}>
      <div
        className="fb-comments"
        data-href={`${siteUrl}${websiteUrl}`}
        data-numposts="5"
      />
    </div>
  )
}

StoryComentario.label = 'Artículo - Comentario'
StoryComentario.static = true

export default StoryComentario
