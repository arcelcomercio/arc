/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import ENV from 'fusion:environment'
import { useFusionContext } from 'fusion:context'

import getResponsiveClasses from '../../../../../utilities/responsive-classes'
import { socialMediaUrlShareList } from '../../../../../utilities/social-media'
import { ELEMENT_STORY } from '../../../../../utilities/constants/element-types'
import { SITE_PERU21 } from '../../../../../utilities/constants/sitenames'
import {
  singwallScript,
  getQueryReloginEmailScript,
  stickyScript,
  searchScript,
  getBtnSubsScript,
  getBtnSignScript,
  navBarLoaderScript,
} from '../../_dependencies/scripts'

import Button from '../../../../../global-components/button'
import Menu from './menu'

const classes = {
  nav: `nav w-full f alg-center`,
  wrapper: `nav__wrapper f alg-center w-full`,
  form: 'f pos-rel alg-center',
  search: `nav__i-search`,
  navContainerRight: `nav__container-right pos-abs`,
  navBtnContainer: `nav__btn--section f alg-center`,
  searchContainer: 'nav__search-box alg-center',
  btnSearch: `nav__btn--search nav__btn f alg-center`,
  btnSection: 'nav__btn--section nav__btn f alg-center',
  iconMenu: 'nav__icon-menu',
  listContainer: 'nav__list-container',
  list: `nav__list h-full f`,
  listItem: 'nav__list-item h-full',
  primaryLogo: 'nav__p-logo pos-abs',
  secondaryLogo: 'nav__s-logo pos-abs',
  listLink: `nav__list-link f alg-center h-full`,
  logo: 'nav__logo',
  logoLeft: 'header__logo-secondary',
  btnSubs: 'nav__btn-subs',
  btnContainer: 'header__btn-container f alg-center justify-end',
  btnSubscribe: `f alg-center`,
  navStoryTitle: 'nav__story-title pos-rel oflow-h',
  navStorySocialNetwork: 'nav__story-social-network pos-rel',
  listIcon: 'story-header__list f just-between ',
  moreLink: 'story-content__more-link f alg-center just-center',

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
      link: urlsShareList.facebook,
    },

    {
      name: 'twitter',
      link: urlsShareList.twitter,
    },
    {
      name: 'linkedin',
      link: urlsShareList.linkedin,
    },
    {
      name: 'whatsapp',
      link: urlsShareList.whatsapp,
    },
  ]

  const _env = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

  const {
    primaryLogo,
    secondaryLogo,
    logoLeft,
    deviceList,
    hideMenu,
    data: { children: sections = [] } = {},
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
            <button type="button" className={classes.navBtnContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="23"
                viewBox="0 0 24 24">
                <title>Menú</title>
                <path d="M4 6h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4C3.5 8 3 7.6 3 7l0 0C3 6.5 3.5 6 4 6z" />
                <path d="M4 11h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4c-0.5 0-1-0.4-1-1l0 0C3 11.5 3.5 11 4 11z" />
                <path d="M4 16h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4c-0.5 0-1-0.4-1-1l0 0C3 16.5 3.5 16 4 16z" />
              </svg>
              <span aria-hidden="true">Menú</span>
            </button>
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
            className={classes.primaryLogo}
            title={`Logo de ${arcSite}`}>
            <img
              src={primaryLogo}
              alt={`Logo de ${arcSite}`}
              className={classes.logo}
            />
          </a>
          <a
            itemProp="url"
            href="/"
            className={classes.secondaryLogo}
            title={`Logo de ${arcSite}`}>
            <img
              src={secondaryLogo}
              alt={`Logo de ${arcSite}`}
              className={classes.logo}
            />
          </a>

          {type !== ELEMENT_STORY && arcSite === SITE_PERU21 && (
            <a
              itemProp="url"
              className={classes.logoLeft}
              href="/el-otorongo?ref=portada_home&amp;ft=btn_menu"
              title={logoLeft.alt}>
              <img
                src={logoLeft.src}
                alt={logoLeft.alt}
                className={classes.logoImage}
              />
            </a>
          )}

          <div className={classes.navStoryTitle}>{postTitle}</div>

          <div className={classes.navStorySocialNetwork}>
            {type === ELEMENT_STORY && (
              <>
                {/* window.navbarMoreList = () => {
                    const el = document.querySelector('.story-header__list')
                    if (el.classList.contains('active')) {
                      el.classList.remove('active')
                    } else {
                      el.classList.add('active')
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
                      '"use strict";window.navbarMoreList=function(){var o=document.querySelector(".story-header__list");o.classList.contains("active")?o.classList.remove("active"):o.classList.add("active")},window.navbarPopUpWindow=function(o,n,t,e){var i=window.screen.width/2-t/2,c=window.screen.height/2-e/2;return window.open(o,n,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(t,", height=").concat(e,", top=").concat(c,", left=").concat(i))};',
                  }}
                />

                <div>
                  <a
                    itemProp="url"
                    title="Mostrar enlaces para compartir"
                    className={classes.moreLink}
                    href="/"
                    id="icon-showMoreNavbar">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 23 23">
                      <path
                        d="M13.493,2.737,2.67,8.15,2.026,6.862,12.849,1.452Zm-.644,13.376L2.026,10.7l.646-1.287,10.823,5.412-.644,1.286Z"
                        transform="translate(3.801 2.724)"
                        fillRule="evenodd"
                      />
                      <path
                        d="M19.417,7.191a3.6,3.6,0,1,0-2.543-1.053A3.6,3.6,0,0,0,19.417,7.191Zm0,15.821a3.6,3.6,0,1,0-2.543-1.053A3.6,3.6,0,0,0,19.417,23.013ZM3.6,15.1a3.6,3.6,0,1,0-2.543-1.053A3.6,3.6,0,0,0,3.6,15.1Z"
                        transform="translate(0)"
                        fillRule="evenodd"
                      />
                    </svg>
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
                    <li key={item.icon} className={classes.item}>
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
                        {(() => {
                          if (item.name === 'facebook') {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="11"
                                viewBox="0 0 10 21">
                                <title>Compartir en facebook</title>
                                <path d="M2.6 21V11.1H0V7.6H2.6V4.6C2.6 2.2 4.1 0 7.5 0 8.9 0 10 0.1 10 0.1L9.9 3.5C9.9 3.5 8.8 3.4 7.7 3.4 6.4 3.4 6.2 4 6.2 5V7.6H10L9.8 11.1H6.2V21H2.6Z" />
                              </svg>
                            )
                          }
                          if (item.name === 'twitter') {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="11"
                                viewBox="0 0 14 12">
                                <title>Compartir en twitter</title>
                                <path d="M13.5 2C13 2.2 12.5 2.3 12 2.4 12.5 2.1 12.9 1.5 13.1 0.9 12.6 1.2 12 1.4 11.4 1.6 11.2 1.3 10.9 1.1 10.6 0.9 10.2 0.8 9.9 0.7 9.5 0.7 8 0.7 6.8 1.9 6.8 3.4 6.8 3.6 6.9 3.8 6.9 4 4.7 3.9 2.7 2.8 1.4 1.2 1.2 1.6 1 2.1 1 2.6 1 3.5 1.5 4.3 2.2 4.8 1.8 4.8 1.4 4.6 1 4.4V4.5C1 5.8 1.9 6.8 3.2 7.1 2.9 7.1 2.7 7.2 2.5 7.2 2.3 7.2 2.1 7.2 2 7.1 2.3 8.2 3.3 9 4.5 9 3.5 9.7 2.4 10.1 1.1 10.1 0.9 10.1 0.7 10.1 0.5 10.1 1.7 10.8 3.1 11.3 4.6 11.3 9.5 11.3 12.2 7.2 12.2 3.7 12.2 3.6 12.2 3.5 12.2 3.4 12.7 3 13.1 2.5 13.5 2Z" />
                              </svg>
                            )
                          }
                          if (item.name === 'linkedin') {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="15"
                                viewBox="0 0 24 24">
                                <title>Compartir en LinkedIn</title>
                                <path d="M5 7.2C6.2 7.2 7.2 6.2 7.2 5 7.2 3.8 6.2 2.8 5 2.8 3.8 2.8 2.8 3.8 2.8 5 2.8 6.2 3.8 7.2 5 7.2Z" />
                                <path d="M9.2 8.9V21H13V15C13 13.4 13.3 11.9 15.3 11.9 17.2 11.9 17.2 13.7 17.2 15.1V21H21V14.3C21 11.1 20.3 8.6 16.5 8.6 14.6 8.6 13.4 9.6 12.9 10.5H12.9V8.9H9.2V8.9ZM3.1 8.9H6.9V21H3.1V8.9Z" />
                              </svg>
                            )
                          }
                          if (item.name === 'whatsapp') {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30"
                                viewBox="0 0 31 32">
                                <title>Compartir en WhatsApp</title>
                                <path
                                  fill="transparent"
                                  d="M8 28.4L3.3 30.5 4.5 25.4C2.3 22.9 1 19.6 1 16 1 8 7.5 1.5 15.5 1.5 23.5 1.5 30 8 30 16 30 24 23.5 30.5 15.5 30.5 12.8 30.5 10.2 29.7 8 28.4Z"
                                />
                                <path d="M8.5 10.7C8.5 10.7 9.3 9.1 10.1 9.1 10.8 9 11.7 9 12 9.4 12.2 9.9 13.3 12.7 13.3 12.7 13.3 12.7 13.5 13.2 13.2 13.6 12.9 14.1 12.3 14.8 12.3 14.8 12.3 14.8 11.9 15.3 12.3 15.8 12.6 16.3 13.2 17.2 14.4 18.4 15.5 19.6 17.8 20.5 17.8 20.5 17.8 20.5 18.1 20.5 18.3 20.3 18.5 20.1 19.7 18.7 19.7 18.7 19.7 18.7 20 18.2 20.6 18.5 21.2 18.7 23.8 20.1 23.8 20.1 23.8 20.1 24.1 20.2 24.1 20.6 24.1 21.1 23.9 22.2 23.5 22.6 23.1 23 22 24.2 20.4 24.2 18.7 24.2 14.8 22.8 12.7 20.7 10.6 18.5 8.7 16.4 8.3 14.4 7.9 12.4 7.9 11.5 8.5 10.7Z" />
                              </svg>
                            )
                          }
                          return ''
                        })()}
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
        {!hideMenu && <Menu sections={sections} />}
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
