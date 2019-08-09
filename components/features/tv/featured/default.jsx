import React from 'react'

import TvHeader from './_children/header'
import Icon from '../../../global-components/multimedia-icon'

const TvFeatured = () => {
  return (
    <div className="tv-featured position-relative">
      <TvHeader />

      <div className="tv-featured__body mx-auto">
        <button
          type="button"
          className="block p-0"
          onClick={() => console.log('TODO: HACER EL POPUP')}>
          <picture className="tv-featured__picture block position-relative">
            <img
              className="tv-featured__img object-cover w-full h-full"
              src="https://img.peru21.pe/files/listing_p21_p21tv_home_destaque_principal/uploads/2019/08/09/5d4dd028d1489.jpeg"
              alt=""
            />
            <Icon type="basic_video" iconClass="" />
          </picture>
        </button>

        <div className="tv-featured__content p-15 lg:ml-35">
          <div className="tv-featured__new-episode bg-primary text-white inline-block p-5 rounded-sm mb-10">
            NUEVO EPISODIO
          </div>
          <h2 className="mb-15">
            <button
              type="button"
              className="tv-featured__text-button text-white font-bold title-xs p-0 text-left"
              onClick={() => console.log('TODO: HACER EL POPUP')}>
              Keiko Fujimori: Corte Suprema emite fallo de casación de Keiko
              para determinar si continúa en prisión
            </button>
          </h2>
          <time className="block text-white mb-15" dateTime="9/8/2019">
            9/8/2019
          </time>
        </div>
      </div>
    </div>
  )
}

export default TvFeatured
