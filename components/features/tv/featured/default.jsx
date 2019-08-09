import React from 'react'

import TvHeader from './_children/header'

const TvFeatured = () => {
  return (
    <div className="tv-featured position-relative">
      <TvHeader />

      <a href="/" className="block">
        <picture className="tv-featured__picture block ">
          <img
            className="object-cover w-full h-full"
            src="https://img.peru21.pe/files/listing_p21_p21tv_home_destaque_principal/uploads/2019/08/09/5d4d848e6ba7e.jpeg"
            alt=""
          />
        </picture>
      </a>

      <div className="p-15">
        <div className="bg-white">NUEVO EPISODIO</div>
        <h2>
          <a href="/">
            Keiko Fujimori: Corte Suprema emite fallo de casación de Keiko para
            determinar si continúa en prisión
          </a>
        </h2>
        <time className="" dateTime="9/8/2019">
          9/8/2019
        </time>
      </div>
    </div>
  )
}

export default TvFeatured
