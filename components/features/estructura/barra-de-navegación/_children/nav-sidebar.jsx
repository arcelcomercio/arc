import React, { Component, Fragment } from 'react'
import Button from '../../../../../resources/components/button'

const classes = {
  navSidebar: `
    nav-sidebar 
    full-width`,
  navSidebarContent: `
  	nav-sidebar__content
    flex
    flex--column
    flex--justify-between`,
  navBarBtn: `
    flex-center 
    btn bg-color--white 
    nav-sidebar__btn`,
}

class NavSidebar extends Component {
  constructor(props) {
    super(props)
    this.inputSearchMovil = React.createRef()
  }

  submitSearch = () => {
    const { value } = this.inputSearchMovil.current
    if (value !== '') {
      // eslint-disable-next-line no-restricted-globals
      location.href = `${location.pathname}?query=${value}`
    }
  }

  renderSections = sections => {
    return (
      sections &&
      sections.map(({ name = '', _id: id = '', children }) => (
        <Fragment>
          <li key={id} className="nav-sidebar__item">
            <a href={id} className="nav-sidebar__link">
              {name}
            </a>
          </li>
          {children && this.renderSections(children)}
        </Fragment>
      ))
    )
  }

  render() {
    const { sections = [], showSidebar } = this.props

    return (
      <div className={`${classes.navSidebar} ${showSidebar ? 'active' : ''}`}>
        <div
          className={`${classes.navSidebarContent} ${
            showSidebar ? 'active' : ''
          }`}>
          <div className="nav-sidebar__top">
            <div className="nav-sidebar__header">
              <div className="nav-sidebar__box-btn">
                <Button
                  btnClass={classes.navBarBtn}
                  btnLink="#"
                  btnText="Suscríbete"
                />
              </div>
            </div>
            <div className="nav-sidebar__search">
              <form
                className="nav-sidebar__box-search"
                onSubmit={e => {
                  e.preventDefault()
                  this.submitSearch()
                }}>
                <input
                  ref={this.inputSearchMovil}
                  type="search"
                  // onBlur={this.handleCloseSectionsSearch}
                  placeholder="Buscar"
                  className="nav-sidebar__input"
                />
              </form>
            </div>
            <div className="nav-sidebar__body">
              <ul className="nav-sidebar__list">
                {sections && this.renderSections(sections)}
              </ul>
            </div>
          </div>
          <div className="nav-sidebar__footer">
            <a href="/" className="nav-sidebar__text">
              elcomercio.pe
            </a>
            <a href="/" className="nav-sidebar__text">
              1984-2019 Grupo El Comercio
            </a>
            <a href="/" className="nav-sidebar__text">
              Términos de Servicio
            </a>
            <a href="/" className="nav-sidebar__text">
              Políticas de Privacidad
            </a>
            <a href="/" className="nav-sidebar__text">
              Políticas de Discusión
            </a>
            <a href="/" className="nav-sidebar__text">
              RSS Términos de Servicio
            </a>
            <a href="/" className="nav-sidebar__text">
              Preferencias de Publicidad
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default NavSidebar
