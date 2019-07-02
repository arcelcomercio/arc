import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import Button from '../../../../global-components/button'
import Menu from './menu'
// import Ads from '../../../../global-components/ads'

import { getResponsiveClasses } from '../../../../utilities/helpers'

const classes = {
  nav: `nav bg-gray-100 text-white text-sm w-full flex flex items-center top-0 secondary-font font-bold`,
  wrapper: `flex items-center nav__wrapper bg-primary w-full h-inherit pr-15 pl-15 justify-between lg:justify-start`,
  form: 'flex position-relative items-center',
  search: `nav__input-search border-0 w-0 text-md pt-5 pb-5 bg-gray-100 rounded-sm line-h line-h-xs`,
  navContainerRight: `position-absolute right-0 bg-gray-100 hidden lg:flex`,
  navBtnContainer: `flex items-center justify-start nav__container-menu lg:pr-10`,
  searchContainer: 'flex items-center justify-start',
  btnSearch: `flex items-center btn nav__btn nav__btn--search text-gray-200 hidden lg:flex`,
  btnSection: 'flex items-center btn nav__btn nav__btn--section p-5',
  iconSearch: 'nav__icon-search text-primary-color icon-search title-xs',
  iconMenu: 'nav__icon-menu icon-hamburguer title-sm',
  list: `flex items-center nav__list h-inherit overflow-hidden pl-15 hidden`,
  listItem: 'nav__list-item text-center pr-15 h-full',
  listLink: `nav__list-link text-gray-200 h-inherit flex items-center uppercase secondary-font font-normal text-sm`,
  logo: 'nav__logo',
  ads: 'nav__ads mr-5 ml-5 hidden',
  navContainerMobile: 'lg:hidden',
  btnContainer: 'flex items-center justify-end header__btn-container',
  btnLogin: 'nav__btn flex items-center btn', // Tiene lógica abajo
  btnSubscribe: `flex items-center btn hidden md:inline-block`,
  iconLogin: 'nav__icon icon-user',
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

@Consumer
class NavBarDefault extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      statusSidebar: false,
      statusSearch: false,
      scrolled: false,
    }
    // Resizer.setResizeListener()
    this.inputSearch = React.createRef()
  }

  componentDidMount() {
    const { device } = this.props
    // ------ Sets scroll eventListener if device is desktop
    if (device === 'desktop')
      window.addEventListener('scroll', this._handleScroll)
    else window.removeEventListener('scroll', this._handleScroll)
  }

  // Add - Remove Class active input and button search
  activeSearch = () => {
    const { statusSearch } = this.state
    return statusSearch ? 'active' : ''
  }

  // If input search is empty, buton close search else buton find search
  optionButtonClick = () => {
    const { statusSearch } = this.state
    return statusSearch
      ? this.findSearch
      : this._handleToggleSectionElements('statusSearch')
  }

  // Open search and automatic focus input
  focusInputSearch = () => {
    this.inputSearch.current.focus()
  }

  // set Query search and location replace
  findSearch = () => {
    const { value } = this.inputSearch.current
    if (value !== '') {
      // eslint-disable-next-line no-restricted-globals
      location.href = `/buscar?query=${value}`
    }
  }

  // Active find with enter key
  watchKeys = e => {
    e.preventDefault()
    const { value } = e.target
    if (value !== '' && e.which === 13) {
      this.findSearch()
    }
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
    const { scrollTop } = document.documentElement
    const header = Array.from(document.getElementsByTagName('header'))
    const headerTop = (header[0] && header[0].offsetTop) || 100
    // setTimeout(() => {
    //   console.log(header[0].offsetTop)
    // }, 2000)

    if (!scrolled && scrollTop > headerTop) {
      this.setState({
        scrolled: true,
      })
    } else if (scrolled && scrollTop <= headerTop) {
      this.setState({
        scrolled: false,
      })
    }
  }

  // Open - Close Search
  _handleToggleSectionElements = element => {
    // eslint-disable-next-line no-unused-vars
    return e => {
      const { statusSidebar, statusSearch } = this.state
      if (element === 'statusSearch') {
        if (statusSidebar) {
          this.toggleBodyOverflow()
          this.setState({
            statusSidebar: !statusSidebar,
          })
        }
        this.setState({
          statusSearch: !statusSearch,
        })
        this.focusInputSearch()
      } else if (element === 'statusSidebar') {
        if (statusSearch)
          this.setState({
            statusSearch: !statusSidebar,
          })
        this.toggleBodyOverflow()
        this.setState({
          statusSidebar: !statusSidebar,
        })
      }
    }
  }

  // Close Search
  _handleCloseSectionsSearch = () => {
    setTimeout(() => {
      this.setState({
        statusSearch: false,
      })
    }, 250)
  }

  render() {
    const { statusSidebar, scrolled } = this.state
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
      <nav
        className={`${classes.nav} ${
          scrolled ? 'active' : ''
        } ${responsiveClass}`}>
        <div
          className={`${classes.wrapper} ${scrolled ? 'justify-between' : ''}`}>
          {/** ************* LEFT *************** */}

          <div className={classes.navBtnContainer}>
            <Button
              iconClass={classes.iconMenu}
              btnClass={classes.btnSection}
              btnText="Menú"
              onClick={this._handleToggleSectionElements('statusSidebar')}
            />
          </div>

          {/** ************* MIDDLE *************** */}

          <ul className={`${classes.list} ${scrolled ? '' : 'lg:flex'}`}>
            {sections &&
              sections.slice(0, 5).map(({ name, _id: id }) => {
                return (
                  <li key={id} className={classes.listItem}>
                    <a href={id} className={classes.listLink}>
                      {name}
                    </a>
                  </li>
                )
              })}
          </ul>
          <a href="/">
            <img
              src={logo}
              alt={`Logo de ${arcSite}`}
              className={`${classes.logo}  ${
                scrolled ? 'lg:block' : 'lg:hidden'
              }`}
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
              <Button
                btnText="Iniciar Sesión"
                btnClass={`${classes.btnLogin} btn--outline`}
                btnLink="#"
              />
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
              <form className={classes.form} onSubmit={e => e.preventDefault()}>
                <input
                  ref={this.inputSearch}
                  type="search"
                  onBlur={this._handleCloseSectionsSearch}
                  onKeyUp={this.watchKeys}
                  placeholder="¿Que Buscas?"
                  className={`${classes.search} ${this.activeSearch()}`}
                />
                <Button
                  iconClass={classes.iconSearch}
                  btnClass={`${classes.btnSearch} ${this.activeSearch()}`}
                  onClick={this.optionButtonClick()}
                />
              </form>
            </div>
          </div>
          <div
            className={`${classes.btnContainer} ${classes.navContainerMobile} ${responsiveClass}`}>
            <Button
              iconClass={classes.iconLogin}
              btnClass={`${classes.btnLogin} border-1 border-solid border-white`}
              btnLink="#"
            />
          </div>
        </div>
        <Menu
          sections={sections}
          showSidebar={statusSidebar}
          contextPath={contextPath}
          siteProperties={siteProperties}
        />
      </nav>
    )
  }
}

export default NavBarDefault
