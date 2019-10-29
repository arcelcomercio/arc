import React, { PureComponent } from 'react'
import { searchQuery } from '../utilities/helpers'
import Button from './button'

const classes = {
  sidebar: `nav-sidebar w-full position-absolute overflow-hidden bottom-0 bg-gray-300`,
  content: `nav-sidebar__content flex flex-col justify-between h-full overflow-y`,
  item:
    'nav-sidebar__item position-relative flex justify-between items-center flex-wrap',
  containerSubMenu: 'nav-sidebar__container-submenu w-full overflow-hidden',
  menuArrow: 'nav-sidebar__menu-arrow hidden',
  labelParentItem:
    'nav-sidebar__parent-item pl-25 pt-10 pr-20 pb-10 position-absolute right-0',
  link: 'nav-sidebar__link block p-15 pl-25 text-md text-white',
  top: 'nav-sidebar__top',
  header: 'nav-sidebar__header pt-30 pr-30 pb-0 pl-30 hidden',
  btnBox: 'nav-sidebar__box-btn pb-15 border-b-1 border-solid border-gray',
  btn: `flex items-center justify-center btn bg-link text-white nav-sidebar__btn pt-10 pb-10 pr-15 pl-15`,
  search: 'nav-sidebar__search pt-15 pr-30 pb-15 pl-30 block lg:hidden',
  from: 'nav-sidebar__box-search pb-15 border-b-1 border-solid border-gray',
  input: `nav-sidebar__input w-full inline-block pt-10 pr-15 pb-10 pl-15 bg-white border-0 text-md rounded-sm line-h-sm`,
  body: 'nav-sidebar__body pt-15 pr-0 pb-15 pl-0',
  list: 'nav- sidebar__list',
  footer: `nav-sidebar__footer p-30 border-b-1 border-solid border-gray`,
  text: `nav-sidebar__text block font-thin pt-5 pr-0 pb-5 pl-0 text-md text-white`,
}

// const BASEURL = window.location.origin

class NavbarChildMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.inputSearchMovil = React.createRef()
  }

  _handleSearch = () => {
    const { value } = this.inputSearchMovil.current
    searchQuery(value)
  }

  renderSections = (sections, deep, nameId = 'root') => {
    const aux = deep
    return (
      sections &&
      sections.map(
        ({
          children,
          name = '',
          _id: id = '',
          display_name: displayName = '',
          url = '',
        }) => {
          const idElem = `${nameId}-${name || displayName}`.toLowerCase()
          return (
            <li className={classes.item} key={`navbar-menu-${url || id}`}>
              <a
                href={url || id || '/'}
                className={`${classes.link}${
                  deep > 0 ? ` pl-${25 + deep * 15}` : ''
                  }`}>
                {name || displayName}
              </a>
              {children && children.length > 0 && (
                <>
                  <input
                    className={classes.menuArrow}
                    type="checkbox"
                    id={idElem}
                    name="checkbox-submenu"
                  />
                  {/** TODO: verificar si se puede mejorar, el input debería estar dentro
                   * del label pero por problemas de estilos para hecer la funcionalidad
                   * con puro CSS no se encontró forma.
                   * */}
                  <label htmlFor={idElem} className={classes.labelParentItem} />
                  <ul
                    className={`${
                      classes.containerSubMenu
                      } deep-${deep} ${idElem}`}>
                    {this.renderSections(children, aux + 1, idElem)}
                  </ul>
                </>
              )}
            </li>
          )
        }
      )
    )
  }

  render() {
    const {
      showSidebar,
      siteProperties: { siteDomain = '', legalLinks = [] } = {},
      sections = [],
    } = this.props

    let IS_MOBILE = true

    if (typeof window !== 'undefined')
      IS_MOBILE = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
        window.navigator.userAgent
      )

    return (
      <div className={`${classes.sidebar} ${showSidebar ? 'active' : ''}`}>
        <div
          className={`${classes.content} ${
            IS_MOBILE ? 'w-full' : 'w-desktop'
            } ${showSidebar ? 'active' : ''}`}>
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
                  this._handleSearch()
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
                {sections && this.renderSections(sections, 0)}
              </ul>
            </div>
          </div>
          <div className={classes.footer}>
            <a href="/" className={classes.text}>
              {siteDomain}
            </a>
            {legalLinks.map(link => (
              <a key={link.url} href={link.url} className={classes.text}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default NavbarChildMenu
