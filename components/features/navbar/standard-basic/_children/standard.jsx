/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ENV from 'fusion:environment'

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
import Menu from './menu'

const classes = {
  nav: `nav text-white text-sm w-full flex items-center top-0 secondary-font`,
  wrapper: `nav__wrapper flex items-center bg-primary w-full top-0 h-inherit justify-between lg:justify-start pl-15 pr-15`,
  form: 'flex position-relative items-center',
  search: `nav__input-search border-0 w-0 text-md pt-5 pb-5 rounded-sm line-h line-h-xs`,
  navContainerRight: `nav__container-right position-absolute lg:inline-block`,
  navBtnContainer: `flex items-center justify-start nav__container-menu lg:pr-10 lg:pl-10 border-r-1 border-solid`,
  searchContainer:
    'nav__search-box hidden lg:flex items-center border-r-1 border-solid',
  btnSearch: `flex items-center btn nav__btn nav__btn--search text-gray-200 hidden lg:flex`,
  btnSection: 'flex items-center btn nav__btn nav__btn--section p-5',
  iconSearch: 'nav__icon-search text-primary-color icon-search text-lg',
  iconMenu: 'nav__icon-menu icon-hamburguer title-sm',
  listContainer: 'nav__list-container',
  list: `items-center nav__list h-inherit hidden lg:flex pl-15`,
  listItem: 'nav__list-item text-center pr-15 h-full',
  mobileLogo: 'nav__mobile-logo position-absolute',
  listLink: `nav__list-link text-gray-200 h-inherit flex items-center uppercase secondary-font font-normal text-sm`,
  logo: 'nav__logo lg:hidden',
  logoLeft: 'header__logo-secondary',
  ads: 'nav__ads mr-5 ml-5 hidden',
  navMobileContainer: 'nav__mobile-container lg:hidden',
  btnSubs: 'nav__btn-subs',
  btnSign: 'nav__btn-sign',
  btnContainer: 'flex items-center justify-end header__btn-container',
  btnSubscribe: `flex items-center btn capitalize text-md`,
  navLoaderWrapper: 'nav__loader position-absolute w-full',
  navLoader: 'nav__loader-bar  w-full h-full',
  navStoryTitle: 'nav__story-title position-relative overflow-hidden line-h-sm',
  navStorySocialNetwork: 'nav__story-social-network position-relative mr-5',
  listIcon: 'story-header__list flex justify-between ',
  moreLink: 'story-content__more-link',

  item: 'story-header__item',
  link: 'story-header__link flex items-center justify-center text-gray-200',
  icon: 'story-header__icon',
  mobileClass: 'flex justify-center',
  iconFacebook: 'icon-facebook-circle',
  iconLinkedin: 'icon-linkedin-circle',
  iconRibbon: 'icon-ribbon',
  iconTwitter: 'icon-twitter-circle',
  iconWhatsapp: 'icon-whatsapp',
  iconMore: 'story-header__share-icon icon-share text-gray-200',
}

@Consumer
class NavBarDefault extends PureComponent {
  constructor(props) {
    super(props)

    const {
      siteProperties: {
        social: { twitter: { user: siteNameRedSocial } = {} } = {},
        siteUrl,
      } = {},
      globalContent,
    } = props || {}

    const { website_url: postPermaLink, headlines: { basic: postTitle } = {} } =
      globalContent || {}

    const urlsShareList = socialMediaUrlShareList(
      siteUrl,
      postPermaLink,
      postTitle,
      siteNameRedSocial
    )

    this.shareButtons = [
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
  }

  // this.isStory = !!window.document.querySelector('meta[name="section-id"]') // TODO: temporal

  render() {
    const _env = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
    const {
      logo,
      logoLeft,
      arcSite,
      siteProperties,
      // contextPath,
      deviceList,
      globalContentConfig: { query = {} } = {},
      globalContent: { type = {} } = {},
      data: { children: sections = [] } = {},
      navbarData: { children: navbarSections = [] } = {},
    } = this.props

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
                <label
                  htmlFor="header-search-input"
                  className="overflow-hidden w-0 h-0">
                  Cuadro de búsqueda
                </label>
                <button className={classes.btnSearch} type="button">
                  <i className={classes.iconSearch} />
                </button>
              </div>
            </div>

            <div className={classes.navBtnContainer}>
              <Button
                iconClass={classes.iconMenu}
                btnClass={classes.btnSection}
                btnText="Menú"
              />
            </div>

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
                    {this.shareButtons.map(item => (
                      <li
                        key={item.icon}
                        className={` ${classes.item} ${item.mobileClass}`}>
                        <a
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
                    className="flex items-center btn capitalize text-md nav__btn-sign"
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
          <Menu sections={sections} />
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
              siteProperties.activeSignwall
                ? getBtnSignScript(_env, arcSite)
                : ''
            }${navBarLoaderScript}`,
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
}

export default NavBarDefault
