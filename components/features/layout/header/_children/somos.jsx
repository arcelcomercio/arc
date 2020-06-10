import React, { PureComponent } from 'react'
import getResponsiveClasses from '../../../../utilities/responsive-classes'
import searchQuery from '../../../../utilities/client/search'

// TODO: Agregar el click afuera del menu
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
          className={`header-somos bg-white flex justify-between items-center text-center w-full p-10 border-t-1 border-b-1 border-solid border-gray lg:pt-15 lg:pb-15 lg:pr-10 lg:pl-10 ${getResponsiveClasses(
            deviceList
          )}`}>
          <div className="header-somos__icon-wrapper lg:hidden">
            <button
              type="button"
              onClick={() => {
                this.setState({ isMenuActive: !isMenuActive })
              }}
              className="header-somos__btn">
              <i className="icon-menu header-somos__icon title-xl" />
            </button>
          </div>
          <div className="header-somos__img-wrapper flex-1">
            <a itemProp="url" href={logo.link} className="inline-block">
              <img
                className="header-somos__img block"
                src={logo.src}
                alt={logo.alt}
              />
            </a>
          </div>
          <div className="header-somos__logo-wrapper bg-black right-0 text-center flex justify-center items-center rounded lg:hidden">
            <a itemProp="url" href={logoIcon.link}>
              <i className="icon-marca title-xl text-white" />
            </a>
          </div>
        </div>

        <nav
          className={`somos-menu position-absolute bg-gray-300 w-0 top-0 left-0 h-full lg:h-auto lg:w-full ${
            isMenuActive ? 'somos-menu--active w-full' : ''
          } ${getResponsiveClasses(deviceList)}`}>
          <div className="somos-menu__content bg-black h-full overflow-y lg:w-full lg:text-center">
            <div className="somos-menu__close text-right w-full pt-15 pr-10 pl-10 lg:hidden">
              <button
                type="button"
                onClick={() => {
                  this.setState({ isMenuActive: !isMenuActive })
                }}>
                <i className="icon-close somos-menu__close-icon text-md text-white" />
              </button>
            </div>
            <div className="somos-menu__search position-relative pt-15 pr-10 pl-10 lg:hidden">
              <form action="" onSubmit={e => this.handleSubmit(e)}>
                <input
                  type="text"
                  placeholder="Buscar"
                  className="somos-menu__search-input bg-transparent text-white border-white w-full font-bold pr-10 pl-10 border-1 border-solid text-md"
                  defaultValue={search}
                  value={searchValue}
                  onChange={e => this.handleSearchInput(e)}
                />
                <button
                  className="somos-menu__search-icon text-white position-absolute text-md"
                  type="submit"
                  onClick={() => {}}>
                  <i className="icon-search" />
                </button>
              </form>
            </div>
            {/* <div className={classes.menuLogin}>
              <a itemProp="url" href="/" className={classes.menuLoginLink}>
                <i className={classes.menuLoginIcon} />
                <p itemProp="description" className={classes.menuLoginLabel}>Ingresa a tu cuenta</p>
              </a>
            </div> */}
            <ul className="somos-menu__list m-0 block pt-5 pb-5 pr-15 pl-15 lg:flex lg:flex lg:justify-evenly">
              <li className="somos-menu__item-link hidden lg:flex lg:items-center">
                <a
                  href={firstSection.url}
                  className="somos-menu__link-icon hidden text-gray-300 lg:block">
                  <i className="icon-home" />
                </a>
              </li>
              {sections.map(section => (
                <li className="somos-menu__item" key={section.url}>
                  <a
                    href={section.url}
                    className="somos-menu__link text-xl text-white pt-15 pb-15 inline-block w-full lg:flex lg:items-center">
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
