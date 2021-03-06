import React, { PureComponent } from 'react'
import getResponsiveClasses from '../../../../utilities/responsive-classes'
import searchQuery from '../../../../utilities/client/search'

const classes = {
  // header
  logocontent: `header-somos bg-white flex justify-between items-center text-center w-full p-10 border-t-1 border-b-1 border-solid border-gray lg:pt-15 lg:pb-15 lg:pr-10 lg:pl-10`,
  iconmenuwrapper: 'header-somos__icon-wrapper lg:hidden',
  menuicon: 'icon-menu header-somos__icon title-xl',
  logoWrapper: `header-somos__logo-wrapper bg-black right-0 text-center flex justify-center items-center rounded lg:hidden`,
  logoimgwrapper: 'header-somos__img-wrapper flex-1',
  logoLink: 'inline-block',
  logoimg: 'header-somos__img block',
  logoIcon: 'icon-marca title-xl text-white',

  // menu
  menu: `somos-menu position-absolute bg-gray-300 w-0 top-0 left-0 h-full lg:h-auto lg:w-full`,
  menuContent: `somos-menu__content bg-black h-full overflow-y lg:w-full lg:text-center`,
  menuClose: 'somos-menu__close text-right w-full pt-15 pr-10 pl-10 lg:hidden',
  menuCloseIcon: 'icon-close somos-menu__close-icon text-md text-white',
  menuSearch: `somos-menu__search position-relative pt-15 pr-10 pl-10 lg:hidden`,
  menuSearchInput: `somos-menu__search-input bg-transparent text-white border-white w-full font-bold pr-10 pl-10 border-1 border-solid text-md`,
  menuSearchIcon: 'icon-search ',
  menuButtonSearchIcon: `somos-menu__search-icon text-white position-absolute text-md`,
  menuLogin: 'somos-menu__login w-full pt-20 pr-10 pl-10 lg:hidden',
  menuLoginLink: 'flex justify-center',
  menuLoginIcon: 'icon-user somos-menu__login-icon mr-10 text-primary-color',
  menuLoginLabel: `somos-menu__login-text uppercase font-bold text-md text-white`,
  menuList: `somos-menu__list m-0 block pt-5 pb-5 pr-15 pl-15 lg:flex lg:flex lg:justify-evenly`,
  menuItemLink: 'somos-menu__item-link hidden lg:flex lg:items-center',
  menuLinkIcon: 'somos-menu__link-icon hidden text-gray-300 lg:block',
  iconHome: 'icon-home',
  menuItem: 'somos-menu__item',
  menuLink: `somos-menu__link text-xl text-white pt-15 pb-15 inline-block w-full lg:flex lg:items-center`,
  menubtn: 'header-somos__btn',

  menuActive: 'somos-menu--active w-full',
}
// TODO: Agregar el click afuera del menu
// TODO: cambiar a Hooks

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
    searchQuery(searchValue)
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
      deviceList,
      globalContentConfig: { query = {} } = {},
    } = this.props
    const { isMenuActive, searchValue } = this.state

    const search = decodeURIComponent(query.query || '').replace(/\+/g, ' ')

    return (
      <>
        <div
          className={`${classes.logocontent} ${getResponsiveClasses(
            deviceList
          )}`}>
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
            <a itemProp="url" href={logo.link} className={classes.logoLink}>
              <img className={classes.logoimg} src={logo.src} alt={logo.alt} />
            </a>
          </div>
          <div className={classes.logoWrapper}>
            <a itemProp="url" href={logoIcon.link}>
              <i className={classes.logoIcon} />
            </a>
          </div>
        </div>

        <nav
          className={`${classes.menu} ${
            isMenuActive ? classes.menuActive : ''
          } ${getResponsiveClasses(deviceList)}`}>
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
                  defaultValue={search}
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
              <a itemProp="url" href="/" className={classes.menuLoginLink}>
                <i className={classes.menuLoginIcon} />
                <p itemProp="description" className={classes.menuLoginLabel}>
                  Ingresa a tu cuenta
                </p>
              </a>
            </div>
            <ul className={classes.menuList}>
              <li className={classes.menuItemLink}>
                <a
                  itemProp="url"
                  href={firstSection.url}
                  className={classes.menuLinkIcon}>
                  <i className={classes.iconHome} />
                </a>
              </li>
              {sections.map(section => (
                <li className={classes.menuItem} key={section.url}>
                  <a
                    itemProp="url"
                    href={section.url}
                    className={classes.menuLink}>
                    {section.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </>
    )
  }
}

export default HeaderChildSomos
