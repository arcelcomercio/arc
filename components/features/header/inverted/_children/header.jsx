import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'

import { searchQuery, popUpWindow } from '../../../../utilities/helpers'
import Button from '../../../../global-components/button'
import Menu from '../../../../global-components/menu'
import SignwallComponent from '../../../signwall/standard'

/* const DRAG_SCREEN_LIMIT = 90
const LIST_WIDTH = 330 */

const classes = {
  header: `header header-inverted bg-primary secondary-font w-full font-normal flex items-center justify-center pt-0 pb-0 pl-15 pr-15 text-sm text-gray-300 position-relative top-0`,
  logoContainer: 'nav__mobile-logo position-absolute',
  logo: 'header__logo',
  featured: 'header__featured flex w-full font-normal overflow-hidden mr-20',
  item: 'header__item flex items-center justify-center h-inherit',
  link: 'header__link uppercase text-sm p-10',
  band: 'hidden justify-between md:flex',
  tags: 'header__tags justify-center ml-20 mr-10 hidden md:flex',
  date: 'header__date justify-center uppercase mr-20 hidden lg:flex',
  navBtnContainer: `flex items-center justify-start nav__container-menu position-absolute`,
  leftBtnContainer: `left-0 ml-10 lg:ml-20`,
  rightBtnContainer: `right-0 mr-10 lg:mr-20`,
  form: 'position-relative items-center hidden lg:flex',
  search: `nav__input-search border-0 w-0 text-md pt-5 pb-5 rounded-sm line-h line-h-xs`,
  btnSearch: `header-inverted__btn-search flex items-center nav__btn--search text-white lg:pr-20 lg:pl-20 border-r-1 border-solid`,
  iconSearch: 'icon-search text-lg',
  btnMenu:
    'header-inverted__btn-menu flex items-center font-bold text-white p-5 md:pr-20 lg:pl-20',
  iconMenu: 'icon-hamburguer title-sm pr-10',
  btnProfile:
    'items-center btn bg-base-100 text-sm hidden p-5 md:flex lg:pr-10 lg:pl-10',
  btnClub: 'header-inverted__btn-club',
  btnSubs: 'header-inverted__btn-subs',
  /** ------------ */
  navStoryTitle:
    'nav__story-title position-absolute overflow-hidden text-white pl-15 pr-15',
  navStorySocialNetwork: 'nav__story-social-network position-relative mr-5',
  navLoader: 'nav__loader-bar position-absolute h-full left-0 bg-link',

  listIcon: 'story-header__list hidden md:flex justify-between rounded-sm',
  moreLink: 'story-content__more-link',
  shareItem: 'story-header__item',
  shareLink: 'story-header__link flex items-center justify-center text-white',
  shareIcon: 'story-header__icon',
  iconMore: 'story-header__share-icon icon-share text-white',
  navContainerRight:
    'flex items-center hidden justify-end header__btn-container md:block',
  btnSubscribe:
    'flex items-center btn capitalize text-md font-bold btn--outline',
  navContainerRightMovil: 'block md:hidden',
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
    _setPosition(1)
    document.querySelector('.layer').style.display = 'block'
    setStatusSidebar(true)
  }

  const _closeMenu = () => {
    _setPosition(0)
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

  return (
    <>
      <nav className={classes.band}>
        {tags && <div className={classes.tags}>{tags}</div>}
        {bandLinks && bandLinks[0] && (
          <ul className={classes.featured}>
            {bandLinks.map(section => (
              <li className={classes.item} key={`band-${section.url}`}>
                <a className={classes.link} href={section.url}>
                  {section.name}
                </a>
              </li>
            ))}
          </ul>
        )}
        {date.active && (
          <time className={classes.date} dateTime={date.raw}>
            {date.value}
          </time>
        )}
      </nav>
      <header className={`${classes.header} ${scrolled ? 'active' : ''}`}>
        <div className={classes.navLoader} />
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
              btnClass={`${classes.btnSearch} ${activeSearch()}`}
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
          <img
            src={scrolled && auxLogo.src !== logo.src ? auxLogo.src : logo.src}
            alt={logo.alt}
            className={classes.logo}
          />
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
                    href={classes.moreLink}
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
              <div className={`${classes.navContainerRight} `}>
                {siteProperties.activeSignwall && (
                  <>
                    <SignwallComponent />
                  </>
                )}
              </div>
              <div className={`${classes.navContainerRightMovil} `}>
                {siteProperties.activeSignwall && (
                  <>
                    <SignwallComponent typeMobile />
                  </>
                )}
              </div>
            </>
          )}
        </div>
        {/** ************* // RIGHT *************** */}
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

export default HeaderChildInverted
