import React from 'react'

const TvSection = () => {
  return (
    <>
      <div className="flex justify-center bg-black">
        <picture>
          <img
            className="w-full"
            src="https://assets.peru21.pe/img/p21tv/banner-21noticias.jpg"
            alt=""
          />
        </picture>
      </div>
      <div>
        <div>
          <span>Sobre el programa</span>
          <h3>21Noticias</h3>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default TvSection
