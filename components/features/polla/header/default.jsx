/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useFusionContext } from 'fusion:context'
import LastMatch from './_children/last-match'
import Ranking from './_children/ranking'
import { getAssetsPath } from '../../../utilities/assets'

const Header = () => {
  /* const { arcSite, contextPath, deployment } = useFusionContext()
  const logo =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/assets/polla/logo-polla.png?d=1` || '' */
  // const logo = deployment(`${contextPath}/resources/assets/polla/logo-polla.png`)
  const logo = 'https://jab.pe/polla/logo-polla.png'

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
            <img
              src={logo}
              alt="Polla depor"
            />
          </a>
        </div>
        <div id="site-menu" className="site-menu">
          <nav className="main-menu clearfix">
            <ul className="home-menu">
              <li className="link">
                <a href="#">
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
                onclick="return lib.ui.tab(this, event);"
                className="title-ranking">
                <i className="icon-ranking"></i>Mi Ranking{' '}
              </a>
            </li>
            <li className="my-last-game">
              <a
                href="#panel-lastgame"
                onclick="return lib.ui.tab(this, event);"
                className="title-ranking">
                <i className="icon-last"></i>Historial de partidos / Ultimo
                partido
              </a>
            </li>
          </ul>
          <div className="ui-tab-content">
            <Ranking></Ranking>
            <LastMatch></LastMatch>
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
