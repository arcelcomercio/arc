/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import * as React from 'react'

const classes = {
  containerHeader: 'ranking_trome__header__containerHeader',
  box: 'ranking_trome__header__box',
  boxMob: 'ranking_trome__header__boxMob',
  heightClose: 'ranking_trome__header__heightClose',
  heightNormal: 'ranking_trome__header__heightNormal',

  cont: 'ranking_trome__header__cont',
  logoTrome: 'ranking_trome__header__logoTrome',
  marginTopNormal: 'ranking_trome__header__marginTopNormal',
  marginTopClose: 'ranking_trome__header__marginTopClose',
  opacity: 'ranking_trome__header__opacity',
  color: 'ranking_trome__header__color',
  contLeft: 'ranking_trome__header__cont__contLeft',
  flecha: 'ranking_trome__header__cont__contLeft__flecha',
  logo: 'ranking_trome__header__cont__contLeft__logo',
  contRight: 'ranking_trome__header__cont__contRight',
  terminos: 'ranking_trome__header__cont__contRight__terminos',
  buttonBef: 'ranking_trome__header__cont__contRight__button--before',
  buttonAft: 'ranking_trome__header__cont__contRight__button--after',
  buttonAft2: 'ranking_trome__header__cont__contRight__button--after2',

  buttonMenu: 'ranking_trome__header__buttonMenu',
  buttonMenuClosed: 'ranking_trome__header__buttonMenuClosed',
  ul: 'ranking_trome__header__ul',
  lista: 'ranking_trome__header__lista',
  contLista: 'ranking_trome__header__contLista',
  contOpen: 'ranking_trome__header__contOpen',
  raya: 'ranking_trome__header__raya',
}

let isMobile
if (typeof window !== 'undefined')
  isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    window.navigator.userAgent
  )



