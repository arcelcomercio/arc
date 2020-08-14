/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef, memo } from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import ENV from 'fusion:environment'

import {
  sideScroll,
  handleNavScroll,
  checkDisabledIcons,
} from '../../../../utilities/slidernav-helpers'
import Button from '../../../../global-components/button'
import Menu from '../../../../global-components/menu'
import SignwallComponent from '../../../signwall/main/default'
import searchQuery from '../../../../utilities/client/search'

/* 
const DRAG_SCREEN_LIMIT = 90
const LIST_WIDTH = 330 
*/

const classes = {
  header: `header header-inverted bg-primary secondary-font w-full font-normal flex items-center justify-center pt-0 pb-0 pl-15 pr-15 text-sm text-gray-300 position-relative top-0`,
  wrapper: `w-full flex items-center justify-center position-relative wrapper`,
  logoContainer: 'nav__mobile-logo position-absolute',
  logo: 'header__logo',
  featured: 'header__featured flex w-full font-normal overflow-hidden mr-20',
  item: 'header__item flex items-center justify-center h-inherit',
  link: 'header__link uppercase text-sm p-10',
  band: 'hidden md:block',
  bandWrapper: 'justify-between w-full wrapper mx-auto md:flex',
  tags: 'header__tags justify-center ml-20 mr-10 hidden md:flex',
  date: 'header__date justify-center uppercase mr-20 hidden lg:flex',
  navBtnContainer: `flex items-center justify-start nav__container-menu position-absolute`,
  leftBtnContainer: `left-0 ml-10 lg:ml-20`,
  rightBtnContainer: `right-0 mr-10 lg:mr-20`,
  form: 'position-relative items-center hidden lg:flex',
  search: `nav__input-search border-0 w-0 text-md pt-5 pb-5 rounded-sm line-h line-h-xs`,
  searchLabel: 'overflow-hidden w-0 h-0',
  btnSearch: `header-inverted__btn-search flex items-center nav__btn--search text-white lg:pr-20 lg:pl-20 border-r-1 border-solid`,
  iconSearch: 'icon-search text-lg',
  btnMenu:
    'header-inverted__btn-menu flex items-center font-bold text-white p-5 md:pr-20 lg:pl-20',
  iconMenu: 'icon-hamburguer title-sm pr-10',
  btnProfile:
    'items-center btn bg-base-100 text-sm hidden p-5 md:flex lg:pr-10 lg:pl-10',
  btnClub: 'header-inverted__btn-club',
  btnSubs: 'header-inverted__btn-subs',
  btnSign: 'header-inverted__btn-sign',
  /** ------------ */
  navStoryTitle:
    'nav__story-title position-absolute overflow-hidden text-white pl-15 pr-15 line-h-sm',
  navStorySocialNetwork: 'nav__story-social-network position-relative mr-5',
  navLoader: 'nav__loader-bar position-absolute h-full left-0 bg-link',

  listIcon: 'story-header__list hidden md:flex justify-between rounded-sm',
  moreLink: 'story-content__more-link',
  shareItem: 'story-header__item',
  shareLink: 'story-header__link flex items-center justify-center text-white',
  shareIcon: 'story-header__icon',
  iconMore: 'story-header__share-icon icon-share text-white',
  navContainerRight: 'flex items-center justify-end header__btn-container',
  btnSubscribe: 'flex items-center btn capitalize text-md',
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

// TODO: Agregar el click afuera del menu
const HeaderChildInverted = ({
  logo,
  auxLogo,
  bandLinks,
  menuSections,
  tags,
  date,
  search,
  isStory,
  shareButtons,
  isSlider,
  hideMenu,
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [statusSidebar, setStatusSidebar] = useState(false)
  const [statusSearch, setStatusSearch] = useState(false)

  const { contextPath, siteProperties, arcSite } = useFusionContext()

  const inputSearch = useRef()

  /* let dragFlag = false
  let initPointDrag = 0
  let distDrag = 0 */

  // let listContainer = null
  // let layerBackground = null

  /** ------ SEARCH ----- */
  const _handleSearch = () => {
    const { value } = inputSearch.current
    searchQuery(value)
  }

  const _handleKeyDown = e => {
    e.preventDefault()
    const { value } = e.target
    if (value !== '' && e.which === 13) {
      _handleSearch()
    }
  }

  // Open search and automatic focus input
  const focusInputSearch = () => {
    inputSearch.current.focus()
  }

  // Add - Remove Class active input and button search
  const activeSearch = () => {
    return statusSearch ? 'active' : ''
  }

  // If input search is empty, buton close search else buton find search
  const optionButtonClick = () => {
    if (statusSearch) _handleSearch()
    else focusInputSearch()
    setStatusSearch(!statusSearch)
  }

  /** ------ // SEARCH ----- */

  /** ------ SIDEBAR ----- */

  const toggleBodyOverflow = () => {
    if (typeof window !== 'undefined') {
      if (document.body.classList.contains('overflow-hidden'))
        document.body.classList.remove('overflow-hidden')
      else if (window.innerWidth < 640)
        document.body.classList.add('overflow-hidden')
    }
  }

  const _setPosition = posX => {
    document.querySelector('.nav-sidebar').style.transform = `scaleX(${posX})`
  }

  const _openMenu = () => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    if (!isIOS) _setPosition(1)
    document.querySelector('.layer').style.display = 'block'
    setStatusSidebar(true)
  }

  const _closeMenu = () => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    if (!isIOS) _setPosition(0)
    document.querySelector('.layer').style.display = 'none'
    setStatusSidebar(false)
  }

  const _handleToggleSectionElements = () => {
    toggleBodyOverflow()
    if (statusSidebar) _closeMenu()
    else _openMenu()
  }

  // const _handleToggleScroll = () => {
  //   if (scrolled) setScrolled(false)
  //   else  setScrolled(true)
  // }

  /* const _initDrag = evt => {
    initPointDrag = evt.offsetX || evt.changedTouches[0].clientX
    if (statusSidebar) {
      if (initPointDrag < LIST_WIDTH) {
        dragFlag = true
      }
    } else if (initPointDrag < DRAG_SCREEN_LIMIT) {
      dragFlag = true
    }
  }

  const _endDrag = () => {
    dragFlag = false

    if (distDrag < DRAG_SCREEN_LIMIT) {
      if (!statusSidebar) _closeMenu()
      else _openMenu()
    }
    distDrag = 0
  }

  const _drag = (direction, posX) => {
    if (direction === 'right') {
      distDrag = !statusSidebar ? posX - initPointDrag : 0
    } else {
      distDrag = statusSidebar ? -(initPointDrag - posX) : 0
    }
    if (direction === 'right' || direction === 'left') {
      const listPos = statusSidebar ? 1 : 0
      _setPosition(listPos + distDrag / LIST_WIDTH)
    }
    if (Math.abs(distDrag) > DRAG_SCREEN_LIMIT) {
      toggleBodyOverflow()
      if (statusSidebar) _closeMenu()
      else _openMenu()
      _endDrag()
    }
  }

  const _moveDrag = evt => {
    if (dragFlag) {
      const { offsetX, movementX, changedTouches } = evt

      let dir = ''
      if (movementX) {
        dir = movementX > 0 ? 'right' : 'left'
      } else if (changedTouches && changedTouches[0]) {
        dir = changedTouches[0].clientX - initPointDrag > 0 ? 'right' : 'left'
      }

      const posX = offsetX || changedTouches[0].clientX
      _drag(dir, posX)
    }
  } */

  /** ------ // SIDEBAR ----- */

  const moreList = () => {
    const el = document.querySelector('.story-header__list')
    if (el.classList.contains('block')) {
      el.classList.remove('block')
      el.classList.add('hidden')
    } else {
      el.classList.remove('hidden')
      el.classList.add('block')
    }
  }

  const openLink = (event, item) => {
    event.preventDefault()
    if (item === 3) moreList()
    else popUpWindow(item.link, '', 600, 400)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _handleScroll = () => {
    // ------ Logic to set state to hidden or show logo in navbar
    const { body = {}, documentElement = {} } = document
    const { scrollTop: scrollBody = 0 } = body
    const { scrollTop: scrollElement = 0 } = documentElement
    const scroll = scrollBody || scrollElement

    const headerTop = 10
    if (!scrolled && scroll > headerTop) setScrolled(true)
    else if (scrolled && scroll <= headerTop) setScrolled(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', _handleScroll)
    if (isSlider) checkDisabledIcons()
    return () => {
      window.removeEventListener('scroll', _handleScroll)
    }
  }, [_handleScroll, isSlider])
  /*   useEffect(() => {
    listContainer = document.querySelector('.nav-sidebar')
    layerBackground = document.querySelector('.layer')

    if (listContainer !== null && listContainer !== 'undefined') {
      document.body.addEventListener('touchstart', _initDrag, {
        passive: true,
      })
      document.body.addEventListener('touchend', _endDrag, {
        passive: true,
      })
      document.body.addEventListener('touchmove', _moveDrag, {
        passive: true,
      })
    }

    if (layerBackground !== null && layerBackground !== 'undefined') {
      layerBackground.addEventListener('click', () => {
        toggleBodyOverflow()
        _closeMenu()
      }) 
    }
  }, []) */

  const _env = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
  return (
    <>
      <nav className={classes.band}>
        <div className={classes.bandWrapper}>
          {tags && <div className={classes.tags}>{tags}</div>}
          {isSlider && (
            <button
              type="button"
              onClick={() => {
                sideScroll('left', 15, 100, 5)
              }}
              className="header__button left disabled position-relative">
              <i className="header__icon-back left icon-back text-white rounded font-bold p-5" />
            </button>
          )}
          {bandLinks && bandLinks[0] && (
            <ul
              className={`${classes.featured}${isSlider ? ' slider' : ''}`}
              onScroll={e => {
                if (isSlider) handleNavScroll(e)
              }}>
              {bandLinks.map(({ url, name, styles = [] }) => (
                <li
                  className={`${classes.item}${
                    styles ? ' header__custom-item' : ''
                  }`}
                  key={`band-${url}`}>
                  <a
                    itemProp="url"
                    className={classes.link}
                    href={url}
                    {...(styles && {
                      style: {
                        backgroundColor: styles[0],
                        color: styles[1] || '#ffffff',
                      },
                    })}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {isSlider && (
            <button
              type="button"
              onClick={() => {
                sideScroll('right', 15, 100, 5)
              }}
              className="header__button right disabled position-relative">
              <i className="header__icon-back right icon-back text-white rounded font-bold p-5" />
            </button>
          )}
          {date.active && (
            <time className={classes.date} dateTime={date.raw}>
              {date.value}
            </time>
          )}
        </div>
      </nav>
      <header className={`${classes.header} ${scrolled ? 'active' : ''}`}>
        <div className={classes.navLoader} />
        <div className={classes.wrapper}>
          {/** ************* LEFT *************** */}
          <div
            className={`${classes.navBtnContainer} ${classes.leftBtnContainer}`}>
            <form className={classes.form} onSubmit={e => e.preventDefault()}>
              <input
                id="header-search-input"
                ref={inputSearch}
                type="search"
                defaultValue={search}
                /* onBlur={this._handleCloseSectionsSearch} */
                onKeyUp={_handleKeyDown}
                placeholder="¿Qué Buscas?"
                className={`${classes.search} ${activeSearch()}`}
              />
              <label
                htmlFor="header-search-input"
                className={classes.searchLabel}>
                Cuadro de búsqueda
              </label>
              <Button
                iconClass={classes.iconSearch}
                btnClass={`${classes.btnSearch} ${activeSearch()}`}
                onClick={optionButtonClick}
              />
            </form>
            {!hideMenu && (
              <Button
                iconClass={classes.iconMenu}
                btnClass={`${classes.btnMenu} ${
                  scrolled && isStory ? 'border-r-1 border-solid' : ''
                }`}
                btnText="Menú"
                onClick={_handleToggleSectionElements}
              />
            )}
          </div>
          {/** ************* // LEFT *************** */}
          <a
            itemProp="url"
            href={logo.link}
            className={`${classes.logoContainer} ${isStory &&
              scrolled &&
              statusSearch &&
              'opacity-0'}`}
            title={logo.alt}>
            <img
              src={
                scrolled && auxLogo.src !== logo.src ? auxLogo.src : logo.src
              }
              alt={logo.alt}
              title={logo.alt}
              className={classes.logo}
            />
          </a>
          <div className={classes.navStoryTitle} />
          {/** ************* RIGHT *************** */}
          <div
            className={`${classes.navBtnContainer} ${classes.rightBtnContainer}`}>
            {isStory && scrolled && (
              <>
                <div className={classes.navStorySocialNetwork}>
                  <div>
                    <a
                      itemProp="url"
                      className={classes.moreLink}
                      href="/"
                      onClick={event => {
                        openLink(event, 3)
                      }}>
                      <i className={`${classes.iconMore}`} />
                    </a>
                  </div>

                  <ul className={classes.listIcon}>
                    {shareButtons.map((item, i) => (
                      <li key={item.icon} className={classes.shareItem}>
                        <a
                          itemProp="url"
                          title={`Compartir en ${item.name}`}
                          className={classes.shareLink}
                          href={item.link}
                          onClick={event => {
                            openLink(event, item)
                          }}>
                          <i
                            className={`${item.icon} ${classes.shareIcon}`}
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            <div className={`${classes.navContainerRight} `}>
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
                  classButton={`${classes.btnSubscribe} ${classes.btnSign}`}
                />
              )}
            </div>
          </div>
          {/** ************* // RIGHT *************** */}
        </div>
        {!hideMenu && (
          <Menu
            sections={menuSections}
            showSidebar={statusSidebar}
            contextPath={contextPath}
            siteProperties={siteProperties}
          />
        )}
        <div className="layer" />
      </header>
    </>
  )
}

HeaderChildInverted.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }),
  bandLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

export default memo(HeaderChildInverted)
