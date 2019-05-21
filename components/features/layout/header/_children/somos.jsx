import React, { Component, Fragment } from 'react'

const classses = {
  logocontent: 'header-somos',
  iconmenuwrapper: 'header-somos__icon-wrapper',
  menuicon: 'icon-menu header-somos__icon',
  logoicon: 'header-somos__logo-wrapper',
  logoimgwrapper: 'header-somos__img-wrapper',
  logoLink: 'header-somos__img-link',
  logoimg: 'header-somos__img',
}

class HeaderChildSomos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuActive: false,
    }
  }

  componentDidUpdate() {
    const { isMenuActive } = this.state
    if (isMenuActive)
      document
        .querySelector('.header-menu')
        .classList.add('header-menu--active')
  }

  render() {
    const { logo, logoIcon, firstSection, sections, device } = this.props
    const { isMenuActive } = this.state
    return (
      <Fragment>
        <div className={classses.logocontent}>
          <div className={classses.iconmenuwrapper}>
            <button
              type="button"
              onClick={() => {
                this.setState({ isMenuActive: !isMenuActive })
              }}>
              <i className={classses.menuicon} />
            </button>
          </div>
          <div className={classses.logoimgwrapper}>
            <a href={logo.link} className={classses.logoLink}>
              <img className={classses.logoimg} src={logo.src} alt={logo.alt} />
            </a>
          </div>
          <div className={classses.logoicon}>
            <a href={logoIcon.link}>
              <i className="icon-comercio" />
            </a>
          </div>
        </div>

        <nav
          className={`somos-menu ${isMenuActive ? 'somos-menu--active' : ''}`}>
          <div className="somos-menu__content">
            <div className="somos-menu__close">
              <button
                type="button"
                onClick={() => {
                  this.setState({ isMenuActive: !isMenuActive })
                }}>
                <i className="icon-close somos-menu__close-icon" />
              </button>
            </div>
            <div className="somos-menu__search">
              <input
                type="text"
                placeholder="Buscar"
                className="somos-menu__search-input"
              />
              <i className="icon-search somos-menu__search-icon" />
            </div>
            <div className="somos-menu__login">
              <a href="/" className="flex flex--justify-center">
                <i className="icon-user somos-menu__login-icon" />
                <p className="somos-menu__login-text">Ingresa a tu cuenta</p>
              </a>
            </div>
            <ul className="somos-menu__list">
              <li className="somos-menu__item-link">
                <a href={firstSection.url} className="somos-menu__link-icon">
                  <i className="icon-home" />
                </a>
              </li>
              {(device === 'desktop' || isMenuActive) &&
                sections.map(section => (
                  <li className="header-menu__item" key={section.url}>
                    <a href={section.url} className="header-menu__link">
                      {section.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </nav>
      </Fragment>
    )
  }
}

export default HeaderChildSomos
