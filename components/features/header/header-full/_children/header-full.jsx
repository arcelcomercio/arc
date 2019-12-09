/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useEffect } from 'react'

import { searchQuery, popUpWindow } from '../../../../utilities/helpers'

const classes = {
  headerFull: 'header-full bg-primary w-full position-relative',
  container: 'header-full__container h-full flex justify-between',
  left: 'header-full__left flex items-center',
  boxBtnMenu:
    'header-full__box-btnmenu h-full flex items-center justify-center',
  btnMenu: 'header-full__btn-menu  flex justify-center items-center',
  iconMenu: 'header-full__icon-menu font-bold',
  wrapperMenu: 'header-full__wrapper-menu bg-primary overflow-y-auto',
  topMenu: 'header-full__top-menu flex',
  topLeft: 'header-full__top-left  flex items-center justify-center',
  topRight: 'header-full__top-right flex items-center pl-20',
  btnClose: 'header-full__btn-close text-white w-full h-full',
  iconClose: 'header-full__icon-close icon-close',
  imgMenu: 'header-full__img-menu',
  boxSearch: 'header-full__box-search pt-25',
  formSearch: 'header-full__form-search flex justify-center items-center',
  inputSearch: 'header-full__input-search',
  btnSearch: 'header-full__btn-search bg-white pr-15 pl-15',
  iconSearch: 'header-full__icon-search icon-search',
  headerList: 'header-full__list pt-10 pb-10',
  headerItem: 'header-full__item pr-25 pl-25 pt-5 pb-5 flex',
  headerLink:
    'header-full__link block text-white text-xl uppercase pb-10 pt-10 font-bold secondary-font',
  angleRight:
    'icon-right header-full__angle flex justify-center items-center text-white',
  right: 'header-full__right flex items-center',
  callImg: 'header-full__call-img flex items-center hidden',
  subMenuList: 'header-full__submenu-list',
  subMenuItem: 'header-full__submenu-item pr-25 pl-25 pt-5 pb-5 flex',
  btnContainer: 'header-full__btn-container',
  btnResult:
    'header-full__btn-result pt-5 pb-5 pl-10 pr-10 rounded-sm text-black font-bold bg-secondary text-sm uppercase',
  footerMenu:
    'header-full__footer-menu flex flex-col justify-center items-center pt-20 pb-20',
  follow: 'header-full__follow text-md text-white mb-15',
  mediaList: 'header-full__media-list flex',
  mediaItem: 'header-full__media-item mr-10',
  mediaLink: 'header-full__media-link p-5',
  mediaIcon: 'header-full__media-icon text-white text-xl ',
  boxLogo: 'header-full__box-logo p-5 ml-10 mr-10 h-full',
  linkLogo: 'header-full__link-logo flex items-center h-full',
  logo: 'header-full__logo',
  boxList: 'header-full__box-list',
  listNav: 'header-full__list-nav flex',
  itemNav: 'header-full__item-nav mr-15',
  linkNav:
    'header-full__link-nav text-white block secondary-font uppercase pt-5 pb-5 pr-5 pl-5 text-md',

  megaMenu: 'header-full__megamenu megamenu position-absolute bg-white w-full',
  megaMenuContainer: 'megamenu__container',
  megaMenuBox: 'megamenu__box flex flex-row justify-center pb-20 pt-20',
  megaMenuRow: 'megamenu__row mr-25',
  megaMenuTitle:
    'megamenu__title uppercase block text-primary-color secondary-font text-md font-bold pb-5',
  megaMenuList: 'megamenu__list',
  megaMenuItem: 'megamenu__item',
  megaMenuLink:
    'megamenu__link font-thin block secondary-font pt-10 pb-5 text-md',
  navStoryTitle:
    'nav__story-title position-absolute overflow-hidden text-white pl-15 pr-15 line-h-sm',
  navStorySocialNetwork: 'nav__story-social-network position-relative mr-5',

  listIcon: 'story-header__list  flex  justify-between rounded-sm',
  moreLink: 'story-content__more-link',
  shareItem: 'story-header__item',
  shareLink: 'story-header__link flex items-center justify-center text-white',
  shareIcon: 'story-header__icon',
  iconMore: 'story-header__share-icon icon-share text-white',
  navLoader: 'nav__loader-bar position-absolute h-full left-0',
}

