import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import Button from '../../../../resources/components/button'
import NavSidebar from './_children/nav-sidebar'

const classes = {
  nav: `
    nav 
    flex 
    flex-center-vertical`,
  navWrapper: `
    flex-center-vertical 
    flex--justify-between 
    nav__wrapper 
    full-width 
    height-inherit 
    `,
  navForm: `nav__form flex`,
  navSearch: `nav__input-search`,
  navButton: `
    flex-center-vertical 
    btn nav__btn`,
  navButtonIconSearch: `
    icon icon--search`,
  navButtonIconMenu: `
    icon icon--menu 
    icon--margin-right`,
  navButtonContainer: `
    flex-center-vertical
    flex--justify-start
    height-inherit`,
  navList: `
    flex-center-vertical 
    flex--justify-start
    flex-1 
    nav__list 
    height-inherit`,
  navListItem: ` 
    height-inherit`,
  navListLink: `
    flex-center-vertical
    nav__list-link
    height-inherit`,
  navLogo: `
    nav__logo`,
  navAds: `
    nav__ads`,
  headerButtonContainer: `
    flex-center-vertical
    flex--justify-end
    header__main__btn-container`,
  headerBtnLogin: `
    flex-center-vertical 
    btn bg-color--white`,
  headerBtnSubscribe: `
    flex-center-vertical 
    btn 
    bg-color--link`,
  headerBtnIconLogin: `
    icon icon--login 
    icon--margin-right`,
}

@Consumer
class Nav extends Component {
  constructor(props) {
    super(props)
    // ------ Checks the display to set the initial device state
    this.state = {
      device: this.setDevice(),
      services: [],
      statusSidebar: false,
      statusSearch: false,
      scrolled: false,
    }
    this.inputSearch = React.createRef()
  }

  componentDidMount() {
    const { device } = this.state
    this.addEventListener('displayChange', this.handleDevice)

    // ------ Sets scroll eventListener if device is desktop
    if (device === 'desktop')
      window.addEventListener('scroll', this.handleScroll)
    this.fetch()
  }

  // ------ Sets the initial device state
  setDevice = () => {
    const wsize = window.innerWidth

    if (wsize < 640) {
      return 'mobile'
    }

    if (wsize >= 640 && wsize < 1024) {
      return 'tablet'
    }

    return 'desktop'
  }

  // Add - Remove Class active input and button search
  activeSearch = () => {
    return this.state.statusSearch ? 'active' : ''
  }

  // If input search is empty, buton close search else buton find search
  optionButtonClick = () => {
    const { statusSearch } = this.state
    return statusSearch ? this.foundSearch : this.handleToggleSectionsSearch
  }

  // Open search and automatic focus input
  focusInputSearch = () => {
    this.inputSearch.current.focus()
  }

  // set Query search and location replace
  foundSearch = () => {
    const { value } = this.inputSearch.current
    location.href = `${location.pathname}?query=${value}`
  }

  // Active find with enter key
  watchKeys = e => {
    e.preventDefault()
    const { value } = e.target
    if (value !== '' && e.which === 13) {
      this.foundSearch()
    }
  }

  handleScroll = () => {
    const { scrolled } = this.state

    // ------ Logic to set state to hide or show logo in navbar
    const { scrollTop } = document.documentElement

    if (!scrolled && scrollTop > 100) {
      this.setState({
        scrolled: true,
      })
    } else if (scrolled && scrollTop <= 100)
      this.setState({
        scrolled: false,
      })
  }

  // Open - Close Search
  handleToggleSectionsSearch = () => {
    const { statusSidebar } = this.state

    if (statusSidebar) {
      this.setState({
        statusSidebar: !this.state.statusSidebar,
      })
    }

    this.setState({
      statusSearch: !this.state.statusSearch,
    })

    this.focusInputSearch()
  }

  // Close Search
  handleCloseSectionsSearch = () => {
    setTimeout(() => {
      this.setState({
        statusSearch: false,
      })
    }, 100)
  }

  // ------ Sets the new device state when the listener is activated
  handleDevice = device => {
    this.setState({
      device,
    })
    // ------ Add or remove Scroll eventListener on resize
    if (device === 'desktop')
      window.addEventListener('scroll', this.handleScroll)
    else window.removeEventListener('scroll', this.handleScroll)
  }

