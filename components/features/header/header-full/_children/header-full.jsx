/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React from 'react'
import {
  popup,
  showMore,
  searchScript,
  scrolled,
  showSubmenu,
  toggleMenu,
} from '../_dependencies/scripts'

const classes = {
  headerFull: 'header-full bg-primary w-full position-relative',
  container:
    'header-full__container h-full flex justify-between position-relative',
  left: 'header-full__left flex items-center',
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
}

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
}) => {
  const arcSiteTrome = 'trome'

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
                href={url || id || '/'}
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
                    {menuList.map(item => {
                      const hasChildren = item.children.length > 0
                      return (
                        <>
                          <li className={classes.headerItem}>
                            <a
                              itemProp="url"
                              href={item.url || item._id || '/'}
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
                                {item.children.map(subItem => {
                                  return (() => {
                                    return (
                                      <li className={classes.subMenuItem}>
                                        <a
                                          itemProp="url"
                                          href={
                                            subItem.url || subItem._id || '/'
                                          }
                                          className={classes.headerLink}>
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
                    <p itemProp="description" className={classes.follow}>
                      {mobileHeaderFollowing}
                    </p>
                    <ul className={classes.mediaList}>
                      {socialNetworks.map(item => {
                        return (
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
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </>
            )}
            <div className={classes.boxLogo}>
              <a
                itemProp="url"
                className={classes.linkLogo}
                href="/"
                title={siteDomain}>
                <img
                  src={logo}
                  className={classes.logo}
                  alt={customLogoTitle}
                  title={customLogoTitle}
                />
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
                        itemProp="url"
                        href={item.url || item._id || '/'}
                        className={classes.linkNav}>
                        {item.name || item.display_name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            {!hideMenu && (
              <div className={classes.megaMenu}>
                <div className={classes.wrapper}>
                  <div className={classes.body}>
                    <ul className={classes.list}>
                      {menuList && renderSections(menuList, 0)}
                    </ul>
                  </div>
                  <div className={classes.footer}>
                    <a itemProp="url" href="/" className={classes.text}>
                      {siteDomain}
                    </a>
                    {legalLinks.map(link => (
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
                  {shareButtons.map(item => (
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
              <div className={classes.callImg}>
                <a
                  itemProp="url"
                  href="https://promociones.trome.pe/registro/super-llamada-ganadora/"
                  title="Llamada Ganadora">
                  <img src={winningCallLogo} alt="Llamada Ganadora" />
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
          }`,
        }}></script>
    </>
  )
}
