import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import Button from '../../../../global-components/button'
import Menu from './menu'
import Ads from '../../../../global-components/ads'

const classes = {
  nav: 'nav text-sm full-width flex flex-center-vertical',
  wrapper:
    'flex-center-vertical flex--justify-between nav__wrapper full-width height-inherit',
  form: 'flex position-relative',
  search: 'nav__input-search text-md',
  navBtnContainer:
    'flex-center-vertical flex--justify-start nav__container-menu',
  searchContainer: 'flex-center-vertical flex--justify-start',
  btnSearch: 'flex-center-vertical btn nav__btn nav__btn--search',
  btnSection: 'flex-center-vertical btn nav__btn nav__btn--section',
  iconSerch: 'nav__icon-search icon-search title-lg',
  iconMenu: 'nav__icon-menu icon-hamburguer',
  list:
    'flex-center-vertical flex--justify-evenly flex-1 nav__list height-inherit overflow-hidden pd-right-5 pd-left-5',
  listItem: 'text-center',
  listLink: 'nav__list-link text-center text-uppercase',
  logo: 'nav__logo',
  ads: 'nav__ads',
  btnContainer: 'flex-center-vertical flex--justify-end header__btn-container',
  btnLogin: 'flex-center-vertical btn btn--outline btn__login',
  btnSubscribe: 'flex-center-vertical btn btn--outline nav__header-sub',
  iconLogin: 'icon icon-user',
}

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
    const { contextPath } = this.props
    const { value } = this.inputSearch.current
    if (value !== '') {
      // eslint-disable-next-line no-restricted-globals
      location.href = `${contextPath}/buscar?query=${value}`
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

  _handleDevice = device => {
    this._handleScroll()
    // ------ Add or remove Scroll eventListener on resize
    if (device === 'desktop')
      window.addEventListener('scroll', this._handleScroll)
    else window.removeEventListener('scroll', this._handleScroll)
  }

  _handleScroll = () => {
    const { scrolled } = this.state

    // ------ Logic to set state to hide or show logo in navbar
    const { scrollTop } = document.documentElement

    if (!scrolled && scrollTop > 100) {
      this.setState({
        scrolled: true,
      })
    } else if (scrolled && scrollTop <= 100) {
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
        if (statusSidebar)
          this.setState({
            statusSidebar: !statusSidebar,
          })
        this.setState({
          statusSearch: !statusSearch,
        })
        this.focusInputSearch()
      } else if (element === 'statusSidebar') {
        if (statusSearch)
          this.setState({
            statusSearch: !statusSidebar,
          })
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
    }, 1000)
  }

  render() {
    const { statusSidebar, scrolled } = this.state
    const {
      logo,
      arcSite,
      contextPath,
      requestUri,
      device,
      deviceList,
      data: { children: sections = [] } = {},
    } = this.props
    const querys = requestUri.split('?')[1]
    const queryString = querys !== undefined ? `?${querys}` : ''

    this._handleDevice(device)

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
        <nav className={`${classes.nav} ${scrolled ? 'active' : ''}`}>
          <div className={classes.wrapper}>
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

            <ul className={`${classes.list} ${scrolled ? '' : 'active'}`}>
              {sections &&
                sections.slice(0, 5).map(({ name, _id: id }) => {
                  return (
                    <li key={id} className={classes.listItem}>
                      <a
                        href={`${contextPath}${id}`}
                        className={classes.listLink}>
                        {name}
                      </a>
                    </li>
                  )
                })}
            </ul>
            <a href={`${contextPath}/${queryString}`}>
              <img
                src={logo}
                alt={`Logo de ${arcSite}`}
                className={`${classes.logo}  ${scrolled ? 'active' : ''}`}
              />
            </a>
            {/** ************* RIGHT *************** */}

            {device && device === 'desktop' && !scrolled ? (
              <>
                <div className={classes.btnContainer}>
                  <Button
                    btnText="Suscríbete"
                    btnClass={classes.btnSubscribe}
                    btnLink="#"
                  />
                  <Button
                    btnText="Iniciar Sesión"
                    btnClass={classes.btnLogin}
                    btnLink="#"
                  />
                </div>
                <div className={classes.searchContainer}>
                  <Ads
                    adElement="zocaloNav1"
                    isDesktop
                    classes={{ desktop: classes.ads }}
                  />
                  {/* <Ads
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
                      onBlur={this._handleCloseSectionsSearch}
                      onKeyUp={this.watchKeys}
                      placeholder="Buscar"
                      className={`${classes.search} ${this.activeSearch()}`}
                    />
                    <Button
                      iconClass={classes.iconSerch}
                      btnClass={`${classes.btnSearch} ${this.activeSearch()}`}
                      onClick={this.optionButtonClick()}
                    />
                  </form>
                </div>
              </>
            ) : (
              <div className={classes.btnContainer}>
                <Button
                  iconClass={classes.iconLogin}
                  btnClass={classes.btnLogin}
                  btnLink="#"
                />
              </div>
            )}
          </div>
          <Menu
            sections={sections}
            showSidebar={statusSidebar}
            contextPath={contextPath}
          />
        </nav>
      )
    )
  }
}

export default NavBarDefault