  // Open - Close navBar
  handleToggleSectionsSidebar = () => {
    const { statusSearch, statusSidebar } = this.state

    if (statusSearch) {
      this.setState({
        statusSearch: !statusSidebar,
      })
    }
    this.setState({
      statusSidebar: !statusSidebar,
    })
  }

  // ------ Fetchs the sections data from site-navigation API
  fetch() {
    const { arcSite } = this.props

    const source = 'section__by-hierarchy'
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

    fetched.then(response => {
      this.setState({
        services: response,
      })
    })
  }

  render() {
    const {
      device,
      services: { children: sections },
      statusSidebar,
      scrolled,
    } = this.state
    const { arcSite } = this.props

    return (
      <nav className={classes.nav}>
        <div className={classes.navWrapper}>
          {/** ************* LEFT *************** */}

          <div className={classes.navButtonContainer}>
            {device === 'desktop' && (
              <Fragment>
                <form className={classes.navForm}>
                  <input
                    ref={this.inputSearch}
                    type="search"
                    onBlur={this.handleCloseSectionsSearch}
                    onKeyUp={this.watchKeys}
                    placeholder="Buscar"
                    className={`${classes.navSearch} ${this.activeSearch()}`}
                  />
                  <Button
                    iconClass={classes.navButtonIconSearch}
                    btnClass={`${classes.navButton.concat(
                      ' nav__btn--search'
                    )} ${this.activeSearch()}`}
                    onClick={this.optionButtonClick()}
                  />
                </form>
                <Button
                  iconClass={classes.navButtonIconMenu}
                  btnClass={classes.navButton}
                  btnText="Secciones"
                  onClick={this.handleToggleSectionsSidebar}
                />
              </Fragment>
            )}
            {device === 'tablet' && (
              <Fragment>
                <Button
                  iconClass={classes.navButtonIconSearch.replace(
                    'icon--margin-right',
                    ''
                  )}
                  btnClass={classes.navButton}
                  btnLink="#"
                />
                <button type="button" onClick={this.test}>
                  Test
                </button>
              </Fragment>
            )}
            {device === 'mobile' && (
              <Button
                iconClass={classes.navButtonIconMenu.replace(
                  'icon--margin-right',
                  ''
                )}
                btnClass={classes.navButton}
                btnLink="#"
              />
            )}
          </div>

          {/** ************* MIDDLE *************** */}

          <ul className={`${classes.navList} ${scrolled ? '' : 'active'}`}>
            {sections
              ? sections.map((item, key) => {
                  return (
                    <li key={key} className={classes.navListItem}>
                      <a href={item._id} className={classes.navListLink}>
                        {item.name}
                      </a>
                    </li>
                  )
                })
              : null}
          </ul>
          <img
            src="https://www.woodwing.com/sites/default/files/assets/cases-new/elcomercio_logo_white_2x-2.png"
            /* src={`${this.props.contextPath}/resources/dist/${this.props.arcSite}/images/logo.png`} */
            alt={`Logo de ${arcSite}`}
            className={`${classes.navLogo}  ${scrolled ? 'active' : ''}`}
          />

          {/** ************* RIGHT *************** */}

          {device === 'desktop' && (
            <div className={classes.navButtonContainer}>
              <div id="ads_d_zocaloNav1" className={classes.navAds} />
              <div id="ads_d_zocaloNav2" className={classes.navAds} />
            </div>
          )}
          {device === 'tablet' && (
            <div className={classes.headerButtonContainer}>
              <Button
                iconClass={classes.headerBtnIconLogin.replace(
                  'icon--margin-right',
                  ''
                )}
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
          {device === 'mobile' && (
            <div className={classes.headerButtonContainer}>
              <Button
                iconClass={classes.headerBtnIconLogin.replace(
                  'icon--margin-right',
                  ''
                )}
                btnClass={classes.headerBtnLogin}
                btnLink="#"
              />
            </div>
          )}
        </div>
        <NavSidebar sections={sections} showSidebar={statusSidebar} />
      </nav>
    )
  }
}

export default Nav
