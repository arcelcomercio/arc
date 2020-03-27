/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

const classes = {
  sidebar: `menu w-full pos-abs oflow-h`,
  content: `menu__content f f-col h-full`,
  item: 'menu__item pos-rel f',
  containerSubMenu: 'menu__sub w-full oflow-h',
  menuArrow: 'menu__menu-arrow',
  label: 'menu__label pos-abs',
  link: 'menu__link block',
  top: 'menu__top',
  search: 'menu__search',
  form: 'menu__form',
  input: `menu__input w-full`,
  body: 'menu__body',
  list: 'menu__list',
  footer: `menu__footer`,
  text: `menu__text`,
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
    <div className={classes.sidebar} id="menu" aria-expanded="false">
      <div className={classes.content} id="m-content">
        <div className={classes.top}>
          <div className={classes.search}>
            <form id="m-search" className={classes.form}>
              <input
                type="search"
                placeholder="Buscar"
                className={classes.input}
              />
            </form>
          </div>
          <div className={classes.body}>
            <ul className={classes.list}>
              {menuSections && renderSections(menuSections, 0)}
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

export default NavbarChildMenu