export default ({
  socialNetworks,
  logo,
  whiteLogo,
  headerList,
  menuList,
  isStory,
  shareButtons,
  postTitle,
  arcSite,
  winningCallLogo,
  mobileHeaderFollowing,
}) => {
  const inputSearch = useRef(null)
  const [showMenu, toggleMenu] = useState(false)

  const arcSiteTrome = 'trome'

  const [scrolled, setScrolled] = useState(false)

  const toggleSubItems = e => {
    const item = e.target.parentElement
    const list = item.querySelector('.header-full__submenu-list')
    // eslint-disable-next-line no-unused-expressions
    list.classList.contains('active')
      ? list.classList.remove('active')
      : list.classList.add('active')
  }

  const _handleSearch = e => {
    e.preventDefault()
    const { value } = inputSearch.current
    if (value !== '') searchQuery(value)
  }

  const _handleKeyDown = e => {
    e.preventDefault()
    const { value } = e.target
    if (value !== '' && e.which === 13) {
      _handleSearch(e)
    }
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

  return (
    <>
      <div
        className={`${classes.headerFull} ${
          scrolled && isStory ? 'active' : ''
        }`}>
        <div className={classes.container}>
          <div className={classes.left}>
            <div
              className={`${classes.boxBtnMenu} ${
                showMenu ? 'bg-white' : ''
              } `}>
              <button
                type="button"
                onClick={() => toggleMenu(!showMenu)}
                className={classes.btnMenu}>
                <i
                  className={`${classes.iconMenu} ${
                    showMenu ? 'icon-close active' : 'icon-hamburguer'
                  } `}
                />
              </button>
            </div>
            <div
              className={`${classes.wrapperMenu} ${showMenu ? 'active' : ''}`}>
              <div className={classes.topMenu}>
                <div className={classes.topLeft}>
                  <button
                    type="button"
                    onClick={() => toggleMenu(!showMenu)}
                    className={classes.btnClose}>
                    <i className={classes.iconClose} />
                  </button>
                </div>
                <div className={classes.topRight}>
                  <img className={classes.imgMenu} alt="" src={whiteLogo} />
                </div>
              </div>
              <div className={classes.boxSearch}>
                <form className={classes.formSearch}>
                  <input
                    type="search"
                    placeholder="Buscar"
                    onKeyUp={e => _handleKeyDown(e)}
                    ref={inputSearch}
                    className={classes.inputSearch}
                  />
                  <button
                    type="button"
                    onClick={e => _handleSearch(e)}
                    className={classes.btnSearch}>
                    <i className={classes.iconSearch} />
                  </button>
                </form>
              </div>
              <ul className={classes.headerList}>
                {menuList.map(item => {
                  const hasChildren = item.children.length > 0
                  return (
                    <>
                      <li className={classes.headerItem}>
                        <a
                          href={item.url || item._id || '/'}
                          className={`${classes.headerLink} pt-15 pb-15`}>
                          {item.name || item.display_name}
                        </a>
                        {hasChildren && (
                          <button
                            type="button"
                            onClick={e => toggleSubItems(e)}
                            className={classes.angleRight}
                          />
                        )}
                        {hasChildren && (
                          <ul className={classes.subMenuList}>
                            {item.children.map(subItem => {
                              return (() => {
                                return (
                                  <li className={classes.subMenuItem}>
                                    <a
                                      href={subItem.url || subItem._id || '/'}
                                      className={`${classes.headerLink}`}>
                                      {subItem.name || subItem.display_name}
                                    </a>
                                  </li>
                                )
                              })()
                            })}
                          </ul>
                        )}
                      </li>
                    </>
                  )
                })}
              </ul>
              <div className={classes.footerMenu}>
                <p className={classes.follow}>{mobileHeaderFollowing}</p>
                <ul className={classes.mediaList}>
                  {socialNetworks.map(item => {
                    return (
                      <li className={classes.mediaItem}>
                        <a className={classes.mediaLink} href={item.url}>
                          <i
                            className={`${classes.mediaIcon} icon-${item.name}`}
                          />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className={classes.boxLogo}>
              <a className={classes.linkLogo} href="/">
                <img src={logo} className={classes.logo} alt="" />
              </a>
            </div>
            {isStory && (
              <div className={classes.navStoryTitle}>{postTitle}</div>
            )}
            <div className={classes.boxList}>
              <ul className={classes.listNav}>
                {headerList.map(item => {
                  return (
                    <li className={classes.itemNav}>
                      <a
                        href={item.url || item._id || '/'}
                        className={classes.linkNav}>
                        {item.name || item.display_name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className={`${classes.megaMenu} ${showMenu ? 'active' : ''}`}>
              <div className={classes.megaMenuContainer}>
                <div className={classes.megaMenuBox}>
                  {menuList.map(item => {
                    return (
                      <div className={classes.megaMenuRow}>
                        <h3>
                          <a
                            href={item.url || item._id || '/'}
                            className={classes.megaMenuTitle}>
                            {item.name || item.display_name}
                          </a>
                        </h3>
                        <ul className={classes.megaMenuList}>
                          {item.children.map(subItem => {
                            let subItemName =
                              subItem.name || subItem.display_name
                            const rawMatch = subItemName.match(/\[.*\]/g)
                            const match =
                              rawMatch === null
                                ? ''
                                : rawMatch[0].replace('[', '').replace(']', '')

                            if (match) {
                              subItemName = subItemName.replace(/\[.*\]/g, '')
                            }
                            return (
                              <li className={classes.megaMenuItem}>
                                <a
                                  href={subItem.url || subItem._id || '/'}
                                  className={`${classes.megaMenuLink} ${
                                    match === 'bold'
                                      ? 'megamenu__title-link font-bold'
                                      : ''
                                  }`}>
                                  {subItemName}
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className={`${classes.right} ${classes.rightBtnContainer}`}>
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
            ) : arcSite !== arcSiteTrome ? (
              <div className={classes.btnContainer}>
                <a
                  href="/resultados/futbol/resultados/"
                  className={classes.btnResult}>
                  Resultados
                </a>
              </div>
            ) : (
              <div className={classes.callImg}>
                <a href="https://promociones.trome.pe/registro/super-llamada-ganadora/">
                  <img src={winningCallLogo} alt="Lamada Ganadora" />
                </a>
              </div>
            )}
          </div>
          {isStory && <div className={classes.navLoader} />}
        </div>
      </div>
    </>
  )
}
