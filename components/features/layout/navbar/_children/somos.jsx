import React, { PureComponent } from 'react'

// const classes = {}

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

  render() {
    const { isSearchActive, searchInputText } = this.state
    const initInputs = (
      <>
        <button type="button" className="navbar-somos__login-button">
          <i className="icon-user navbar-somos__icon-user" />
          <span>Ingresa a tu cuenta</span>
        </button>
        <button
          type="button"
          onClick={() => {
            this.toggleSearchInputs()
            setTimeout(() => this.searchInput.current.focus(), 50)
          }}>
          <i className="icon-search navbar-somos__icon" />
        </button>
      </>
    )
    const searchInputs = (
      <>
        <form action="">
          <input
            type="text"
            placeholder="QUÉ BUSCAS?"
            className="navbar-somos__search-input"
            value={searchInputText}
            onChange={e => this.handleSearchInput(e)}
            ref={this.searchInput}
          />
          <button type="submit" className="navbar-somos__search-button">
            <i className="icon-search" />
          </button>
        </form>
        <button
          type="button"
          className="navbar-somos__close-button"
          onClick={() => this.toggleSearchInputs()}>
          <i className="icon-close navbar-somos__icon" />
        </button>
      </>
    )

    return (
      <header className="navbar-somos">
        <a href="/" className="navbar-somos__logo-link">
          <i className="icon-back navbar-somos__icon" />
          <img
            className="navbar-somos__logo-img"
            src="https://img.elcomercio.pe/img/somos/logo_ec_w.png?1558370958"
            alt=""
          />
        </a>
        <div className="navbar-somos__box-right">
          {isSearchActive ? searchInputs : initInputs}
        </div>
      </header>
    )
  }
}

export default HeaderChildSomos
