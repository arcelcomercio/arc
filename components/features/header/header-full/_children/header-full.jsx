/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import { useAppContext } from 'fusion:context'
import React from 'react'

import { addSlashToEnd } from '../../../../utilities/parse/strings'
import {
  edicionMenu,
  getBtnSignScript,
  popup,
  scrolled,
  searchDPMenu,
  searchScript,
  showMore,
  showSubmenu,
  toggleMenu,
} from '../_dependencies/scripts'

const classes = {
  headerFull: 'header-full bg-primary w-full position-relative',
  container:
    'header-full__container h-full flex justify-between position-relative',
  left: 'header-full__left flex items-center',
  newsCin: 'header-full__newsletter flex',
  newsCinDesk: 'header-full__newsletter-newsCinDesk',
  newsCinMob: 'header-full__newsletter-newsCinMob',
  newsCinText: 'header-full__newsletter-text',
  newsCinTooltip: 'header-full__newsletter-tooltip showTooltipDesk',
  newsInputCheckDesk: 'checkNewsCinDesk hidden',
  newsInputCheckMob: 'checkNewsCinMob hidden',
  newsInputCheckMobClose: 'checkNewsCinMobClose hidden',
  newsCinModal: 'header-full__newsletter-modal active showModalMob',
  newsCinModalClose: 'header-full__newsletter-modal-close',
  boxBtnMenu:
    'header-full__box-btnmenu h-full flex items-center justify-center',
  btnMenu: 'header-full__btn-menu  flex justify-center items-center',
  iconMenu: 'header-full__icon-menu font-bold icon-hamburguer',
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
  news: 'header-full__newsletter',
  dpsearch: 'header-full__dpsearch',
  dpform: 'header-full__dpform',
  dpforminput: 'header-full__dpforminput',
  linkLogoFooterDPlay: 'header-full__link-logo-play f alg-center h-full',

  megaMenu:
    'header-full__megamenu megamenu w-full position-absolute overflow-hidden bottom-0 bg-gray-300 flex flex-col justify-between',
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
  navStorySocialNetwork:
    'nav__story-social-network position-relative mr-5 hidden',

  listIcon: 'story-header__list  hidden md:flex  justify-between rounded-sm',
  moreLink: 'story-content__more-link',
  shareItem: 'story-header__item',
  shareLink: 'story-header__link flex items-center justify-center text-white',
  shareIcon: 'story-header__icon',
  iconMore: 'story-header__share-icon icon-share text-white',
  navLoader: 'nav__loader-bar position-absolute h-full left-0',

  wrapper:
    'nav-sidebar__wrapper flex flex-col justify-between h-full overflow-y',
  body: 'nav-sidebar__body ',
  list: 'nav- sidebar__list pt-15 pb-15',
  item:
    'nav-sidebar__item position-relative flex justify-between items-center flex-wrap',
  containerSubMenu: 'nav-sidebar__container-submenu w-full overflow-hidden',
  menuArrow: 'nav-sidebar__menu-arrow hidden',
  labelParentItem:
    'nav-sidebar__parent-item pl-25 pt-10 pr-20 pb-10 position-absolute right-0',
  link: 'nav-sidebar__link block p-15 pl-25 text-md text-white',

  footer: `nav-sidebar__footer p-30 border-b-1 border-solid border-gray`,
  text: `nav-sidebar__text block font-thin pt-5 pr-0 pb-5 pl-0 text-md text-white uppercase`,
  edicion: 'header-full__edicion',
  title: 'header-full__e-title',
  eLink: 'header-full__e-link flex ',
  mx: 'header-full__e-mx',
  eContent: 'header-full__e-content hidden',
  eBody: '__e-body',
  ePais: '__e-pais  p-20',
  eName: '__e-name  p-10',
  eArrow: 'header-full__e-arrow',
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default ({
  socialNetworks,
  customLogoTitle,
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
  siteDomain,
  legalLinks,
  hideMenu,
  showNewsletter,
  urlLogoPlay,
  showArrowLeft,
  Newsle,
}) => {
  const arcSiteTrome = 'trome'
  const { requestUri, siteProperties } = useAppContext()
  const { activeSignwall } = siteProperties || {}
  const isMexico = /^\/mexico\//.test(requestUri)
  const isColombia = /^\/colombia\//.test(requestUri)
  const countryName = isMexico ? 'MX' : isColombia ? 'CO' : 'PE'
  // const arcEnv = ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

  const isDeporPlay = /^\/depor-play\//.test(requestUri)
  const edittion = (cName, opcion = '', has = true) => (
    <>
      <div className={`${cName}${classes.eBody} ${opcion} `}>
        <div className={`${cName}${classes.eName}`}>EDICIONES:</div>

        <a className={`${cName}${classes.ePais}`} href="/?noredirect">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M18 0H0V12H18V0Z" fill="white" />
            <path d="M6 0H0V12H6V0Z" fill="#DB161D" />
            <path d="M18 0H12V12H18V0Z" fill="#DB161D" />
          </svg>

          {`${has ? 'PE (Perú)' : 'Perú'}`}
        </a>
        <a className={`${cName}${classes.ePais}`} href="/mexico/">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M18 0H0V12H18V0Z" fill="white" />
            <path d="M6 0H0V12H6V0Z" fill="#006847" />
            <path d="M18 0H12V12H18V0Z" fill="#DB161D" />
            <path
              d="M9 8.0625C10.1391 8.0625 11.0625 7.13909 11.0625 6C11.0625 4.86091 10.1391 3.9375 9 3.9375C7.86091 3.9375 6.9375 4.86091 6.9375 6C6.9375 7.13909 7.86091 8.0625 9 8.0625Z"
              fill="#BFC2A3"
            />
          </svg>

          {`${has ? 'MX (México)' : 'México'}`}
        </a>
        <a className={`${cName}${classes.ePais}`} href="/colombia/">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <rect width="18" height="6" fill="#fcd116" />
            <rect y="6" width="18" height="4" fill="#003893" />
            <rect y="9" width="18" height="4" fill="#ce1126" />
          </svg>

          {`${has ? 'CO (Colombia)' : 'Colombia'}`}
        </a>
      </div>
    </>
  )
  const renderSections = (sections, deep, nameId = 'root') => {
    const aux = deep
    return (
      sections &&
      sections.map(
        ({
          children,
          name = '',
          _id: id = '',
          display_name: displayName = '',
          url = '',
        }) => {
          const idElem = `${nameId}-${name || displayName}`.toLowerCase()
          return (
            <li className={classes.item} key={`navbar-menu-${url || id}`}>
              <a
                itemProp="url"
                href={addSlashToEnd(url || id || '/')}
                className={classes.link}
                style={{ paddingLeft: `${deep > 0 ? 25 + deep * 15 : 25}px` }}>
                {name || displayName}
              </a>
              {children && children.length > 0 && (
                <>
                  <input
                    className={classes.menuArrow}
                    type="checkbox"
                    id={idElem}
                    name="checkbox-submenu"
                  />
                  {/** TODO: verificar si se puede mejorar, el input debería estar dentro
                   * del label pero por problemas de estilos para hecer la funcionalidad
                   * con puro CSS no se encontró forma.
                   * */}
                  <label htmlFor={idElem} className={classes.labelParentItem} />
                  <ul
                    className={`${classes.containerSubMenu} deep-${deep} ${idElem}`}>
                    {renderSections(children, aux + 1, idElem)}
                  </ul>
                </>
              )}
            </li>
          )
        }
      )
    )
  }

  return (
    <>
      <div data-story-header={`${isStory}`} className={classes.headerFull}>
        <div className={classes.container}>
          <div className={classes.left}>
            {!hideMenu && (
              <>
                <div className={classes.boxBtnMenu}>
                  <button
                    type="button"
                    className={classes.btnMenu}
                    id="btn-menu">
                    <i aria-label="menú" className={classes.iconMenu} />
                  </button>
                </div>
                <div className={classes.wrapperMenu}>
                  <div className={classes.topMenu}>
                    <div className={classes.topLeft}>
                      <button
                        type="button"
                        className={classes.btnClose}
                        id="btn-close-menu">
                        <i className={classes.iconClose} />
                      </button>
                    </div>
                    <div className={classes.topRight}>
                      <img
                        className={classes.imgMenu}
                        alt="Logo del sitio"
                        src={whiteLogo}
                      />
                    </div>
                  </div>
                  {arcSite === 'depor' && (
                    <>{edittion('nav-sidebar', 'flex paisBody', false)}</>
                  )}
                  <div className={classes.boxSearch}>
                    <form
                      id="header-search-form"
                      className={classes.formSearch}>
                      <input
                        id="header-search-input"
                        type="search"
                        placeholder="Buscar"
                        className={classes.inputSearch}
                      />
                      <label
                        htmlFor="header-search-input"
                        className="overflow-hidden w-0 h-0">
                        Cuadro de búsqueda
                      </label>
                      <button type="submit" className={classes.btnSearch}>
                        <i
                          className={classes.iconSearch}
                          aria-label="search button"
                        />
                      </button>
                    </form>
                  </div>
                  <ul className={classes.headerList}>
                    {menuList.map((item) => {
                      const hasChildren = item.children.length > 0
                      return (
                        <>
                          <li className={classes.headerItem}>
                            <a
                              itemProp="url"
                              href={addSlashToEnd(item.url || item._id || '/')}
                              className={`${classes.headerLink} pt-15 pb-15`}>
                              {item.name || item.display_name}
                            </a>
                            {hasChildren && (
                              <button
                                type="button"
                                className={classes.angleRight}
                                aria-label="Mostrar subsecciones"
                              />
                            )}
                            {hasChildren && (
                              <ul className={classes.subMenuList}>
                                {item.children.map((subItem) =>
                                  (() => (
                                    <li className={classes.subMenuItem}>
                                      <a
                                        itemProp="url"
                                        href={addSlashToEnd(
                                          subItem.url || subItem._id || '/'
                                        )}
                                        className={classes.headerLink}>
                                        {subItem.name || subItem.display_name}
                                      </a>
                                    </li>
                                  ))()
                                )}
                              </ul>
                            )}
                          </li>
                        </>
                      )
                    })}
                    {isDeporPlay && (
                      <li className="nav-sidebar__item header-full__newsletter-li">
                        <a href="/suscripcion-newsletter/">
                          <svg width="20" height="16" viewBox="0 0 20 16">
                            <path d="M20,2a2.006,2.006,0,0,0-2-2H2A2.006,2.006,0,0,0,0,2V14a2.006,2.006,0,0,0,2,2H18a2.006,2.006,0,0,0,2-2ZM18,2,10,6.99,2,2Zm0,12H2V4l8,5,8-5Z" />
                          </svg>
                          <span>Newsletter</span>
                        </a>
                      </li>
                    )}
                  </ul>
                  <div className={classes.footerMenu}>
                    <p itemProp="description" className={classes.follow}>
                      {mobileHeaderFollowing}
                    </p>
                    <ul className={classes.mediaList}>
                      {socialNetworks.map((item) => (
                        <li className={classes.mediaItem}>
                          <a
                            itemProp="url"
                            className={classes.mediaLink}
                            href={item.url}>
                            <i
                              className={`${classes.mediaIcon} icon-${item.name}`}
                              aria-label={item.name}
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {isDeporPlay && (
                    <div className="header-full__box-logo-play">
                      <a
                        itemProp="url"
                        className={classes.linkLogoFooterDPlay}
                        href="/"
                        title={siteDomain}>
                        {showArrowLeft && (
                          <svg
                            width="74"
                            viewBox="0 0 492 492"
                            xmlSpace="preserve">
                            <path d="M198.608 246.104 382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z" />
                          </svg>
                        )}
                        <img
                          src={logo}
                          className={classes.logo}
                          alt={customLogoTitle}
                          title={customLogoTitle}
                        />
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className={classes.boxLogo}>
              <a
                itemProp="url"
                className={classes.linkLogo}
                href="/"
                title={siteDomain}>
                {isDeporPlay && showArrowLeft && (
                  <svg width="74" viewBox="0 0 492 492" xmlSpace="preserve">
                    <path d="M198.608 246.104 382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z" />
                  </svg>
                )}
                <img
                  src={logo}
                  className={classes.logo}
                  alt={customLogoTitle}
                  title={customLogoTitle}
                />
              </a>
              {isDeporPlay && urlLogoPlay !== '' && (
                <a
                  itemProp="url"
                  href="/depor-play/"
                  className="header-full__logo-play"
                  title={siteDomain}>
                  <img
                    src={`${urlLogoPlay}`}
                    alt="Logo Depor Play"
                    title="Logo Depor Play"
                  />
                </a>
              )}
            </div>
            {isStory && (
              <div className={classes.navStoryTitle}>{postTitle}</div>
            )}
            <div className={classes.boxList}>
              <ul className={classes.listNav}>
                {headerList.map((item) => (
                  <li className={classes.itemNav}>
                    <a
                      itemProp="url"
                      href={item.url || item._id || '/'}
                      className={classes.linkNav}>
                      {item.name || item.display_name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {!hideMenu && (
              <div className={classes.megaMenu}>
                <div className={classes.wrapper}>
                  <div className={classes.body}>
                    {arcSite === 'depor' && !isDeporPlay && (
                      <>{edittion('nav-sidebar', 'f paisBody', false)}</>
                    )}
                    {isDeporPlay && (
                      <>
                        <div className={classes.dpsearch}>
                          <form className={classes.dpform}>
                            <svg viewBox="0 0 14 14">
                              <path d="M13.2 12.4L9.2 8.3C9.8 7.5 10.1 6.5 10.1 5.4 10.1 4.2 9.6 3 8.8 2.1 7.9 1.2 6.7 0.8 5.4 0.8 4.2 0.8 3 1.2 2.1 2.1 1.2 3 0.8 4.2 0.8 5.4 0.8 6.7 1.2 7.9 2.1 8.8 3 9.6 4.2 10.1 5.4 10.1 6.5 10.1 7.5 9.8 8.3 9.2L12.4 13.2C12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.3 12.4 13.3 12.5 13.3 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2L13.2 12.5C13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.3 12.5 13.3 12.4 13.3 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4V12.4ZM7.9 7.9C7.3 8.6 6.4 8.9 5.4 8.9 4.5 8.9 3.6 8.6 3 7.9 2.3 7.3 1.9 6.4 1.9 5.4 1.9 4.5 2.3 3.6 3 3 3.6 2.3 4.5 1.9 5.4 1.9 6.4 1.9 7.3 2.3 7.9 3 8.6 3.6 8.9 4.5 8.9 5.4 8.9 6.4 8.6 7.3 7.9 7.9Z" />
                            </svg>
                            <input
                              type="search"
                              placeholder="Buscar"
                              className={classes.dpforminput}
                            />
                          </form>
                        </div>
                        <script
                          type="text/javascript"
                          dangerouslySetInnerHTML={{
                            __html: searchDPMenu,
                          }}
                        />
                      </>
                    )}
                    <ul className={classes.list}>
                      {menuList && renderSections(menuList, 0)}
                    </ul>
                  </div>
                  {isDeporPlay && (
                    <div className="header-full__box-logo-play">
                      <a
                        itemProp="url"
                        className={classes.linkLogoFooterDPlay}
                        href="/"
                        title={siteDomain}>
                        {showArrowLeft && (
                          <svg
                            width="74"
                            viewBox="0 0 492 492"
                            xmlSpace="preserve">
                            <path d="M198.608 246.104 382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z" />
                          </svg>
                        )}
                        <img
                          src={logo}
                          className={classes.logo}
                          alt={customLogoTitle}
                          title={customLogoTitle}
                        />
                      </a>
                    </div>
                  )}
                  <div className={classes.footer}>
                    <a itemProp="url" href="/" className={classes.text}>
                      {siteDomain}
                    </a>
                    {legalLinks.map((link) => (
                      <a
                        itemProp="url"
                        key={link.url}
                        href={link.url}
                        className={classes.text}>
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={classes.right}>
            {isStory && (
              <div className={classes.navStorySocialNetwork}>
                <div>
                  <button
                    type="button"
                    aria-label="Mostrar enlaces para compartir"
                    className={classes.moreLink}
                    id="header-show-more">
                    <i className={`${classes.iconMore}`} aria-hidden="true" />
                  </button>
                </div>

                <ul className={classes.listIcon}>
                  {shareButtons.map((item) => (
                    <li key={item.icon} className={classes.shareItem}>
                      <a
                        itemProp="url"
                        title={`Compartir en ${item.name}`}
                        className={classes.shareLink}
                        href={item.link}
                        data-share="">
                        <i
                          className={`${item.icon} ${classes.shareIcon}`}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {arcSite !== arcSiteTrome ? (
              <div className={classes.btnContainer}>
                <a
                  itemProp="url"
                  href="/resultados/futbol/resultados/"
                  className={classes.btnResult}>
                  Resultados
                </a>
              </div>
            ) : (
              <>
                {arcSite === arcSiteTrome && false && (
                  <>
                    <input
                      type="checkbox"
                      id="stNewsCinDesk"
                      className={classes.newsInputCheckDesk}
                    />
                    <label
                      htmlFor="stNewsCinDesk"
                      className={`${classes.newsCin} ${classes.newsCinDesk} `}>
                      <svg viewBox="0 0 1080 320">
                        <g>
                          <g
                            fill="#aa4315"
                            stroke="#aa4315"
                            strokeMiterlimit="10">
                            <path d="M127.74 174.27q-3.18 17.43-15.89 27.42T81 211.68q-20.6 0-34.89-14.21t-14.3-35q0-20.67 14.3-34.95T81 113.23q17.41 0 30.33 9.84a42.46 42.46 0 0116.24 26.3l-22.39 5.35q-2.07-10-8.5-15.12A24.34 24.34 0 0081 134.46a24.93 24.93 0 00-18.72 8q-7.68 8-7.67 20t7.67 20A24.82 24.82 0 0081 190.58a23.76 23.76 0 0015.55-5.27q6.42-5.28 8.77-15.54zM208.85 209.57h-22.11v-5.63q-8.43 7.74-21.56 7.74a31.73 31.73 0 01-24-10.48q-9.89-10.48-9.88-26.93t9.88-26.87a31.61 31.61 0 0124-10.54q13.13 0 21.56 7.73V139h22.11zm-27.16-22.15a19.55 19.55 0 000-26.23 16.08 16.08 0 00-11.95-5.19 15.55 15.55 0 00-12 5.14q-4.69 5.13-4.7 13.15t4.7 13.22a15.68 15.68 0 0012 5.06 16.19 16.19 0 0011.95-5.15zM265.22 139v17.87h-19.07v52.74h-22v-52.78h-10V139h10v-5.48q0-12.37 7.67-19.76t20.25-7.38a33.33 33.33 0 0113.68 3l-4.7 17.44a18.75 18.75 0 00-5.94-1.13 9 9 0 00-6.5 2.4 8.53 8.53 0 00-2.49 6.46V139z" />
                            <path d="M335.56 180h-50.85a18.35 18.35 0 005.39 10 13.64 13.64 0 009.53 3.65q10.37 0 14.79-8.15l19.58 4.1q-4.43 11-13.34 16.52t-21.07 5.56a35.67 35.67 0 01-26-10.48Q263 190.72 263 174.27t10.64-26.87a35.68 35.68 0 0126.12-10.54q15.06 0 25.29 10.26t10.5 27.15zm-44.77-21.94a14.73 14.73 0 00-5.67 8.16h28.61a15 15 0 00-5.26-8.3 14.05 14.05 0 00-8.7-2.81 15.13 15.13 0 00-8.98 2.98zm-.42-28.27l9.81-21.37h26.26L310 129.82zM442.65 209.57h-22.11v-5.63q-8.43 7.74-21.56 7.74a31.74 31.74 0 01-24-10.48q-9.88-10.48-9.88-26.93t9.9-26.87a31.62 31.62 0 0124-10.54q13.13 0 21.56 7.73v-36.28h22.11zm-27.15-22.15a19.58 19.58 0 000-26.23 16.12 16.12 0 00-12-5.21 15.55 15.55 0 00-12 5.14q-4.69 5.13-4.7 13.15t4.7 13.22a15.68 15.68 0 0012 5.06 16.22 16.22 0 0012-5.13zM522 180h-50.89a18.41 18.41 0 005.39 10 13.65 13.65 0 009.54 3.65q10.36 0 14.78-8.15l19.62 4.08q-4.41 11-13.33 16.52T486 211.68a35.64 35.64 0 01-26-10.48q-10.65-10.48-10.64-26.93T460 147.4a35.66 35.66 0 0126.11-10.54q15.07 0 25.29 10.26t10.6 27.15zm-44.77-21.94a14.76 14.76 0 00-5.66 8.16h28.6a15 15 0 00-5.25-8.3 14.1 14.1 0 00-8.71-2.81 15.18 15.18 0 00-9.02 2.98zM619 144.94q7.4 8.09 7.4 21.31v43.32h-22V171a14.89 14.89 0 00-3.26-10 10.77 10.77 0 00-8.57-3.87A12.68 12.68 0 00582 162q-3.79 4.84-3.8 14.84v32.77h-22.11V139h22.11v6.76q8.29-8.86 21.28-8.86 12.17-.04 19.52 8.04zM697.59 147.54q11.05 10.41 11 26.73t-11 26.86q-11.05 10.41-27 10.41-16.15 0-27.29-10.41t-11.12-26.86q0-16.32 11.12-26.73t27.29-10.4q15.95 0 27 10.4zm-15.2 39.88a19.78 19.78 0 00-.07-26.3 15.86 15.86 0 00-11.68-5.12 16.41 16.41 0 00-12 5.14 17.82 17.82 0 00-5.11 13.15 18 18 0 005 13.15 16.38 16.38 0 0012.09 5.13 15.83 15.83 0 0011.77-5.15z" />
                            <path d="M766.82 206.47a39.28 39.28 0 01-18.93 5.21q-13.12 0-20.39-7.18t-7.25-20.95v-26.72h-12.57V139h12.57v-20.85h22.11V139h20.45v17.87h-20.45v24.43q0 10.26 9.26 10.26a19.76 19.76 0 0010.09-2.81zM791.9 109.15a12.53 12.53 0 013.66 9 12 12 0 01-3.66 8.93 12.62 12.62 0 01-9.19 3.59 12.36 12.36 0 01-9.12-3.59 12.09 12.09 0 01-3.59-8.93 12.56 12.56 0 013.59-9.07 12.09 12.09 0 019.12-3.73 12.25 12.25 0 019.19 3.8zm-20.25 100.42V139h22.11v70.61zM854.56 179.61l20.32 4.5a33.2 33.2 0 01-12.44 20 36.43 36.43 0 01-22.94 7.6q-15.88 0-26.88-10.48t-11-26.93q0-16.32 11-26.87t26.88-10.54a36.41 36.41 0 0122.66 7.45A33.79 33.79 0 01874.88 164l-20.73 5.06q-1.38-6.18-5.25-9.35a14.37 14.37 0 00-9.4-3.17 15.51 15.51 0 00-12 5 18.15 18.15 0 00-4.56 12.73q0 7.88 4.56 12.79a15.59 15.59 0 0012 4.93q11.61.01 15.06-12.38zM903 109.15a12.53 12.53 0 013.66 9 12 12 0 01-3.66 8.93 12.6 12.6 0 01-9.19 3.59 12.39 12.39 0 01-9.12-3.59 12.13 12.13 0 01-3.59-8.93 12.6 12.6 0 013.59-9.07 13 13 0 0118.31.07zm-20.25 100.42V139h22.11v70.61zM990.25 209.57h-22.11v-5.63q-8.43 7.74-21.55 7.74a31.76 31.76 0 01-24-10.48q-9.87-10.48-9.88-26.93t9.88-26.87a31.64 31.64 0 0124-10.54q13.13 0 21.55 7.73V139h22.11zm-27.15-22.15a19.58 19.58 0 000-26.23 16.1 16.1 0 00-12-5.21 15.57 15.57 0 00-12 5.14q-4.7 5.13-4.69 13.15t4.69 13.22a15.71 15.71 0 0012 5.06 16.2 16.2 0 0012-5.13zM1018.44 186.64q1.38 8.3 12.3 8.3a11.64 11.64 0 006.56-1.62 4.71 4.71 0 002.42-4q0-3.93-6.91-5.2l-14.09-2.81q-20.18-3.8-20.18-20.54a21 21 0 018.29-17.36q8.29-6.54 21.56-6.54 12.72 0 21.07 5.48a23.25 23.25 0 0110.44 14.77l-20.18 4.08a9.07 9.07 0 00-3.66-5.91 12.68 12.68 0 00-8-2.39q-4.14 0-6 1.62a4.94 4.94 0 00-1.86 3.86c0 2.53 1.75 4.18 5.25 4.93l16.3 3.37q9.54 2.12 14.38 7.67a19.94 19.94 0 014.83 13.57q0 11.39-8.7 17.58t-22.8 6.19q-13.14 0-22-5.14a20.73 20.73 0 01-10.58-15.4z" />
                          </g>
                          <path
                            fill="#fff"
                            d="M120.74 168.13q-3.18 17.44-15.89 27.42T74 205.54q-20.6 0-34.89-14.2t-14.3-35q0-20.68 14.3-34.95T74 107.09q17.41 0 30.33 9.85a42.44 42.44 0 0116.24 26.3l-22.39 5.34q-2.07-10-8.5-15.12A24.33 24.33 0 0074 128.33a24.89 24.89 0 00-18.72 8q-7.68 8-7.67 20t7.67 20A24.81 24.81 0 0074 184.44a23.71 23.71 0 0015.55-5.27q6.42-5.28 8.77-15.54zM201.85 203.43h-22.11v-5.63q-8.43 7.74-21.56 7.74a31.69 31.69 0 01-24-10.48q-9.89-10.47-9.88-26.93t9.88-26.86a31.62 31.62 0 0124-10.55q13.13 0 21.56 7.74v-5.63h22.11zm-27.16-22.15a19.55 19.55 0 000-26.23 16.07 16.07 0 00-11.95-5.2 15.57 15.57 0 00-12 5.13q-4.69 5.13-4.7 13.15t4.7 13.22a15.65 15.65 0 0012 5.06 16.19 16.19 0 0011.95-5.13zM258.22 132.83v17.86h-19.07v52.74h-22v-52.74h-10v-17.86h10v-5.49q0-12.37 7.67-19.76t20.25-7.38a33.49 33.49 0 0113.68 3l-4.7 17.44a18.71 18.71 0 00-5.94-1.12 9 9 0 00-6.5 2.39 8.54 8.54 0 00-2.49 6.47v4.5z"
                          />
                          <path
                            fill="#fff"
                            d="M328.56 173.9h-50.85a18.32 18.32 0 005.39 10 13.65 13.65 0 009.53 3.66q10.37 0 14.79-8.16l19.58 4.06q-4.43 11-13.34 16.53t-21.07 5.55a35.63 35.63 0 01-26-10.48Q256 184.59 256 168.13t10.64-26.86a35.69 35.69 0 0126.12-10.55q15.06 0 25.29 10.27t10.5 27.14zM283.79 152a14.7 14.7 0 00-5.67 8.15h28.61a15 15 0 00-5.26-8.29 14 14 0 00-8.7-2.82 15.14 15.14 0 00-8.98 2.96zm-.42-28.27l9.81-21.38h26.26L303 123.69zM435.65 203.43h-22.11v-5.63q-8.43 7.74-21.56 7.74a31.71 31.71 0 01-24-10.48q-9.88-10.47-9.88-26.93t9.9-26.86a31.63 31.63 0 0124-10.55q13.13 0 21.56 7.74v-36.29h22.11zm-27.15-22.15a19.58 19.58 0 000-26.23 16.11 16.11 0 00-12-5.2 15.57 15.57 0 00-12 5.13q-4.69 5.13-4.7 13.15t4.7 13.22a15.65 15.65 0 0012 5.06 16.22 16.22 0 0012-5.13zM515 173.9h-50.89a18.38 18.38 0 005.39 10 13.66 13.66 0 009.54 3.66q10.36 0 14.78-8.16l19.62 4.08q-4.41 11-13.33 16.53T479 205.54a35.6 35.6 0 01-26-10.48q-10.65-10.47-10.64-26.93T453 141.27a35.67 35.67 0 0126.11-10.55q15.07 0 25.29 10.27t10.6 27.14zM470.19 152a14.74 14.74 0 00-5.66 8.15h28.6a14.94 14.94 0 00-5.25-8.29 14 14 0 00-8.71-2.82 15.19 15.19 0 00-8.98 2.96zM612 138.81q7.4 8.08 7.4 21.3v43.32h-22V164.9a14.92 14.92 0 00-3.32-10.06 10.77 10.77 0 00-8.57-3.87 12.68 12.68 0 00-10.51 4.85q-3.79 4.86-3.8 14.84v32.77h-22.11v-70.6h22.11v6.75q8.29-8.87 21.28-8.86 12.17 0 19.52 8.09zM690.59 141.41q11.05 10.41 11 26.72t-11 26.86q-11.05 10.41-27 10.41-16.15 0-27.29-10.41t-11.12-26.86q0-16.32 11.12-26.72T663.64 131q15.9 0 26.95 10.41zm-15.2 39.87a19.78 19.78 0 00-.07-26.3 15.89 15.89 0 00-11.68-5.13 16.43 16.43 0 00-12 5.13 19.57 19.57 0 00-.07 26.3 16.38 16.38 0 0012.09 5.13 15.83 15.83 0 0011.73-5.13z"
                          />
                          <path
                            fill="#fff"
                            d="M759.82 200.34a39.26 39.26 0 01-18.93 5.2q-13.12 0-20.39-7.17t-7.25-21v-26.68h-12.57v-17.86h12.57V112h22.11v20.82h20.45v17.86h-20.45v24.47q0 10.28 9.26 10.27a19.86 19.86 0 0010.09-2.81zM784.9 103a12.54 12.54 0 013.66 9 12 12 0 01-3.66 9 12.61 12.61 0 01-9.19 3.58 12.35 12.35 0 01-9.12-3.58 12.11 12.11 0 01-3.59-9 12.57 12.57 0 013.59-9.07 13 13 0 0118.31.07zm-20.25 100.43v-70.6h22.11v70.6zM847.56 173.47l20.32 4.5a33.22 33.22 0 01-12.44 20 36.42 36.42 0 01-22.94 7.59q-15.88 0-26.88-10.48t-11-26.93q0-16.32 11-26.86t26.88-10.55a36.41 36.41 0 0122.66 7.45 33.82 33.82 0 0112.72 19.69l-20.73 5.07q-1.38-6.19-5.25-9.36a14.36 14.36 0 00-9.4-3.16 15.5 15.5 0 00-12 5 18.15 18.15 0 00-4.56 12.73q0 7.88 4.56 12.8a15.62 15.62 0 0012 4.92q11.61-.03 15.06-12.41zM896 103a12.54 12.54 0 013.66 9 12 12 0 01-3.66 9 12.59 12.59 0 01-9.19 3.58 12.38 12.38 0 01-9.12-3.58 12.15 12.15 0 01-3.59-8.94 12.61 12.61 0 013.59-9.07A13 13 0 01896 103zm-20.25 100.43v-70.6h22.11v70.6zM983.25 203.43h-22.11v-5.63q-8.43 7.74-21.55 7.74a31.73 31.73 0 01-24-10.48q-9.87-10.47-9.88-26.93t9.88-26.86a31.65 31.65 0 0124-10.55q13.13 0 21.55 7.74v-5.63h22.11zm-27.15-22.15a19.58 19.58 0 000-26.23 16.09 16.09 0 00-12-5.2 15.59 15.59 0 00-12 5.13q-4.7 5.13-4.69 13.15t4.69 13.22a15.67 15.67 0 0012 5.06 16.2 16.2 0 0012-5.13zM1011.44 180.51q1.38 8.3 12.3 8.29a11.73 11.73 0 006.56-1.61 4.72 4.72 0 002.42-4q0-3.94-6.91-5.21l-14.09-2.81q-20.18-3.79-20.18-20.53a21 21 0 018.29-17.37q8.29-6.54 21.56-6.54 12.72 0 21.07 5.48A23.25 23.25 0 011052.9 151l-20.18 4.08a9.12 9.12 0 00-3.66-5.91 12.68 12.68 0 00-7.95-2.39q-4.14 0-6 1.62a5 5 0 00-1.86 3.87q0 3.8 5.25 4.92l16.3 3.38q9.54 2.1 14.38 7.66a20 20 0 014.83 13.57q0 11.4-8.7 17.58t-22.8 6.19q-13.14 0-22-5.13A20.77 20.77 0 01989.88 185z"
                          />
                        </g>
                      </svg>
                    </label>
                    <div id="HeaderNewsletter" style={{ display: 'none' }}>
                      {Newsle}
                    </div>
                    {/* <div className={`${classes.newsCinTooltip}`}>{Newsle}</div> */}

                    <input
                      type="checkbox"
                      id="stNewsCinMob"
                      className={classes.newsInputCheckMob}
                    />
                    <label
                      htmlFor="stNewsCinMob"
                      className={`${classes.newsCin} ${classes.newsCinMob}`}>
                      <svg viewBox="0 0 1080 320">
                        <g>
                          <g
                            fill="#aa4315"
                            stroke="#aa4315"
                            strokeMiterlimit="10">
                            <path d="M127.74 174.27q-3.18 17.43-15.89 27.42T81 211.68q-20.6 0-34.89-14.21t-14.3-35q0-20.67 14.3-34.95T81 113.23q17.41 0 30.33 9.84a42.46 42.46 0 0116.24 26.3l-22.39 5.35q-2.07-10-8.5-15.12A24.34 24.34 0 0081 134.46a24.93 24.93 0 00-18.72 8q-7.68 8-7.67 20t7.67 20A24.82 24.82 0 0081 190.58a23.76 23.76 0 0015.55-5.27q6.42-5.28 8.77-15.54zM208.85 209.57h-22.11v-5.63q-8.43 7.74-21.56 7.74a31.73 31.73 0 01-24-10.48q-9.89-10.48-9.88-26.93t9.88-26.87a31.61 31.61 0 0124-10.54q13.13 0 21.56 7.73V139h22.11zm-27.16-22.15a19.55 19.55 0 000-26.23 16.08 16.08 0 00-11.95-5.19 15.55 15.55 0 00-12 5.14q-4.69 5.13-4.7 13.15t4.7 13.22a15.68 15.68 0 0012 5.06 16.19 16.19 0 0011.95-5.15zM265.22 139v17.87h-19.07v52.74h-22v-52.78h-10V139h10v-5.48q0-12.37 7.67-19.76t20.25-7.38a33.33 33.33 0 0113.68 3l-4.7 17.44a18.75 18.75 0 00-5.94-1.13 9 9 0 00-6.5 2.4 8.53 8.53 0 00-2.49 6.46V139z" />
                            <path d="M335.56 180h-50.85a18.35 18.35 0 005.39 10 13.64 13.64 0 009.53 3.65q10.37 0 14.79-8.15l19.58 4.1q-4.43 11-13.34 16.52t-21.07 5.56a35.67 35.67 0 01-26-10.48Q263 190.72 263 174.27t10.64-26.87a35.68 35.68 0 0126.12-10.54q15.06 0 25.29 10.26t10.5 27.15zm-44.77-21.94a14.73 14.73 0 00-5.67 8.16h28.61a15 15 0 00-5.26-8.3 14.05 14.05 0 00-8.7-2.81 15.13 15.13 0 00-8.98 2.98zm-.42-28.27l9.81-21.37h26.26L310 129.82zM442.65 209.57h-22.11v-5.63q-8.43 7.74-21.56 7.74a31.74 31.74 0 01-24-10.48q-9.88-10.48-9.88-26.93t9.9-26.87a31.62 31.62 0 0124-10.54q13.13 0 21.56 7.73v-36.28h22.11zm-27.15-22.15a19.58 19.58 0 000-26.23 16.12 16.12 0 00-12-5.21 15.55 15.55 0 00-12 5.14q-4.69 5.13-4.7 13.15t4.7 13.22a15.68 15.68 0 0012 5.06 16.22 16.22 0 0012-5.13zM522 180h-50.89a18.41 18.41 0 005.39 10 13.65 13.65 0 009.54 3.65q10.36 0 14.78-8.15l19.62 4.08q-4.41 11-13.33 16.52T486 211.68a35.64 35.64 0 01-26-10.48q-10.65-10.48-10.64-26.93T460 147.4a35.66 35.66 0 0126.11-10.54q15.07 0 25.29 10.26t10.6 27.15zm-44.77-21.94a14.76 14.76 0 00-5.66 8.16h28.6a15 15 0 00-5.25-8.3 14.1 14.1 0 00-8.71-2.81 15.18 15.18 0 00-9.02 2.98zM619 144.94q7.4 8.09 7.4 21.31v43.32h-22V171a14.89 14.89 0 00-3.26-10 10.77 10.77 0 00-8.57-3.87A12.68 12.68 0 00582 162q-3.79 4.84-3.8 14.84v32.77h-22.11V139h22.11v6.76q8.29-8.86 21.28-8.86 12.17-.04 19.52 8.04zM697.59 147.54q11.05 10.41 11 26.73t-11 26.86q-11.05 10.41-27 10.41-16.15 0-27.29-10.41t-11.12-26.86q0-16.32 11.12-26.73t27.29-10.4q15.95 0 27 10.4zm-15.2 39.88a19.78 19.78 0 00-.07-26.3 15.86 15.86 0 00-11.68-5.12 16.41 16.41 0 00-12 5.14 17.82 17.82 0 00-5.11 13.15 18 18 0 005 13.15 16.38 16.38 0 0012.09 5.13 15.83 15.83 0 0011.77-5.15z" />
                            <path d="M766.82 206.47a39.28 39.28 0 01-18.93 5.21q-13.12 0-20.39-7.18t-7.25-20.95v-26.72h-12.57V139h12.57v-20.85h22.11V139h20.45v17.87h-20.45v24.43q0 10.26 9.26 10.26a19.76 19.76 0 0010.09-2.81zM791.9 109.15a12.53 12.53 0 013.66 9 12 12 0 01-3.66 8.93 12.62 12.62 0 01-9.19 3.59 12.36 12.36 0 01-9.12-3.59 12.09 12.09 0 01-3.59-8.93 12.56 12.56 0 013.59-9.07 12.09 12.09 0 019.12-3.73 12.25 12.25 0 019.19 3.8zm-20.25 100.42V139h22.11v70.61zM854.56 179.61l20.32 4.5a33.2 33.2 0 01-12.44 20 36.43 36.43 0 01-22.94 7.6q-15.88 0-26.88-10.48t-11-26.93q0-16.32 11-26.87t26.88-10.54a36.41 36.41 0 0122.66 7.45A33.79 33.79 0 01874.88 164l-20.73 5.06q-1.38-6.18-5.25-9.35a14.37 14.37 0 00-9.4-3.17 15.51 15.51 0 00-12 5 18.15 18.15 0 00-4.56 12.73q0 7.88 4.56 12.79a15.59 15.59 0 0012 4.93q11.61.01 15.06-12.38zM903 109.15a12.53 12.53 0 013.66 9 12 12 0 01-3.66 8.93 12.6 12.6 0 01-9.19 3.59 12.39 12.39 0 01-9.12-3.59 12.13 12.13 0 01-3.59-8.93 12.6 12.6 0 013.59-9.07 13 13 0 0118.31.07zm-20.25 100.42V139h22.11v70.61zM990.25 209.57h-22.11v-5.63q-8.43 7.74-21.55 7.74a31.76 31.76 0 01-24-10.48q-9.87-10.48-9.88-26.93t9.88-26.87a31.64 31.64 0 0124-10.54q13.13 0 21.55 7.73V139h22.11zm-27.15-22.15a19.58 19.58 0 000-26.23 16.1 16.1 0 00-12-5.21 15.57 15.57 0 00-12 5.14q-4.7 5.13-4.69 13.15t4.69 13.22a15.71 15.71 0 0012 5.06 16.2 16.2 0 0012-5.13zM1018.44 186.64q1.38 8.3 12.3 8.3a11.64 11.64 0 006.56-1.62 4.71 4.71 0 002.42-4q0-3.93-6.91-5.2l-14.09-2.81q-20.18-3.8-20.18-20.54a21 21 0 018.29-17.36q8.29-6.54 21.56-6.54 12.72 0 21.07 5.48a23.25 23.25 0 0110.44 14.77l-20.18 4.08a9.07 9.07 0 00-3.66-5.91 12.68 12.68 0 00-8-2.39q-4.14 0-6 1.62a4.94 4.94 0 00-1.86 3.86c0 2.53 1.75 4.18 5.25 4.93l16.3 3.37q9.54 2.12 14.38 7.67a19.94 19.94 0 014.83 13.57q0 11.39-8.7 17.58t-22.8 6.19q-13.14 0-22-5.14a20.73 20.73 0 01-10.58-15.4z" />
                          </g>
                          <path
                            fill="#fff"
                            d="M120.74 168.13q-3.18 17.44-15.89 27.42T74 205.54q-20.6 0-34.89-14.2t-14.3-35q0-20.68 14.3-34.95T74 107.09q17.41 0 30.33 9.85a42.44 42.44 0 0116.24 26.3l-22.39 5.34q-2.07-10-8.5-15.12A24.33 24.33 0 0074 128.33a24.89 24.89 0 00-18.72 8q-7.68 8-7.67 20t7.67 20A24.81 24.81 0 0074 184.44a23.71 23.71 0 0015.55-5.27q6.42-5.28 8.77-15.54zM201.85 203.43h-22.11v-5.63q-8.43 7.74-21.56 7.74a31.69 31.69 0 01-24-10.48q-9.89-10.47-9.88-26.93t9.88-26.86a31.62 31.62 0 0124-10.55q13.13 0 21.56 7.74v-5.63h22.11zm-27.16-22.15a19.55 19.55 0 000-26.23 16.07 16.07 0 00-11.95-5.2 15.57 15.57 0 00-12 5.13q-4.69 5.13-4.7 13.15t4.7 13.22a15.65 15.65 0 0012 5.06 16.19 16.19 0 0011.95-5.13zM258.22 132.83v17.86h-19.07v52.74h-22v-52.74h-10v-17.86h10v-5.49q0-12.37 7.67-19.76t20.25-7.38a33.49 33.49 0 0113.68 3l-4.7 17.44a18.71 18.71 0 00-5.94-1.12 9 9 0 00-6.5 2.39 8.54 8.54 0 00-2.49 6.47v4.5z"
                          />
                          <path
                            fill="#fff"
                            d="M328.56 173.9h-50.85a18.32 18.32 0 005.39 10 13.65 13.65 0 009.53 3.66q10.37 0 14.79-8.16l19.58 4.06q-4.43 11-13.34 16.53t-21.07 5.55a35.63 35.63 0 01-26-10.48Q256 184.59 256 168.13t10.64-26.86a35.69 35.69 0 0126.12-10.55q15.06 0 25.29 10.27t10.5 27.14zM283.79 152a14.7 14.7 0 00-5.67 8.15h28.61a15 15 0 00-5.26-8.29 14 14 0 00-8.7-2.82 15.14 15.14 0 00-8.98 2.96zm-.42-28.27l9.81-21.38h26.26L303 123.69zM435.65 203.43h-22.11v-5.63q-8.43 7.74-21.56 7.74a31.71 31.71 0 01-24-10.48q-9.88-10.47-9.88-26.93t9.9-26.86a31.63 31.63 0 0124-10.55q13.13 0 21.56 7.74v-36.29h22.11zm-27.15-22.15a19.58 19.58 0 000-26.23 16.11 16.11 0 00-12-5.2 15.57 15.57 0 00-12 5.13q-4.69 5.13-4.7 13.15t4.7 13.22a15.65 15.65 0 0012 5.06 16.22 16.22 0 0012-5.13zM515 173.9h-50.89a18.38 18.38 0 005.39 10 13.66 13.66 0 009.54 3.66q10.36 0 14.78-8.16l19.62 4.08q-4.41 11-13.33 16.53T479 205.54a35.6 35.6 0 01-26-10.48q-10.65-10.47-10.64-26.93T453 141.27a35.67 35.67 0 0126.11-10.55q15.07 0 25.29 10.27t10.6 27.14zM470.19 152a14.74 14.74 0 00-5.66 8.15h28.6a14.94 14.94 0 00-5.25-8.29 14 14 0 00-8.71-2.82 15.19 15.19 0 00-8.98 2.96zM612 138.81q7.4 8.08 7.4 21.3v43.32h-22V164.9a14.92 14.92 0 00-3.32-10.06 10.77 10.77 0 00-8.57-3.87 12.68 12.68 0 00-10.51 4.85q-3.79 4.86-3.8 14.84v32.77h-22.11v-70.6h22.11v6.75q8.29-8.87 21.28-8.86 12.17 0 19.52 8.09zM690.59 141.41q11.05 10.41 11 26.72t-11 26.86q-11.05 10.41-27 10.41-16.15 0-27.29-10.41t-11.12-26.86q0-16.32 11.12-26.72T663.64 131q15.9 0 26.95 10.41zm-15.2 39.87a19.78 19.78 0 00-.07-26.3 15.89 15.89 0 00-11.68-5.13 16.43 16.43 0 00-12 5.13 19.57 19.57 0 00-.07 26.3 16.38 16.38 0 0012.09 5.13 15.83 15.83 0 0011.73-5.13z"
                          />
                          <path
                            fill="#fff"
                            d="M759.82 200.34a39.26 39.26 0 01-18.93 5.2q-13.12 0-20.39-7.17t-7.25-21v-26.68h-12.57v-17.86h12.57V112h22.11v20.82h20.45v17.86h-20.45v24.47q0 10.28 9.26 10.27a19.86 19.86 0 0010.09-2.81zM784.9 103a12.54 12.54 0 013.66 9 12 12 0 01-3.66 9 12.61 12.61 0 01-9.19 3.58 12.35 12.35 0 01-9.12-3.58 12.11 12.11 0 01-3.59-9 12.57 12.57 0 013.59-9.07 13 13 0 0118.31.07zm-20.25 100.43v-70.6h22.11v70.6zM847.56 173.47l20.32 4.5a33.22 33.22 0 01-12.44 20 36.42 36.42 0 01-22.94 7.59q-15.88 0-26.88-10.48t-11-26.93q0-16.32 11-26.86t26.88-10.55a36.41 36.41 0 0122.66 7.45 33.82 33.82 0 0112.72 19.69l-20.73 5.07q-1.38-6.19-5.25-9.36a14.36 14.36 0 00-9.4-3.16 15.5 15.5 0 00-12 5 18.15 18.15 0 00-4.56 12.73q0 7.88 4.56 12.8a15.62 15.62 0 0012 4.92q11.61-.03 15.06-12.41zM896 103a12.54 12.54 0 013.66 9 12 12 0 01-3.66 9 12.59 12.59 0 01-9.19 3.58 12.38 12.38 0 01-9.12-3.58 12.15 12.15 0 01-3.59-8.94 12.61 12.61 0 013.59-9.07A13 13 0 01896 103zm-20.25 100.43v-70.6h22.11v70.6zM983.25 203.43h-22.11v-5.63q-8.43 7.74-21.55 7.74a31.73 31.73 0 01-24-10.48q-9.87-10.47-9.88-26.93t9.88-26.86a31.65 31.65 0 0124-10.55q13.13 0 21.55 7.74v-5.63h22.11zm-27.15-22.15a19.58 19.58 0 000-26.23 16.09 16.09 0 00-12-5.2 15.59 15.59 0 00-12 5.13q-4.7 5.13-4.69 13.15t4.69 13.22a15.67 15.67 0 0012 5.06 16.2 16.2 0 0012-5.13zM1011.44 180.51q1.38 8.3 12.3 8.29a11.73 11.73 0 006.56-1.61 4.72 4.72 0 002.42-4q0-3.94-6.91-5.21l-14.09-2.81q-20.18-3.79-20.18-20.53a21 21 0 018.29-17.37q8.29-6.54 21.56-6.54 12.72 0 21.07 5.48A23.25 23.25 0 011052.9 151l-20.18 4.08a9.12 9.12 0 00-3.66-5.91 12.68 12.68 0 00-7.95-2.39q-4.14 0-6 1.62a5 5 0 00-1.86 3.87q0 3.8 5.25 4.92l16.3 3.38q9.54 2.1 14.38 7.66a20 20 0 014.83 13.57q0 11.4-8.7 17.58t-22.8 6.19q-13.14 0-22-5.13A20.77 20.77 0 01989.88 185z"
                          />
                        </g>
                      </svg>
                    </label>
                  </>
                )}

                {activeSignwall && (
                  <button
                    aria-label="Iniciar"
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
                      Regístrate
                    </span>
                  </button>
                )}

                {/* <div className={`${classes.newsCinModal}`}>{Newsle}</div> */}
                <div className={classes.callImg}>
                  <a
                    itemProp="url"
                    href="https://promociones.trome.pe/registro/super-llamada-ganadora/"
                    title="Llamada Ganadora">
                    <img src={winningCallLogo} alt="Llamada Ganadora" />
                  </a>
                </div>
              </>
            )}

            {arcSite === 'depor' && (
              <>
                <div className={classes.edicion}>
                  <div className={classes.title}>EDICIÓN</div>
                  <a
                    id="edicionId"
                    itemProp="url"
                    role="button"
                    href
                    title="Edicion"
                    className={classes.eLink}>
                    <div className={classes.mx}>{countryName}</div>
                    <svg height="24" viewBox="0 0 24 24" width="24">
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </a>
                </div>
                <div className={classes.eContent}>
                  {edittion('header-full')}
                  <div className={classes.eArrow} />
                </div>
              </>
            )}
            {isDeporPlay && showNewsletter && (
              <div className={classes.news}>
                <a href="/suscripcion-newsletter/">
                  <svg width="20" height="16" viewBox="0 0 20 16">
                    <path d="M20,2a2.006,2.006,0,0,0-2-2H2A2.006,2.006,0,0,0,0,2V14a2.006,2.006,0,0,0,2,2H18a2.006,2.006,0,0,0,2-2ZM18,2,10,6.99,2,2Zm0,12H2V4l8,5,8-5Z" />
                  </svg>
                  <span>Newsletter</span>
                </a>
              </div>
            )}
          </div>
          {isStory && <div className={classes.navLoader} />}
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `${isStory ? showMore : ''}${popup}${
            hideMenu ? '' : searchScript
          }${isStory ? scrolled : ''}${hideMenu ? '' : showSubmenu}${
            hideMenu ? '' : toggleMenu
          } `,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: edicionMenu,
        }}
      />
      {activeSignwall && (
        <script
          dangerouslySetInnerHTML={{
            __html: getBtnSignScript(arcSite),
          }}
        />
      )}
    </>
  )
}
