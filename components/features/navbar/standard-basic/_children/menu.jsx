import * as React from 'react'
import { useAppContext } from 'fusion:context'

import Button from '../../../../global-components/button'

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
  list: 'nav-sidebar__list',
  footer: `nav-sidebar__footer p-30 border-b-1 border-solid border-gray`,
  text: `nav-sidebar__text block font-thin pt-5 pr-0 pb-5 pl-0 text-md text-white`,
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
            // Se reemplazar?? ["<<sections>>"]
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
                  'nav-sidebar__item position-relative flex justify-between items-center flex-wrap'
                const aLink = document.createElement('a')
                aLink.className = `nav-sidebar__link block p-15 pl-25 text-md text-white`
                aLink.href = url || id || '/'
                if(styles.length > 0 ) li.style = `background-color: ${styles[0]}; color: ${styles[1] || '#ffffff'};`
                aLink.innerHTML = name || displayName
                li.append(aLink)
                if (children && children.length > 0) {
                  const checkBox = document.createElement('input')
                  checkBox.className = 'nav-sidebar__menu-arrow hidden'
                  checkBox.setAttribute('type', 'checkbox')
                  checkBox.setAttribute('id', idElem)
                  checkBox.setAttribute('name', 'checkbox-submenu')
                  const label = document.createElement('label')
                  label.htmlFor = idElem
                  label.className =
                    'nav-sidebar__parent-item pl-25 pt-10 pr-20 pb-10 position-absolute right-0'
                  const ul = document.createElement('ul')
                  ul.className = `nav-sidebar__container-submenu w-full overflow-hidden deep-0${idElem}`
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
                        'nav-sidebar__item position-relative flex justify-between items-center flex-wrap'
                      const aChild = document.createElement('a')
                      aChild.className =
                        'nav-sidebar__link block p-15 pl-25 text-md text-white'
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

  const menuScript = '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=document.body.querySelector(".nav-sidebar__content");/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(window.navigator.userAgent)?e.classList.add("w-full"):e.classList.add("w-desktop"),document.querySelector(".nav__btn--section").addEventListener("click",function(){var t=document.body.querySelector(".nav-sidebar");t.classList.contains("active")?(t.classList.remove("active"),e.classList.remove("active")):(t.classList.add("active"),e.classList.add("active")),null===document.body.querySelector(".nav-sidebar__item")&&["<<sections>>"].forEach(function(e){var t=e.children,a=void 0===t?[]:t,n=e.name,i=void 0===n?"":n,d=e._id,o=void 0===d?"":d,s=e.display_name,r=void 0===s?"":s,c=e.url,l=void 0===c?"":c,m=e.styles,u=void 0===m?[]:m,v=("root-"+(i||r)).toLowerCase(),b=document.createElement("li");b.className="nav-sidebar__item position-relative flex justify-between items-center flex-wrap";var p=document.createElement("a");if(p.className="nav-sidebar__link block p-15 pl-25 text-md text-white",p.href=l||o||"/",u.length>0&&(b.style="background-color: "+u[0]+"; color: "+(u[1]||"#ffffff")+";"),p.innerHTML=i||r,b.append(p),a&&a.length>0){var f=document.createElement("input");f.className="nav-sidebar__menu-arrow hidden",f.setAttribute("type","checkbox"),f.setAttribute("id",v),f.setAttribute("name","checkbox-submenu");var _=document.createElement("label");_.htmlFor=v,_.className="nav-sidebar__parent-item pl-25 pt-10 pr-20 pb-10 position-absolute right-0";var h=document.createElement("ul");h.className="nav-sidebar__container-submenu w-full overflow-hidden deep-0"+v,b.append(f,_,h),a.forEach(function(e){var t=e.name,a=void 0===t?"":t,n=e._id,i=void 0===n?"":n,d=e.display_name,o=void 0===d?"":d,s=e.urlChild,r=void 0===s?"":s,c=document.createElement("li");c.className="nav-sidebar__item position-relative flex justify-between items-center flex-wrap";var l=document.createElement("a");l.className="nav-sidebar__link block p-15 pl-25 text-md text-white",l.style="padding-left: 40px;",l.href=r||i||"/",l.innerHTML=a||o,c.append(l),h.append(c)})}document.body.querySelector(".nav-sidebar__list").append(b)})})})});'.replace(
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
                  btnText="Suscr??bete"
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