const HeaderRankingTrome = () => {

  const [mopen, setmopen] = useState(false)

  useEffect(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE')
    )
    const { firstName = '', lastName = '', uuid = '' } = localProfile || {}

    const signwallButton = document.getElementById('signwall-nav-btn') // id de tu boton personalizado
    if (signwallButton) {
      signwallButton.addEventListener('click', () => {
        if (uuid) {
          window.location.href = '/mi-perfil/?outputType=subscriptions'
        } else {
          window.location.href =
            '/signwall/?outputType=subscriptions&signwallOrganic=1'
        }
      })

      if (uuid) {
        if (firstName || lastName) {
          const username = `${firstName} ${lastName}`
            .replace(/null|undefined/gi, '')
            .trim()
          signwallButton.innerHTML =
            username.length >= 13
              ? `${username.slice(0, 13)}...`
              : username || 'Mi Perfil'
        } else {
          signwallButton.innerHTML = 'Mi Perfil'
        }
      }
    }
  }, [mopen])


  return isMobile ? (
    mopen ? (
      <div className={classes.containerHeader}>
        <div className={`${classes.boxMob} ${classes.heightClose}`}>
          <div className={`${classes.contOpen} ${classes.color}`}>
            <ul className={classes.ul}>
              <li className={classes.lista}>
                <button
                  type="button"
                  className={classes.buttonMenuClosed}
                  onClick={() => setmopen(!mopen)}>
                  <svg xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="white"
                      d="M7 4a.995.995 0 0 0-.707.293l-2 2a.999.999 0 0 0 0 1.414L11.586 15l-7.293 7.293a.999.999 0 0 0 0 1.414l2 2a.999.999 0 0 0 1.414 0L15 18.414l7.293 7.293a.999.999 0 0 0 1.414 0l2-2a.999.999 0 0 0 0-1.414L18.414 15l7.293-7.293a.999.999 0 0 0 0-1.414l-2-2a.999.999 0 0 0-1.414 0L15 11.586 7.707 4.293A.996.996 0 0 0 7 4z"
                    />
                  </svg>
                </button>
              </li>
              <li className={classes.lista}>
                <a className={classes.contLista}>
                  <span
                    className="ranking_trome__header__cont__contRight__button--after2"
                    id="signwall-nav-btn">
                    {' '}
                    Registrate{' '}
                  </span>
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
          <img
            src="https://cdna.trome.pe/resources/dist/trome/ranking-trome/ranking_trome_logo.png"
            className={`${classes.logoTrome} ${classes.marginTopClose}`}
            alt="flecha"
          />
        </div>
      </div>
    ) : (
      <>
        <div className={classes.containerHeader}>
          <div className={`${classes.cont} ${classes.color}`}>
            <div className={classes.contLeft}>
              <a href="https://trome.com/">
                <img
                  src="https://cdna.trome.pe/resources/dist/trome/ranking-trome/svg/arrow_back-24px.svg"
                  className={classes.flecha}
                  alt="flecha" />
              </a>
              <div className={classes.logo}>
                <svg
                  id="Capa_1"
                  data-name="Capa 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 112 33"
                >
                  <defs>
                    <style>{".cls-1{fill:#ff8400}.cls-2{fill:#fff}"}</style>
                  </defs>
                  <g id="Grupo_2551" data-name="Grupo 2551">
                    <g id="Grupo_2534" data-name="Grupo 2534">
                      <path
                        id="Trazado_79287"
                        data-name="Trazado 79287"
                        className="cls-1"
                        d="M110.72 32.6H112v-5.84h-1.28A21.56 21.56 0 0 1 89.16 5.23 19.69 19.69 0 0 1 89.73.4h-5.8a27.6 27.6 0 0 0-.46 5 27.23 27.23 0 0 0 27.23 27.2Z"
                      />
                      <path
                        id="Trazado_79288"
                        data-name="Trazado 79288"
                        className="cls-1"
                        d="M112 16.8A12.12 12.12 0 0 1 99.83 4.73 12.55 12.55 0 0 1 100.6.4h-5.67a17.5 17.5 0 0 0 13.28 20.86 17.94 17.94 0 0 0 3.79.4Z"
                      />
                      <path
                        id="Trazado_79289"
                        data-name="Trazado 79289"
                        className="cls-1"
                        d="M106.57.4A6.68 6.68 0 0 0 108 9.73a6.91 6.91 0 0 0 4 1.3V.4Z"
                      />
                    </g>
                    <g id="Grupo_2330" data-name="Grupo 2330">
                      <path
                        id="Trazado_79290"
                        data-name="Trazado 79290"
                        className="cls-2"
                        d="M14.39 13.55H7.85v7.71c0 1.08.23 1.44 1.27 1.44 1.48 0 1.41-1.07 1.48-2.21v-.94h4.49v1.55c0 4.69-1.74 5.73-6.37 5.73-3.62 0-6.61-.47-6.61-4.8v-8.51H0v-4.1h2.11V5.77h5.64v3.65h6.5Z"
                      />
                      <path
                        id="Trazado_79291"
                        data-name="Trazado 79291"
                        className="cls-2"
                        d="M24.88 16.1c0-1.21.07-2.55-1.47-2.55s-2.12 1.34-2.12 2.75v10.36h-5.63V9.42h5.47v2.52h.23A4 4 0 0 1 23 9.83a5.1 5.1 0 0 1 2.65-.64c3.92 0 4.25 3.19 4.25 6.37v1.34h-5v-.8Z"
                      />
                      <path
                        id="Trazado_79292"
                        data-name="Trazado 79292"
                        className="cls-2"
                        d="M35.07 18c0 3.72.34 4.46 3.06 4.46S41 21.76 41 18s-.27-4.49-2.88-4.49-3.05.78-3.05 4.49Zm11.6 0c0 7.08-1.47 8.79-8.61 8.79s-8.59-1.87-8.59-8.79c0-7 1.41-8.82 8.59-8.82s8.61 1.59 8.61 8.82Z"
                      />
                      <path
                        id="Trazado_79293"
                        data-name="Trazado 79293"
                        className="cls-2"
                        d="M51.91 9.42v2.42h.2c.7-2.05 2.78-2.62 4.73-2.62 2.41 0 4.93.44 5.2 3.39h.26c.3-2.45 2.62-3.39 4.8-3.39 4 0 6 1.64 6 5.64v11.76h-5.63v-9.95c-.1-1.81-.07-3.12-2.28-3.12s-2.61 1.45-2.61 3.32v9.79H57V16.2c-.07-1.58-.17-2.65-2.12-2.65-2.31 0-2.75 1.24-2.75 3.32v9.79h-5.65V9.42Z"
                      />
                      <path
                        id="Trazado_79294"
                        data-name="Trazado 79294"
                        className="cls-2"
                        d="M84.54 15.8c0-2.65-1-2.82-3-2.82s-2.72.47-2.79 2.82Zm5.83 5.2c0 2.71-.9 4.26-2.41 5.13a14 14 0 0 1-6.3 1.07c-7 0-8.75-2.45-8.75-9.15 0-6.88 1.57-9.16 8.75-9.16 6.7 0 8.72 1.85 8.72 9.16v1h-11.6c0 3.15.47 4.06 2.88 4.06 1.81 0 3-.2 3-2.12Z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <button
              type="button"
              className={classes.buttonMenu}
              onClick={() => setmopen(!mopen)}>
              <div className={classes.raya} />
              <div className={classes.raya} />
              <div className={classes.raya} />
            </button>
          </div>
          <div className={`${classes.boxMob} ${classes.heightNormal}`} >
            <img
              src="https://cdna.trome.pe/resources/dist/trome/ranking-trome/ranking_trome_logo.png"
              className={`${classes.logoTrome} ${classes.marginTopNormal}`}
              alt="flecha"
            />
          </div>
        </div>

      </>
    )
  ) : (
    <div className={classes.containerHeader}>
      <div className={classes.box}>
        <div className={classes.cont}>
          <div className={classes.contLeft}>
            <a href="https://trome.com/">
              <img
                src="https://cdna.trome.pe/resources/dist/trome/ranking-trome/svg/arrow_back-24px.svg"
                className={classes.flecha}
                alt="flecha"
              />
            </a>
            <div className={classes.logo}>
              <svg
                id="Capa_1"
                data-name="Capa 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 112 33"
              >
                <defs>
                  <style>{".cls-1{fill:#fff}"}</style>
                </defs>
                <g id="Grupo_2535" data-name="Grupo 2535">
                  <g id="Grupo_2534" data-name="Grupo 2534">
                    <path
                      id="Trazado_79287"
                      data-name="Trazado 79287"
                      d="M110.72 32.6H112v-5.84h-1.28A21.56 21.56 0 0 1 89.16 5.23 19.69 19.69 0 0 1 89.73.4h-5.8a27.6 27.6 0 0 0-.46 5 27.23 27.23 0 0 0 27.23 27.2Z"
                    />
                    <path
                      id="Trazado_79288"
                      data-name="Trazado 79288"
                      d="M112 16.8A12.12 12.12 0 0 1 99.83 4.73 12.55 12.55 0 0 1 100.6.4h-5.67a17.5 17.5 0 0 0 13.28 20.86 17.94 17.94 0 0 0 3.79.4Z"
                    />
                    <path
                      id="Trazado_79289"
                      data-name="Trazado 79289"
                      d="M106.57.4A6.68 6.68 0 0 0 108 9.73a6.91 6.91 0 0 0 4 1.3V.4Z"
                    />
                  </g>
                  <g id="Grupo_2330" data-name="Grupo 2330">
                    <path
                      id="Trazado_79290"
                      data-name="Trazado 79290"
                      className="cls-1"
                      d="M14.39 13.55H7.85v7.71c0 1.08.23 1.44 1.27 1.44 1.48 0 1.41-1.07 1.48-2.21v-.94h4.49v1.55c0 4.69-1.74 5.73-6.37 5.73-3.62 0-6.61-.47-6.61-4.8v-8.52H0V9.42h2.11V5.77h5.64v3.65h6.5Z"
                    />
                    <path
                      id="Trazado_79291"
                      data-name="Trazado 79291"
                      className="cls-1"
                      d="M24.88 16.1c0-1.21.07-2.55-1.47-2.55s-2.12 1.34-2.12 2.75v10.36h-5.63V9.42h5.47v2.52h.23A4 4 0 0 1 23 9.83a5.1 5.1 0 0 1 2.65-.64c3.92 0 4.25 3.18 4.25 6.37v1.34h-5v-.8Z"
                    />
                    <path
                      id="Trazado_79292"
                      data-name="Trazado 79292"
                      className="cls-1"
                      d="M35.07 18c0 3.72.34 4.46 3.06 4.46S41 21.76 41 18s-.27-4.49-2.88-4.49-3.05.78-3.05 4.49Zm11.6 0c0 7.08-1.47 8.79-8.61 8.79s-8.59-1.87-8.59-8.79c0-7 1.41-8.82 8.59-8.82s8.61 1.59 8.61 8.82Z"
                    />
                    <path
                      id="Trazado_79293"
                      data-name="Trazado 79293"
                      className="cls-1"
                      d="M51.91 9.42v2.42h.2c.7-2.05 2.78-2.62 4.73-2.62 2.41 0 4.93.44 5.2 3.39h.26c.3-2.45 2.62-3.39 4.8-3.39 4 0 6 1.64 6 5.63v11.77h-5.63v-9.95c-.1-1.81-.07-3.12-2.28-3.12s-2.61 1.45-2.61 3.32v9.79H57V16.2c-.07-1.58-.17-2.65-2.12-2.65-2.31 0-2.75 1.24-2.75 3.32v9.79h-5.65V9.42Z"
                    />
                    <path
                      id="Trazado_79294"
                      data-name="Trazado 79294"
                      className="cls-1"
                      d="M84.54 15.79c0-2.64-1-2.81-3-2.81s-2.72.47-2.79 2.81ZM90.37 21c0 2.71-.9 4.25-2.41 5.13a14 14 0 0 1-6.3 1.07c-7 0-8.75-2.45-8.75-9.15 0-6.88 1.57-9.16 8.75-9.16 6.7 0 8.72 1.85 8.72 9.16v1h-11.6c0 3.15.47 4.05 2.88 4.05 1.81 0 3-.2 3-2.11Z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className={classes.contRight}>
            <div className={classes.terminos}>
              <a href="#termsid">
                <span>TÉRMINOS Y CONDICIONES</span>
              </a>
            </div>
            <span
              className="ranking_trome__header__cont__contRight__button--after"
              id="signwall-nav-btn">
              {' '}
              Registrate{' '}
            </span>
          </div>
        </div>
        <img
          src="https://cdna.trome.pe/resources/dist/trome/ranking-trome/ranking_trome_logo.png"
          className={`${classes.logoTrome} ${classes.marginTopNormal}`}
          alt="flecha"
        />
      </div>
    </div>
  )
}
export default HeaderRankingTrome
