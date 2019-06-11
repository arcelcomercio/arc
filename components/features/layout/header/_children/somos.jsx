import React, { PureComponent } from 'react'

const classes = {
  logocontent:
    'header-somos flex justify-between items-center text-center w-full',
  iconmenuwrapper: 'flex-1',
  menuicon: 'icon-menu header-somos__icon',
  logoWrapper:
    'header-somos__logo-wrapper text-center flex justify-center items-center',
  logoimgwrapper: 'header-somos__img-wrapper',
  logoLink: 'inline-b',
  logoimg: 'header-somos__img block',
  logoIcon: 'icon-marca',

  menu: 'somos-menu position-absolute',
  menuContent: 'somos-menu__content h-full',
  menuClose: 'somos-menu__close text-right w-full',
  menuCloseIcon: 'icon-close somos-menu__close-icon',
  menuSearch: 'somos-menu__search position-relative',
  menuSearchInput: 'somos-menu__search-input w-full font-bold',
  menuSearchIcon: 'icon-search ',
  menuButtonSearchIcon: 'somos-menu__search-icon position-absolute',
  menuLogin: 'somos-menu__login w-full',
  menuLoginLink: 'flex justify-center',
  menuLoginIcon: 'icon-user somos-menu__login-icon',
  menuLoginLabel: 'somos-menu__login-text uppercase font-bold',
  menuList: 'somos-menu__list',
  menuItemLink: 'somos-menu__item-link',
  menuLinkIcon: 'somos-menu__link-icon',
  iconHome: 'icon-home',
  menuItem: 'somos-menu__item',
  menuLink: 'somos-menu__link',
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
