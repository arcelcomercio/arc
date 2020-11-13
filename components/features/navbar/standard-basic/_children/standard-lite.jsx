/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import ENV from 'fusion:environment'
import { useFusionContext } from 'fusion:context'

import getResponsiveClasses from '../../../../utilities/responsive-classes'
import { socialMediaUrlShareList } from '../../../../utilities/social-media'
import { ELEMENT_STORY } from '../../../../utilities/constants/element-types'
import { SITE_PERU21 } from '../../../../utilities/constants/sitenames'
import {
  singwallScript,
  getQueryReloginEmailScript,
  stickyScript,
  searchScript,
  getBtnSubsScript,
  getBtnSignScript,
  navBarLoaderScript,
} from '../_dependencies/scripts'

import Button from '../../../../global-components/button'

const classes = {
  nav: `nav w-full f alg-center`,
  wrapper: `nav__wrapper f alg-center w-full`,
  form: 'f pos-rel alg-center',
  search: `nav__i-search`,
  navContainerRight: `nav__container-right pos-abs`,
  navBtnContainer: `nav__container-menu f alg-center`,
  searchContainer: 'nav__search-box alg-center',
  btnSearch: `nav__btn--search nav__btn f alg-center`,
  btnSection: 'nav__btn--section nav__btn f alg-center',
  iconMenu: 'nav__icon-menu',
  listContainer: 'nav__list-container',
  list: `nav__list h-full f`,
  listItem: 'nav__list-item h-full',
  mobileLogo: 'nav__mobile-logo pos-abs',
  listLink: `nav__list-link f alg-center h-full`,
  logo: 'nav__logo',
  logoLeft: 'header__logo-secondary',
  btnSubs: 'nav__btn-subs',
  btnContainer: 'header__btn-container f alg-center justify-end',
  btnSubscribe: `f alg-center`,
  navStoryTitle: 'nav__story-title pos-rel oflow-h',
  navStorySocialNetwork: 'nav__story-social-network pos-rel',
  listIcon: 'story-header__list f just-between ',
  moreLink: 'story-content__more-link',

  item: 'story-header__item',
  link: 'story-header__link f alg-center just-center',
  icon: 'story-header__icon',
  mobileClass: 'f just-center',
  iconFacebook: 'icon-facebook-circle',
  iconLinkedin: 'icon-linkedin-circle',
  iconTwitter: 'icon-twitter-circle',
  iconWhatsapp: 'icon-whatsapp',
  iconMore: 'story-header__share-icon',
}

