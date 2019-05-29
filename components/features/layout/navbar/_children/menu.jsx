import React, { PureComponent } from 'react'
import Button from '../../../../global-components/button'

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
  renderItem: 'nav-sidebar__item',
  renderItemLink: 'nav-sidebar__link',
  navSidebarTop: 'nav-sidebar__top',
  navHeader: 'nav-sidebar__header',
  navBox: 'nav-sidebar__box-btn',
  navSearch: 'nav-sidebar__search',
  navForm: 'nav-sidebar__box-search',
  navFormInput: 'nav-sidebar__input',
  navSidebarBody: 'nav-sidebar__body',
  navList: 'nav- sidebar__list',
  navFooter: 'nav-sidebar__footer',
  navText: 'nav-sidebar__text',
}

class NavbarChildMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.inputSearchMovil = React.createRef()
  }

  submitSearch = () => {
    const { contextPath } = this.props
    const { value } = this.inputSearchMovil.current
    if (value !== '') {
      // eslint-disable-next-line no-restricted-globals
      location.href = `${contextPath}/buscar?query=${value}`
    }
  }

  renderSections = sections => {
    const { contextPath } = this.props
    return (
      sections &&
      sections.map(({ name = '', _id: id = '', children }) => (
        < key={id}>
          <li className={classes.renderItem}>
            <a href={`${contextPath}${id}`} className={classes.renderItemLink}>
              {name}
            </a>
          </li>
          {children && this.renderSections(children)}
        </>
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
          <div className={classes.navSidebarTop}>
            <div className={classes.navHeader}>
              <div className={classes.navBox}>
                <Button
                  btnClass={classes.navBarBtn}
                  btnLink="#"
                  btnText="Suscríbete"
                />
              </div>
            </div>
            <div className={classes.navSearch}>
              <form
                className={classes.navForm}
                onSubmit={e => {
                  e.preventDefault()
                  this.submitSearch()
                }}>
                <input
                  ref={this.inputSearchMovil}
                  type="search"
                  // onBlur={this.handleCloseSectionsSearch}
                  placeholder="Buscar"
                  className={classes.navFormInput}
                />
              </form>
            </div>
            <div className={classes.navSidebarBody}>
              <ul className={classes.navList}>
                {sections && this.renderSections(sections)}
              </ul>
            </div>
          </div>
          <div className={classes.navFooter}>
            <a href="/" className={classes.navText}>
              elcomercio.pe
            </a>
            <a href="/" className={classes.navText}>
              1984-2019 Grupo El Comercio
            </a>
            <a href="/" className={classes.navText}>
              Términos de Servicio
            </a>
            <a href="/" className={classes.navText}>
              Políticas de Privacidad
            </a>
            <a href="/" className={classes.navText}>
              Políticas de Discusión
            </a>
            <a href="/" className={classes.navText}>
              RSS Términos de Servicio
            </a>
            <a href="/" className={classes.navText}>
              Preferencias de Publicidad
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default NavbarChildMenu
