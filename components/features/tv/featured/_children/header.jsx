import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'

import MenuTV from './menu'

const TvHeader = () => {
  const { contextPath, deployment } = useFusionContext()
  const [statusMenu, changeStatus] = useState(false)

  const toggleMenu = () => {
    changeStatus(!statusMenu)
  }
  return (
    <header className="tv-header">
      <a
        href="https://peru21.pe/peru21tv"
        className="tv-header__section-logo block position-absolute mt-25">
        <img
          className="w-full"
          src={deployment(
            `${contextPath}/resources/assets/extraordinary-story/grid/logo.png`
          )}
          alt="Perú21TV"
        />
      </a>
      <div className="tv-header__logo-container  position-absolute flex mt-25">
        <button type="button" className="mr-15" onClick={() => toggleMenu()}>
          <i className="tv-header__icon icon-hamburguer text-white" />
        </button>
        <a href="https://peru21.pe/" className="tv-header__logo block">
          <img
            className="w-full"
            src="https://assets.peru21.pe/img/p21tv/logo_peru21_m.png"
            alt=""
          />
        </a>
      </div>
      {statusMenu && <MenuTV toggleMenu={toggleMenu} />}
    </header>
  )
}

export default TvHeader
