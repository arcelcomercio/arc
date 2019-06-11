import React, { PureComponent } from 'react'

const classes = {
  navbarSomos: 'navbar-somos flex items-center justify-between',
  logoLink: 'full-height flex items-center',
  logoIcon: 'icon-back navbar-somos__icon font-bold',
  logoImg: 'navbar-somos__logo-img',
  boxRight: 'full-height flex items-center',
  loginButton:
    'navbar-somos__login-button font-bold uppercase flex items-center',
  iconUser: 'icon-user navbar-somos__icon-user',
  searchIcon: 'icon-search navbar-somos__icon',
  searchInput: 'navbar-somos__search-input',
  searchButton: 'navbar-somos__search-button',
  closeButton: 'navbar-somos__close-button',
  closeIcon: 'icon-close navbar-somos__icon',
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
    const { searchUrl } = this.props
    searchUrl(searchInputText)
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
        <form onSubmit={e => this.handleSubmit(e)}>
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
