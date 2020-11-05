/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import LastMatch from './_children/last-match'
import Ranking from './_children/ranking'

const MEDIA_BASE = 'https://resultadosopta.minoticia.pe/'
// const USUARIO = '6f3015f2281091770eb7b700b87b547883b03bd916e5b705cc7dd70ae63ba89c'
const USUARIO = 'f7b1822e77b2091584248e377df3fe50f32082e3'
// const API_BASE = 'http://localhost:8000/depor/'
const API_BASE =
  'https://pmdu68gci6.execute-api.us-east-1.amazonaws.com/prod/depor/'

const Header = () => {
  const confs = { API_BASE, USUARIO, MEDIA_BASE }
  const logo = 'https://jab.pe/polla/logo-trome.png'

  const [userData, setUserData] = useState('')

  const getDataUsuario = () => {
    fetch(
      `${API_BASE}usuario/${USUARIO}/ultimopartido?v=${new Date().getTime()}`
    )
      .then(response => response.json())
      .then(data => {
        setUserData(data)
      })
  }

  if (userData === '') {
    getDataUsuario()
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
            <i className="icon-menu"></i>
          </a>
          <a href="/" className="logo">
            <img src={logo} alt="Polla depor" />
          </a>
        </div>
        <div id="site-menu" className="site-menu">
          <nav className="main-menu clearfix">
            <ul className="home-menu">
              <li className="link">
                <a href="#">
                  {' '}
                  <i className="icon-stadium"></i>Inicio
                </a>
              </li>
              <li className="link">
                <a href="#">
                  <i className="icon-question"></i>¿Cómo Jugar?
                </a>
              </li>
              <li className="link">
                <a href="#">
                  <i className="icon-gift"></i>Premios
                </a>
              </li>
            </ul>
          </nav>
          <div className="box_share-page">
            <p>Compartir la polla</p>
            <div className="share-flow">
              <ul className="share-items">
                <li className="share-item">
                  <a href="" className="share-link link-fb">
                    <i className="icon-fb"></i>
                  </a>
                </li>
                <li className="share-item">
                  <a href="" className="share-link link-tw">
                    <i className="icon-tw"></i>
                  </a>
                </li>
                <li className="share-item">
                  <a href="" className="share-link link-gp">
                    <i className="icon-gp"></i>
                  </a>
                </li>
                <li className="share-item">
                  <a href="" className="share-link link-wa">
                    <i className="icon-wa"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mod-ranking">
          <ul className="ui-tab ranking-content">
            <li className="my-ranking ui-active">
              <a
                href="#panel-ranking"
                onClick="return lib.ui.tab(this, event);"
                className="title-ranking">
                <i className="icon-ranking"></i>Mi Ranking{' '}
              </a>
            </li>
            <li className="my-last-game">
              <a
                href="#panel-lastgame"
                onClick="return lib.ui.tab(this, event);"
                className="title-ranking">
                {' '}
                <i className="icon-last"></i>Historial de partidos / Ultimo
                partido
              </a>
            </li>
          </ul>
          <div className="ui-tab-content">
            <Ranking {...confs} {...userData}></Ranking>
            <LastMatch {...confs} {...userData}></LastMatch>
          </div>
          <a href="#" className="btn-collapse">
            <i className="icon-angle-down"></i>
          </a>
        </div>
      </div>
    </header>
  )
}

Header.label = 'La Polla - Header'
Header.static = false

export default Header
