/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React from 'react'
import getProperties from 'fusion:properties'

import {
  menuScript,
  scrolled,
  scrollProgresBar,
  searchScript,
} from '../_dependencies/scripts'

const classes = {
  headerFull: 'header-full w-full pos-rel',
  container: 'header-full__container h-full f just-between pos-rel',
  left: 'header-full__left f alg-center',
  btnMenu: 'header-full__btn-menu  f just-center alg-center',
  right: 'header-full__right f alg-center',
  btnContainer: 'header-full__btn-container',
  btnResult: 'header-full__btn-result',
  boxLogo: 'header-full__box-logo h-full',
  linkLogo: 'header-full__link-logo f alg-center h-full',
  logo: 'header-full__logo',
  boxList: 'header-full__box-list',
  listNav: 'header-full__list-nav f',
  itemNav: 'header-full__item-nav',
  linkNav: 'header-full__link-nav',

  megaMenu: 'header-full__megamenu w-full pos-abs oflow-h f f-col just-between',
  navStoryTitle: 'nav__story-title oflow-h',
  navStorySocialNetwork: 'nav__story-social-network pos-rel ',

  listIcon: 'story-header__list f just-between',
  shareItem: 'story-header__item f alg-center',
  shareLink: 'story-header__link f alg-center just-center',
  navLoaderBg: 'nav__load-bg pos-abs',
  navLoader: 'nav__loader-bar pos-abs h-full',

  wrapper: 'nav-sidebar__wrapper f f-col just-between h-full',
  body: 'nav-sidebar__body',
  list: 'nav-sidebar__list',
  item: 'nav-sidebar__item pos-rel f just-between alg-center',
  containerSubMenu: 'nav-sidebar__container-submenu w-full oflow-h',
  menuArrow: 'nav-sidebar__menu-arrow',
  labelParentItem: 'nav-sidebar__parent-item pos-abs',
  link: 'nav-sidebar__link',

  footer: `nav-sidebar__footer`,
  text: `nav-sidebar__text`,
}

