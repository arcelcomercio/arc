import React, { PureComponent } from 'react'

// const classes = {}

class HeaderChildSomos extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <header className="navbar-somos">
        <a href="/" className="navbar-somos__logo-link">
          <img
            className="navbar-somos__logo-img"
            src="https://img.elcomercio.pe/img/somos/logo_ec_w.png?1558370958"
            alt=""
          />
        </a>
        <div className="navbar-somos__box-right">
          <button type="button" className="navbar-somos__login-button">
            <i className="icon-user navbar-somos__icon-user" /> Ingresar a tu
            cuenta
          </button>
          <button type="button" className="navbar-somos__search-button">
            <i className="icon-search navbar-somos__icon-search" />
          </button>
        </div>
      </header>
    )
  }
}

export default HeaderChildSomos
