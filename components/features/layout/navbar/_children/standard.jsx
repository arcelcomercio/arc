import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import Button from '../../../../global-components/button'
import Signwall from '../../../signwall/default'
import Menu from './menu'
// import Ads from '../../../../global-components/ads'

import { getResponsiveClasses } from '../../../../utilities/helpers'

const classes = {
  nav: `nav bg-gray-100 text-white text-sm w-full flex flex items-center top-0 secondary-font`,
  wrapper: `flex items-center nav__wrapper bg-primary w-full h-inherit justify-between lg:justify-start pl-15 pr-15`,
  form: 'flex position-relative items-center',
  search: `nav__input-search border-0 w-0 text-md pt-5 pb-5 bg-gray-100 rounded-sm line-h line-h-xs`,
  navContainerRight: `nav__container-right position-absolute bg-gray-100 hidden lg:flex`,
  navBtnContainer: `flex items-center justify-start nav__container-menu lg:pr-10`,
  searchContainer: 'flex items-center justify-start',
  btnSearch: `flex items-center btn nav__btn nav__btn--search text-gray-200 hidden lg:flex`,
  btnSection: 'flex items-center btn nav__btn nav__btn--section p-5',
  iconSearch: 'nav__icon-search text-primary-color icon-search title-xs',
  iconMenu: 'nav__icon-menu icon-hamburguer title-sm',
  list: `items-center nav__list h-inherit overflow-hidden hidden lg:flex pl-15`,
  listItem: 'nav__list-item text-center pr-15 h-full',
  mobileLogo: 'nav__mobile-logo position-absolute',
  listLink: `nav__list-link text-gray-200 h-inherit flex items-center uppercase secondary-font font-normal text-sm`,
  logo: 'nav__logo lg:hidden',
  ads: 'nav__ads mr-5 ml-5 hidden',
  navMobileContainer: 'nav__mobile-container lg:hidden',
  btnContainer: 'flex items-center justify-end header__btn-container hidden',
  btnLogin: 'nav__btn flex items-center btn', // Tiene lógica abajo
  btnSubscribe: `flex items-center btn hidden md:inline-block`,
  iconLogin: 'nav__icon icon-user',
}

