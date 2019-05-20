import React, { Fragment } from 'react'

const classses = {
  logocontent: 'header-somos',
  logoimg: 'header-somos__logo-img',
  menumovil: 'header-somos__menu-movil',
  asidemenu: 'header-somos__menu-movil',
  asidemenuscroller: '',
  asidemenucontent: '',
}

const HeaderChildSomos = () => {
  return (
    <Fragment>
      <div className={classses.logocontent}>
        <a href="/">men</a>
        <a href="/">
          <img
            className={classses.logoimg}
            src="https://img.elcomercio.pe/img/somos/logo_somos.png?1557531956"
            alt="somos"
          />
        </a>
        <a href="/"><img src="/resources/dist/elcomercio/images/letra-c-white.png" alt="logo"/></a>
      </div>
      <nav className="header-menu">
      <div className="header-menu__content">
        <div className="header-menu__search">
          <input type="text" placeholder="Buscar" className="header-menu__search-input"/>
        </div>
          <ul className="header-menu__list">
            <li className="header-menu__item first">
              <a
                href="https://elcomercio.pe/somos?ref=somos/test-de-proust&amp;ft=menu"
                className="header-menu__link-icon active">
                i
              </a>
            </li>
            <li className="header-menu__item">
              <a
                href="https://elcomercio.pe/somos/historias?ref=somos/test-de-proust&amp;ft=menu"
                className="header-menu__link">
                Historias
              </a>
            </li>
            <li className="header-menu__item">
              <a
                href="https://elcomercio.pe/somos/firmas?ref=somos/test-de-proust&amp;ft=menu"
                className="header-menu__link">
                Firmas
              </a>
            </li>
            <li className="header-menu__item">
              <a
                href="https://elcomercio.pe/somos/test-de-proust?ref=somos/test-de-proust&amp;ft=menu"
                className="header-menu__link active">
                Test de Proust
              </a>
            </li>
            <li className="header-menu__item">
              <a
                href="https://elcomercio.pe/somos/videos?ref=somos/test-de-proust&amp;ft=menu"
                className="header-menu__link">
                Videos
              </a>
            </li>
            <li className="header-menu__item">
              <a
                href="https://elcomercio.pe/somos/fotos?ref=somos/test-de-proust&amp;ft=menu"
                className="header-menu__link">
                Fotos
              </a>
            </li>
            <li className="header-menu__item">
              <a href="/somos/orientacion-vocacional" className="header-menu__link">
                Somos OV
              </a>
            </li>
          </ul>
          </div>
      </nav>
    </Fragment>
  )
}

export default HeaderChildSomos
