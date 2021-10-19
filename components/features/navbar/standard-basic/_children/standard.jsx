/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Consumer from 'fusion:consumer'
import * as React from 'react'

import Button from '../../../../global-components/button'
import { env } from '../../../../utilities/arc/env'
import { ContentTiers } from '../../../../utilities/constants/content-tiers'
import { ELEMENT_STORY } from '../../../../utilities/constants/element-types'
import {
  SITE_DIARIOCORREO,
  SITE_OJO,
  SITE_PERU21,
} from '../../../../utilities/constants/sitenames'
import importRetry from '../../../../utilities/core/import-retry'
import getResponsiveClasses from '../../../../utilities/responsive-classes'
import { socialMediaUrlShareList } from '../../../../utilities/social-media'
import {
  getBtnSignScript,
  getBtnSubsScript,
  navBarLoaderScript,
  searchScript,
  singwallScript,
  stickyScript,
} from '../_dependencies/scripts'
import Menu from './menu'

const SignwallComponent = React.lazy(() =>
  importRetry(() =>
    import(
      /* webpackChunkName: 'navbar-signwall' */ '../../../signwall/main/default'
    )
  )
)

// se quitó el estilo hidden en searchContainer
const classes = {
  nav: `nav text-white text-sm w-full flex items-center top-0 secondary-font`,
  wrapper: `nav__wrapper flex items-center bg-primary w-full top-0 h-inherit justify-between lg:justify-start pl-10 pr-10`,
  form: 'flex position-relative items-center',
  search: `nav__input-search border-0 w-0 text-md pt-5 pb-5 rounded-sm line-h line-h-xs`,
  navContainerRight: `nav__container-right position-absolute lg:inline-block`,
  navBtnContainer: `flex items-center justify-start nav__container-menu lg:pr-10 lg:pl-10 border-r-1 border-solid`,
  searchContainer:
    'nav__search-box lg:flex items-center border-r-1 border-solid',
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
  btnContainer: 'flex items-center justify-end header__btn-container',
  btnSubscribe: `flex items-center btn capitalize text-md nav__btn-subs`,
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
  newsletterButton: 'nav__newsletter-button',

  newsInputCheckDesk: 'checkNewsCinDesk hidden',
  newsInputCheckMob: 'checkNewsCinMob hidden',
  newsCin: 'header-full__newsletter flex',
  newsCinDesk: 'header-full__newsletter-newsCinDesk',
  newsCinMob: 'header-full__newsletter-newsCinMob',
  newsCinTooltip: 'header-full__newsletter-tooltip showTooltipDesk',

  mujerItemDesk: 'nav-mujer__item-desk',
  mujerItemMob: 'nav-mujer__item-mob',

  menuRegion: 'nav-region',
  menuRegionL: 'nav-region__link',
  menuRegionI: 'nav-region__icon',
}

@Consumer
class NavBarDefault extends React.PureComponent {
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
    const {
      logo,
      logoLeft,
      arcSite,
      // contextPath,
      deviceList,
      hideMenu,
      requestUri,
      siteProperties = {},
      globalContentConfig: { query = {} } = {},
      globalContent: {
        content_restrictions: { content_code: contentCode = '' } = {},
        type = {},
      } = {},
      data: { children: sections = [] } = {},
      navbarData: { children: navbarSections = [] } = {},
      headerNewsletter,
    } = this.props

    const { activePaywall, activeSignwall, urlSubsOnline } = siteProperties

    const isPremium = contentCode === ContentTiers.Premium
    const isPreview = /^\/preview\//.test(requestUri)
    const search = decodeURIComponent(query.query || '').replace(/\+/g, ' ')
    const responsiveClass = getResponsiveClasses(deviceList)

