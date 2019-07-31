import React from 'react'
import PropTypes from 'prop-types'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

// CR: DataStory -> StoryData
import DataStory from '../../../utilities/story-data'
import { formatDateLocalTimeZone } from '../../../utilities/helpers'
import Icon from '../../../global-components/multimedia-icon'

// CR: FeaturedStoryMultimedia -> CardFeaturedStoryMultimedia
const FeaturedStoryMultimedia = props => {
  const {
    customFields: { section = '' },
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const data = useContent({
    source: 'story-by-section',
    query: { section },
  })

  /**
   * CR: Sería mejor destructurar sólamente la data que necesitas
   * de una vez desde StoryData en lugar de crear la instancia.
   */
  // CR: DataStory -> StoryData
  const DataInstance = new DataStory({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    // CR: Este feature tiene las características para ser un article.
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
            /**
             * CR: agregar "w-full"
             * en lugar de width: 100%; en scss.
             * */
            src={DataInstance.multimediaLandscapeMD}
            alt=""
            // CR: Es importante agregar una descripción en alt=
          />
          <Icon type={DataInstance.multimediaType} iconClass="" />
        </picture>
      </a>
      <div
        /** CR: debería usarse una etiqueta TIME y enviarle datetime="..."
         * https://www.w3schools.com/tags/tag_time.asp */
        className="text-primary-color text-md mb-10 secondary-font font-bold">
        {DataInstance.date && formatDateLocalTimeZone(DataInstance.date)}
      </div>
      <a
        /**
         * CR: Usar una etiqueta <h2> para este título
         */
        className="text-white text-md flex-1 line-h-sm"
        href={DataInstance.websiteLink}>
        {DataInstance.title}
      </a>
      <a
        className="featured-multimedia__button bg-primary text-white secondary-font flex justify-center items-center rounded-sm font-bold"
        /**
         * CR:
         * Se está usando margin: 0 auto; en los estilos,
         * si se va a centrar de esa manera, mejor agregar "m-0 mx-auto" aquí.
         * Si se va a centrar de esa manera, no deberian ser necesarias
         * las clases "flex justify-center items-center"
         * */
        href="/section">
        Ver ediciones
      </a>
    </div>
  )
}

FeaturedStoryMultimedia.label = 'Destaque multimedia'
FeaturedStoryMultimedia.static = true

FeaturedStoryMultimedia.propTypes = {
  // CR: Me da dolor pero acordamos sacar los customFields a _dependencies.
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'URL de la sección',
      /**
       * CR: Validar si se puede agregar una descripción
       * similar a como se hace con los otros featured-stories.
       */
    }),
  }),
}

export default FeaturedStoryMultimedia
