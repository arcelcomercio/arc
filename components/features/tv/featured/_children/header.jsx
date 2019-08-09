import React from 'react'

const TvHeader = () => {
  return (
    <header className="tv-header">
      <a
        href="https://peru21.pe/peru21tv"
        className="tv-header__section-logo block position-absolute mt-25">
        <img
          className="w-full"
          src="https://assets.peru21.pe/img/p21tv/logo_p21tv.png"
          alt=""
        />
      </a>
      <div className="tv-header__logo-container  position-absolute flex mt-25">
        <button type="button" className="mr-15">
          <i className="tv-header__icon icon-hamburguer text-white"></i>
        </button>
        <a href="https://peru21.pe/" className="tv-header__logo block">
          <img
            className="w-full"
            src="https://assets.peru21.pe/img/p21tv/logo_peru21_m.png"
            alt=""
          />
        </a>
      </div>
    </header>
  )
}

export default TvHeader
