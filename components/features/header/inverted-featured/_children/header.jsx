/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'

import Button from '../../../../global-components/button'
import Menu from '../../../../global-components/menu'
import searchQuery from '../../../../utilities/client/search'

import ShareButtons from '../../../../global-components/lite/share'
/* 
const DRAG_SCREEN_LIMIT = 90
const LIST_WIDTH = 330 
*/

const classes = {
  header: `header header-inverted header-inverted-featured bg-primary secondary-font w-full font-normal flex items-center justify-center pt-0 pb-0 pl-15 pr-15 text-sm text-gray-300 position-relative top-0`,
  wrapper: `w-full flex items-center justify-center position-relative wrapper`,
  logoContainer: 'nav__mobile-logo position-absolute',
  logo: 'header__logo',
  featured:
    'header-inverted-featured__features flex w-full font-normal overflow-hidden pr-20',
  item: 'header__item flex items-center justify-center h-inherit',
  link: 'header-inverted-featured__features-link p-10',
  band: 'header-inverted-featured__band hidden md:block',
  bandWrapper: 'justify-between w-full wrapper mx-auto md:flex',
  tags:
    'header-inverted-featured__tags justify-center ml-20 mr-10 hidden md:flex items-center font-bold',
  navBtnContainer: `flex items-center justify-start nav__container-menu position-absolute`,
  leftBtnContainer: `left-0 lg:ml-20`,
  rightBtnContainer: `right-0 lg:mr-20`,
  form: 'position-relative items-center hidden lg:flex ml-10',
  search: `nav__input-search border-0 w-0 text-md pt-5 pb-5 rounded-sm line-h line-h-xs`,
  searchLabel: 'overflow-hidden w-0 h-0',
  btnSearch: `header-inverted-featured__btn-search flex items-center nav__btn--search text-white lg:pr-20 lg:pl-20 border-l-1 border-solid`,
  iconSearch: 'icon-search header-inverted-featured__icon-search text-lg',
  btnMenu:
    'header-inverted-featured__btn-menu flex items-center font-bold md:pr-20 lg:pl-20',
  iconMenu:
    'header-inverted-featured__icon-hamburguer icon-hamburguer title-sm pr-10',
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
  // auxLogo,
  bandLinks,
  menuSections,
  tags,
  date,
  search,
  isStory,
  shareButtons,
}) => {
  const [scrolled, setScrolled] = React.useState(false)
  const [statusSidebar, setStatusSidebar] = React.useState(false)
  const [statusSearch, setStatusSearch] = React.useState(false)

  const {
    contextPath,
    siteProperties,
    arcSite,
    requestUri,
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
            <Button
              iconClass={classes.iconMenu}
              btnClass={`${classes.btnMenu}`}
              btnText={scrolled ? '' : 'Menú'}
              onClick={_handleToggleSectionElements}
            />
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
            href={logo.link}
            className={`${classes.logoContainer} ${
              isStory && scrolled && statusSearch && 'opacity-0'
            }`}
            title={logo.alt}>
            <img
              // src={
              //   scrolled && auxLogo.src !== logo.src ? auxLogo.src : logo.src
              // }
              src={`https://cdna.trome.pe/resources/dist/trome/images/alternate-logo.png?d=1`}
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
              // <>
              //   <div className={classes.navStorySocialNetwork}>
              //     <div>
              //       <a
              //         itemProp="url"
              //         className={classes.moreLink}
              //         href="/"
              //         onClick={(event) => {
              //           openLink(event, 3)
              //         }}>
              //         <i className={`${classes.iconMore}`} />
              //       </a>
              //     </div>

              //     <ul className={classes.listIcon}>
              //       {shareButtons.map((item, i) => (
              //         <li key={item.icon} className={classes.shareItem}>
              //           <a
              //             itemProp="url"
              //             title={`Compartir en ${item.name}`}
              //             className={classes.shareLink}
              //             href={item.link}
              //             onClick={(event) => {
              //               openLink(event, item)
              //             }}>
              //             <i
              //               className={`${item.icon} ${classes.shareIcon}`}
              //               aria-hidden="true"
              //             />
              //           </a>
              //         </li>
              //       ))}
              //     </ul>
              //   </div>
              // </>
              <div className="flex header-inverted-featured__socials">
                {/* {shareButtons.map((item, i) => (
                  <a
                    itemProp="url"
                    title={`Compartir en ${item.name}`}
                    className={classes.shareLink}
                    href={item.link}
                    onClick={(event) => {
                      openLink(event, item)
                    }}>
                    <i
                      className={`${item.icon} ${classes.shareIcon}`}
                      aria-hidden="true"
                    />
                  </a>
                ))} */}
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
        <div className="layer" />
      </header>
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
