import React from 'react'
import PropTypes from 'prop-types'

const SeparatorFeatured = () => {
  const aux = [1, 2, 3, 4]
  return (
    <div className="featured-separator col-3 flex">
      <div className="featured-separator__title-container pr-10">
        <h2 className="featured-separator__title text-lg line-h-xs mb-5">
          <a className="featured-separator__title-link" href="/">
            COPA AMERICA <span className="text-sm">2019</span>
          </a>
        </h2>
        <i className="featured-separator__icon icon-marca" />
      </div>
      {aux.map(() => (
        <div className="featured-separator__story flex pl-10 pr-10 border-l-1 border-dashed">
          <div className="featured-separator__story-content">
            <h3 className="featured-separator__story-section font-bold text-xl mb-5">
              <a className="featured-separator__section-link" href="/">
                Entrevista
              </a>
            </h3>
            <h2 className="featured-separator__story-title text-lg">
              <a className="featured-separator__story-link" href="/">
                Oblitas: Hay jugadores que pensamos para esta copa america pero
                desaparecieron
              </a>
            </h2>
          </div>
          <a className="featured-separator__img-link block" href="/">
            <img
              src="https://elcomercio.pe/resizer/op_jRGDDVRp82KUx5oaJKNK5QMM=/314x374/smart/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/43TH7ER2VRHVTKALWZNCYB5IIA.jpg"
              alt="No olvidarrrrr"
              className="featured-separator__img w-full"
            />
          </a>
        </div>
      ))}
    </div>
  )
}

SeparatorFeatured.label = 'Separador destacado'

SeparatorFeatured.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default SeparatorFeatured
