import React, { PureComponent } from 'react'
import Button from '../../../../global-components/button'

const classes = {
  sidebar: 'nav-sidebar bottom-0 position-absolute w-full overflow-hidden',
  content:
    'nav-sidebar__content flex flex-col justify-between h-full scroll-vertical',
  item: 'nav-sidebar__item position-relative',
  link: 'nav-sidebar__link block',
  top: 'nav-sidebar__top',
  header: 'nav-sidebar__header',
  btnBox: 'nav-sidebar__box-btn',
  btn: 'flex items-center justify-center btn bg-color--white nav-sidebar__btn',
  search: 'nav-sidebar__search block',
  from: 'nav-sidebar__box-search',
  input: 'nav-sidebar__input w-full',
  body: 'nav-sidebar__body',
  list: 'nav- sidebar__list',
  footer: 'nav-sidebar__footer',
  text: 'nav-sidebar__text block font-thin',
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
      sections.map(({ children, name = '', _id: id = '' }) => (
        <>
          <li className={classes.item} key={`navbar-menu-${id}`}>
            <a href={`${contextPath}${id}`} className={classes.link}>
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
      <div className={`${classes.sidebar} ${showSidebar ? 'active' : ''}`}>
        <div className={`${classes.content} ${showSidebar ? 'active' : ''}`}>
          <div className={classes.top}>
            <div className={classes.header}>
              <div className={classes.btnBox}>
                <Button
                  btnClass={classes.btn}
                  btnLink="#"
                  btnText="Suscríbete"
                />
              </div>
            </div>
            <div className={classes.search}>
              <form
                className={classes.from}
                onSubmit={e => {
                  e.preventDefault()
                  this.submitSearch()
                }}>
                <input
                  ref={this.inputSearchMovil}
                  type="search"
                  // onBlur={this.handleCloseSectionsSearch}
                  placeholder="Buscar"
                  className={classes.input}
                />
              </form>
            </div>
            <div className={classes.body}>
              <ul className={classes.list}>
                {sections && this.renderSections(sections)}
              </ul>
            </div>
          </div>
          <div className={classes.footer}>
            <a href="/" className={classes.text}>
              elcomercio.pe
            </a>
            <a href="/" className={classes.text}>
              1984-2019 Grupo El Comercio
            </a>
            <a href="/" className={classes.text}>
              Términos de Servicio
            </a>
            <a href="/" className={classes.text}>
              Políticas de Privacidad
            </a>
            <a href="/" className={classes.text}>
              Políticas de Discusión
            </a>
            <a href="/" className={classes.text}>
              RSS Términos de Servicio
            </a>
            <a href="/" className={classes.text}>
              Preferencias de Publicidad
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default NavbarChildMenu
