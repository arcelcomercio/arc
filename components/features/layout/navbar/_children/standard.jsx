import Consumer from 'fusion:consumer'
// import ENV from 'fusion:environment'
import React, { PureComponent } from 'react'

import Button from '../../../../global-components/button'
import SignwallComponent from '../../../signwall/standard'

// import Signwall from '../../../signwall/default'
// import SignWallHard from '../../../signwall/_main/signwall/hard'
// import SignWallVerify from '../../../signwall/_main/signwall/verify'
// import SignWallReset from '../../../signwall/_main/signwall/reset'
// import SignWallRelogin from '../../../signwall/_main/signwall/relogin'
// import SignWallPayPre from '../../../signwall/_main/signwall/paywall-premium'
// import Services from '../../../signwall/_main/utils/services'

import ConfigParams from '../../../../utilities/config-params'

import Menu from '../../../../global-components/menu'
// import Ads from '../../../../global-components/ads'
// import GetProfile from '../../../signwall/_main/utils/get-profile'

import {
  getResponsiveClasses,
  searchQuery,
  popUpWindow,
  socialMediaUrlShareList,
} from '../../../../utilities/helpers'

// const services = new Services()

const classes = {
  nav: `nav text-white text-sm w-full flex items-center top-0 secondary-font`,
  wrapper: `nav__wrapper flex items-center bg-primary w-full top-0 h-inherit justify-between lg:justify-start pl-15 pr-15`,
  form: 'flex position-relative items-center',
  search: `nav__input-search border-0 w-0 text-md pt-5 pb-5 rounded-sm line-h line-h-xs`,
  navContainerRight: `nav__container-right position-absolute hidden lg:inline-block`,
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
  btnContainer: 'flex items-center justify-end header__btn-container',
  // btnLogin: 'nav__btn flex items-center btn capitalize text-md font-bold', // Tiene lógica abajo
  btnSubscribe: `flex items-center btn hidden capitalize text-md font-bold md:inline-block`,
  // iconLogin: 'nav__icon icon-user',
  // iconSignwall: 'nav__icon rounded position-absolute uppercase',
  // btnSignwall: 'nav__btn--login', No contemplado en diseño
  navLoaderWrapper: 'nav__loader position-absolute w-full',
  navLoader: 'nav__loader-bar  w-full h-full',
  navStoryTitle: 'nav__story-title position-relative overflow-hidden',
  navStorySocialNetwork: 'nav__story-social-network position-relative mr-5',
  // iconSignwallMobile: 'uppercase ',
  // btnSignwallMobile:
  //   'nav__btn--login-m bg-secondary text-primary-color rounded',
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
    this.state = {
      statusSidebar: false,
      statusSearch: false,
      scrolled: false,
      // isActive: false,
      // showHard: false,
      // showVerify: false,
      // showReset: false,
      // showRelogin: false,
      // showPaywall: false,
      // userName: new GetProfile().username,
      // initialUser: new GetProfile().initname,
      // countAnonymous: 0,
      // countRegister: 0,
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

    this.shareButtons = {
      firstList: [
        {
          icon: classes.iconFacebook,
          link: urlsShareList.facebook,
          mobileClass: classes.mobileClass,
        },

        {
          icon: classes.iconTwitter,
          link: urlsShareList.twitter,
          mobileClass: classes.mobileClass,
        },
        {
          icon: classes.iconLinkedin,
          link: urlsShareList.linkedin,
          mobileClass: classes.mobileClass,
        },
        {
          icon: classes.iconWhatsapp,
          link: urlsShareList.whatsapp,
          mobileClass: `block md:hidden ${classes.mobileClass}`,
        },
      ],
    }
  }

  componentDidMount() {
    // const { arcSite } = this.props

    window.addEventListener('scroll', this._handleScroll)
    this.listContainer = document.querySelector('.nav-sidebar')
    this.layerBackground = document.querySelector('.layer')

    if (
      this.listContainer !== null &&
      this.listContainer !== 'undefined' &&
      !/iPad|iPhone|iPod/.test(window.navigator.userAgent)
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

    if (this.layerBackground !== null && this.layerBackground !== 'undefined') {
      this.layerBackground.addEventListener('click', () => {
        this.toggleBodyOverflow()
        this._closeMenu()
      })
    }

    this.isStory = !!window.document.querySelector('meta[name="section-id"]') // TODO: temporal

    // ---------- Start Premium & Paywall ----------- //

    // if (arcSite === 'gestion') {
    //   this.getPaywall()
    // }

    // ---------- End Premium & Paywall ------------ //
  }

  // componentDidUpdate() {
  //   if (this.checkSession()) {
  //     // eslint-disable-next-line react/no-did-update-set-state
  //     this.setState({
  //       userName: new GetProfile().username,
  //       initialUser: new GetProfile().initname,
  //     })
  //   } else {
  //     // eslint-disable-next-line react/no-did-update-set-state
  //     this.setState({
  //       userName: 'Iniciar Sesión',
  //       initialUser: false,
  //     })
  //   }
  // }

  // getPremium() {
  //   const W = window
  //   if (!this.checkSession()) {
  //     W.location.href = '/?signwallPremium=1'
  //   } else {
  //     return this.getListSubs().then(p => {
  //       if (p && p.length === 0) {
  //         W.location.href = '/?signwallPremium=1'
  //       }
  //       return false // tengo subs :D
  //     })
  //   }
  //   return false
  // }

  // getPaywall() {
  //   const { arcSite } = this.props
  //   const W = window

  //   const dataContTyp = W.document.querySelector('meta[name="content-type"]')
  //   const dataContSec = W.document.querySelector('meta[name="section-id"]')
  //   const dataContentPremium = W.content_paywall || false

  //   const URL_ORIGIN =
  //     ENV.ENVIRONMENT === 'elcomercio'
  //       ? `https://api.${arcSite}.pe`
  //       : `https://api-sandbox.${arcSite}.pe`

  //   // this.checkIsEco().then(res => {
  //   //   window.console.log(res)
  //   // })

  //   // if (dataContentPremium && ENV.ENVIRONMENT !== 'elcomercio') {

  //   // if (dataContentPremium && W.document.cookie.indexOf('isECO=true') >= 0) {
  //   if (dataContentPremium) {
  //     this.getPremium() // Only sandbox ;)
  //   } else if (window.ArcP) {
  //     W.ArcP.run({
  //       paywallFunction: campaignURL => {
  //         // if (ENV.ENVIRONMENT === 'elcomercio') {
  //         //   if (
  //         //     campaignURL.indexOf('signwallPaywall') >= 0 &&
  //         //     W.location.pathname.indexOf('podcast') >= 0
  //         //   ) {
  //         //     window.console.log('signwallPaywall')
  //         //     this.checkIsEco().then(res => {
  //         //       if (res === true) W.location.href = campaignURL
  //         //     })
  //         //   } else if (campaignURL.indexOf('signwallHard') >= 0) {
  //         //     window.console.log('signwallHard')
  //         //     W.location.href = campaignURL
  //         //   }
  //         // } else {
  //         //  window.console.log('signwallHard & signwallPaywall')
  //         W.location.href = campaignURL
  //         // }
  //       },
  //       contentType: dataContTyp ? dataContTyp.getAttribute('content') : 'none',
  //       section: dataContSec ? dataContSec.getAttribute('content') : 'none',
  //       userName: W.Identity.userIdentity.uuid || null,
  //       jwt: W.Identity.userIdentity.accessToken || null,
  //       apiOrigin: URL_ORIGIN,
  //       customSubCheck: () => {
  //         // estado de suscripcion
  //         return this.getListSubs().then(p => {
  //           const isLoggedInSubs = !!(
  //             W.localStorage.getItem('ArcId.USER_PROFILE') !== 'null' &&
  //             W.localStorage.getItem('ArcId.USER_PROFILE')
  //           )
  //           return {
  //             s: isLoggedInSubs,
  //             p: p || null,
  //             timeTaken: 100,
  //             updated: Date.now(),
  //           }
  //         })
  //       },
  //       customRegCheck: () => {
  //         // estado de registro
  //         const start = Date.now()
  //         const isLoggedIn = !!(
  //           W.localStorage.getItem('ArcId.USER_PROFILE') !== 'null' &&
  //           W.localStorage.getItem('ArcId.USER_PROFILE')
  //         )
  //         return Promise.resolve({
  //           l: isLoggedIn,
  //           timeTaken: Date.now() - start,
  //           updated: Date.now(),
  //         })
  //       },
  //     }).then(() => {
  //       this.initCounters()
  //     })
  //     // .then(() => {
  //     // W.console.log('Results from running paywall script: ', results)
  //     // })
  //     // .catch(() => W.console.error())
  //   }
  // }

  // getListSubs() {
  //   const { arcSite } = this.props
  //   const W = window
  //   return services
  //     .getEntitlement(W.Identity.userIdentity.accessToken, arcSite)
  //     .then(res => {
  //       if (res.skus) {
  //         const result = Object.keys(res.skus).map(key => {
  //           return res.skus[key].sku
  //         })
  //         this.listSubs = result
  //         return result
  //       }
  //       return []
  //     })
  //     .catch(err => W.console.error(err))
  // }

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

  _setPosition = posX => {
    this.listContainer.style.transform = `scaleX(${posX})`
  }

  _openMenu = () => {
    this._setPosition(1)
    this.layerBackground.style.display = 'block'
    this.setState({
      statusSidebar: true,
    })
  }

  _closeMenu = () => {
    this._setPosition(0)
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

  // // Saber si hay sesion inicada
  // checkSession = () => {
  //   const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
  //   const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
  //   if (profileStorage) {
  //     return !(profileStorage === 'null' || sesionStorage === '{}') || false
  //   }
  //   return false
  // }

  // initCounters = () => {
  //   const userId = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO'))
  //   const UUID = userId ? userId.uuid : window.Identity.userIdentity.uuid
  //   const localCounter = JSON.parse(window.localStorage.getItem('ArcP'))

  //   if (localCounter) {
  //     if (localCounter.anonymous) {
  //       const cAnon = localCounter.anonymous.v.ci.length || 0
  //       this.setState({
  //         countAnonymous: cAnon,
  //       })
  //     }

  //     if (UUID && localCounter[UUID]) {
  //       const cReg = localCounter[UUID].v.ci.length || 0
  //       this.setState({
  //         countRegister: cReg,
  //       })
  //     }
  //   }
  // }

  // // check Url string popup
  // getUrlParam = name => {
  //   const vars = {}
  //   window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
  //     vars[key] = value
  //   })
  //   if (vars[name]) {
  //     setTimeout(() => {
  //       switch (name) {
  //         case 'signwallHard':
  //           this.setState({ showHard: true })
  //           break
  //         case 'tokenVerify':
  //           this.setState({ showVerify: true })
  //           break
  //         case 'tokenReset':
  //           this.setState({ showReset: true })
  //           break
  //         case 'reloginEmail':
  //           this.setState({ showRelogin: true })
  //           break
  //         case 'signwallPaywall':
  //         case 'signwallPremium':
  //           this.setState({ showPaywall: true })
  //           break
  //         default:
  //         // return false
  //       }
  //     }, 500)
  //   }
  //   return vars[name]
  // }

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
    const el = document.querySelector('.story-header__list')
    if (el.classList.contains('block')) {
      el.classList.remove('block')
      el.classList.add('hidden')
    } else {
      el.classList.remove('hidden')
      el.classList.add('block')
    }
  }

  // checkIsEco = () => {
  //   const response = services.getIpEco().then(res => {
  //     return !!(
  //       res.ip === '200.4.199.49' ||
  //       res.ip === '201.234.125.242' ||
  //       res.ip === '201.234.62.52'
  //     )
  //   })
  //   return response
  // }

  // closeSignwall() {
  //   this.setState({ isActive: false })
  // }

  // closePopUp(name) {
  //   switch (name) {
  //     case 'signwallHard':
  //       this.setState({ showHard: false })
  //       break
  //     case 'tokenVerify':
  //       this.setState({ showVerify: false })
  //       break
  //     case 'tokenReset':
  //       this.setState({ showReset: false })
  //       break
  //     case 'reloginEmail':
  //       this.setState({ showRelogin: false })
  //       break
  //     case 'signwallPaywall':
  //       this.setState({ showPaywall: false })
  //       break
  //     default:
  //       return null
  //   }
  //   window.history.pushState({}, document.title, '/')
  //   return null
  // }

  render() {
    const {
      statusSidebar,
      scrolled,
      // isActive,
      // userName,
      // initialUser,
      // showHard,
      // showVerify,
      // showReset,
      // showRelogin,
      // showPaywall,
      // countAnonymous,
      // countRegister,
    } = this.state
    const {
      logo,
      logoLeft,
      arcSite,
      siteProperties,
      contextPath,
      deviceList,
      globalContentConfig: { query = {} } = {},
      globalContent: { type = {} } = {},
      data: { children: sections = [] } = {},
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
                  ref={this.inputSearch}
                  type="search"
                  defaultValue={search}
                  /* onBlur={this._handleCloseSectionsSearch} */
                  onKeyUp={this._handleKeyDown}
                  placeholder="¿Qué Buscas?"
                  className={`${classes.search} ${this.activeSearch()}`}
                />
                <Button
                  iconClass={classes.iconSearch}
                  btnClass={`${classes.btnSearch} ${this.activeSearch()}`}
                  onClick={this.optionButtonClick}
                />
              </form>
            </div>

            <div className={classes.navBtnContainer}>
              <Button
                iconClass={classes.iconMenu}
                btnClass={classes.btnSection}
                btnText="Menú"
                onClick={this._handleToggleSectionElements}
              />
            </div>

            {/** ************* MIDDLE *************** */}
            <div className={classes.listContainer}>
              <ul className={classes.list}>
                {sections &&
                  sections
                    .slice(0, 7)
                    .map(
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
            <a href="/" className={classes.mobileLogo}>
              <img
                src={logo}
                alt={`Logo de ${arcSite}`}
                className={classes.logo}
              />
            </a>

            {type !== ConfigParams.ELEMENT_STORY &&
              arcSite === ConfigParams.SITE_PERU21 && (
                <a
                  className={classes.logoLeft}
                  href="/el-otorongo?ref=portada_home&amp;ft=btn_menu">
                  <img
                    src={logoLeft.src}
                    alt={logo.alt}
                    className={classes.logoImage}
                  />
                </a>
              )}

            <div className={classes.navStoryTitle} />

            <div className={classes.navStorySocialNetwork}>
              {type === ConfigParams.ELEMENT_STORY && (
                <>
                  <div>
                    <a
                      className={classes.moreLink}
                      href={classes.moreLink}
                      onClick={event => {
                        this.openLink(event, 3)
                      }}>
                      <i className={`${classes.iconMore}`} />
                    </a>
                  </div>

                  <ul className={classes.listIcon}>
                    {this.shareButtons.firstList.map((item, i) => (
                      <li
                        key={item.icon}
                        className={` ${classes.item} ${item.mobileClass}`}>
                        <a
                          className={classes.link}
                          href={item.link}
                          onClick={event => {
                            this.openLink(event, item)
                          }}>
                          <i className={`${item.icon} ${classes.icon}`} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            {/** ************* RIGHT *************** */}

            <div className={`${classes.navContainerRight} ${responsiveClass}`}>
              {siteProperties.activeSignwall && (
                <div className={`${classes.btnContainer}`}>
                  {siteProperties.activePaywall && arcSite === 'gestion' ? (
                    <Button
                      btnText="Suscríbete"
                      btnClass={`${classes.btnSubscribe} btn--outline`}
                      btnLink={`https://suscripciones.${arcSite}.pe/?ref=${arcSite}`}
                    />
                  ) : null}

                  <SignwallComponent />

                  {/* <button
                    type="button"
                    id={
                      this.checkSession()
                        ? 'web_link_ingresaperfil'
                        : 'web_link_ingresacuenta'
                    }
                    className={
                      `${classes.btnLogin} btn--outline`
                    }
                    onClick={() => this.setState({ isActive: true })}>
                    <span>
                      {this.checkSession() ? userName : 'Iniciar Sesión'}
                    </span>
                  </button> */}

                  {/* {window.document.cookie.indexOf('isECO=true') >= 0 ? (
                    <strong>
                      {this.checkSession() ? countRegister : countAnonymous}
                    </strong>
                  ) : null} */}
                </div>
              )}
            </div>

            {siteProperties.activeSignwall && (
              <div
                className={`${classes.btnContainer} ${classes.navMobileContainer} ${responsiveClass}`}>
                <SignwallComponent typeMobile />
                {/* <button
                  type="button"
                  id={
                    this.checkSession()
                      ? 'web_link_ingresaperfil'
                      : 'web_link_ingresacuenta'
                  }
                  className={`${classes.btnSignwallMobile} ${
                    arcSite === 'peru21' ? 'bg-white' : null
                  }`}
                  onClick={() => this.setState({ isActive: true })}>
                  <i
                    className={
                      initialUser
                        ? `${classes.iconSignwallMobile} font-bold`
                        : `${classes.iconLogin} ${
                            classes.iconSignwallMobile
                          }  title-sm`
                    }>
                    {initialUser}
                  </i>
                </button> */}
              </div>
            )}

            {this.isStory && (
              <div className={classes.navLoaderWrapper}>
                <div className={classes.navLoader} />
              </div>
            ) /** TODO: temporal */}
          </div>
          <Menu
            sections={sections}
            showSidebar={statusSidebar}
            contextPath={contextPath}
            siteProperties={siteProperties}
          />
          <div className="layer" />
        </nav>

        {/* {isActive && <Signwall closeSignwall={() => this.closeSignwall()} />}

        {this.getUrlParam('signwallHard') &&
        !this.checkSession() &&
        showHard &&
        siteProperties.activeSignwall ? (
          <SignWallHard
            closePopup={() => this.closePopUp('signwallHard')}
            brandModal={arcSite}
          />
        ) : null}

        {this.getUrlParam('tokenVerify') &&
        showVerify &&
        siteProperties.activeSignwall ? (
          <SignWallVerify
            closePopup={() => this.closePopUp('tokenVerify')}
            brandModal={arcSite}
            tokenVerify={this.getUrlParam('tokenVerify')}
          />
        ) : null}

        {this.getUrlParam('tokenReset') &&
        showReset &&
        siteProperties.activeSignwall ? (
          <SignWallReset
            closePopup={() => this.closePopUp('tokenReset')}
            brandModal={arcSite}
            tokenReset={this.getUrlParam('tokenReset')}
          />
        ) : null}

        {this.getUrlParam('reloginEmail') &&
        !this.checkSession() &&
        showRelogin &&
        siteProperties.activeSignwall ? (
          <SignWallRelogin
            closePopup={() => this.closePopUp('reloginEmail')}
            brandModal={arcSite}
          />
        ) : null}

        {(this.getUrlParam('signwallPaywall') ||
          this.getUrlParam('signwallPremium')) &&
        showPaywall &&
        siteProperties.activePaywall ? (
          <SignWallPayPre
            closePopup={() => this.closePopUp('signwallPaywall')}
            brandModal={arcSite}
            typeModal={
              this.getUrlParam('signwallPaywall') ? 'paywall' : 'premium'
            }
          />
        ) : null} */}
      </>
    )
  }
}

export default NavBarDefault
