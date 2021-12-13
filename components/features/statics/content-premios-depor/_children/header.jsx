/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import * as React from 'react'

import SignwallComponent from '../../../signwall/main/_default'

const classes = {
  box: 'premios_depor__header__box',
  boxMob: 'premios_depor__header__boxMob',
  cont: 'premios_depor__header__cont',
  opacity: 'premios_depor__header__opacity',
  contLeft: 'premios_depor__header__cont__contLeft',
  flecha: 'premios_depor__header__cont__contLeft__flecha',
  logo: 'premios_depor__header__cont__contLeft__logo',
  contRight: 'premios_depor__header__cont__contRight',
  terminos: 'premios_depor__header__cont__contRight__terminos',
  buttonBef: 'premios_depor__header__cont__contRight__button--before',
  buttonAft: 'premios_depor__header__cont__contRight__button--after',

  boxBtnMenu: 'premios_depor__header__box-btnmenu ',
  btnMenu: 'premios_depor__header__btn-menu  ',
  iconMenu: 'premios_depor__header__icon-menu ',
  wrapperMenu: 'premios_depor__header__wrapper-menu ',
  topMenu: 'premios_depor__header__top-menu ',
  topLeft: 'premios_depor__header__top-left  ',
  btnClose: 'premios_depor__header__btn-close ',
  iconClose: 'premios_depor__header__icon-close ',
  imgMenu: 'premios_depor__header__img-menu',
  headerList: 'premios_depor__header__submenu-list ',
  headerItem: 'premios_depor__header__submenu-item ',
  headerLink: 'premios_depor__header__link ',
  boxLogoPlay: 'premios_depor__header__box-logo-play',
  linkLogoFooterDPlay: 'premios_depor__header__link-logo-play ',
  logo2: 'premios_depor__header__logo2',

  buttonMenu: 'premios_depor__header__buttonMenu',
  buttonMenuClosed: 'premios_depor__header__buttonMenuClosed',
  ul: 'premios_depor__header__ul',
  lista: 'premios_depor__header__lista',
  contLista: 'premios_depor__header__contLista',
  contOpen: 'premios_depor__header__contOpen',
  raya: 'premios_depor__header__raya',
  // rotate: 'premios_depor__header__rotate',
}

let isMobile
if (typeof window !== 'undefined')
  isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    window.navigator.userAgent
  )

