import React, { PureComponent, Fragment } from 'react'

const classes = {
  logocontent: 'header-somos',
  iconmenuwrapper: 'header-somos__icon-wrapper',
  menuicon: 'icon-menu header-somos__icon',
  logoWrapper: 'header-somos__logo-wrapper',
  logoimgwrapper: 'header-somos__img-wrapper',
  logoLink: 'header-somos__img-link',
  logoimg: 'header-somos__img',
  logoIcon: 'icon-comercio',

  menu: 'somos-menu',
  menuContent: 'somos-menu__content',
  menuClose: 'somos-menu__close',
  menuCloseIcon: 'icon-close somos-menu__close-icon',
  menuSearch: 'somos-menu__search',
  menuSearchInput: 'somos-menu__search-input',
  menuSearchIcon: 'icon-search somos-menu__search-icon',
  menuLogin: 'somos-menu__login',
  menuLoginLink: 'flex flex--justify-center',
  menuLoginIcon: 'icon-user somos-menu__login-icon',
  menuLoginLabel: 'somos-menu__login-text',
  menuList: 'somos-menu__list',
  menuItemLink: 'somos-menu__item-link',
  menuLinkIcon: 'somos-menu__link-icon',
  iconHome: 'icon-home',
  menuItem: 'somos-menu__item',
  menuLink: 'somos-menu__link',
  menubtn: 'header-somos__btn',

  menuActive: 'somos-menu--active',
}

class HeaderChildSomos extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isMenuActive: false,
    }
  }

  render() {
    const { logo, logoIcon, firstSection, sections, device } = this.props
    const { isMenuActive } = this.state
    return (
      <Fragment>
        <div className={classes.logocontent}>
          <div className={classes.iconmenuwrapper}>
            <button
              type="button"
              onClick={() => {
                this.setState({ isMenuActive: !isMenuActive })
              }}
              className={classes.menubtn}>
              <i className={classes.menuicon} />
            </button>
          </div>
          <div className={classes.logoimgwrapper}>
            <a href={logo.link} className={classes.logoLink}>
              <img className={classes.logoimg} src={logo.src} alt={logo.alt} />
            </a>
          </div>
          <div className={classes.logoWrapper}>
            <a href={logoIcon.link}>
              <i className={classes.logoIcon} />
            </a>
          </div>
        </div>

        <nav
          className={`${classes.menu} ${
            isMenuActive ? classes.menuActive : ''
          }`}>
          <div className={classes.menuContent}>
            <div className={classes.menuClose}>
              <button
                type="button"
                onClick={() => {
                  this.setState({ isMenuActive: !isMenuActive })
                }}>
                <i className={classes.menuCloseIcon} />
              </button>
            </div>
            <div className={classes.menuSearch}>
              <input
                type="text"
                placeholder="Buscar"
                className={classes.menuSearchInput}
              />
              <i className={classes.menuSearchIcon} />
            </div>
            <div className={classes.menuLogin}>
              <a href="/" className={classes.menuLoginLink}>
                <i className={classes.menuLoginIcon} />
                <p className={classes.menuLoginLabel}>Ingresa a tu cuenta</p>
              </a>
            </div>
            <ul className={classes.menuList}>
              <li className={classes.menuItemLink}>
                <a href={firstSection.url} className={classes.menuLinkIcon}>
                  <i className={classes.iconHome} />
                </a>
              </li>
              {(device === 'desktop' || isMenuActive) &&
                sections.map(section => (
                  <li className={classes.menuItem} key={section.url}>
                    <a href={section.url} className={classes.menuLink}>
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
