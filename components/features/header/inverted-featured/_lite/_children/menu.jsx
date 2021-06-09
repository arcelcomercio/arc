/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

// const classes = {
//   sidebar: `nav-sidebar menu pos-abs oflow-h`,
//   content: `menu__content f f-col h-full`,
//   item: 'menu__item pos-rel f',
//   containerSubMenu: 'menu__sub w-full oflow-h',
//   menuArrow: 'menu__menu-arrow',
//   label: 'menu__label pos-abs',
//   link: 'menu__link block',
//   top: 'menu__top',
//   search: 'menu__search',
//   form: 'menu__form',
//   input: `menu__input w-full`,
//   body: 'menu__body',
//   list: 'menu__list',
//   footer: `menu__footer`,
//   text: `menu__text`,
//   menuSomos: 'menu--somos',
// }

const classes = {
  sidebar: `nav-sidebar w-full pos-abs oflow-h bottom-0 hidden`,
  content: `nav-sidebar__content f f-col h-full just-between overflow-y`,
  item: 'nav-sidebar__item pos-rel f just-between items-center f-wrap',
  containerSubMenu: 'nav-sidebar__container-submenu w-full oflow-h',
  menuArrow: 'nav-sidebar__menu-arrow hidden',
  labelParentItem:
    'nav-sidebar__parent-item pl-25 pt-10 pr-20 pb-10 pos-abs right-0',
  link: 'nav-sidebar__link block p-15 pl-25 text-md text-white',
  top: 'nav-sidebar__top',
  search: 'nav-sidebar__search pt-15 pr-30 pb-15 pl-30 block lg:hidden',
  form: 'nav-sidebar__box-search pb-15 border-b-1 border-solid border-gray',
  input: `nav-sidebar__input w-full inline-block pt-10 pr-15 pb-10 pl-15 bg-white border-0 text-md rounded-sm line-h-sm`,
  body: 'nav-sidebar__body pt-15 pr-0 pb-15 pl-0',
  list: 'nav- sidebar__list',
  footer: `nav-sidebar__footer p-30 border-b-1 border-solid border-gray`,
  text: `nav-sidebar__text block font-thin pt-5 pr-0 pb-5 pl-0 text-md text-white`,
  // header: 'nav-sidebar__header pt-30 pr-30 pb-0 pl-30 hidden',
  // btnBox: 'nav-sidebar__box-btn pb-15 border-b-1 border-solid border-gray',
  // btn: `flex items-center just-center btn bg-link text-white nav-sidebar__btn pt-10 pb-10 pr-15 pl-15`,
}

const NavbarChildMenu = ({
  menuSections = [],
  siteDomain = '',
  legalLinks = [],
}) => {
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
        }) => {
          const idElem = `${nameId}-${name || displayName}`.toLowerCase()
          return (
            <li className={classes.item} key={`menu-${url || id}`}>
              <a
                itemProp="url"
                href={url || id || '/'}
                className={classes.link}
                style={{ paddingLeft: `${deep > 0 ? 25 + deep * 15 : 25}px` }}>
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
                  <label htmlFor={idElem} className={classes.label} />
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

  return (
    <div className={`${classes.sidebar}`} id="menu" aria-expanded="false">
      <div className={classes.content} id="m-content">
        <div className={classes.top}>
          <div className={classes.search}>
            <form id="m-search" className={classes.form}>
              <input
                id="m-search-input"
                type="search"
                placeholder="Buscar"
                className={classes.input}
              />
              <label htmlFor="m-search-input" className="hidden-label">
                Cuadro de búsqueda
              </label>
            </form>
          </div>
          <div className={classes.body}>
            <ul className={classes.list}>
              {menuSections && renderSections(menuSections, 0)}
            </ul>
          </div>
        </div>
        <div className={classes.footer}>
          <a itemProp="url" href="/" className={classes.text}>
            {siteDomain}
          </a>
          {legalLinks.map((link) => (
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
    </div>
  )
}

export default NavbarChildMenu
