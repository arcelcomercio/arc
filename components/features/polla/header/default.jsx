/* eslint-disable jsx-a11y/anchor-is-valid */
import { ENVIRONMENT } from 'fusion:environment'
import React, { useState } from 'react'

import LastMatch from './_children/last-match'
import Ranking from './_children/ranking'
import customFields from './_dependencies/custom-fields'

// const SIGNWALL = 'https://trome.pe/signwall/?outputType=subscriptions&signwallOrganic=1'
const SIGNWALL = '/signwall/?outputType=subscriptions&signwallOrganic=1'
const MEDIA_BASE = 'https://resultadosopta.minoticia.pe/'
const ANONIMO =
  '6f3015f2281091770eb7b700b87b547883b03bd916e5b705cc7dd70ae63ba89c'
// const API_BASE = 'http://localhost:8000/depor/'
let API_BASE =
  'https://dsnvo9xv4g.execute-api.us-east-1.amazonaws.com/dev/depor/'
if (ENVIRONMENT === 'elcomercio') {
  API_BASE =
    'https://pmdu68gci6.execute-api.us-east-1.amazonaws.com/prod/depor/'
}

const Header = (props) => {
  const {
    customFields: {
      anonymous = false,
      showUserStats = true,
      logo = 'https://cdna.trome.pe/resources/dist/trome/polla/logo-polla-trome.png',
      linkLogo = '',
      textHome = 'Inicio',
      home = '',
      // textTerms = 'Términos',
      // terms = '',
      textHowPlay = '¿Cómo jugar?',
      howPlay = '',
      textPrizes = 'Premios',
      prizes = '',
    } = {},
  } = props

  let userSignwall = {}
  let USUARIO = ANONIMO

  const [userData, setUserData] = useState('')
  const [loadExec, setLoadExec] = useState(false)

  const getLoggedUser = () => {
    let userId = null
    if (
      window.localStorage &&
      // eslint-disable-next-line no-prototype-builtins
      window.localStorage.hasOwnProperty('ArcId.USER_INFO') &&
      window.localStorage.getItem('ArcId.USER_INFO') !== '{}'
    ) {
      const UUID_USER = JSON.parse(
        window.localStorage.getItem('ArcId.USER_INFO')
      ).uuid

      if (UUID_USER) {
        userId = UUID_USER
        userSignwall = JSON.parse(
          window.localStorage.getItem('ArcId.USER_PROFILE')
        )
      }
    }
    return userId
  }

  const loadDataUsuario = () => {
    fetch(
      `${API_BASE}usuario/${USUARIO}/ultimopartido?v=${new Date().getTime()}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUserData(data)
      })
  }

  if (typeof window !== 'undefined') {
    if (anonymous !== true) {
      USUARIO = getLoggedUser()
    }

    if (USUARIO === null) {
      window.location.href = SIGNWALL
    } else if (loadExec === false) {
      loadDataUsuario()

      if (userData !== '') {
        if (
          typeof userData.usuario !== 'undefined' &&
          Object.keys(userData.usuario).length === 0
        ) {
          const registerUser = {
            nombre: userSignwall.firstName || userSignwall.displayName,
            apellidos: userSignwall.lastName,
            tipo_documento: '',
            dni: '',
            email: userSignwall.email,
            fecha_nacimiento: `${userSignwall.birthDay}-${userSignwall.birthMonth}-${userSignwall.birthYear}`,
            genero: userSignwall.gender,
            estado_civil: '',
            ocupacion: '',
            nivel_academico: '',
            telefono: '',
            distrito: '',
            departamento: '',
            provincia: '',
            direccion: '',
            terminos: 1,
          }
          // Ingresamos el usuario
          fetch(`${API_BASE}usuario/${USUARIO}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerUser),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.resultado !== true) {
                window.location.href = SIGNWALL
              }
            })
        } else {
          setLoadExec(true)
        }
      }
    }
  }

  const confs = { API_BASE, USUARIO, MEDIA_BASE }

  if (loadExec === false) {
    loadDataUsuario()
  }

  return (
    <header className="site-header">
      <div className="box-content">
        <div className="site-logo">
          <a
            href=""
            data-target="#site-mobile-menu"
            data-params=".wrapper"
            id=""
            className="button-mobile-menu ui-menuover">
            <i className="icon-menu" />
          </a>
          <a href={linkLogo} className="logo">
            <img src={logo} alt="Polla depor" />
          </a>
        </div>
        <div id="site-menu" className="site-menu">
          <nav className="main-menu clearfix">
            <ul className="home-menu">
              <li className="link">
                <a href={home}>
                  <i className="icon-stadium" />
                  {textHome}
                </a>
              </li>
              <li className="link">
                <a href={howPlay}>
                  <i className="icon-question" />
                  {textHowPlay}
                </a>
              </li>
              <li className="link">
                <a href={prizes}>
                  <i className="icon-gift" />
                  {textPrizes}
                </a>
              </li>
            </ul>
          </nav>
          <div className="box_share-page">
            <p>Compartir la polla</p>
            <div className="share-flow">
              <ul className="share-items">
                <li className="share-item">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="http://www.facebook.com/sharer.php?u=https://trome.pe/pollon-eliminatorias/"
                    className="share-link link-fb">
                    <i className="icon-fb" />
                  </a>
                </li>
                <li className="share-item">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/intent/tweet?text=Pollón%20Eliminatorias&url=https://trome.pe/pollon-eliminatorias/&via=tuittrome"
                    className="share-link link-tw">
                    <i className="icon-tw" />
                  </a>
                </li>
                <li className="share-item">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="whatsapp://send?text=https://trome.pe/pollon-eliminatorias/"
                    className="share-link link-wa">
                    <i className="icon-wa" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {showUserStats && (
          <div className="mod-ranking">
            <ul className="ui-tab ranking-content">
              <li className="my-ranking ui-active">
                <a
                  href="#panel-ranking"
                  onClick="return lib.ui.tab(this, event);"
                  className="title-ranking">
                  <i className="icon-ranking" />
                  Mi Ranking{' '}
                </a>
              </li>
              <li className="my-last-game">
                <a
                  href="#panel-lastgame"
                  onClick="return lib.ui.tab(this, event);"
                  className="title-ranking">
                  {' '}
                  <i className="icon-last" />
                  Historial de partidos / Ultimo partido
                </a>
              </li>
            </ul>
            <div className="ui-tab-content">
              <Ranking {...confs} {...userData} />
              <LastMatch {...confs} {...userData} />
            </div>
            <a href="#" className="btn-collapse">
              <i className="icon-angle-down" />
            </a>
          </div>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  customFields,
}
Header.label = 'La Polla - Header'
Header.static = false

export default Header
