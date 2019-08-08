import React from 'react'

const TvFeatured = () => {
  return (
    <>
      <div className="tv-featured bg-black position-relative">
        {/** Navbar */}
        <a
          href="https://peru21.pe/peru21tv"
          className="tv-featured__section-logo block position-absolute mt-25">
          <img
            className="w-full"
            src="https://assets.peru21.pe/img/p21tv/logo_p21tv.png"
            alt=""
          />
        </a>
        <div className="tv-featured__logo-container  position-absolute flex mt-25">
          <button type="button" className="mr-20">
            <i className="tv-featured__icon icon-hamburguer text-white"></i>
          </button>
          <a href="https://peru21.pe/" className="tv-featured__logo block">
            <img
              className="w-full"
              src="https://assets.peru21.pe/img/p21tv/logo_peru21_m.png"
              alt=""
            />
          </a>
        </div>
        {/** Video destacado */}
        <img
          src="https://img.peru21.pe/files/listing_p21_p21tv_home_destaque_principal/uploads/2019/08/08/5d4c811fcb5d8.jpeg"
          alt=""
        />
      </div>
    </>
  )
}

export default TvFeatured
