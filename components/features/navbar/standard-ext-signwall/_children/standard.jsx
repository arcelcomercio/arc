/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ENV from 'fusion:environment'

import SignwallComponent from '../../../signwall/main/default'
import getResponsiveClasses from '../../../../utilities/responsive-classes'
import searchQuery from '../../../../utilities/client/search'
import { socialMediaUrlShareList } from '../../../../utilities/social-media'
import { ELEMENT_STORY } from '../../../../utilities/constants/element-types'
import { SITE_PERU21 } from '../../../../utilities/constants/sitenames'

import Button from '../../../../global-components/button'
import Menu from '../../../../global-components/menu'

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

const popUpWindow = (url, title, w, h) => {
  const left = window.screen.width / 2 - w / 2
  const top = window.screen.height / 2 - h / 2
  return window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
  )
}

@Consumer
class NavBarDefault extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      statusSidebar: false,
      statusSearch: false,
      scrolled: false,
    }

    this.inputSearch = React.createRef()

    this.dragFlag = false
    this.initPointDrag = 0
    this.distDrag = 0
    this.limitScreenDrag = 90

    this.listContainer = null
    this.listWidth = 330
    this.layerBackground = null

    this.isStory = false // TODO: temporal
    this.listSubs = null

    const {
      siteProperties: {
        social: {
          twitter: { user: siteNameRedSocial },
        },
        siteUrl,
      },
      globalContent,
    } = props

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

  componentDidMount() {
    // const { arcSite } = this.props

    window.addEventListener('scroll', this._handleScroll)
    this.listContainer = document.body.querySelector('.nav-sidebar')
    this.layerBackground = document.body.querySelector('.layer')
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    const { hideMenu } = this.props

    if (
      this.listContainer !== null &&
      this.listContainer !== 'undefined' &&
      !isIOS &&
      !hideMenu
    ) {
      document.body.addEventListener('touchstart', this._initDrag, {
        passive: true,
      })
      document.body.addEventListener('touchend', this._endDrag, {
        passive: true,
      })
      document.body.addEventListener('touchmove', this._moveDrag, {
        passive: true,
      })
    }

    if (
      this.layerBackground !== null &&
      this.layerBackground !== 'undefined' &&
      !hideMenu
    ) {
      this.layerBackground.addEventListener('click', () => {
        this.toggleBodyOverflow()
        this._closeMenu()
      })
    }

    this.isStory = !!window.document.head.querySelector(
      'meta[name="section-id"]'
    ) // TODO: temporal
  }

  _initDrag = evt => {
    const { statusSidebar } = this.state
    this.initPointDrag = evt.offsetX || evt.changedTouches[0].clientX
    if (statusSidebar) {
      if (this.initPointDrag < this.listWidth) {
        this.dragFlag = true
      }
    } else if (this.initPointDrag < this.limitScreenDrag) {
      this.dragFlag = true
    }
  }

  _endDrag = () => {
    const { statusSidebar } = this.state
    this.dragFlag = false

    if (this.distDrag < this.limitScreenDrag) {
      if (!statusSidebar) this._closeMenu()
      else this._openMenu()
    }
    this.distDrag = 0
  }

  _moveDrag = evt => {
    if (this.dragFlag) {
      const { offsetX, movementX, changedTouches } = evt

      let dir = ''
      if (movementX) {
        dir = movementX > 0 ? 'right' : 'left'
      } else if (changedTouches && changedTouches[0]) {
        dir =
          changedTouches[0].clientX - this.initPointDrag > 0 ? 'right' : 'left'
      }

      const posX = offsetX || changedTouches[0].clientX
      this._drag(dir, posX)
    }
  }

  _drag = (direction, posX) => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    if (!isIOS) {
      const { statusSidebar } = this.state
      if (direction === 'right') {
        this.distDrag = !statusSidebar ? posX - this.initPointDrag : 0
      } else {
        this.distDrag = statusSidebar ? -(this.initPointDrag - posX) : 0
      }
      if (direction === 'right' || direction === 'left') {
        const listPos = statusSidebar ? 1 : 0
        this._setPosition(listPos + this.distDrag / this.listWidth)
      }
      if (Math.abs(this.distDrag) > this.limitScreenDrag) {
        this.toggleBodyOverflow()
        if (statusSidebar) this._closeMenu()
        else this._openMenu()
        this._endDrag()
      }
    }
  }

  _setPosition = posX => {
    this.listContainer.style.transform = `scaleX(${posX})`
  }

  _openMenu = () => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    if (!isIOS) this._setPosition(1)
    this.layerBackground.style.display = 'block'
    this.setState({
      statusSidebar: true,
    })
  }

  _closeMenu = () => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    if (!isIOS) this._setPosition(0)
    this.layerBackground.style.display = 'none'
    this.setState({
      statusSidebar: false,
    })
  }

  // Add - Remove Class active input and button search
  activeSearch = () => {
    const { statusSearch } = this.state
    return statusSearch ? 'active' : ''
  }

  // If input search is empty, buton close search else buton find search
  optionButtonClick = () => {
    const { statusSearch } = this.state
    // getDataNavBarData()
    if (statusSearch) this._handleSearch()
    else this.focusInputSearch()
    this.setState({ statusSearch: !statusSearch })
  }

  // Open search and automatic focus input
  focusInputSearch = () => {
    this.inputSearch.current.focus()
  }

  _handleSearch = () => {
    const { value } = this.inputSearch.current
    searchQuery(value)
  }

  // Active find with enter key
  _handleKeyDown = e => {
    e.preventDefault()
    const { value } = e.target
    if (value !== '' && e.which === 13) {
      this._handleSearch()
    }
  }

  // _handleDevice = device => {
  //   this._handleScroll()
  //   // ------ Add or remove Scroll eventListener on resize
  //   if (device === 'desktop')
  //     window.addEventListener('scroll', this._handleScroll)
  //   else window.removeEventListener('scroll', this._handleScroll)
  // }

  toggleBodyOverflow = () => {
    if (typeof window !== 'undefined') {
      if (document.body.classList.contains('overflow-hidden'))
        document.body.classList.remove('overflow-hidden')
      else if (window.innerWidth < 640)
        document.body.classList.add('overflow-hidden')
    }
  }

  _handleScroll = () => {
    const { scrolled } = this.state
    // ------ Logic to set state to hidden or show logo in navbar
    const { body = {}, documentElement = {} } = document
    const { scrollTop: scrollBody = 0 } = body
    const { scrollTop: scrollElement = 0 } = documentElement
    const scroll = scrollBody || scrollElement

    const header = Array.from(document.getElementsByTagName('header'))
    const headerTop = (header[0] && header[0].offsetTop) || 0
    // setTimeout(() => {
    //   console.log(header[0].offsetTop)
    // }, 2000)
    if (!scrolled && scroll > headerTop) {
      this.setState({
        scrolled: true,
      })
    } else if (scrolled && scroll <= headerTop) {
      this.setState({
        scrolled: false,
      })
    }
  }

  // Open - Close Search
  _handleToggleSectionElements = () => {
    const { statusSidebar } = this.state
    const { getDataNavBarData, data = [] } = this.props

    if (data.length === 0) {
      getDataNavBarData()
    }

    this.toggleBodyOverflow()
    if (statusSidebar) this._closeMenu()
    else this._openMenu()
  }

  // Close Search
  /* _handleCloseSectionsSearch = () => {
    setTimeout(() => {
      this.setState({
        statusSearch: false,
      })
    }, 250)
  } */

  openLink = (event, item) => {
    event.preventDefault()
    if (item === 3) this.moreList()
    else popUpWindow(item.link, '', 600, 400)
  }

  moreList = () => {
    const el = document.body.querySelector('.story-header__list')
    if (el.classList.contains('block')) {
      el.classList.remove('block')
      el.classList.add('hidden')
    } else {
      el.classList.remove('hidden')
      el.classList.add('block')
    }
  }

  checkSession = () => {
    if (typeof window !== 'undefined') {
      const profileStorage =
        window.localStorage.getItem('ArcId.USER_PROFILE') ||
        window.sessionStorage.getItem('ArcId.USER_PROFILE')
      const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
      if (profileStorage) {
        return !(profileStorage === 'null' || sesionStorage === '{}') || false
      }
    }
    return false
  }

  checkCookieMigration = () => {
    const { arcSite } = this.props
    if (typeof window !== 'undefined' && !this.checkSession()) {
      window.document.cookie = `ArcId.USER_INFO=;path=/;domain=.${arcSite}.pe; expires=Thu, 01 Jan 1970 00:00:01 GMT`
    }
  }

  render() {
    const _env = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
    const { statusSidebar, scrolled } = this.state
    const {
      logo,
      logoLeft,
      arcSite,
      siteProperties,
      contextPath,
      deviceList,
      hideMenu,
      globalContentConfig: { query = {} } = {},
      globalContent: { type = {} } = {},
      data: { children: sections = [] } = {},
      navbarData: { children: navbarSections = [] } = {},
    } = this.props

    const search = decodeURIComponent(query.query || '').replace(/\+/g, ' ')

    const responsiveClass = getResponsiveClasses(deviceList)
    // this._handleDevice(device)
    /* const _handleHide = () => {
      switch (device) {
        case 'desktop':
          return deviceList.showInDesktop

        case 'tablet':
          return deviceList.showInTablet

        case 'mobile':
          return deviceList.showInMobile

        default:
          return true
      }
    } */

    const queryReloginEmail = `"use strict";
    document.addEventListener('DOMContentLoaded', function () {
      requestIdle(function () {
        if (window.location.href.match(/reloginEmail=/)) { window.location.href = '${
          _env === 'prod'
            ? `/signwall/?outputType=signwall&reloginEmail=1`
            : `/signwall/?_website=${arcSite}&outputType=signwall&reloginEmail=1`
        }';}
      });
    })`

    return (
      <>
        <nav
          className={`${classes.nav} ${
            scrolled ? 'active' : ''
          } ${responsiveClass}`}>
          <div className={classes.wrapper}>
            {/** ************* LEFT *************** */}

            <div className={classes.searchContainer}>
              {/* <Ads
                    adElement="zocaloNav1"
                    isDesktop
                    classes={{ desktop: classes.ads }}
                  />
                    <Ads
                  adElement="zocaloNav2"
                  isDesktop
                  classes={{ desktop: classes.ads }}
                /> */}
              <form className={classes.form} onSubmit={e => e.preventDefault()}>
                <input
                  id="header-search-input"
                  ref={this.inputSearch}
                  type="search"
                  defaultValue={search}
                  /* onBlur={this._handleCloseSectionsSearch} */
                  onKeyUp={this._handleKeyDown}
                  placeholder="¿Qué Buscas?"
                  className={`${classes.search} ${this.activeSearch()}`}
                />
                <label
                  htmlFor="header-search-input"
                  className="overflow-hidden w-0 h-0">
                  Cuadro de búsqueda
                </label>
                <Button
                  iconClass={classes.iconSearch}
                  btnClass={`${classes.btnSearch} ${this.activeSearch()}`}
                  onClick={this.optionButtonClick}
                  showText={false}
                />
              </form>
            </div>

            {!hideMenu && (
              <div className={classes.navBtnContainer}>
                <Button
                  iconClass={classes.iconMenu}
                  btnClass={classes.btnSection}
                  btnText="Menú"
                  onClick={this._handleToggleSectionElements}
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
                  <div>
                    <a
                      itemProp="url"
                      title="Mostrar enlaces para compartir"
                      className={classes.moreLink}
                      href="/"
                      onClick={event => {
                        this.openLink(event, 3)
                      }}>
                      <i className={`${classes.iconMore}`} />
                    </a>
                  </div>

                  <ul className={classes.listIcon}>
                    {this.shareButtons.map((item, i) => (
                      <li
                        key={item.icon}
                        className={` ${classes.item} ${item.mobileClass}`}>
                        <a
                          itemProp="url"
                          title={`Compartir en ${item.name}`}
                          className={classes.link}
                          href={item.link}
                          onClick={event => {
                            this.openLink(event, item)
                          }}>
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
                    onClick={() => {
                      const { origin } = window.location
                      const outputType =
                        _env === 'prod' ? '' : 'outputType=subscriptions&'
                      const pf = _env === 'prod' ? '' : '/pf'
                      const connector =
                        _env !== 'prod' ? `?_website=${arcSite}&` : `?`
                      const link =
                        origin +
                        pf +
                        siteProperties.urlSubsOnline +
                        connector +
                        outputType
                      const ref = `ref=btn-suscribete-${arcSite}&loc=${(typeof window !==
                        'undefined' &&
                        window.section) ||
                        ''}`
                      window.location.href = link + ref
                    }}
                  />
                )}

                {siteProperties.activeSignwall && (
                  <SignwallComponent 
                    countOnly 
                    arcSite={arcSite} 
                    siteProperties={siteProperties}  
                    classButton="flex items-center btn capitalize text-md nav__btn-sign"
                  />
                )}

                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html:
                      '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE")||window.sessionStorage.getItem("ArcId.USER_PROFILE"))||{},n=e.firstName?e.firstName.toLowerCase():"",t=void 0===n||"undefined"===n?"":n,a=e.lastName?e.lastName.toLowerCase():"",c=void 0===a||"undefined"===a?"":a,o=document.getElementById("signwall-nav-user"),i=document.getElementById("signwall-nav-icon");if(t||c){var s="",d="";t&&c?(s="".concat(t," ").concat(c),d="".concat(t[0]||"").concat(c[0]||"")):t&&!c?d="".concat((s=t)[0]||"").concat(t[1]||""):!t&&c&&(d="".concat((s=c)[0]||"").concat(c[1]||"")),o.innerHTML=15<=s.length?"".concat(s.slice(0,15),"..."):s,i.innerHTML=d,i.className="uppercase"}else o.innerHTML=e.uuid?"Bienvenido Usuario":"Iniciar"})});',
                  }}
                />

                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: queryReloginEmail,
                  }}
                />
              </div>
            </div>

            {this.isStory && (
              <div className={classes.navLoaderWrapper}>
                <div className={classes.navLoader} />
              </div>
            ) /** TODO: temporal */}
          </div>
          {!hideMenu && (
            <>
              <Menu
                sections={sections}
                showSidebar={statusSidebar}
                contextPath={contextPath}
                siteProperties={siteProperties}
              />
              <div className="layer" />
            </>
          )}
        </nav>
      </>
    )
  }
}

export default NavBarDefault
