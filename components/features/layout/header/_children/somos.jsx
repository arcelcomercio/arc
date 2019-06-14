import React, { PureComponent } from 'react'

const classes = {
  // header
  logocontent:
    'header-somos flex justify-between items-center text-center w-full p-10 border-t-1 border-b-1 boder-solid',
  iconmenuwrapper: 'header-somos__icon-wrapper',
  menuicon: 'icon-menu header-somos__icon title-xl',
  logoWrapper:
    'header-somos__logo-wrapper right-0 text-center flex justify-center items-center',
  logoimgwrapper: 'header-somos__img-wrapper flex-1',
  logoLink: 'inline-b',
  logoimg: 'header-somos__img block',
  logoIcon: 'icon-marca title-xl',

  // menu
  menu: 'somos-menu position-absolute top-0 left-0 h-full',
  menuContent: 'somos-menu__content h-full scroll-vertical',
  menuClose: 'somos-menu__close text-right w-full pt-15 pr-10 pl-10',
  menuCloseIcon: 'icon-close somos-menu__close-icon text-md',
  menuSearch: 'somos-menu__search position-relative pt-15 pr-10 pl-10',
  menuSearchInput:
    'somos-menu__search-input w-full font-bold pr-10 pl-10 border-1 border-solid text-md',
  menuSearchIcon: 'icon-search ',
  menuButtonSearchIcon: 'somos-menu__search-icon position-absolute text-md',
  menuLogin: 'somos-menu__login w-full pt-20 pr-10 pl-10',
  menuLoginLink: 'flex justify-center',
  menuLoginIcon: 'icon-user somos-menu__login-icon mr-10',
  menuLoginLabel: 'somos-menu__login-text uppercase font-bold text-md',
  menuList: 'somos-menu__list m-0 block pt-5 pb-5 pr-15 pl-15',
  menuItemLink: 'somos-menu__item-link hidden',
  menuLinkIcon: 'somos-menu__link-icon hidden',
  iconHome: 'icon-home',
  menuItem: 'somos-menu__item pt-15 pb-15',
  menuLink: 'somos-menu__link title-md',
  menubtn: 'header-somos__btn',

  menuActive: 'somos-menu--active w-full',
}

class HeaderChildSomos extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isMenuActive: false,
      searchValue: '',
    }
  }

  handleSubmit(e) {
    const { searchValue } = this.state
    const { searchUrl } = this.props
    searchUrl(searchValue)
    e.preventDefault()
  }

  handleSearchInput(e) {
    this.setState({ searchValue: e.target.value })
  }

  render() {
    const {
      logo,
      logoIcon,
      firstSection,
      sections,
      device,
      deviceList,
    } = this.props
    const { isMenuActive, searchValue } = this.state

    const _handleHide = () => {
      switch (device) {
        case 'desktop':
          return deviceList.showInDesktop

        case 'tablet':
          return deviceList.showInTablet

        case 'mobile':
          return deviceList.showInMobile

        default:
          return true
      }
    }

    return (
      _handleHide() && (
        <>
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
                <img
                  className={classes.logoimg}
                  src={logo.src}
                  alt={logo.alt}
                />
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
                <form action="" onSubmit={e => this.handleSubmit(e)}>
                  <input
                    type="text"
                    placeholder="Buscar"
                    className={classes.menuSearchInput}
                    value={searchValue}
                    onChange={e => this.handleSearchInput(e)}
                  />
                  <button
                    className={classes.menuButtonSearchIcon}
                    type="submit"
                    onClick={() => {}}>
                    <i className={classes.menuSearchIcon} />
                  </button>
                </form>
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
        </>
      )
    )
  }
}

export default HeaderChildSomos