@Consumer
class NavBarDefault extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      statusSidebar: false,
      statusSearch: false,
      scrolled: false,
      isActive: false,
    }
    // Resizer.setResizeListener()
    this.inputSearch = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll)
  }

  // Add - Remove Class active input and button search
  activeSearch = () => {
    const { statusSearch } = this.state
    return statusSearch ? 'active' : ''
  }

  // If input search is empty, buton close search else buton find search
  optionButtonClick = () => {
    const { statusSearch } = this.state
    if (statusSearch) this._handleSearch()
    else this.focusInputSearch()
    this.setState({ statusSearch: !statusSearch })
  }

  // Open search and automatic focus input
  focusInputSearch = () => {
    this.inputSearch.current.focus()
  }

  // TODO: abstraer este método, se usa por 3 componentes
  _handleSearch = () => {
    const { value } = this.inputSearch.current
    if (value !== '') {
      // eslint-disable-next-line no-restricted-globals
      location.href = `/buscar/${encodeURIComponent(value).replace(
        /%20/g,
        '+'
      )}/todas/descendiente/`
    }
  }

  // Active find with enter key
  _handleKeyDown = e => {
    e.preventDefault()
    const { value } = e.target
    if (value !== '' && e.which === 13) {
      this._handleSearch()
    }
  }

  // Saber si hay sesion inicada
  checkSesion = () => {
    const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
    const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
    if (profileStorage) {
      return !(profileStorage === 'null' || sesionStorage === '{}') || false
    }
    return false
  }

  // _handleDevice = device => {
  //   this._handleScroll()
  //   // ------ Add or remove Scroll eventListener on resize
  //   if (device === 'desktop')
  //     window.addEventListener('scroll', this._handleScroll)
  //   else window.removeEventListener('scroll', this._handleScroll)
  // }

  toggleBodyOverflow = () => {
    if (typeof window !== 'undefined') {
      if (document.body.classList.contains('overflow-hidden'))
        document.body.classList.remove('overflow-hidden')
      else if (window.innerWidth < 640)
        document.body.classList.add('overflow-hidden')
    }
  }

  _handleScroll = () => {
    const { scrolled } = this.state
    // ------ Logic to set state to hidden or show logo in navbar
    const { body = {}, documentElement = {} } = document
    const { scrollTop: scrollBody = 0 } = body
    const { scrollTop: scrollElement = 0 } = documentElement
    const scroll = scrollBody || scrollElement

    const header = Array.from(document.getElementsByTagName('header'))
    const headerTop = (header[0] && header[0].offsetTop) || 0
    // setTimeout(() => {
    //   console.log(header[0].offsetTop)
    // }, 2000)
    if (!scrolled && scroll > headerTop) {
      this.setState({
        scrolled: true,
      })
    } else if (scrolled && scroll <= headerTop) {
      this.setState({
        scrolled: false,
      })
    }
  }

  // Open - Close Search
  _handleToggleSectionElements = () => {
    const { statusSidebar } = this.state
    this.toggleBodyOverflow()
    this.setState({
      statusSidebar: !statusSidebar,
    })
  }

  closeSignwall() {
    this.setState({ isActive: false })
  }

  // Close Search
  /* _handleCloseSectionsSearch = () => {
    setTimeout(() => {
      this.setState({
        statusSearch: false,
      })
    }, 250)
  } */

  render() {
    const { statusSidebar, scrolled, isActive } = this.state
    const {
      logo,
      arcSite,
      siteProperties,
      contextPath,
      deviceList,
      data: { children: sections = [] } = {},
    } = this.props

    const responsiveClass = getResponsiveClasses(deviceList)
    // this._handleDevice(device)
    /* const _handleHide = () => {
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
    } */
    return (
      <>
        <nav
          className={`${classes.nav} ${
            scrolled ? 'active' : ''
          } ${responsiveClass}`}>
          <div className={classes.wrapper}>
            {/** ************* LEFT *************** */}

            <div className={classes.navBtnContainer}>
              <Button
                iconClass={classes.iconMenu}
                btnClass={classes.btnSection}
                btnText="Menú"
                onClick={this._handleToggleSectionElements}
              />
            </div>

            {/** ************* MIDDLE *************** */}

            <ul className={classes.list}>
              {sections &&
                sections.slice(0, 4).map(({ name, _id: id }) => {
                  return (
                    <li key={id} className={classes.listItem}>
                      <a href={id} className={classes.listLink}>
                        {name}
                      </a>
                    </li>
                  )
                })}
            </ul>
            <a href="/" className={classes.mobileLogo}>
              <img
                src={logo}
                alt={`Logo de ${arcSite}`}
                className={classes.logo}
              />
            </a>
            {/** ************* RIGHT *************** */}

            <div className={`${classes.navContainerRight} ${responsiveClass}`}>
              <div className={classes.btnContainer}>
                <Button
                  btnText="Suscríbete"
                  btnClass={`${classes.btnSubscribe} btn--outline`}
                  btnLink="#"
                />
                <button
                  type="button"
                  className={`${classes.btnLogin} btn--outline`}
                  onClick={() => this.setState({ isActive: true })}>
                  {this.checkSesion() ? 'Mi Cuenta' : 'Iniciar Sesión'}
                </button>
              </div>
              <div className={classes.searchContainer}>
                {/* <Ads
                    adElement="zocaloNav1"
                    isDesktop
                    classes={{ desktop: classes.ads }}
                  />
                    <Ads
                  adElement="zocaloNav2"
                  isDesktop
                  classes={{ desktop: classes.ads }}
                /> */}
                <form
                  className={classes.form}
                  onSubmit={e => e.preventDefault()}>
                  <input
                    ref={this.inputSearch}
                    type="search"
                    /* onBlur={this._handleCloseSectionsSearch} */
                    onKeyUp={this._handleKeyDown}
                    placeholder="¿Qué Buscas?"
                    className={`${classes.search} ${this.activeSearch()}`}
                  />
                  <Button
                    iconClass={classes.iconSearch}
                    btnClass={`${classes.btnSearch} ${this.activeSearch()}`}
                    onClick={this.optionButtonClick}
                  />
                </form>
              </div>
            </div>
            <div
              className={`${classes.btnContainer} ${
                classes.navMobileContainer
              } ${responsiveClass}`}>
              <button
                type="button"
                className={`${
                  classes.btnLogin
                } border-1 border-solid border-white`}
                onClick={() => this.setState({ isActive: true })}>
                <i className={classes.iconLogin} />
              </button>
            </div>
          </div>
          <Menu
            sections={sections}
            showSidebar={statusSidebar}
            contextPath={contextPath}
            siteProperties={siteProperties}
          />
        </nav>
        {isActive && <Signwall closeSignwall={() => this.closeSignwall()} />}
      </>
    )
  }
}

export default NavBarDefault
