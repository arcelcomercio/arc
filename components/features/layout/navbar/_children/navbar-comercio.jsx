import Consumer from 'fusion:consumer'
import React, { PureComponent, Fragment } from 'react'
import Button from '../../../../global-components/button'
import Menu from './menu'
import { setDevice } from '../../../../utilities/resizer'
import Ads from '../../../../global-components/ads'

const classes = {
  nav: 'nav full-width flex flex-center-vertical',
  navWrapper:
    'flex-center-vertical flex--justify-between nav__wrapper full-width height-inherit',
  navForm: 'nav__form flex',
  navSearch: 'nav__input-search',
  navBtnContainer:
    'flex-center-vertical flex--justify-start nav__container-menu',
  navSearchContainer: 'flex-center-vertical flex--justify-start',
  navBtnSearch: 'flex-center-vertical btn nav__btn nav__btn--search',
  navBtnSection: 'flex-center-vertical btn nav__btn nav__btn--section',
  navBtnIconSearch: 'nav__icon-search icon-search',
  navBtnIconMenu: 'nav__icon-menu icon-hamburguer',
  navList: 'flex-center-vertical flex--justify-between flex-1 nav__list height-inherit',
  navListItem: 'nav__list-item',
  navListLink: 'nav__list-link',
  navLogo: 'nav__logo',
  navAds: 'nav__ads',
  headerBtnContainer:
    'flex-center-vertical flex--justify-end header__btn-container',
  headerBtnLogin: 'flex-center-vertical btn btn--outline',
  headerBtnSubscribe:
    'flex-center-vertical btn btn--outline nav__header-sub',
  headerBtnIconLogin: 'icon icon-user',
}

@Consumer
class NavBarDefault extends PureComponent {
  constructor(props) {
    super(props)
    const { data } = this.props
    this.state = {
      device: setDevice(),
      services: data,
      statusSidebar: false,
      statusSearch: false,
      scrolled: false,
    }
    // Resizer.setResizeListener()
    this.inputSearch = React.createRef()
  }

  componentDidMount() {
    const { device } = this.state
    this.addEventListener('displayChange', this._handleDevice)

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
      : this._handleToggleSectionsElement('statusSearch')
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
  _handleToggleSectionsElement = element => {
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

  // ------ Sets the new device state when the listener is activated
  _handleDevice = device => {
    this.setState({
      device,
    })
    this._handleScroll()
    // ------ Add or remove Scroll eventListener on resize
    if (device === 'desktop')
      window.addEventListener('scroll', this._handleScroll)
    else window.removeEventListener('scroll', this._handleScroll)
  }

  render() {
    const {
      device,
      services: { children: sections = [] } = {},
      statusSidebar,
      scrolled,
    } = this.state
    const { logo, arcSite, contextPath, requestUri } = this.props
    const querys = requestUri.split('?')[1]
    const queryString = querys !== undefined ? `?${querys}` : ''
    return (
      <nav className={`${classes.nav} ${scrolled ? 'active' : ''}`}>
        <div className={classes.navWrapper}>
          {/** ************* LEFT *************** */}

          <div className={classes.navBtnContainer}>
            <Button
              iconClass={classes.navBtnIconMenu}
              btnClass={classes.navBtnSection}
              btnText="Menú"
              onClick={this._handleToggleSectionsElement('statusSidebar')}
            />
          </div>

          {/** ************* MIDDLE *************** */}

          <ul className={`${classes.navList} ${scrolled ? '' : 'active'}`}>
            {sections &&
              sections.slice(0, 5).map(({ name, _id: id }) => {
                return (
                  <li key={id} className={classes.navListItem}>
                    <a
                      href={`${contextPath}${id}`}
                      className={classes.navListLink}>
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
              className={`${classes.navLogo}  ${scrolled ? 'active' : ''}`}
            />
          </a>
          {/** ************* RIGHT *************** */}

          {device && device === 'desktop' && !scrolled ? (
            <Fragment>
              <div className={classes.headerBtnContainer}>
                <Button
                  btnText="Suscríbete"
                  btnClass={classes.headerBtnSubscribe}
                  btnLink="#"
                />
                <Button
                  btnText="Iniciar Sesión"
                  btnClass={classes.headerBtnLogin}
                  btnLink="#"
                />
              </div>
              <div className={classes.navSearchContainer}>
                <Ads
                  adElement="zocaloNav1"
                  isDesktop
                  classes={{ desktop: classes.navAds }}
                />
                {/* <Ads
                  adElement="zocaloNav2"
                  isDesktop
                  classes={{ desktop: classes.navAds }}
                /> */}
                <form
                  className={classes.navForm}
                  onSubmit={e => e.preventDefault()}>
                  <input
                    ref={this.inputSearch}
                    type="search"
                    onBlur={this._handleCloseSectionsSearch}
                    onKeyUp={this.watchKeys}
                    placeholder="Buscar"
                    className={`${classes.navSearch} ${this.activeSearch()}`}
                  />
                  <Button
                    iconClass={classes.navBtnIconSearch}
                    btnClass={`${classes.navBtnSearch} ${this.activeSearch()}`}
                    onClick={this.optionButtonClick()}
                  />
                </form>
              </div>
            </Fragment>
          ) : (
            <div className={classes.headerBtnContainer}>
              <Button
                iconClass={classes.headerBtnIconLogin}
                btnClass={classes.headerBtnLogin}
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
  }
}

export default NavBarDefault
