import React, { PureComponent } from 'react'
import searchQuery from '../../../../utilities/client/search'
import SignwallComponent from '../../../signwall/main/default'
import Button from '../../../../global-components/button'

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
    const {
      logo,
      link,
      alt,
      device,
      showInDesktop,
      showInTablet,
      showInMobile,
    } = this.props
    const initInputs = (
      <>
        <Button
          btnText="Suscríbete"
          btnClass="navbar-somos__btn-subs flex items-center btn capitalize text-md"
          btnLink="https://elcomercio.pe/suscripciones/?ref=btn-suscribete-elcomercio&loc=somos"
        />

        <SignwallComponent classButton="navbar-somos__btn-sign flex items-center btn capitalize text-md" />

        <button
          className="hidden md:block"
          type="button"
          onClick={() => {
            this.toggleSearchInputs()
            setTimeout(() => this.searchInput.current.focus(), 50)
          }}>
          <i className="icon-search navbar-somos__icon font-bold text-white" />
        </button>
      </>
    )
    const searchInputs = (
      <>
        <form className="hidden md:flex" onSubmit={e => this.handleSubmit(e)}>
          <input
            type="search"
            placeholder="¿QUÉ BUSCAS?"
            className="navbar-somos__search-input primary-font font-bold text-md pt-0 pb-0 pr-10 pl-10 border-0"
            value={searchInputText}
            onChange={e => this.handleSearchInput(e)}
            ref={this.searchInput}
          />
          <button
            type="submit"
            className="navbar-somos__search-button bg-white border-0">
            <i className="icon-search" />
          </button>
        </form>
        <button
          type="button"
          className="navbar-somos__close-button hidden md:block"
          onClick={() => this.toggleSearchInputs()}>
          <i className="icon-close navbar-somos__icon font-bold text-white" />
        </button>
      </>
    )

    const _handleHide = () => {
      switch (device) {
        case 'desktop':
          return showInDesktop

        case 'tablet':
          return showInTablet

        case 'mobile':
          return showInMobile

        default:
          return true
      }
    }
    return (
      _handleHide() && (
        <header className="navbar-somos bg-black flex items-center justify-between pt-0 pb-0 pr-10 pl-10">
          <a href={link} className="h-full flex items-center">
            <i className="icon-back navbar-somos__icon font-bold text-white" />
            <img
              className="navbar-somos__logo-img ml-10"
              src={logo}
              alt={alt}
            />
          </a>
          <div
            className="h-full flex items-center"
            role={isSearchActive ? 'search' : 'section'}>
            {isSearchActive ? searchInputs : initInputs}
          </div>
        </header>
      )
    )
  }
}

export default HeaderChildSomos
