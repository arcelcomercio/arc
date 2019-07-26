import React from 'react'
import PropTypes from 'prop-types'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

const FeaturedStoryMultimedia = props => {
  const {
    customFields: { section = '' },
  } = props

  // const { arcSite } = useFusionContext()

  const data = useContent({
    source: 'story-by-section',
    query: { section },
  })
  console.log(
    'DATAsss-->',
    data,
    'PROPS-->',
    props,
    'CONTEXT-->',
    useFusionContext()
  )
  return (
    <div className="featured-multimedia flex flex-col col-1 row-1">
      <a className="text-primary-color" href="/section">
        OJO VIDEOS
      </a>
      <picture>
        <img
          src="https://cdne.ojo.pe/thumbs/uploads/img/2019/07/01/osiptel-bloqueo-un-millon-y-medio-de-celulare-320359-798549-jpg_272x148.jpg"
          alt=""
        />
      </picture>
      <div className="text-primary-color">22/05/2019</div>
      <div>
        Joven sorprende a su novia y le pide matrimonio en pleno concierto de
        Gianmarco
      </div>
      <a href="/section">Ver ediciones</a>
    </div>
  )
}

FeaturedStoryMultimedia.label = 'Destaque multimedia'
// FeaturedStoryMultimedia.static = true

FeaturedStoryMultimedia.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'URL de la sección',
    }),
  }),
}

export default FeaturedStoryMultimedia