const NavBarDefault = props => {
  const {
    siteProperties: {
      social: { twitter: { user: siteNameRedSocial } = {} } = {},
      siteUrl,
    } = {},
    globalContent,
    arcSite,
    siteProperties,
    globalContentConfig: { query = {} } = {},
    globalContent: { type = {} } = {},
  } = useFusionContext()

  const { website_url: postPermaLink, headlines: { basic: postTitle } = {} } =
    globalContent || {}

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    postPermaLink,
    postTitle,
    siteNameRedSocial
  )

  const shareButtons = [
    {
      name: 'facebook',
      icon: classes.iconFacebook,
      link: urlsShareList.facebook,
      mobileClass: classes.mobileClass,
    },

    {
      name: 'twitter',
      icon: classes.iconTwitter,
      link: urlsShareList.twitter,
      mobileClass: classes.mobileClass,
    },
    {
      name: 'linkedin',
      icon: classes.iconLinkedin,
      link: urlsShareList.linkedin,
      mobileClass: classes.mobileClass,
    },
    {
      name: 'whatsapp',
      icon: classes.iconWhatsapp,
      link: urlsShareList.whatsapp,
      mobileClass: `block md:hidden ${classes.mobileClass}`,
    },
  ]

  const _env = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

  const {
    logo,
    logoLeft,
    deviceList,
    hideMenu,
    navbarData: { children: navbarSections = [] } = {},
  } = props

  const search = decodeURIComponent(query.query || '').replace(/\+/g, ' ')

  const responsiveClass = getResponsiveClasses(deviceList)

  return (
    <>
      <nav className={`${classes.nav} ${responsiveClass}`}>
        <div className={classes.wrapper}>
          {/** ************* LEFT *************** */}

          <div className={classes.searchContainer}>
            <div className={classes.form}>
              <input
                id="header-search-input"
                type="search"
                defaultValue={search}
                placeholder="¿Qué Buscas?"
                className={classes.search}
              />
              <label htmlFor="header-search-input" className="nav__sl oflow-h">
                Cuadro de búsqueda
              </label>
              <button className={classes.btnSearch} type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-basic__search"
                  width="19"
                  height="19"
                  viewBox="0 0 14 14">
                  <title>abrir cuadro de búsqueda</title>
                  <path d="M13.2 12.4L9.2 8.3C9.8 7.5 10.1 6.5 10.1 5.4 10.1 4.2 9.6 3 8.8 2.1 7.9 1.2 6.7 0.8 5.4 0.8 4.2 0.8 3 1.2 2.1 2.1 1.2 3 0.8 4.2 0.8 5.4 0.8 6.7 1.2 7.9 2.1 8.8 3 9.6 4.2 10.1 5.4 10.1 6.5 10.1 7.5 9.8 8.3 9.2L12.4 13.2C12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.3 12.4 13.3 12.5 13.3 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2L13.2 12.5C13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.3 12.5 13.3 12.4 13.3 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4V12.4ZM7.9 7.9C7.3 8.6 6.4 8.9 5.4 8.9 4.5 8.9 3.6 8.6 3 7.9 2.3 7.3 1.9 6.4 1.9 5.4 1.9 4.5 2.3 3.6 3 3 3.6 2.3 4.5 1.9 5.4 1.9 6.4 1.9 7.3 2.3 7.9 3 8.6 3.6 8.9 4.5 8.9 5.4 8.9 6.4 8.6 7.3 7.9 7.9Z" />
                </svg>
              </button>
            </div>
          </div>

          {!hideMenu && (
            <div className={classes.navBtnContainer}>
              <Button
                iconClass={classes.iconMenu}
                btnClass={classes.btnSection}
                btnText="Menú"
              />
            </div>
          )}

          {/** ************* MIDDLE *************** */}
          <div className={classes.listContainer}>
            <ul className={classes.list}>
              {navbarSections &&
                navbarSections.map(
                  ({
                    _id: id,
                    url,
                    name = '',
                    display_name: displayName = '',
                  }) => {
                    return (
                      <li
                        key={`navbar-${url || id}`}
                        className={classes.listItem}>
                        <a
                          itemProp="url"
                          href={url || id || '/'}
                          className={classes.listLink}>
                          {name || displayName}
                        </a>
                      </li>
                    )
                  }
                )}
            </ul>
          </div>
          <a
            itemProp="url"
            href="/"
            className={classes.mobileLogo}
            title={`Logo de ${arcSite}`}>
            <img
              src={logo}
              alt={`Logo de ${arcSite}`}
              className={classes.logo}
            />
          </a>

          {type !== ELEMENT_STORY && arcSite === SITE_PERU21 && (
            <a
              itemProp="url"
              className={classes.logoLeft}
              href="/el-otorongo?ref=portada_home&amp;ft=btn_menu"
              title={logo.alt}>
              <img
                src={logoLeft.src}
                alt={logo.alt}
                className={classes.logoImage}
              />
            </a>
          )}

          <div className={classes.navStoryTitle} />

          <div className={classes.navStorySocialNetwork}>
            {type === ELEMENT_STORY && (
              <>
                {/* window.navbarMoreList = () => {
                    const el = document.querySelector('.story-header__list')
                    if (el.classList.contains('block')) {
                      el.classList.remove('block')
                      el.classList.add('hidden')
                    } else {
                      el.classList.remove('hidden')
                      el.classList.add('block')
                    }
                  }
                  window.navbarPopUpWindow = (url, title, w, h) => {
                    const left = window.screen.width / 2 - w / 2
                    const top = window.screen.height / 2 - h / 2
                    return window.open(
                      url,
                      title,
                      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
                    )
                  } */}
                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html:
                      '"use strict";window.navbarMoreList=function(){var o=document.querySelector(".story-header__list");o.classList.contains("block")?(o.classList.remove("block"),o.classList.add("hidden")):(o.classList.remove("hidden"),o.classList.add("block"))},window.navbarPopUpWindow=function(o,n,t,s){var c=window.screen.width/2-t/2,e=window.screen.height/2-s/2;return window.open(o,n,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(t,", height=").concat(s,", top=").concat(e,", left=").concat(c))};',
                  }}
                />

                <div>
                  <a
                    itemProp="url"
                    title="Mostrar enlaces para compartir"
                    className={classes.moreLink}
                    href="/"
                    id="icon-showMoreNavbar">
                    <i className={`${classes.iconMore}`} />
                  </a>
                  <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                      __html: '"use strict";document.getElementById("icon-<<name>>").addEventListener("click",function(e){e.preventDefault(),3===<<item>>?navbarMoreList():navbarPopUpWindow(document.getElementById("icon-<<name>>").href,"",600,400)});'
                        .replace(/<<name>>/g, 'showMoreNavbar')
                        .replace('<<item>>', 3),
                    }}
                  />
                </div>

                <ul className={classes.listIcon}>
                  {shareButtons.map(item => (
                    <li
                      key={item.icon}
                      className={` ${classes.item} ${item.mobileClass}`}>
                      <a
                        itemProp="url"
                        title={`Compartir en ${item.name}`}
                        className={classes.link}
                        href={item.link}
                        id={`icon-${item.name}`}>
                        <script
                          type="text/javascript"
                          dangerouslySetInnerHTML={{
                            __html: '"use strict";document.getElementById("icon-<<name>>").addEventListener("click",function(e){e.preventDefault(),3===<<item>>?navbarMoreList():navbarPopUpWindow(document.getElementById("icon-<<name>>").href,"",600,400)});'
                              .replace(/<<name>>/g, item.name)
                              .replace('<<item>>', 0),
                          }}
                        />
                        <i
                          className={`${item.icon} ${classes.icon}`}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {/** ************* RIGHT *************** */}

          <div className={`${classes.navContainerRight} ${responsiveClass}`}>
            <div className={`${classes.btnContainer}`}>
              {siteProperties.activePaywall && (
                <Button
                  btnText="Suscríbete"
                  btnClass={`${classes.btnSubscribe} ${classes.btnSubs}`}
                />
              )}

              {siteProperties.activeSignwall && (
                <button
                  aria-label="Iniciar"
                  id="signwall-nav-btn"
                  site="elcomercio"
                  className="f alg-center btn capitalize text-md nav__btn-sign"
                  type="button">
                  <i
                    id="signwall-nav-icon"
                    className="nav__icon icon-user title-sm text-primary-color"></i>
                  <span
                    id="signwall-nav-user"
                    className="capitalize"
                    aria-hidden="true">
                    Iniciar
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div id="nav-pointer"></div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `${
            siteProperties.activeSignwall ? singwallScript : ''
          }${stickyScript}${searchScript}${
            siteProperties.activePaywall
              ? getBtnSubsScript(_env, arcSite, siteProperties.urlSubsOnline)
              : ''
          }${
            siteProperties.activeSignwall ? getBtnSignScript(_env, arcSite) : ''
          }${hideMenu ? '' : navBarLoaderScript}`,
        }}
      />

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: getQueryReloginEmailScript(_env, arcSite),
        }}
      />
    </>
  )
}

export default NavBarDefault