const HeaderPremiosDepor = ({ requestUri }) => {
  const isPreview = /^\/preview\//.test(requestUri)

  const [mopen, setmopen] = useState(false)
  console.log('isMobile', isMobile)
  console.log('mopen', mopen)

  // const clickOH () => {

  // }

  return isMobile ? (
    mopen ? (
      <div className={classes.boxMob}>
        <div className={`${classes.contOpen} ${classes.opacity}`}>
          <ul className={classes.ul}>
            <li className={classes.lista}>
              <button
                type="button"
                className={classes.buttonMenuClosed}
                onClick={() => setmopen(!mopen)}>
                <div className={classes.raya}>-</div>
                <div className={classes.raya}>-</div>
                <div className={classes.raya}>-</div>
              </button>
            </li>
            <li className={classes.lista}>
              <a className={classes.contLista}>
                {!isPreview && typeof window !== 'undefined' ? (
                  <SignwallComponent classButton={classes.buttonAft} />
                ) : null}
              </a>
            </li>
            <li className={classes.lista}>
              <a
                className={classes.contLista}
                href="#termsid"
                onClick={() => setmopen(!mopen)}>
                TÉRMINOS Y CONDICIONES
              </a>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <div className={classes.boxMob}>
        <div className={`${classes.cont} ${classes.opacity}`}>
          <div className={classes.contLeft}>
            <a href="https://depor.com/">
              <img
                src="https://cdna.depor.com/resources/dist/depor/premios-depor/arrow_back-24px.svg"
                className={classes.flecha}
                alt="flecha"
              />
            </a>
            <div className={classes.logo}>
              <svg
                data-name="Capa 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 28">
                <path
                  style={{
                    fill: 'none',
                  }}
                  d="M0 0h64v28H0z"
                />
                <path
                  data-name="Trazado 79183"
                  d="m56.44 23.82 1.75-10c.43-2.42 1.63-3.61 3.27-3.61a4.53 4.53 0 0 1 1.37.18L64 5.48a4.67 4.67 0 0 0-1.49-.21c-1.25 0-2.57.69-3.75 2.51h-.09l.13-2.3-3.67.15-3.2 18.19Zm-12-9c.88-4.92 1.38-5.58 2.56-5.58s1.43.69.58 5.53-1.36 5.52-2.5 5.52-1.5-.65-.64-5.52m7.77 0c1.31-7.41-.3-9.5-4.51-9.5s-6.61 2.09-7.91 9.5.36 9.47 4.54 9.47 6.56-2 7.88-9.47m-17.89-.42c-.87 5-1.54 5.7-2.59 5.7-.68 0-1-.57-1.07-1.2l1.45-8.21a1.85 1.85 0 0 1 1.59-1.17c1.11 0 1.38.69.64 4.84m4.6.36c1.33-7.53-.29-9.38-3.33-9.38a5.35 5.35 0 0 0-3.53 1.4l-.44-1.28-3.14.21-3.92 22.25h4.51l.4-2.3.36-2.33h.09a3 3 0 0 0 2.25.8c3.25 0 5.66-3.13 6.75-9.35m-20.22-1.95c.59-2.84 1.05-3.41 2.15-3.41s1.32.66.87 3.41Zm.57 11.35a12.52 12.52 0 0 0 4.48-.87l.26-4a8.37 8.37 0 0 1-3.45.75c-2.21 0-2.8-.87-2.45-3.74h7.11c.22-.9.44-1.79.6-2.68 1.07-6.1-.49-8.25-4.34-8.25-4.19 0-6.56 2.78-7.68 9.17-1.18 6.66.42 9.62 5.47 9.62m-12.12-5.2A1.64 1.64 0 0 1 5.66 20c-1.16 0-1.44-.63-.66-5.29.8-4.3 1.33-5.11 2.53-5.11a1.1 1.1 0 0 1 1.14.78Zm3.64 4.93L15 .13l-4.56.21L9.81 4l-.37 2.35-.07.06a3 3 0 0 0-2.48-1.17c-3 0-5.27 2.63-6.45 9.29-1.23 7 .19 9.59 3.33 9.59a4.39 4.39 0 0 0 3.38-1.53h.09l.14 1.23Z"
                  style={{
                    fill: '#fff',
                  }}
                />
              </svg>
            </div>
          </div>
          <button
            type="button"
            className={classes.buttonMenu}
            onClick={() => setmopen(!mopen)}>
            <div className={classes.raya}>-</div>
            <div className={classes.raya}>-</div>
            <div className={classes.raya}>-</div>
          </button>
        </div>
      </div>
    )
  ) : (
    <div className={classes.box}>
      <div className={classes.cont}>
        <div className={classes.contLeft}>
          <a href="https://depor.com/">
            <img
              src="https://cdna.depor.com/resources/dist/depor/premios-depor/arrow_back-24px.svg"
              className={classes.flecha}
              alt="flecha"
            />
          </a>
          <div className={classes.logo}>
            <svg
              data-name="Capa 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 28">
              <path
                style={{
                  fill: 'none',
                }}
                d="M0 0h64v28H0z"
              />
              <path
                data-name="Trazado 79183"
                d="m56.44 23.82 1.75-10c.43-2.42 1.63-3.61 3.27-3.61a4.53 4.53 0 0 1 1.37.18L64 5.48a4.67 4.67 0 0 0-1.49-.21c-1.25 0-2.57.69-3.75 2.51h-.09l.13-2.3-3.67.15-3.2 18.19Zm-12-9c.88-4.92 1.38-5.58 2.56-5.58s1.43.69.58 5.53-1.36 5.52-2.5 5.52-1.5-.65-.64-5.52m7.77 0c1.31-7.41-.3-9.5-4.51-9.5s-6.61 2.09-7.91 9.5.36 9.47 4.54 9.47 6.56-2 7.88-9.47m-17.89-.42c-.87 5-1.54 5.7-2.59 5.7-.68 0-1-.57-1.07-1.2l1.45-8.21a1.85 1.85 0 0 1 1.59-1.17c1.11 0 1.38.69.64 4.84m4.6.36c1.33-7.53-.29-9.38-3.33-9.38a5.35 5.35 0 0 0-3.53 1.4l-.44-1.28-3.14.21-3.92 22.25h4.51l.4-2.3.36-2.33h.09a3 3 0 0 0 2.25.8c3.25 0 5.66-3.13 6.75-9.35m-20.22-1.95c.59-2.84 1.05-3.41 2.15-3.41s1.32.66.87 3.41Zm.57 11.35a12.52 12.52 0 0 0 4.48-.87l.26-4a8.37 8.37 0 0 1-3.45.75c-2.21 0-2.8-.87-2.45-3.74h7.11c.22-.9.44-1.79.6-2.68 1.07-6.1-.49-8.25-4.34-8.25-4.19 0-6.56 2.78-7.68 9.17-1.18 6.66.42 9.62 5.47 9.62m-12.12-5.2A1.64 1.64 0 0 1 5.66 20c-1.16 0-1.44-.63-.66-5.29.8-4.3 1.33-5.11 2.53-5.11a1.1 1.1 0 0 1 1.14.78Zm3.64 4.93L15 .13l-4.56.21L9.81 4l-.37 2.35-.07.06a3 3 0 0 0-2.48-1.17c-3 0-5.27 2.63-6.45 9.29-1.23 7 .19 9.59 3.33 9.59a4.39 4.39 0 0 0 3.38-1.53h.09l.14 1.23Z"
                style={{
                  fill: '#fff',
                }}
              />
            </svg>
          </div>
        </div>
        <div className={classes.contRight}>
          <div className={classes.terminos}>
            <a href="#termsid">
              <span>TÉRMINOS Y CONDICIONES</span>
            </a>
          </div>
          {!isPreview && typeof window !== 'undefined' ? (
            <SignwallComponent classButton={classes.buttonAft} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default HeaderPremiosDepor
