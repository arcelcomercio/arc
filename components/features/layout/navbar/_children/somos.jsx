import React, { PureComponent } from 'react'
import { searchQuery } from '../../../../utilities/helpers'

const classes = {
  navbarSomos:
    'navbar-somos bg-black flex items-center justify-between pt-0 pb-0 pr-10 pl-10',
  logoLink: 'h-full flex items-center',
  logoIcon: 'icon-back navbar-somos__icon font-bold text-white',
  logoImg: 'navbar-somos__logo-img ml-10',
  boxRight: 'h-full flex items-center',
  loginButton:
    'navbar-somos__login-button font-bold uppercase flex items-center primary-font text-sm pt-0 pb-0 pr-15 pl-15 text-white',
  iconUser: 'icon-user navbar-somos__icon-user mr-5',
  searchIcon: 'icon-search navbar-somos__icon font-bold text-white',
  searchInput:
    'navbar-somos__search-input primary-font font-bold text-md pt-0 pb-0 pr-10 pl-10 border-0',
  searchButton: 'navbar-somos__search-button bg-white border-0',
  closeButton: 'navbar-somos__close-button hidden md:block',
  closeIcon: 'icon-close navbar-somos__icon font-bold text-white',
  searchInputIcon: 'icon-search',
}

class HeaderChildSomos extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isSearchActive: false,
      searchInputText: '',
    }
    this.searchInput = React.createRef()
  }

  toggleSearchInputs() {
    const { isSearchActive } = this.state
    this.setState({ isSearchActive: !isSearchActive })
  }

  handleSearchInput(e) {
    this.setState({ searchInputText: e.target.value })
  }

  handleSubmit(e) {
    const { searchInputText } = this.state
    searchQuery(searchInputText)
    e.preventDefault()
  }

  render() {
    const { isSearchActive, searchInputText } = this.state
    const { back: { logo, link, alt } = {}, device, deviceList } = this.props
    const initInputs = (
      <>
        <button type="button" className={classes.loginButton}>
          <i className={classes.iconUser} />
          Ingresa a tu cuenta
        </button>
        <button
          className="hidden md:block"
          type="button"
          onClick={() => {
            this.toggleSearchInputs()
            setTimeout(() => this.searchInput.current.focus(), 50)
          }}>
          <i className={classes.searchIcon} />
        </button>
      </>
    )
    const searchInputs = (
      <>
        <form className="hidden md:block" onSubmit={e => this.handleSubmit(e)}>
          <input
            type="search"
            placeholder="¿QUÉ BUSCAS?"
            className={classes.searchInput}
            value={searchInputText}
            onChange={e => this.handleSearchInput(e)}
            ref={this.searchInput}
          />
          <button type="submit" className={classes.searchButton}>
            <i className={classes.searchInputIcon} />
          </button>
        </form>
        <button
          type="button"
          className={classes.closeButton}
          onClick={() => this.toggleSearchInputs()}>
          <i className={classes.closeIcon} />
        </button>
      </>
    )

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
        <header className={classes.navbarSomos}>
          <a href={link} className={classes.logoLink}>
            <i className={classes.logoIcon} />
            <img className={classes.logoImg} src={logo} alt={alt} />
          </a>
          <div
            className={classes.boxRight}
            role={isSearchActive ? 'search' : 'section'}>
            {isSearchActive ? searchInputs : initInputs}
          </div>
        </header>
      )
    )
  }
}

export default HeaderChildSomos
