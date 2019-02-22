import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import Button from '../../../../resources/components/button'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const classes = FormatClassName({
  nav: ['flex-center-vertical', 'flex--justify-between', 'nav'],
  navButton: ['flex-center-vertical', 'btn', 'nav__btn'],
  navButtonIconSearch: ['icon', 'icon--search', 'icon--margin-right'],
  navButtonIconMenu: ['icon', 'icon--menu', 'icon--margin-right'],
  navButtonContainer: [
    'flex-center-vertical',
    'flex--justify-start',
    'flex-1',
    'nav__btn__container',
  ],
  navButtonFeatured: ['flex-center-vertical', 'btn', 'nav__btn--featured'],
  navList: ['flex-center', 'nav__list'],
  navLogo: ['nav__logo'],
  headerButtonContainer: [
    'flex-center-vertical',
    'flex--justify-end',
    'flex-1',
    'header__main__btn-container',
  ],
  headerBtnLogin: ['flex-center-vertical', 'btn', 'bg-color--white'],
  headerBtnSubscribe: ['flex-center-vertical', 'btn', 'bg-color--link'],
  headerBtnIconLogin: ['icon', 'icon--login', 'icon--margin-right'],
})

@Consumer
class Nav extends Component {
  constructor(props) {
    super(props)
    // ------ Checks the display to set the initial device state
    this.state = {
      device: this.setDevice(),
    }
  }

  componentDidMount() {
    this.addEventListener('displayChange', this.handleDevice)
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

  // ------ Sets the new device state when the listener is activated
  handleDevice = device => {
    this.setState({
      device,
    })
  }

  handleSections = ({ children: sections }) => {
    sections.map(section => {})
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

    fetched.then(response => this.handleSections(response))
  }

  render() {
    const { device } = this.state
    const { arcSite } = this.props

    return (
      <nav className={classes.nav}>
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
                btnLink="#"
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
              <Button
                iconClass={classes.navButtonIconMenu}
                btnClass={classes.navButton}
                btnText="Secciones"
                btnLink="#"
              />
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
          <li>Politica</li>
          <li>Deportes</li>
          <li>Mundo</li>
          <li>Economia</li>
          <li>Opinion</li>
        </ul>
        <img
          src="https://www.woodwing.com/sites/default/files/assets/cases-new/elcomercio_logo_white_2x-2.png"
          /* src={`${this.props.contextPath}/resources/dist/${this.props.arcSite}/images/logo.png`} */

          alt={`Logo de ${arcSite}`}
          className={classes.navLogo}
        />
        {device === 'desktop' && (
          <div className={classes.navButtonContainer}>
            <a className={classes.navButtonFeatured} href="#">
              ZONA EJECUTIVA
            </a>
            <a className={classes.navButtonFeatured} href="#">
              CONSTRUYE BIEN
            </a>
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
      </nav>
    )
  }
}

export default Nav
