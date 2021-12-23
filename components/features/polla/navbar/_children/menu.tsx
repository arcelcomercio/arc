/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

const edittion = (cName: string, opcion = '', has = true) => (
  <>
    <div className={`${cName}__e-body ${opcion} `}>
      <div className={`${cName}__e-name`}>EDICIONES:</div>

      <a className={`${cName}__e-pais`} href="/?noredirect">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <path d="M18 0H0V12H18V0Z" fill="white" />
          <path d="M6 0H0V12H6V0Z" fill="#DB161D" />
          <path d="M18 0H12V12H18V0Z" fill="#DB161D" />
        </svg>
        {`${has ? 'PE (Perú)' : 'Perú'}`}
      </a>

      <a className={`${cName}__e-pais`} href="/mexico/">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <path d="M18 0H0V12H18V0Z" fill="white" />
          <path d="M6 0H0V12H6V0Z" fill="#006847" />
          <path d="M18 0H12V12H18V0Z" fill="#DB161D" />
          <path
            d="M9 8.0625C10.1391 8.0625 11.0625 7.13909 11.0625 6C11.0625 4.86091 10.1391 3.9375 9 3.9375C7.86091 3.9375 6.9375 4.86091 6.9375 6C6.9375 7.13909 7.86091 8.0625 9 8.0625Z"
            fill="#BFC2A3"
          />
        </svg>
        {`${has ? 'MX (México)' : 'México'}`}
      </a>

      <a className={`${cName}__e-pais`} href="/colombia/">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect width="18" height="6" fill="#fcd116" />
          <rect y="6" width="18" height="4" fill="#003893" />
          <rect y="9" width="18" height="4" fill="#ce1126" />
        </svg>
        {`${has ? 'CO (Colombia)' : 'Colombia'}`}
      </a>
    </div>
  </>
)

const renderSections = (sections: any, deep: number, nameId = 'root') => {
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
      }: any) => {
        const idElem = `${nameId}-${name || displayName}`.toLowerCase()
        return (
          <li
            className="nav-sidebar__item pos-rel f just-between alg-center"
            key={`navbar-menu-${url || id}`}>
            <a
              itemProp="url"
              href={url || id || '/'}
              className="nav-sidebar__link"
              style={{ paddingLeft: `${deep > 0 ? 25 + deep * 15 : 25}px` }}>
              {name || displayName}
            </a>
            {children && children.length > 0 && (
              <>
                <input
                  className="nav-sidebar__menu-arrow"
                  type="checkbox"
                  id={idElem}
                  name="checkbox-submenu"
                />
                <label
                  htmlFor={idElem}
                  className="nav-sidebar__parent-item pos-abs">
                  <svg width="8" viewBox="0 0 8 14">
                    <path
                      d="M2.079,14.713,9.289,7.5,2.079.293.293,2.079,5.717,7.5.293,12.927Z"
                      transform="translate(-0.293 -0.293)"
                    />
                  </svg>
                </label>
                <ul
                  className={`nav-sidebar__container-submenu w-full oflow-h deep-${deep} ${idElem}`}>
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

/* document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.querySelector(".polla-nav__btn-menu")
  const megaMenu = document.querySelector(".header-full__megamenu")
  if (btnMenu && megaMenu) {
    btnMenu.addEventListener("click", () => {
      megaMenu.classList.toggle("active")
    })
  }
}); */
const menuScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector(".polla-nav__btn-menu"),t=document.querySelector(".header-full__megamenu");e&&t&&e.addEventListener("click",function(){t.classList.toggle("active")})});'

interface Props {
  menuList: any[]
}

const PollaNavbarMenu: React.FC<Props> = (props) => {
  const { arcSite } = useAppContext()
  const { siteDomain, legalLinks } = getProperties(arcSite)

  const { menuList } = props

  return (
    <>
      <div className="header-full__megamenu w-full pos-abs oflow-h f f-col just-between">
        <div className="nav-sidebar__wrapper f f-col just-between h-full">
          <div className="nav-sidebar__body">
            {arcSite === 'depor' && (
              <>{edittion('polla-nav', 'f paisBody', false)}</>
            )}
            <ul className="nav-sidebar__list">
              {menuList && renderSections(menuList, 0)}
            </ul>
          </div>
          <div className="nav-sidebar__footer">
            <a itemProp="url" href="/" className="nav-sidebar__text">
              {siteDomain}
            </a>
            {legalLinks?.map((link) => (
              <a
                itemProp="url"
                key={link.url}
                href={link.url}
                className="nav-sidebar__text">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: menuScript }} />
    </>
  )
}

export default PollaNavbarMenu
