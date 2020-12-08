import * as React from 'react'
import { useAppContext } from 'fusion:context'

import Button from '../../../../../global-components/button'

const classes = {
  sidebar: `nav-sidebar w-full pos-abs oflow-h`,
  content: `nav-sidebar__content f f-col just-between h-full`,
  item: 'nav-sidebar__item pos-rel f just-between alg-center',
  containerSubMenu: 'nav-sidebar__container-submenu w-full oflow-h',
  menuArrow: 'nav-sidebar__menu-arrow',
  labelParentItem: 'nav-sidebar__parent-item pos-abs',
  link: 'nav-sidebar__link',
  top: 'nav-sidebar__top',
  header: 'nav-sidebar__header',
  btnBox: 'nav-sidebar__box-btn',
  btn: `f alg-center justify-center`,
  search: 'nav-sidebar__search',
  from: 'nav-sidebar__box-search',
  input: `nav-sidebar__input w-full`,
  body: 'nav-sidebar__body',
  list: 'nav-sidebar__list',
  footer: `nav-sidebar__footer`,
  text: `nav-sidebar__text`,
}

const NavbarChildMenu = ({ sections }) => {
  const {
    siteProperties: { siteDomain = '', legalLinks = [] } = {},
  } = useAppContext()

  /**
   * MENU SCRIPT
   */

  /* document.addEventListener('DOMContentLoaded', () => {
    requestIdle(() => {
      const $sidebarContent = document.body.querySelector('.nav-sidebar__content')
      if (
        /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
          window.navigator.userAgent
        )
      ) {
        $sidebarContent.classList.add('w-full')
      } else {
        $sidebarContent.classList.add('w-desktop')
      }
      document
        .querySelector('.nav__btn--section')
        .addEventListener('click', () => {
          const $sidebar = document.body.querySelector('.nav-sidebar')
          if (
            $sidebar.classList.contains('active')
          ) {
            $sidebar.classList.remove('active')
            $sidebarContent.classList.remove('active')
          } else {
            $sidebar.classList.add('active')
            $sidebarContent.classList.add('active')
          }
          if (document.body.querySelector(".nav-sidebar__item") === null) {
            // Se reemplazará ["<<sections>>"]
            ['<<sections>>'].forEach(
              ({
                children = [],
                name = '',
                _id: id = '',
                display_name: displayName = '',
                url = '',
                styles = []
              }) => {
                const idElem = `root-${name || displayName}`.toLowerCase()
                const li = document.createElement('li')
                li.className =
                  'nav-sidebar__item pos-rel f just-between alg-center'
                const aLink = document.createElement('a')
                aLink.className = `nav-sidebar__link`
                aLink.href = url || id || '/'
                if(styles.length > 0 ) li.style = `background-color: ${styles[0]}; color: ${styles[1] || '#ffffff'};`
                aLink.innerHTML = name || displayName
                li.append(aLink)
                if (children && children.length > 0) {
                  const checkBox = document.createElement('input')
                  checkBox.className = 'nav-sidebar__menu-arrow'
                  checkBox.setAttribute('type', 'checkbox')
                  checkBox.setAttribute('id', idElem)
                  checkBox.setAttribute('name', 'checkbox-submenu')
                  const label = document.createElement('label')
                  label.htmlFor = idElem
                  label.className =
                    'nav-sidebar__parent-item'
                  const ul = document.createElement('ul')
                  ul.className = `nav-sidebar__container-submenu w-full oflow-h deep-0${idElem}`
                  li.append(checkBox, label, ul)
                  children.forEach(
                    ({
                      name: nameChild = '',
                      _id: idChild = '',
                      display_name: displayNameChild = '',
                      urlChild = '',
                    }) => {
                      const liChild = document.createElement('li')
                      liChild.className =
                        'nav-sidebar__item pos-rel f just-between alg-center'
                      const aChild = document.createElement('a')
                      aChild.className =
                        'nav-sidebar__link'
                      aChild.style = 'padding-left: 40px;'
                      aChild.href = urlChild || idChild || '/'
                      aChild.innerHTML = nameChild || displayNameChild
                      liChild.append(aChild)
                      ul.append(liChild)
                    }
                  )
                }
                document.body.querySelector('.nav-sidebar__list').append(li)
              }
            )
          }
        })
    })
  }) */

  const menuScript = '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=document.body.querySelector(".nav-sidebar__content");/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(window.navigator.userAgent)?e.classList.add("w-full"):e.classList.add("w-desktop"),document.querySelector(".nav__btn--section").addEventListener("click",function(){var t=document.body.querySelector(".nav-sidebar");t.classList.contains("active")?(t.classList.remove("active"),e.classList.remove("active")):(t.classList.add("active"),e.classList.add("active")),null===document.body.querySelector(".nav-sidebar__item")&&["<<sections>>"].forEach(function(e){var t=e.children,a=void 0===t?[]:t,n=e.name,i=void 0===n?"":n,d=e._id,o=void 0===d?"":d,s=e.display_name,r=void 0===s?"":s,c=e.url,l=void 0===c?"":c,m=e.styles,u=void 0===m?[]:m,v=("root-"+(i||r)).toLowerCase(),b=document.createElement("li");b.className="nav-sidebar__item pos-rel f just-between  alg-center";var p=document.createElement("a");if(p.className="nav-sidebar__link",p.href=l||o||"/",u.length>0&&(b.style="background-color: "+u[0]+"; color: "+(u[1]||"#ffffff")+";"),p.innerHTML=i||r,b.append(p),a&&a.length>0){var f=document.createElement("input");f.className="nav-sidebar__menu-arrow",f.setAttribute("type","checkbox"),f.setAttribute("id",v),f.setAttribute("name","checkbox-submenu");var _=document.createElement("label");_.htmlFor=v,_.className="nav-sidebar__parent-item";var h=document.createElement("ul");h.className="nav-sidebar__container-submenu w-full oflow-h deep-0"+v,b.append(f,_,h),a.forEach(function(e){var t=e.name,a=void 0===t?"":t,n=e._id,i=void 0===n?"":n,d=e.display_name,o=void 0===d?"":d,s=e.urlChild,r=void 0===s?"":s,c=document.createElement("li");c.className="nav-sidebar__item pos-rel f just-between  alg-center";var l=document.createElement("a");l.className="nav-sidebar__link",l.style="padding-left: 40px;",l.href=r||i||"/",l.innerHTML=a||o,c.append(l),h.append(c)})}document.body.querySelector(".nav-sidebar__list").append(b)})})})});'.replace(
    '["<<sections>>"]',
    JSON.stringify(sections)
  )
  return (
    <>
      <div className={`${classes.sidebar}`}>
        <div className={`${classes.content}`}>
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
              <form className={classes.from}>
                <input
                  type="search"
                  placeholder="Buscar"
                  className={classes.input}
                />
              </form>
            </div>
            <div className={classes.body}>
              <ul className={classes.list}>
                {/* {sections && renderSections(sections, 0)} */}
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
      </div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: menuScript,
        }}
      />
    </>
  )
}

export default NavbarChildMenu
