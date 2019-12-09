import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'

import { searchQuery, popUpWindow } from '../../../../utilities/helpers'
import Button from '../../../../global-components/button'
import Menu from '../../../../global-components/menu'

const CLUB_URL = 'https://clubelcomercio.pe/?ref=home&ft=menu'
const CLUB_TEXT = 'Club'
const SUBSCRIBE_URL = 'https://suscripciones.elcomercio.pe/?ref=ec_home&ft=menu'
const SUBSCRIBE_TEXT = 'Suscríbete'
/* const DRAG_SCREEN_LIMIT = 90
const LIST_WIDTH = 330 */

const classes = {
  header: `header header-inverted w-full position-relative top-0 secondary-font pr-15 text-sm font-bold flex items-center justify-center pt-0 pb-0 pl-15 md:position-absolute`,
  /**
   *  Activar si se quiere el max-width de 1366px
   *  wrapper: 'w-full flex items-center justify-center position-relative wrapper',
   */
  logoContainer: 'nav__mobile-logo position-absolute',
  logo: 'header__logo',
  navBtnContainer: `flex items-center justify-start nav__container-menu position-absolute`,
  leftBtnContainer: `left-0 ml-10 lg:ml-20`,
  rightBtnContainer: `right-0 mr-10 lg:mr-20`,
  form: 'position-relative items-center hidden lg:flex',
  search: `nav__input-search border-0 w-0 text-md pt-5 pb-5 rounded-sm line-h line-h-xs`,
  btnSearch: `nav__btn--search flex items-center text-white lg:pr-20 lg:pl-20 border-r-1 border-white`,
  iconSearch: 'icon-search text-lg',
  btnMenu:
    'story-special-h__btn-menu flex items-center text-white p-5 md:pr-20 lg:pl-20',
  iconMenu: 'icon-hamburguer title-sm pr-10',
  btnProfile:
    'items-center btn bg-white text-gray-300 text-sm hidden p-5 md:flex lg:pr-10 lg:pl-10',
  btnClub: '',
  btnSubs: '',
  /** ------------ */
  navStoryTitle:
    'nav__story-title position-absolute overflow-hidden text-white pl-15 pr-15',
  navStorySocialNetwork: 'nav__story-social-network position-relative mr-5',
  navLoader: 'nav__loader-bar position-absolute h-full left-0 bg-link',

  listIcon: 'story-header__list flex justify-between rounded-sm',
  moreLink: 'story-content__more-link',
  shareItem: 'story-header__item',
  shareLink: 'story-header__link flex items-center justify-center text-white',
  shareIcon: 'story-header__icon',
  iconMore: 'story-header__share-icon icon-share text-white',
}

// TODO: Agregar el click afuera del menu
const HeaderSpecialChildSpecial = ({
  logo,
  menuSections,
  search,
  isStory,
  shareButtons,
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [statusSidebar, setStatusSidebar] = useState(false)
  const [statusSearch, setStatusSearch] = useState(false)

  const { contextPath, siteProperties } = useFusionContext()

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
  const activeSearch = ({ on = '', off = '' } = {}) => {
    return statusSearch ? `active ${on}` : `${off}`
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
    return () => {
      window.removeEventListener('scroll', _handleScroll)
    }
  }, [_handleScroll])

  useEffect(() => {
    const sectionTitle = document.querySelector('.independent-title')
    if (sectionTitle)
      sectionTitle.classList.add('md:position-absolute', 'special')

    /* listContainer = document.querySelector('.nav-sidebar')
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
    } */
  }, [])

  return (
    <>
      <header className={`${classes.header} ${scrolled ? 'active' : ''}`}>
        <div className={classes.navLoader} />
        {/* Activar si se quiere el max-width de 1366px <div className={classes.wrapper}> */}
        {/** ************* LEFT *************** */}
        <div
          className={`${classes.navBtnContainer} ${classes.leftBtnContainer}`}>
          <form className={classes.form} onSubmit={e => e.preventDefault()}>
            <input
              ref={inputSearch}
              type="search"
              defaultValue={search}
              /* onBlur={this._handleCloseSectionsSearch} */
              onKeyUp={_handleKeyDown}
              placeholder="¿Qué Buscas?"
              className={`${classes.search} ${activeSearch()}`}
            />
            <Button
              iconClass={classes.iconSearch}
              btnClass={`${classes.btnSearch} ${activeSearch({
                off: 'border-solid',
              })}`}
              onClick={optionButtonClick}
            />
          </form>
          <Button
            iconClass={classes.iconMenu}
            btnClass={`${classes.btnMenu} ${
              scrolled && isStory ? 'border-r-1 border-solid' : ''
              }`}
            btnText="Menú"
            onClick={_handleToggleSectionElements}
          />
        </div>
        {/** ************* // LEFT *************** */}
        <a
          href={logo.link}
          className={`${classes.logoContainer} ${isStory &&
            scrolled &&
            statusSearch &&
            'opacity-0'}`}>
          <img src={logo.src} alt={logo.alt} className={classes.logo} />
        </a>
        <div className={classes.navStoryTitle} />
        {/** ************* RIGHT *************** */}
        <div
          className={`${classes.navBtnContainer} ${classes.rightBtnContainer}`}>
          {isStory && scrolled ? (
            <>
              <div className={classes.navStorySocialNetwork}>
                <div>
                  <a
                    className={classes.moreLink}
                    href='/'
                    onClick={event => {
                      openLink(event, 3)
                    }}>
                    <i className={`${classes.iconMore}`} />
                  </a>
                </div>

                <ul className={classes.listIcon}>
                  {shareButtons.firstList.map((item, i) => (
                    <li key={item.icon} className={classes.shareItem}>
                      <a
                        className={classes.shareLink}
                        href={item.link}
                        onClick={event => {
                          openLink(event, item)
                        }}>
                        <i className={`${item.icon} ${classes.shareIcon}`} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
              <>
                <Button
                  btnClass={`${classes.btnProfile} ${classes.btnClub}`}
                  btnText={CLUB_TEXT}
                  onClick={_handleToggleSectionElements}
                  btnLink={CLUB_URL}
                />
                <Button
                  btnClass={`${classes.btnProfile} ${classes.btnSubs}`}
                  btnText={SUBSCRIBE_TEXT}
                  onClick={_handleToggleSectionElements}
                  btnLink={SUBSCRIBE_URL}
                />
              </>
            )}
        </div>
        {/** ************* // RIGHT *************** */}
        {/* Activar si se quiere el max-width de 1366px </div> */}
        <Menu
          sections={menuSections}
          showSidebar={statusSidebar}
          contextPath={contextPath}
          siteProperties={siteProperties}
        />
        <div className="layer" />
      </header>
    </>
  )
}

HeaderSpecialChildSpecial.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }),
}

export default HeaderSpecialChildSpecial
