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
     
    </Fragment>
  )
}

export default HeaderChildSomos
