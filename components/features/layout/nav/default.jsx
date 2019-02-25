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
    height-inherit`,
  navButton: `
    flex-center-vertical 
    btn nav__btn`,
  navButtonIconSearch: `
    icon icon--search 
    icon--margin-right`,
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
    }

    this.handleOpenSectionsSidebar = this.handleOpenSectionsSidebar.bind(this)
  }

  componentDidMount() {
    this.addEventListener('displayChange', this.handleDevice)
    this.fetch()
  }

  handleOpenSectionsSidebar = () => {
    const { statusSidebar } = this.state
    this.setState({
      statusSidebar: !statusSidebar,
    })
    console.log(statusSidebar)
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

  // ------ Sets the new device state when the listener is activated
  handleDevice = device => {
    this.setState({
      device,
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
    } = this.state
    const { arcSite } = this.props

    return (
      <nav className={classes.nav}>
        <div className={classes.navWrapper}>
          <div className={classes.navButtonContainer}>
            {device === 'desktop' && (
              <Fragment>
                <Button
                  iconClass={classes.navButtonIconSearch}
                  btnClass={classes.navButton}
                  btnText="Buscar"
                  btnLink="#"
                />
                <Button
                  iconClass={classes.navButtonIconMenu}
                  btnClass={classes.navButton}
                  btnText="Secciones"
                  onClick={this.handleOpenSectionsSidebar}
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
                {/* <Button
                  iconClass={classes.navButtonIconMenu}
                  btnClass={classes.navButton}
                  btnText="Secciones"
                  btnLink="#"
                /> */}
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
          <ul className={classes.navList}>
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
            className={classes.navLogo}
          />
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
