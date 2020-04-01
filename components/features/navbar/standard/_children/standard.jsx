/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ENV from 'fusion:environment'

import getResponsiveClasses from '../../../../utilities/responsive-classes'
import searchQuery from '../../../../utilities/client/search'
import { socialMediaUrlShareList } from '../../../../utilities/social-media'

import Button from '../../../../global-components/button'
import SignwallComponent from '../../../signwall/main/default'
import Menu from '../../../../global-components/menu'

const ELEMENT_STORY = 'story'
const SITE_PERU21 = 'peru21'

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
        icon: 'icon-facebook-circle',
        link: urlsShareList.facebook,
        mobileClass: 'flex justify-center',
      },

      {
        name: 'twitter',
        icon: 'icon-twitter-circle',
        link: urlsShareList.twitter,
        mobileClass: 'flex justify-center',
      },
      {
        name: 'linkedin',
        icon: 'icon-linkedin-circle',
        link: urlsShareList.linkedin,
        mobileClass: 'flex justify-center',
      },
      {
        name: 'whatsapp',
        icon: 'icon-whatsapp',
        link: urlsShareList.whatsapp,
        mobileClass: 'block md:hidden flex justify-center',
      },
    ]
  }

  componentDidMount() {
    // const { arcSite } = this.props

    window.addEventListener('scroll', this._handleScroll)
    this.listContainer = document.querySelector('.nav-sidebar')
    this.layerBackground = document.querySelector('.layer')
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)

    if (
      this.listContainer !== null &&
      this.listContainer !== 'undefined' &&
      !isIOS
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
    const el = document.querySelector('.story-header__list')
    if (el.classList.contains('block')) {
      el.classList.remove('block')
      el.classList.add('hidden')
    } else {
      el.classList.remove('hidden')
      el.classList.add('block')
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
    return (
      <>
        <nav
          className={`nav text-white text-sm w-full flex items-center top-0 secondary-font ${
            scrolled ? 'active' : ''
          } ${responsiveClass}`}>
          <div className="nav__wrapper flex items-center bg-primary w-full top-0 h-inherit justify-between lg:justify-start pl-15 pr-15">
            {/** ************* LEFT *************** */}

            <div className="nav__search-box hidden lg:flex items-center border-r-1 border-solid">
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
              <form
                className="flex position-relative items-center"
                onSubmit={e => e.preventDefault()}>
                <input
                  id="header-search-input"
                  ref={this.inputSearch}
                  type="search"
                  defaultValue={search}
                  /* onBlur={this._handleCloseSectionsSearch} */
                  onKeyUp={this._handleKeyDown}
                  placeholder="¿Qué Buscas?"
                  className={`nav__input-search border-0 w-0 text-md pt-5 pb-5 rounded-sm line-h line-h-xs ${this.activeSearch()}`}
                />
                <label htmlFor="header-search-input" className="hidden w-0 h-0">
                  Cuadro de búsqueda
                </label>
                <Button
                  iconClass="nav__icon-search text-primary-color icon-search text-lg"
                  btnClass={`flex items-center btn nav__btn nav__btn--search text-gray-200 hidden lg:flex ${this.activeSearch()}`}
                  onClick={this.optionButtonClick}
                />
              </form>
            </div>

            <div className="flex items-center justify-start nav__container-menu lg:pr-10 lg:pl-10 border-r-1 border-solid">
              <Button
                iconClass="nav__icon-menu icon-hamburguer title-sm"
                btnClass="flex items-center btn nav__btn nav__btn--section p-5"
                btnText="Menú"
                onClick={this._handleToggleSectionElements}
              />
            </div>

            {/** ************* MIDDLE *************** */}
            <div className="nav__list-container">
              <ul className="items-center nav__list h-inherit hidden lg:flex pl-15">
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
                          className="nav__list-item text-center pr-15 h-full">
                          <a
                            href={url || id || '/'}
                            className="nav__list-link text-gray-200 h-inherit flex items-center uppercase secondary-font font-normal text-sm">
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
              className="nav__mobile-logo position-absolute"
              title={`Logo de ${arcSite}`}>
              <img
                src={logo}
                alt={`Logo de ${arcSite}`}
                className="nav__logo lg:hidden"
              />
            </a>

            {type !== ELEMENT_STORY && arcSite === SITE_PERU21 && (
              <a
                className="header__logo-secondary"
                href="/el-otorongo?ref=portada_home&amp;ft=btn_menu"
                title={logo.alt}>
                <img src={logoLeft.src} alt={logo.alt} />
              </a>
            )}

            <div className="nav__story-title position-relative overflow-hidden line-h-sm" />

            <div className="nav__story-social-network position-relative mr-5">
              {type === ELEMENT_STORY && (
                <>
                  <div>
                    <a
                      title="Mostrar enlaces para compartir"
                      className="story-content__more-link"
                      href="/"
                      onClick={event => {
                        this.openLink(event, 3)
                      }}>
                      <i className="story-header__share-icon icon-share text-gray-200" />
                    </a>
                  </div>

                  <ul className="story-header__list flex justify-between">
                    {this.shareButtons.firstList.map((item, i) => (
                      <li
                        key={item.icon}
                        className={`story-header__item ${item.mobileClass}`}>
                        <a
                          title={`Compartir en ${item.name}`}
                          className="story-header__link flex items-center justify-center text-gray-200"
                          href={item.link}
                          onClick={event => {
                            this.openLink(event, item)
                          }}>
                          <i
                            className={`${item.icon} story-header__icon`}
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

            <div
              className={`nav__container-right position-absolute lg:inline-block ${responsiveClass}`}>
              <div className="flex items-center justify-end header__btn-container">
                {siteProperties.activePaywall && (
                  <Button
                    btnText="Suscríbete"
                    btnClass="flex items-center btn capitalize text-md nav__btn-subs"
                    onClick={() => {
                      const { origin } = window.location
                      const outputType =
                        _env === 'prod' ? '' : 'outputType=paywall&'
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
                  <SignwallComponent classButton="flex items-center btn capitalize text-md nav__btn-sign" />
                )}
              </div>
            </div>

            {this.isStory && (
              <div className="nav__loader position-absolute w-full">
                <div className="nav__loader-bar  w-full h-full" />
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
      </>
    )
  }
}

export default NavBarDefault
