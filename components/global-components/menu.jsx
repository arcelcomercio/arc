/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, memo } from 'react'
import searchQuery from '../utilities/client/search'
import Button from './button'

const classes = {
  sidebar: `nav-sidebar w-full position-absolute overflow-hidden bottom-0 hidden`,
  content: `nav-sidebar__content flex flex-col justify-between h-full overflow-y`,
  item:
    'nav-sidebar__item position-relative flex justify-between items-center flex-wrap',
  containerSubMenu: 'nav-sidebar__container-submenu w-full overflow-hidden',
  menuArrow: 'nav-sidebar__menu-arrow hidden',
  labelParentItem:
    'nav-sidebar__parent-item',
  link: 'nav-sidebar__link block text-md text-white',
  top: 'nav-sidebar__top',
  header: 'nav-sidebar__header pt-30 pr-30 pb-0 pl-30 hidden',
  btnBox: 'nav-sidebar__box-btn pb-15 border-b-1 border-solid border-gray',
  btn: `flex items-center justify-center btn bg-link text-white nav-sidebar__btn pt-10 pb-10 pr-15 pl-15`,
  search: 'nav-sidebar__search block lg:hidden',
  from: 'nav-sidebar__box-search pb-15 border-b-1 border-solid border-gray',
  input: `nav-sidebar__input w-full inline-block bg-white line-h-sm`,
  body: 'nav-sidebar__body pr-0 pb-15 pl-0',
  list: 'nav- sidebar__list',
  footer: `nav-sidebar__footer`,
  callLink: `nav-sidebar__footer__call-link`,
  iconSearch: `nav-sidebar__footer__icon-search icon-search`,
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
              // style={{
              //   paddingLeft: `${deep > 0 ? 25 + deep * 15 : 25}px`,
              // }}
              >
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
                  {/* <label htmlFor={idElem} className={classes.labelParentItem} /> */}
                  <label htmlFor={idElem} className={classes.labelParentItem} >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="angle-down"
                      role="img"
                      htmlFor={idElem}
                      viewBox="0 0 320 512">
                      <path

                        fill="currentColor"
                        d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                      />
                    </svg>
                  </label>
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

  let { sections = [], winningCallLogo = '' } = props
  const { searchScriptMobile, btnSearchMobile } = props

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
    // <div className={`${classes.sidebar} ${showSidebar ? 'active' : ''}`}>
    <div className={classes.sidebar}>
      {showSidebar && (
        <div
          className={`${classes.content} ${IS_MOBILE.current ? 'w-full' : 'w-desktop'
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
                id='header-search-form-mobile'
                className={classes.from}
                onSubmit={e => {
                  e.preventDefault()
                  _handleSearch()
                }}>
                <input
                  id="header-search-input-mobile"
                  ref={inputSearchMovil}
                  type="search"
                  // onBlur={this.handleCloseSectionsSearch}
                  placeholder="¿Qué estas buscando?"
                  className={classes.input}
                />
                {/* <i
                  id="header-search-icon-mobile"
                  className={classes.iconSearch}
                /> */}
                <svg
                  id="header-search-icon-mobile"
                  className={classes.iconSearch}
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  role="img"
                  viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  />
                </svg>
              </form>

            </div>
            <div className={classes.body}>
              <ul className={classes.list}>
                {sections && renderSections(sections, 0)}
              </ul>
            </div>
          </div>
          <div className={classes.footer}>

            <a
              itemProp="url"
              href="https://promociones.trome.pe/registro/super-llamada-ganadora/"
              title="Llamada Ganadora"
              className={classes.callLink}
            >
              <img src={winningCallLogo} alt="Llamada Ganadora" />
            </a>

            {/* <a itemProp="url" href="/" className={classes.text}>
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
            ))} */}
          </div>
        </div>
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: searchScriptMobile
        }}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: btnSearchMobile
        }}
      ></script>
    </div>
  )
}

export default memo(NavbarChildMenu)
