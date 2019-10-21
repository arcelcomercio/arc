import React from 'react'

const classes = {
  headerFull: 'header-full bg-primary w-full',
  container: 'header-full__container',
  left: 'header-full__left',
  boxBtnMenu: 'header-full__box-btnmenu',
  btnMenu: 'header-full__btn-menu flex justify-center items-center',
  iconMenu: 'icon-hamburguer',
  wrapperMenu: 'header-full__wrapper-menu bg-primary overflow-y-auto',
  topMenu: 'header-full__top-menu flex',
  topLeft: 'header-full__top-left  flex items-center justify-center',
  topRight: 'header-full__top-right',
  btnClose: 'header-full__btn-close text-white w-full h-full',
  iconClose: 'header-full__icon-close icon-close',
  imgMenu: 'header-full__img-menu',
  boxSearch: 'header-full__box-search pt-25',
  formSearch: 'header-full__form-search flex justify-center items-center',
  inputSearch: 'header-full__input-search',
  btnSearch: 'header-full__btn-search bg-white pr-15 pl-15',
  iconSearch: 'header-full__icon-search icon-search',
  headerList: 'header-full__list pt-10 pb-10',
  headerItem: 'header-full__item pr-25 pl-25 pt-5 pb-5',
  headerLink:
    'header-full__link block text-white text-xl uppercase pb-10 pt-10 font-bold secondary-font',
  right: 'header-full__right',
  btnContainer: 'header-full__btn-container',
  btnResult: 'header-full__btn-result btn text-black bg-secondary text-md',
  footerMenu:
    'header-full__footer-menu flex flex-col justify-center items-center pt-20 pb-20',
  follow: 'header-full__follow text-md text-white mb-15',
  mediaList: 'header-full__media-list flex',
  mediaItem: 'header-full__media-item mr-10',
  mediaLink: 'header-full__media-link p-5',
  mediaIcon: 'header-full__media-icon icon-facebook text-white text-xl ',
}

export default () => {
  return (
    <div className={classes.headerFull}>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.boxBtnMenu}>
            <button type="button" className={classes.btnMenu}>
              <i className={classes.iconMenu} />
            </button>
          </div>
          <div className={classes.wrapperMenu}>
            <div className={classes.topMenu}>
              <div className={classes.topLeft}>
                <button type="button" className={classes.btnClose}>
                  <i className={classes.iconClose} />
                </button>
              </div>
              <div className={classes.topRight}>
                <img className={classes.imgMenu} alt="" src="" />
              </div>
            </div>
            <div className={classes.boxSearch}>
              <form className={classes.formSearch} action="">
                <input
                  type="search"
                  placeholder="Buscar"
                  className={classes.inputSearch}
                />
                <button type="submit" className={classes.btnSearch}>
                  <i className={classes.iconSearch} />
                </button>
              </form>
            </div>
            <ul className={classes.headerList}>
              {[
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                4,
                5,
                7,
                8,
                5,
                4,
                3,
                5,
                4,
                5,
                5,
                4,
                6,
                4,
                6,
                4,
              ].map(() => {
                return (
                  <li className={classes.headerItem}>
                    <a href="/" className={classes.headerLink}>
                      Deportes
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className={classes.footerMenu}>
              <p className={classes.follow}>Siguenos en Depor</p>
              <ul className={classes.mediaList}>
                {[1, 2, 3].map(() => {
                  return (
                    <li className={classes.mediaItem}>
                      <a className={classes.mediaLink} href="/">
                        <i className={classes.mediaIcon} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.btnContainer}>
            <button type="button" className={classes.btnResult}>
              Resultados
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
