/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'

import Button from '../../../../global-components/button'
import Menu from '../../../../global-components/menu'
import searchQuery from '../../../../utilities/client/search'

import ShareButtons from '../../../../global-components/lite/share'

const classes = {
  header: `header-inverted-featured header`,
  wrapper: `header-inverted-featured__wrapper wrapper`,
  logoContainer: 'header-inverted-featured__logo-container',
  logo: 'header-inverted-featured__logo',
  featured: 'header-inverted-featured__features',
  item: 'header-inverted-featured__item header__item',
  link: 'header-inverted-featured__features-link',
  bandWrapper: 'header-inverted-featured__band-wrapper',
  band: 'header-inverted-featured__band',
  tags: 'header-inverted-featured__tags',
  navBtnContainer: `header-inverted-featured__nav-btn-container`,
  leftBtnContainer: `header-inverted-featured__left-btn-container`,
  rightBtnContainer: `header-inverted-featured__right-btn-container`,
  form: 'header-inverted-featured__form',
  search: `header-inverted-featured__search`,
  searchLabel: 'header-inverted-featured__search-label',
  btnSearch: `header-inverted-featured__btn-search`,
  iconSearch: 'header-inverted-featured__icon-search icon-search',
  btnMenu: 'header-inverted-featured__btn-menu',
  iconMenu: 'header-inverted-featured__icon-hamburguer icon-hamburguer',
  navStoryTitle: 'header-inverted-featured__nav-story-title',
  navLoader: 'nav__loader-bar position-absolute h-full left-0 bg-link',
  listIcon: 'header-inverted-featured__list-icon story-header__list',
  callImg: 'header-inverted-featured__call-img',
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
  logoImg,
  bandLinks,
  menuSections,
  tags,
  date,
  search,
  isStory,
  winningCallLogo,
  hideMenu,
}) => {
  const [scrolled, setScrolled] = React.useState(false)
  const [statusSidebar, setStatusSidebar] = React.useState(false)
  const [statusSearch, setStatusSearch] = React.useState(false)

  const {
    contextPath,
    siteProperties,
    // arcSite,
    // requestUri,
  } = useFusionContext()

  const inputSearch = React.useRef()

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

  const _handleKeyDown = (e) => {
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

  const _setPosition = (posX) => {
    document.body.querySelector(
      '.nav-sidebar'
    ).style.transform = `scaleX(${posX})`
  }

  const _openMenu = () => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    if (!isIOS) _setPosition(1)
    document.body.querySelector('.layer').style.display = 'block'
    setStatusSidebar(true)
  }

  const _closeMenu = () => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    if (!isIOS) _setPosition(0)
    document.body.querySelector('.layer').style.display = 'none'
    setStatusSidebar(false)
  }

  const _handleToggleSectionElements = () => {
    toggleBodyOverflow()
    if (statusSidebar) _closeMenu()
    else _openMenu()
  }

  /** ------ // SIDEBAR ----- */

  const moreList = () => {
    const el = document.body.querySelector('.story-header__list')
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

  React.useEffect(() => {
    window.addEventListener('scroll', _handleScroll)

    return () => {
      window.removeEventListener('scroll', _handleScroll)
    }
  }, [_handleScroll])

  return (
    <>
      <header className={`${classes.header} ${scrolled ? 'active' : ''}`}>
        <div className={classes.navLoader} />
        <div className={classes.wrapper}>
          {/** ************* LEFT *************** */}
          <div
            className={`${classes.navBtnContainer} ${classes.leftBtnContainer}`}>
            <button
              type="button"
              className={classes.btnMenu}
              onClick={_handleToggleSectionElements}
              tabIndex="0">
              <i className={classes.iconMenu} />
              <span aria-hidden="true">Menú</span>
            </button>
            <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
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
          </div>
          {/** ************* // LEFT *************** */}
          <a
            itemProp="url"
            href="/"
            className={`${classes.logoContainer}  ${scrolled ? 'active' : ''}`}
            title={logo.alt}>
            <img
              // src={
              //   scrolled && auxLogo.src !== logo.src ? auxLogo.src : logo.src
              // }
              src={logoImg}
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
              <div className="flex header-inverted-featured__socials">
                <ShareButtons activeGoogleNews googleNewsText={false} />
              </div>
            )}
          </div>
          {/** ************* // RIGHT *************** */}
        </div>
        <Menu
          sections={menuSections}
          showSidebar={statusSidebar}
          contextPath={contextPath}
          siteProperties={siteProperties}
        />
        <div className={classes.callImg}>
          <a
            itemProp="url"
            href="https://promociones.trome.pe/registro/super-llamada-ganadora/"
            title="Llamada Ganadora">
            <img src={winningCallLogo} alt="Llamada Ganadora" />
          </a>
        </div>
        <div className="layer" />
      </header>
      {!hideMenu && (
        <nav className={classes.band}>
          <div className={classes.bandWrapper}>
            {tags && <div className={classes.tags}>{tags}</div>}

            {bandLinks && bandLinks[0] && (
              <ul className={`${classes.featured}`}>
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
            {date.active && (
              <time className={classes.date} dateTime={date.raw}>
                {date.value}
              </time>
            )}
          </div>
        </nav>
      )}
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

export default React.memo(HeaderChildInverted)
