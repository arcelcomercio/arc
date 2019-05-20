import React, { Fragment } from 'react'

const classses = {
  logocontent: 'header-somos',
  iconmenuwrapper: 'header-somos__icon-wrapper',
  menuicon: 'icon-menu header-somos__icon',
  logoicon: 'header-somos__logo-wrapper',
  logoimgwrapper: 'header-somos__img-wrapper',
  logoimg: 'header-somos__img',
}

const HeaderChildSomos = () => {
  return (
    <Fragment>
      <div className={classses.logocontent}>
        <div className={classses.iconmenuwrapper}>
          <a href="/"><i className={classses.menuicon}></i></a>
        </div>
        <div className={classses.logoimgwrapper}>
          <a href="/">
            <img
              className={classses.logoimg}
              src="https://img.elcomercio.pe/img/somos/logo_somos.png?1557531956"
              alt="somos"
              />
          </a>
        </div>
        <div className={classses.logoicon}>
          <a href="/"><i className="icon-comercio"></i></a>
        </div>
      </div>
   {/*    Agregar clase .header-menu--active para mostrar el menu en mobile */}
      <nav className="header-menu">
        <div className="header-menu__content">
          <div className="header-menu__close">
            <i className="icon-close header-menu__close-icon"></i>
            </div>
          <div className="header-menu__search">
            <input type="text" placeholder="Buscar" className="header-menu__search-input"/>
            <i className="icon-search header-menu__search-icon"></i>
          </div>
          <div className="header-menu__login">
            <a href="/" className="flex flex--justify-center">
            <i className="icon-user header-menu__login-icon"></i>
            <p className="header-menu__login-text">Ingresa a tu cuenta</p>
            </a>
          </div>
          <ul className="header-menu__list">
            <li className="header-menu__item-link">
              <a
                href="https://elcomercio.pe/somos?ref=somos/test-de-proust&amp;ft=menu"
                className="header-menu__link-icon">
                <i className="icon-home"></i>
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
