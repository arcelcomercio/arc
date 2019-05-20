import React, { Fragment } from 'react'

const classses = {
  logocontent: 'logo-somos',
  logoimg: 'logo-somos__logo-img',
  menumovil: 'logo-somos__menu-movil',
  asidemenu: 'logo-somos__menu-movil',
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
        <a href="/">com</a>
      </div>
      <nav className="site-menu">
        <div className="box-content clearfix">
          <ul className="home-menu">
            <li className="link first">
              <a
                href="https://elcomercio.pe/somos?ref=somos/test-de-proust&amp;ft=menu"
                className="active">
                <i className="icon-home" />
              </a>
            </li>
            <li className="link ">
              <a
                href="https://elcomercio.pe/somos/historias?ref=somos/test-de-proust&amp;ft=menu"
                className="">
                Historias
              </a>
            </li>
            <li className="link ">
              <a
                href="https://elcomercio.pe/somos/firmas?ref=somos/test-de-proust&amp;ft=menu"
                className="">
                Firmas
              </a>
            </li>
            <li className="link ">
              <a
                href="https://elcomercio.pe/somos/test-de-proust?ref=somos/test-de-proust&amp;ft=menu"
                className="active">
                Test de Proust
              </a>
            </li>
            <li className="link ">
              <a
                href="https://elcomercio.pe/somos/videos?ref=somos/test-de-proust&amp;ft=menu"
                className="">
                Videos
              </a>
            </li>
            <li className="link ">
              <a
                href="https://elcomercio.pe/somos/fotos?ref=somos/test-de-proust&amp;ft=menu"
                className="">
                Fotos
              </a>
            </li>
            <li className="link ">
              <a href="/somos/orientacion-vocacional" className="">
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