export default ({
  // socialNetworks,
  customLogoTitle,
  logo,
  whiteLogo,
  headerList,
  menuList,
  isStory,
  shareButtons,
  postTitle,
  arcSite,
  // mobileHeaderFollowing,
  siteDomain,
  legalLinks,
  hideMenu,
  winningCallLogo,
}) => {
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
                  <label htmlFor={idElem} className={classes.labelParentItem}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      viewBox="0 0 8 14">
                      <path
                        d="M2.079,14.713,9.289,7.5,2.079.293.293,2.079,5.717,7.5.293,12.927Z"
                        transform="translate(-0.293 -0.293)"
                      />
                    </svg>
                  </label>
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

  const { googleNewsUrl } = getProperties(arcSite)

  return (
    <>
      <div data-story-header={`${isStory}`} className={classes.headerFull}>
        <div className={classes.container}>
          <div className={classes.left}>
            {!hideMenu && (
              <button type="button" className={classes.btnMenu} id="btn-menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.111"
                  height="17.105"
                  viewBox="0 0 18.111 17.105">
                  <title>Menú</title>
                  <g transform="translate(-15 49)">
                    <path d="M15-47.491v1.509H33.111V-49H15Z" />
                    <path
                      d="M15-33.491v1.509H33.111V-35H15Z"
                      transform="translate(0 -6.957)"
                    />
                    <path
                      d="M15-19.491v1.509H33.111V-21H15Z"
                      transform="translate(0 -13.914)"
                    />
                  </g>
                </svg>
              </button>
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
              {arcSite === 'trome' && (
                <a
                  itemProp="url"
                  className={`${classes.linkLogo} header-full__l-w`}
                  href="/"
                  title={siteDomain}>
                  <img
                    src={whiteLogo}
                    className={classes.logo}
                    alt={customLogoTitle}
                    title={customLogoTitle}
                  />
                </a>
              )}
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
                <ul className={classes.listIcon}>
                  {arcSite === 'depor' ? (
                    <a
                      itemProp="url"
                      href={googleNewsUrl}
                      className="share-btn f f-center share-btn--gnews">
                      <span className="share-btn--gnews-txt">
                        Síguenos en Google News
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="25"
                        viewBox="0 100 512.3 512.3">
                        <path d="m444.6 231.6h-377v265h377zm-127 117.5h82v30h-82zm82-60v30h-82v-30zm-199.5 162.5c-48.2 0-87.5-39.3-87.5-87.5s39.3-87.5 87.5-87.5c22.6 0 44 8.6 60.3 24.1l-20.7 21.7c-10.7-10.2-24.8-15.9-39.7-15.9-31.7 0-57.5 25.8-57.5 57.5s25.8 57.5 57.5 57.5c26.5 0 48.9-18 55.5-42.5h-55.5v-30h87.5v15c0 48.2-39.3 87.5-87.5 87.5zm117.5-42.5h82v30h-82z" />
                      </svg>
                    </a>
                  ) : (
                    <li className={classes.shareItem}>
                      <span>Comparte</span>
                    </li>
                  )}
                  {shareButtons.map(item => (
                    <li key={item.icon} className={classes.shareItem}>
                      <a
                        itemProp="url"
                        title={`Compartir en ${item.name}`}
                        className={classes.shareLink}
                        href={item.link}
                        data-share="">
                        {(() => {
                          if (item.name === 'facebook') {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                viewBox="0 0 40 40">
                                <path
                                  d="M20.4.4a20,20,0,1,0,20,20A20,20,0,0,0,20.4.4Zm4.738,13.821H22.131c-.356,0-.752.469-.752,1.092v2.171h3.76l-.569,3.1H21.379v9.294H17.831V20.579H14.612v-3.1h3.219V15.662a4.463,4.463,0,0,1,4.3-4.735h3.006v3.294Z"
                                  transform="translate(-0.4 -0.4)"
                                  fill="#21589b"
                                />
                              </svg>
                            )
                          }
                          if (item.name === 'fbmsg') {
                            return (
                              <svg
                                viewBox="0 0 40 40"
                                width="40"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  transform="translate(-13.387 74.741)"
                                  d="M27.2-73.949c-9.845,3.193-15.982,14.561-13.1,24.333C16.911-39.844,25.03-34.1,34.874-34.8A20.233,20.233,0,0,0,51.559-45.656c1.982-3.768,2.429-11.3.959-15.711-1.406-4.151-5.945-9.26-10.228-11.432A22.685,22.685,0,0,0,27.2-73.949Zm6.712,16.286,1.854,1.916,3.388-1.916a17.321,17.321,0,0,1,4.091-1.916c.7,0-6.776,8.366-7.8,8.813-.32.128-1.342-.7-2.365-1.788L31.295-54.6,27.2-52.554,23.048-50.51l1.6-1.788c3.068-3.576,6.648-7.281,7.032-7.281A8,8,0,0,1,33.916-57.663Z"
                                  fill="#0088e7"
                                />
                              </svg>
                            )
                          }
                          if (item.name === 'whatsapp') {
                            return (
                              <svg
                                viewBox="0 0 40 40"
                                width="40"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M20.052,10.287a9.628,9.628,0,0,0-7.915,15.088l-.97,3.547,3.637-.955A9.621,9.621,0,0,0,29.658,19.9,9.607,9.607,0,0,0,20.052,10.287ZM25.7,24.027a2.974,2.974,0,0,1-1.95,1.373,3.952,3.952,0,0,1-1.82-.115,16.772,16.772,0,0,1-1.647-.608,12.892,12.892,0,0,1-4.935-4.362,5.617,5.617,0,0,1-1.18-2.988,3.238,3.238,0,0,1,1.012-2.41,1.063,1.063,0,0,1,.77-.362l.553.01c.177.008.415-.067.65.5.24.578.818,2,.89,2.145a.534.534,0,0,1,.023.507,2,2,0,0,1-.288.482l-.433.507c-.145.143-.3.3-.127.59a8.706,8.706,0,0,0,1.607,2,7.841,7.841,0,0,0,2.323,1.433c.288.143.457.12.627-.072s.722-.843.915-1.133.385-.242.65-.145,1.685.8,1.973.94.482.217.553.337a2.371,2.371,0,0,1-.167,1.373ZM20,0A20,20,0,1,0,40,20,20,20,0,0,0,20,0Zm.048,31.467a11.574,11.574,0,0,1-5.53-1.407L8.39,31.667l1.64-5.992a11.561,11.561,0,1,1,10.018,5.792Z"
                                  fill="#24d165"
                                />
                              </svg>
                            )
                          }
                          if (item.name === 'twitter') {
                            return (
                              <svg
                                viewBox="0 0 40 40"
                                width="40"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  transform="translate(-.4 -.4)"
                                  d="M20.4.4a20,20,0,1,0,20,20A20,20,0,0,0,20.4.4Zm8.135,16.383c.008.171.01.342.01.508A11.2,11.2,0,0,1,11.3,26.731a7.747,7.747,0,0,0,.94.052A7.889,7.889,0,0,0,17.133,25.1a3.948,3.948,0,0,1-3.679-2.733,3.958,3.958,0,0,0,1.777-.069,3.942,3.942,0,0,1-3.16-3.862v-.048a3.95,3.95,0,0,0,1.785.494,3.938,3.938,0,0,1-1.219-5.263,11.2,11.2,0,0,0,8.119,4.119,3.94,3.94,0,0,1,6.712-3.594,7.909,7.909,0,0,0,2.5-.956,3.958,3.958,0,0,1-1.731,2.181,7.915,7.915,0,0,0,2.262-.623,7.988,7.988,0,0,1-1.965,2.04Z"
                                  fill="#00aef0"
                                />
                              </svg>
                            )
                          }
                          return ''
                        })()}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {arcSite === 'depor' && (
              <div className={classes.btnContainer}>
                <a
                  itemProp="url"
                  href="/resultados/futbol/resultados/"
                  className={classes.btnResult}>
                  Resultados
                </a>
              </div>
            )}
            {arcSite === 'trome' && (
              <>
                <div className="header-full__ci">
                  <a
                    itemProp="url"
                    href="https://promociones.trome.pe/registro/super-llamada-ganadora/"
                    title="Llamada Ganadora">
                    <img src={winningCallLogo} alt="Llamada Ganadora" />
                  </a>
                </div>
                <button type="button" className="header-full__is">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-basic__search"
                    width="19"
                    height="19"
                    viewBox="0 0 14 14">
                    <title>abrir cuadro de búsqueda</title>
                    <path d="M13.2 12.4L9.2 8.3C9.8 7.5 10.1 6.5 10.1 5.4 10.1 4.2 9.6 3 8.8 2.1 7.9 1.2 6.7 0.8 5.4 0.8 4.2 0.8 3 1.2 2.1 2.1 1.2 3 0.8 4.2 0.8 5.4 0.8 6.7 1.2 7.9 2.1 8.8 3 9.6 4.2 10.1 5.4 10.1 6.5 10.1 7.5 9.8 8.3 9.2L12.4 13.2C12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.3 12.4 13.3 12.5 13.3 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2L13.2 12.5C13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.3 12.5 13.3 12.4 13.3 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4V12.4ZM7.9 7.9C7.3 8.6 6.4 8.9 5.4 8.9 4.5 8.9 3.6 8.6 3 7.9 2.3 7.3 1.9 6.4 1.9 5.4 1.9 4.5 2.3 3.6 3 3 3.6 2.3 4.5 1.9 5.4 1.9 6.4 1.9 7.3 2.3 7.9 3 8.6 3.6 8.9 4.5 8.9 5.4 8.9 6.4 8.6 7.3 7.9 7.9Z" />
                  </svg>
                </button>
                <div className="navbar-nm__box-search hf-search pos-abs">
                  <form className="f f-center just-center hf-search" action="">
                    <input
                      type="search"
                      className="navbar-nm__input-search hf-search"
                      placeholder="Buscar"
                    />
                    <button className="navbar-nm__btn-search" type="submit">
                      OK
                    </button>
                  </form>
                </div>
                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: searchScript,
                  }}
                />
              </>
            )}
          </div>
          {isStory && (
            <>
              <div className={classes.navLoaderBg}></div>
              <div className={classes.navLoader} />
            </>
          )}
        </div>
      </div>
      <div id="nav-pointer"></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `${isStory ? scrolled : ''}${hideMenu ? '' : menuScript}${
            isStory && arcSite === 'depor' ? scrollProgresBar : ''
          }`,
        }}></script>
    </>
  )
}
