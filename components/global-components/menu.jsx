/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, memo } from 'react'
import searchQuery from '../utilities/client/search'
import Button from './button'

const classes = {
  sidebar: `nav-sidebar w-full position-absolute overflow-hidden bottom-0 bg-gray-300 hidden`,
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

const NavbarChildMenu = props => {
  const inputSearchMovil = useRef(null)
  const IS_MOBILE = useRef(true)

  const _handleSearch = () => {
    const { value } = inputSearchMovil.current
    searchQuery(value)
  }

  const renderSections = (sections, deep, nameId = 'root') => {
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
          styles = [],
        }) => {
          const idElem = `${nameId}-${name || displayName}`.toLowerCase()
          const styleCustom = {}
          if (styles.length > 0) {
            const [backgroundCustom, letterColorCustom] = styles
            styleCustom.backgroundColor = backgroundCustom
            styleCustom.color = letterColorCustom
          }
          return (
            <li
              className={classes.item}
              style={styleCustom}
              key={`navbar-menu-${url || id}`}>
              <a
                itemProp="url"
                href={url || id || '/'}
                className={classes.link}
                style={{
                  paddingLeft: `${deep > 0 ? 25 + deep * 15 : 25}px`,
                }}>
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
                    className={`${classes.containerSubMenu} deep-${deep} ${idElem}`}>
                    {renderSections(children, aux + 1, idElem)}
                  </ul>
                </>
              )}
            </li>
          )
        }
      )
    )
  }

  const defaultSectionsElComercio = [
    { name: 'Opinión', url: '/opinion/' },
    { name: 'Política', url: '/politica/' },
    { name: 'Lima', url: '/lima/' },
    { name: 'Economía', url: '/economia/' },
    { name: 'Mundo', url: '/mundo/' },
    { name: 'DT', url: '/deporte-total/' },
    { name: 'Perú', url: '/peru/' },
    { name: 'Luces', url: '/luces/' },
    { name: 'Tecnología y Ciencias', url: '/tecnologia/' },
    { name: 'Somos', url: '/somos/' },
  ]

  const {
    showSidebar = false,
    siteProperties: { siteDomain = '', legalLinks = [] } = {},
  } = props

  let { sections = [] } = props

  sections =
    /elcomercio/.test(siteDomain) && sections.length <= 0
      ? defaultSectionsElComercio
      : sections

  useEffect(() => {
    IS_MOBILE.current = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      window.navigator.userAgent
    )
  }, [])

  return (
    <div className={`${classes.sidebar} ${showSidebar ? 'active' : ''}`}>
      {showSidebar && (
        <div
          className={`${classes.content} ${
            IS_MOBILE.current ? 'w-full' : 'w-desktop'
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
                  _handleSearch()
                }}>
                <input
                  ref={inputSearchMovil}
                  type="search"
                  // onBlur={this.handleCloseSectionsSearch}
                  placeholder="Buscar"
                  className={classes.input}
                />
              </form>
            </div>
            <div className={classes.body}>
              <ul className={classes.list}>
                {sections && renderSections(sections, 0)}
              </ul>
            </div>
          </div>
          <div className={classes.footer}>
            <a itemProp="url" href="/" className={classes.text}>
              {siteDomain}
            </a>
            {legalLinks.map(link => (
              <a
                itemProp="url"
                key={link.url}
                href={link.url}
                className={classes.text}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(NavbarChildMenu)
