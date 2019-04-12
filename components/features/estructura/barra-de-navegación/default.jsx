import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import Button from '../../../../resources/components/button'
import NavSidebar from './_children/nav-sidebar'
import { setDevice } from '../../../../resources/utilsJs/resizer'
import Ads from '../../../../resources/components/ads'

const classes = {
  nav: 'nav full-width flex flex-center-vertical',
  navWrapper:
    'flex-center-vertical flex--justify-between nav__wrapper full-width height-inherit',
  navForm: 'nav__form flex',
  navSearch: 'nav__input-search',
  navBtnContainer: 'flex-center-vertical flex--justify-start height-inherit',
  navBtnSearch: 'flex-center-vertical btn nav__btn nav__btn--search',
  navBtnSection: 'flex-center-vertical btn nav__btn nav__btn--section',
  navBtnIconSearch: 'icon icon--search',
  navBtnIconMenu: 'icon icon--menu',
  navList:
    'flex-center-vertical flex--justify-start flex-1 nav__list height-inherit',
  navListItem: 'height-inherit',
  navListLink: 'flex-center-vertical nav__list-link height-inherit',
  navLogo: 'nav__logo',
  navAds: 'nav__ads',
  headerBtnContainer:
    'flex-center-vertical flex--justify-end header__btn-container',
  headerBtnLogin: 'flex-center-vertical btn bg-color--white nav__header-login',
  headerBtnSubscribe: 'flex-center-vertical btn bg-color--link nav__header-sub',
  headerBtnIconLogin: 'icon icon--login',
}

@Consumer
class Nav extends Component {
  constructor(props) {
    super(props)
    // ------ Checks the display to set the initial device state
    this.state = {
      device: setDevice(),
      services: {},
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
    this.fetch()
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
      location.href = `${contextPath}/buscar?query=${value}&_website=elcomercio`
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

  // ------ Fetchs the sections data from site-navigation API
  fetch() {
    const { arcSite } = this.props

    const source = 'navigation-by-hierarchy'
    const params = {
      website: arcSite,
      hierarchy: 'navbar-header-sections',
    }

    const schema = `{
        children {
            name
            _id
            children {
                name
                _id
                children {
                    name
                    _id
                    children {
                        name
                        _id
                    }
                } 
            }
        }
    }
    `

    const { fetched } = this.getContent(source, params, schema)
    fetched
      .then(response => {
        this.setState({
          services: response || {},
        })
      })
      .catch(e => console.log(e))
  }

  render() {
    const {
      device,
      services: { children: sections = [] } = {},
      statusSidebar,
      scrolled,
    } = this.state
    const { arcSite, contextPath, requestUri } = this.props
    const querys = requestUri.split('?')[1]
    const queryString = querys !== undefined ? `?${querys}` : ''
    return (
      <nav className={classes.nav}>
        <div className={classes.navWrapper}>
          {/** ************* LEFT *************** */}

          <div className={classes.navBtnContainer}>
            <Fragment>
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
              <Button
                iconClass={classes.navBtnIconMenu}
                btnClass={classes.navBtnSection}
                btnText="Secciones"
                onClick={this._handleToggleSectionsElement('statusSidebar')}
              />
            </Fragment>
          </div>

          {/** ************* MIDDLE *************** */}

          <ul className={`${classes.navList} ${scrolled ? '' : 'active'}`}>
            {sections &&
              sections.slice(0, 5).map(({ name, _id: id }) => {
                return (
                  <li key={id} className={classes.navListItem}>
                    <a href={id} className={classes.navListLink}>
                      {name}
                    </a>
                  </li>
                )
              })}
          </ul>
          <a href={`${contextPath || ''}/${queryString}`}>
            <img
              src="https://www.woodwing.com/sites/default/files/assets/cases-new/elcomercio_logo_white_2x-2.png"
              /* src={`${this.props.contextPath}/resources/dist/${this.props.arcSite}/images/logo.png`} */
              alt={`Logo de ${arcSite}`}
              className={`${classes.navLogo}  ${scrolled ? 'active' : ''}`}
            />
          </a>
          {/** ************* RIGHT *************** */}

          {device === 'desktop' ? (
            <div className={classes.navBtnContainer}>
              <Ads
                adElement="zocaloNav1"
                isDesktop
                classes={{ desktop: classes.navAds }}
              />
              <Ads
                adElement="zocaloNav2"
                isDesktop
                classes={{ desktop: classes.navAds }}
              />
            </div>
          ) : (
            <div className={classes.headerBtnContainer}>
              <Button
                iconClass={classes.headerBtnIconLogin}
                btnClass={classes.headerBtnLogin}
                btnLink="#"
              />
              <Button
                btnText="Suscríbete"
                btnClass={classes.headerBtnSubscribe}
                btnLink="#"
              />
            </div>
          )}
        </div>
        <NavSidebar sections={sections} showSidebar={statusSidebar} contextPath={contextPath} />
      </nav>
    )
  }
}

export default Nav