    return (
      <>
        <nav className={`${classes.nav} ${responsiveClass}`}>
          <div className={classes.wrapper}>
            {/** ************* LEFT *************** */}

            <div className={classes.searchContainer}>
              <form className={classes.form} id="header-search-form">
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
                <button className={classes.btnSearch} type="submit">
                  <i className={classes.iconSearch} />
                </button>
              </form>
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
                    }) => (
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
                  )}
              </ul>
            </div>

            {arcSite === SITE_OJO && (
              <>
                <div className={classes.mujerItemDesk}>
                  <a href="/mujer">
                    <svg width={107} height={29} xmlSpace="preserve">
                      <image
                        width={107}
                        height={29}
                        href="data:image/png;base64,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 AABJRU5ErkJggg=="
                      />
                    </svg>
                  </a>
                </div>
              </>
            )}

            {arcSite === SITE_DIARIOCORREO && (
              <>
                {false && (
                  <>
                    <input
                      type="checkbox"
                      id="stNewsCinDesk"
                      className={classes.newsInputCheckDesk}
                    />
                    <label
                      htmlFor="stNewsCinDesk"
                      className={`${classes.newsCin} ${classes.newsCinDesk} `}>
                      <img
                        className={classes.newsletterButton}
                        src="https://cdna.diariocorreo.pe/resources/dist/diariocorreo/images/boton_correo.svg?d=1"
                        alt="icono newsletter"
                      />
                    </label>
                    <div id="HeaderNewsletter" style={{ display: 'none' }}>
                      {headerNewsletter}
                    </div>
                    {/* <div className={`${classes.newsCinTooltip}`}>{headerNewsletter}</div> */}

                    <input
                      type="checkbox"
                      id="stNewsCinMob"
                      className={classes.newsInputCheckMob}
                    />
                    <label
                      htmlFor="stNewsCinMob"
                      className={`${classes.newsCin} ${classes.newsCinMob}`}>
                      <img
                        className={classes.newsletterButton}
                        src="https://cdna.diariocorreo.pe/resources/dist/diariocorreo/images/boton_correo.svg?d=1"
                        alt="icono newsletter"
                      />
                    </label>
                  </>
                )}
                <div className={classes.menuRegion}>
                  <button
                    type="button"
                    className={classes.menuRegionL}
                    id="btn-region">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={classes.menuRegionI}
                      width={20}
                      height={20}
                      xmlSpace="preserve">
                      <path d="M16.738 12.591c-1.674.179-.745-1.146-1.149-1.656-.659.128-1.209 1.07-1.997.012-.609-.818-1.684-1.473-1.448-2.576.518-2.426 1.668-3.286 4.171-3.498.111-.432-.791-.46-.384-1.049.764-1.096-.188-1.377-.842-1.226-1.816.424-2.703-.769-3.723-1.82-.235-.245-.473-.517-.766-.665-.309-.158-.657-.24-.572.389.18 1.345-.636 2.035-1.753 2.503-.714.301-1.531.501-1.701 1.436-.218 1.199-.773.96-1.642.572-.71-.319.3-.958-.523-1.122-.675.507-1.111.939-.919 2.176.194 1.261 1.211 1.479 1.719 2.267 1.427 2.212 2.689 4.574 3.642 6.953.815 2.035 2.153 2.909 3.816 3.729 1.095.536 2.088 1.163 2.756 2.212h1.183c.242-1.374 1.083-2.572.753-4.172-.117-.564.065-1.71.38-2.584.237-.664-.522-1.93-1.001-1.881z" />
                    </svg>
                  </button>
                </div>
                {/* 
                  window.addEventListener("DOMContentLoaded", () => {requestIdle(() => {
                    const btnRegion = document.getElementById("btn-region")
                    const Nav = document.getElementsByTagName("nav")
                    if(btnRegion) {
                      btnRegion.addEventListener("click", (event) => {
                        for (var i = 0; i < Nav.length; i++) {
                          if(Nav[i].classList.contains('nav__wrapper')){
                            Nav[i].classList.toggle("hidden")
                          }
                        }
                      })
                    }
                  })})
                */}
                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: `"use strict";window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=document.getElementById("btn-region"),n=document.getElementsByTagName("nav");if(e){e.addEventListener("click",function(e){for(var t=0;t<n.length;t++)n[t].classList.contains("nav__wrapper")&&n[t].classList.toggle("hidden")})}})});`,
                  }}
                />
              </>
            )}
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
                    {this.shareButtons.map((item) => (
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
                {activePaywall && (
                  <Button
                    btnText="Suscríbete"
                    btnClass={`${classes.btnSubscribe}`}
                  />
                )}
                {activeSignwall &&
                  (isPremium && typeof window !== 'undefined' ? (
                    <React.Suspense
                      fallback={
                        <div style={{ padding: '30px' }}>Cargando...</div>
                      }>
                      <SignwallComponent classButton="flex items-center btn capitalize text-md nav__btn-sign" />
                    </React.Suspense>
                  ) : (
                    <button
                      aria-label="Ingresar / Mi perfil"
                      id="signwall-nav-btn"
                      site="elcomercio"
                      className="flex items-center btn capitalize text-md nav__btn-sign"
                      type="button">
                      <i
                        id="signwall-nav-icon"
                        className="nav__icon icon-user title-sm text-primary-color"
                      />
                      <span
                        id="signwall-nav-user"
                        className="capitalize"
                        aria-hidden="true">
                        {arcSite === SITE_DIARIOCORREO
                          ? 'Regístrate'
                          : 'Iniciar'}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
          {!hideMenu && <Menu sections={sections} />}
        </nav>
        {arcSite === SITE_OJO && (
          <>
            <div className={classes.mujerItemMob}>
              <a href="/mujer">
                <svg width={360} height={37} xmlSpace="preserve">
                  <image
                    width={360}
                    height={37}
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAawAAAAlCAYAAAAeAN0IAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAY C0lEQVR42u1dWY8dx3X+Tt++984MKXE45NDDVRYXSZQUSREoJVoSyYgCxcoCw4CRBTEcGwmcR7/k JclDfkFe7JcgSB7thyAIAkmBFSuCA1mAbNCSLUoyJVFLuIjD4VDkjGbnTJ88dFd1dW1d3bfvcJZ7 gJF4q6tOnTpddbY6VU1TS5cZEggAgRgAMUDpb3D2hEQdAMzZMwLAoFZaThzBD1l9omKf4OwvyvvI +iEi0XlWxCCQWivFpNcR9KPQXMOv/oxkIRllJkQWGoyxssBHKKkseVEPktIazJwNl7KBO+oBYLCn RqLgpEIrN8asJQOU/WZO/0+UlTCbrXR2JCxpk++bEjCARNKi0uceRd4Pp/OdGZxQhjcBa30zs1LG shsmc+z5/LPRwEg4XTpRNj8SytpwPlfX5Puy0ZrOLSbzvef9CT4rNJMoo2ws+btQaTbp5mycUUan wJWuWig8sPGcjXebQF1vzEk2uiiTBgnymUhyzshpABZDKZSp8yKd7woHmQs4ZbngIQtesc5072qw zSiAscapPCOtXNCawL3aC72xf63CmCVbF8q0ixsyZVAQxFXeaXhHVrTG6ylqpFwIlrQkN0bveChE WQG54qeyupqirsGn4p+lBhEi8iurHJNvfNpqVvu36i07l4lIChe9L9cSZAKaXpxSbhPp06gKht5p QJF1zWHdeEAVyzcrB251/1sNShSWImg0QSHEIrNqjZAHg1JGNu8IBY/IZxmXqQq1by54SybkAtAi VB0Ny/wgzn2ITCj7KMwVFSO3AFOzLkn/oPxxAiqUC49DV1geCjM+M/tVEnnFiuq5KkqrjDkWfjur AanXY5kLqicAjjKMLtOmbL6oNjAbZQW2qW3IrV5Ie+nFMZCdViqOwjZvitY6DC/D1nchmuEeXjke pZz1KEVNUL1s0w5ipV+TYL1b63x10OZeko4GnrXi876czxggDpNj5bB91KJHYXl9j0I1ck4pG7Dy 36CqcuWqay10jYSrNqXTEqHqF4GCFy4fwaZQUgUlxBVlIRdZk/O/KPNKZDkYEcSLVBWeW3GJ8K5u hNjqRZUXgwi/1Hkfdn6pgtMZZlMEXL0FLBRwSduawtnE6zbuTJnJsId8mwtplI678TCKvoq1uRoS Pg95zUFTIaQSV25dGlTpkZd9CWhtcAgKCaqejwRWY8CyZhkmax0Z/mZTMOnzUlpkahmcYllbiC4F oo41ZAT2SizVFHvCS7oXlAbOiTnztUiGymx/Kn9SxUW5opPcsPVloSTgvYWobe/+oLVfMqp6wTSl bTuYipdlo61MVYZY56G+fRjkiokKSyjvlixrr0EKakk8Lm1oU37kxOV6SkatYh81OBEc7+2/51Ml sr0dFZMLNIVlCxmUTdDsGfunpOzBEG5paMVoLTwMVUjDLjJc1qHXalSERV5f24+xMsxvT5EIA1qf U85N1YvSkkrgaFuqgJDvPVGmCFkT4CaPIDd1XW85TJ1pitLo0vQo9TlDwvUL6ts1GBtU2JQmX8JJ Fl72xeysZNm9Qj0saPPBcsFGsFeu5wGTnlgABHiXNiNVJIH42vUict1GQhlWu1LzhcrF/9ksr7O5 Sf1VNdsnEJiDorBUdzyc0fU2qUV/urArWlW2LK0QKE22sCirMGaVKys3Q4Q6EYpKDQMafl6NP1tL VoSFJ5BJwlBxKUIqdcWthkhD4MNU8EbQy3w0qQ/yp5oSSl40Dn426WzVUSqBezDp1Oq/eHVGWWx1 e1KiGw220lj8UBoSJC4TPkJYh4QDbYxl+4SyTj9LqS2BQ8HtJMWwWhP9YXnf+jicnlUEkUSR7x+R Y19DJGH4vSmzjpllSERoEYE58Xpa0rMpSXShYrzKwq9Sm7dAm14m+nGw12xr7GORlQQKyIyU7cU/ rdUdPpBH2Zt0qP9W+lPtqWx/o+gXet5N6dDY7j1pPC3zsCrsPpfSbJ0z2T4kM5d7ZY7AjzkG/wGN Agm15b474hG886VHG7xjCut/K0LcM4Y+8SpQxDTXX8mk8Fv5XM6GOhZ09VFYOxMJGexTLgF7AgS/ UU1EipxJ36A4MhQO9nM3Lla6UL9/9TQu3TiHxdX5lANMOL73IZwYf6CUgpfOPp9mHmbZcLtHxrB7 ZAxjI2MY27G7jEPWJ5dnruPH753B2clPsf/2MTx19324Z+KA0bopSN9F+fGFJtbYeq/VKsDBhbUw DWCdwVBYqeOhblqL6aiH1ChMUKu4yTyymiYZQEo1Pf0Xzl+CKhOjHIKNBilA9T0VUWY29B8QJkRg MNmtb84yvCKyHnWGT0zl5z3VA7Yi6aTM88pN0HwPJQEX6OBCKxCBExHWZC9m4wlDMfVz74k95r8Q qvoOU5lDJGl11mHcNX4Kh3adwL+/9V387PzLILQAfB8Hd53Anz38HRwaPWbFe/HGefz32RdA1AJz C0QtPHP3s3jkjkclbhlBrQC/uPAhzk5eBKGFy7M38J9v/hwnnztgjIGy/SBW37DVq62SJ6seDVDa komrkGZu4zsy2mSzci/Kucest848y+AUYhsb2BeWRxZJIOWwt+nhWw8PVwKLzOwRfNj0A99bGWof HK4V87ZA72wOoYO8ZfVfttiALklLcIaXyr06ghquETd8hNDr2BkzJYTRjOsstuDqDS2sgL3zkc4u fP3U32H38BfkLLk08xG+95O/x8LKnLXtUHsYgCL3AuZ5yIgeOnwM3bgt/cdn7889PWsqxpbaYwmB asbcdgqDDSCHYtKFYa2I/5h7I1BLg2I+ngi4sk+W7wNpMXVbvNoiuhkhCkj3rlh6jbaafh/ITLMv tGJfUoULWwjdIW21hAyRas8JXDQQkXdPpOxcVrXkCxvv4HwX5Vf+qPMh7/u5k98olC/enMcP3vie gWthZUHOZbmlZ/GcQwyGxZVlLK6sSPoOjI7hb5/7Gv76qWfxD3/0NUzsGoVQTtLjz14iMWHx5qrR r41/SzfXMLO46CeGwi1wf718TiskKAXVlYj76Ef5agjswfxFDiOysVwhdvxbkXNGV3VX/vaCentY jRp/Dmu+pzfk2f9wRtKqdlhWX4RWYIt7eDDWCSX4dn2KBOS/1CQMJSQkK/lDg6GlTYKhKJxdFgXo 2I4JPHvP1/HS2e/LZ29d/ik+uPo2TozfL1t9tjCNg6OHUwwOD+vVc6/h3cn3wUy498BJPHn0Ednl zy+8i/868yqWV9cARPjW43+Io+PpPtUb58/hh2fewNLqGggt3LFnHN984mmJd2p2Fj96+x1cuH4d f/Dggzgwugvfffl1jHS6ODGxF0+eOIzhTrpc3zp/GS/+8l3JgCdP3Il9u3ZganYO+27fibsmxvv6 Hpp8o7ZDdqmx0Jj2sEL/E87Z+Gffetsm4UCgJCRYzgeHhWxigstCtIu+8oylcKjiEdhalygYspXm WWwipOfjhf00TsgsL/Ivla8u01H75VCiJMbsDbmFKWsfhmJd3RM0+eoK6oYe5f3S8a8WMBEI/3vu RefYXB7WfftP4sPpj/HxtfN48cyP8MKZl+Wz6wuzWF69aeXRjYV5LK3ezAwLVugAPpm6gn986UX8 4vzH6MQx7j14AGMjI7j/0D7cWFjG6Y8v4wev/wqLK6nXNbO4nO3JRSC0st+En7z/f/iP0+/i/clp /zvxXTMUkp1X+Gf4OrWtaQ405lzPq+oCNSfIGUmgXvavNGodfTTlP243yBSW8nasAliBgofby1u1 X+gUHrqnCqX18LltPCppJdijKyrTPpA3Y2hJEkSR98YLUUf3kmQiA9tDEVkljdmmdqh3pwMVbhuv y3dRbj0EwUVvkALxjXRuwyNHnkHuXzLenjyNa/NTAIBr81MYG9mr9GP3sMZ2jGUb82n5ax+dVkcv k2L0VGq1nEBYvrkkn/3Lq/+D5dVlMBH23bYzrUXA6MgQODtucWV2Hm9fnM76iZDeah6BQRgdHsGV 2XkQWmAQpmbnNab1plSCoWcJbCYKOenstfuKtDbtw/TXf9y6UCPpotyCD29n32qt20MZkIx3hWKr EyYUdmdYBiV5flUH32LX4ufSiiQPJjfN4eaCn99uudS8/fnle/5c4UH6rl55/3kAwFqSYKSzI3/u 3MPKlA6peJRymOXqbwJhfnkOV2ZSRfnKr97C7NJC2i8zxnbslG1Gh4czoyRttyT3tajgYQGEqdlF +Xuo3Q7kSNM87hFfuHPnBAos21DjLsO+7RJw3FBQWKbfYNtbouKjQF4WhaiuJ8unlC2z1y7s3Gnx RrSc7PXCqLKFDRRvh0OxKSE9qm7h5hmEFk+rbESFhRA5atptGipVdOGLLPzuOVt/rHz3KKO4kLqf Y9qzYwIn9pzC/CJheoYxeQ344ZnXAACTmQIBgE8uz2Py6gLmFm5aXX7Vw2JlHpR5WAknmJ69imuf X5Xln83PIaIWiCJEFElcC0sreOvipKS+E0e4a2K3MqYIyJQWQPi1Q/vQjTs4dedBnLrzgEFzX2Se L2wcmuRhLa1HrNPYbWTs1dVe4Hny2vi3I3iTLjYfC2vscDZ7XCLHadBVRndIPR8KMqSS4IbqA7gV qoWkxj5/EEI/SmlqYv/6t479Pn72yZsgEKKIsbAyh3/+yT/hr578tqyzsspYXlnBtdkVEEW4a88V 4GSOo46HdWN+FhevXgBFEaIoRtxKvaAoShVVTC1QFGF2cRnnpqbRQoTHjh3BY8fSlJrDe3YpQVLK wn8sezsxMYbv/N5Y868l4ABy01B2lKoGRtwyaTZwjhqFGlmC2Va3CCmVvpBSP6V028xW5JqCXsvO kj9N8r9VqC5BXrgMtBgSU7/5q7bz0a0eIPYdwswP06qHIvV9NMGn9FeSfrs1oyhC8TMW/hNZ1tcv zotRmVWv5Cs6Ktq+jKxfb8RZYgtLQs02a0ki6z948FEcHz+OD6c/QhS1sLbGmFm6XqjfbUdYSwjt NiFZYyzdvFl4/uGlKXTiDoa7XXTbXVm+uLKMuaUFRJTiXVhZls/mlhcQxzGIIsStDtqtFgAgjlqI W220KEbU6mDvzp04vm8viElexswA1vJJABFwzjNDA70ZTfnUMwAI6Rd6I/uzyptDXGyu4En36BLz sZe6gMjCOkEaeq/OEgNPdr1as98K2JxQ/4vDDcHmewV2C7oAvglaIwFJBvxCzM5CeDCgL/YrpK0A Ot9++/jvoBNHaEWMdjvCY0cfKzzvdCIMd1votFsYGmqbe0IErK6tYXZhEdOzs5JXV2auYXrmOq7O fIYb859jZXVFNunGHbTjDrrxEOJWG+04VXQPHbkTcdRGHHcQRzEu3fjcOoYrM/MySzDfw2rJPawB DGA7QK6wvOdZ1CLz3EQ9qJ/YqfsobvBtwXoOMmf4nb5MSYgkIndafn7VFWtl9nH6+GT9Em/p+F39 2J8Eqr0aoKWx+6uU4nF9HRcQe1o5PH3iORzafRCdDmFnt4snjj5VaNvtxGjHEYa6MbrtFrqdTuH5 2I7b0G3HGO52MNRuQxzDuHTjCrqdDoY7XXTaqQIS0I5jdNodtOM2unEXnThVgkf27MV9B4+gRS3E URtXZuawuFL06ADG1Ow8hjstMSLlLzNOtkLoiZ0/giFoyjAN0vQ2Kbg9rFu0AErzKG45cMlkr0as z2sia1gvGHODtTYQNDQX/uThv0QcMZ489pTxrNMiDHVidITSiose1jP3PY7hoSF0O20MDw3h+TOv YHJmGvt3jWO4O4ROp4vhbhdxqyXbDMVddOIOhtpDaMdtdFp5KPGrDz+Mo3vHATBWVtfw8jsfSKW1 uLKKn370Ke6ayPen0hmRKqyBh9UEDPi3WcC+hxWwRynuOwv5hLqIuNeRNWKPotZemFahiTwCdz/i MmC9hn7OjBUvq5xz3qcVxuKkW2wAuZB5LiIRO4C2J2EU1QEbQWRcALqwMovzMx/g2vxlXJr5EATC cHsnDu46DgC4e98D+Pbjf4PdI/tkm/em3gEz4579J7LbqyIwRxjqdPDu5FmM79iD8dvG8cenvoL9 o/tx8foVfDpzBQkn2Nkdxv2HjmNxdRktaoER4fPlBVy4fhWHd4+jHcfotrsgbiGiGHErtxWHO218 44nfxCfT1/D6x+cxs7CEfzt9BoQId+/fiwcO7UO3EwOc4Py1eQCEQ3t2Kkk1hAvX5nF47w4Hz/L9 sAG4oImUngH0G2hq6XIqypmUYzmpyyxOgBSAM+suu+2YLN9h0rqA+AqvknictRVbx/niFbepq19p zdI8VBLSg7VaErW8+V3rJ6cbYIpki/wietPRdN3Qzsp49BZCYRWVuMuJzSjuKR3Krk3YkgVoZgvm 6dfpBe2CTiXpgjm9IocA22JORF/WJ+J6nWJ/JlXqdXRsPmW9rKhcOVEO5MojFwmYSVABVbWGJB2k fXCqtAQOKtYACImcWym/mfL+dHjl7C/x4/fehjjc+8U9X8A3n3gqS8tX8w0Ya8xp0gWSNJEGjASE nKD8tnFOxDxNSj54miVrcEZfpsASjQvi0Lk6L3U8ad9RWo8zXsncfna0s4WwxXGE7AM4vJbxPcoU LBWSLtQ5k9IOeZuMCgkV+yRmJOo6SzhLHCGNbk8SELvmes5bjQrxVkAcaXVZPstzacjIvy9w3ZF0 sd1UbG9JF9voDqv1hWrTMKj2Bj98uBGp63V2X5/PEyj0my6G2r1/im67g+0KrwFsbRismg0I+XVN De5DbeCFvb6k9T/0s7iyjH997QVMzl7H6PDt+NYTXy6cz2IwvrhnX4+9DGAA2w9ueVr7APoAG9Fd 2UZweWYal2fTe/9uLM7hjQvnCh7WxO2jeOjwHbeazAEMYNOB696dRoFRL+HCTxCX1uiH5PYd782/ VuqmQU9VF1/cNXsJ8QR8L0rnjy+posph6zLo871qfcXeTEdD7Y7kdzdu4+TEEcwspBfSTtw+ir94 /GkMa6nyVnAk52xWe8S+X1t/NMwBN7YMYEvB5ggJNhrFaeCalvyGnL5BTqWN3nwDvefPsNCGjhZa yN341B4YHcefPvq7ePP8OdxYmMPZyQu4vjCHrzz0G/j1I8cqj3gglQcwgBRyhRWcaV08pKjen9YE mBfU2q9NClM7yqDI5pMx3Jlibr/OPl5xgDWS4R9PreJTLa08z63Teyqey7J/X6g54aZe8GR7FnS9 dvAGmz0zy8HAkkpmKQfUyfsot9y5kNpnwr3778S9+48Weunl3TD7b//3H9fgPtzPtzEhiMPWOTQw CjYD1N/DCn6/7rsk+gHNyWvX/XYuQRUSouyNiiyRuUelVFycxXBtg9mJt2z9N6uw17O/Js7mNT++ /tJgx6tc0twX4IGO2qRQorBctnV+tqk38Oyr1GsJU8QrbcybWpWzM9XIYM/T4gcUw1aG65ql4hFk ktcABXGIQ6x6cQmVnc48LBkGZPnshpU2TU1W8oA0nqnn9kLqV4fy68hqLwXO0zFUPKb503sOd2Pe t9Oda1YDGOe46mNqlK717jn1rreBexwAXoVlFco1dVVx7oUEbKrWKMdrPOVwTFX65gDZYk3F0L7r VKl3qSSV9iWC3CfA3EHN0HGFJ4S4X0QgL7iY1GPwoSbYvqlVia6eaAjze0PfUN1wIDe7SIJGIL/v VpFm9yxqQtjXHOzAi2sUCgpr/fK73F5QXYFdB8hhz4aNxn+7h3vsosihXHsafqlPgqJy7F9PVWuH ihTrtpb8vog+yuqUBhGnu+peY6wafq5tKqwXBJqOgd4c98q7mvQNYHOCw8NShadrL0f9R53YO5dh 9gNz9f0q7eqcotKxpQ9zOSqDb/LyJsvVOEp7Ig1bHiYT3lJZqEzWk/2UuXaacUCe8bOjXI7SR5lK R12P0X/Xfv5bT0Dp1R8JoJfF1UhNAGn6z0JjUx4j6VeX+b4osPnAmUDl2nm4xeMMDXhu1vfRD6ie dNFn3qlyR32FoXc+rI99FRbCMi19i/C3elrCYGDDE+OszKcMA1nVH6Cgosag6fe9UU499Y9nW0P4 rfdb6f88G0AIZAqrYtJBfkuuv16hhm3j2u0R6Gm81j6Me3nF5mT4osxzI1yehHtMpV4GlYcG7Z6W ecM7sy87sCw1gqFeapt6b2qyRWJW91j1XKKwq3i+xS8kG0Pyc8/bT93EAJ0Op3kehNsfGss4qa0n /asC8v5hO/PKQVwkK+aQdOlMvvvnWZGtxqyr7AnY33lqkyVG7cZUrSd6UA/s63y9lFKTR1k2Ovw/ a9IBjiX74S8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMjJUMTY6NTI6MDArMDA6MDDpCPig AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTIyVDE2OjUyOjAwKzAwOjAwmFVAHAAAAABJRU5E rkJggg=="
                  />
                </svg>
              </a>
            </div>
          </>
        )}
        <div id="nav-pointer" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `${
              activeSignwall && !isPreview ? singwallScript(arcSite) : ''
            }${stickyScript}${searchScript}${
              activePaywall && !isPreview
                ? getBtnSubsScript(env, arcSite, urlSubsOnline)
                : ''
            }${
              activeSignwall && !isPreview && !isPremium
                ? getBtnSignScript(env, arcSite)
                : ''
            }${hideMenu ? '' : navBarLoaderScript}`,
          }}
        />
      </>
    )
  }
}

export default NavBarDefault
