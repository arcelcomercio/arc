import React from 'react'
import PropTypes from 'prop-types'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import DataStory from '../../../utilities/story-data'
import { formatDateLocalTimeZone } from '../../../utilities/helpers'
import Icon from '../../../global-components/multimedia-icon'

const FeaturedStoryMultimedia = props => {
  const {
    customFields: { section = '' },
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const data = useContent({
    source: 'story-by-section',
    query: { section },
  })

  const DataInstance = new DataStory({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <div className="featured-multimedia flex flex-col col-1 row-1 bg-black p-20">
      <a className="text-primary-color mb-25 text-md" href="/section">
        OJO VIDEOS
      </a>
      <a
        className="mb-25 bg-gray-300 position-relative"
        href={DataInstance.websiteLink}>
        <picture>
          <img
            className="featured-multimedia__img object-cover"
            src={DataInstance.multimediaLandscapeMD}
            alt=""
          />
          <Icon type={DataInstance.multimediaType} iconClass="" />
        </picture>
      </a>
      <div className="text-primary-color text-md mb-10 secondary-font font-bold">
        {DataInstance.date && formatDateLocalTimeZone(DataInstance.date)}
      </div>
      <a
        className="text-white text-md flex-1 line-h-sm"
        href={DataInstance.websiteLink}>
        {DataInstance.title}
      </a>
      <a
        className="featured-multimedia__button bg-primary text-white secondary-font flex justify-center items-center rounded-sm font-bold"
        href="/section">
        Ver ediciones
      </a>
    </div>
  )
}

FeaturedStoryMultimedia.label = 'Destaque multimedia'
FeaturedStoryMultimedia.static = true

FeaturedStoryMultimedia.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'URL de la sección',
    }),
  }),
}

export default FeaturedStoryMultimedia
