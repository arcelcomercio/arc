/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react'
import ENV from 'fusion:environment'
import { useFusionContext } from 'fusion:context'

import stylesLanding from '../_dependencies/styles-landing'
import scriptsLanding from '../_dependencies/script-landing'
import contextSite from '../_dependencies/context'
import { Landing } from '../../signwall/_children/landing/index'
import Cards from '../_children/cards'
import QueryString from '../../signwall/_dependencies/querystring'
import Taggeo from '../../signwall/_dependencies/taggeo'

const LandingSubscriptions = () => {
  const { arcSite, globalContent: items = [] } = useFusionContext() || {}
  const { urls, emails, texts, benefist = [] } = contextSite[arcSite]
  const isComercio = arcSite === 'elcomercio'
  const [showSignwall, setShowSignwall] = useState(false)
  const [showTypeLanding, setShowTypeLanding] = useState('landing')
  const [showProfile, setShowProfile] = useState(false)
  const env = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

  const handleUniversity = () => {
    setShowTypeLanding('students')
    setShowSignwall(!showSignwall)
  }

  const handleSignwall = () => {
    if (typeof window !== 'undefined') {
      const Logged =
        // eslint-disable-next-line no-prototype-builtins
        window.localStorage.hasOwnProperty('ArcId.USER_INFO') &&
        window.localStorage.getItem('ArcId.USER_INFO') !== '{}'

      Taggeo(
        `Web_Sign_Wall_Suscripciones`,
        `web_link_ingresar_${Logged ? 'perfil' : 'cuenta'}`
      )

      if (Logged) {
        window.location.href = urls.profile[env]
      } else {
        setShowSignwall(!showSignwall)
        // etShowProfile('Inicia sesión')
        document.getElementById('btn-signwall').innerHTML = 'Inicia sesión'
        window.Identity.clearSession()
      }
    }
  }

  const handleAfterLogged = () => {
    if (typeof window !== 'undefined') {
      const { firstName, lastName } = window.Identity.userProfile || {}
      setShowProfile(
        `${firstName || 'Bienvenido Usuario'} ${
          lastName !== 'undefined' ? lastName : '' || ''
        }`
      )
    }
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{ __html: stylesLanding[arcSite] }}></style>

      <header className="header" id="header">
        <div className="wrapper">
          <div className="header__content">
            <a
              href={urls.homeUrl}
              target="_blank"
              rel="noreferrer"
              className="header__content-link">
              <div className="header__content-logo"></div>
            </a>
            <button
              className="header__content-button"
              type="button"
              id="btn-signwall"
              onClick={() => handleSignwall()}>
              {showProfile || 'Inicia sesión'}
            </button>
          </div>
        </div>
      </header>

      <section className="planes">
        <div className={isComercio ? 'wrapper' : 'wrapper-full'}>
          <h1 className="planes__title">{texts.mainTop}</h1>
          <p className="planes__description">
            {texts.parrafOne} <br />
            {texts.parrafTwo}
          </p>

          {/* <button
            type="button"
            className={`button-call ${isComercio ? '' : 'ges'}`}
            id="btn-help-call"
            onClick={() => {
              Taggeo('Web_Paywall_Landing', 'web_paywall_home_call')
              window.open(urls.clickHelp, '_blank')
            }}>
            <i></i> {texts.help} {!isComercio && <span>Te llamamos</span>}
          </button> */}

          <div className={isComercio ? 'planes__grid' : 'planes__grid-three'}>
            {items.map((item, order) => (
              <Cards
                key={`card-${order + 1}`}
                item={item}
                order={order}
                arcSite={arcSite}
                textOffer={texts.offer}
              />
            ))}

            {isComercio && (
              <article className="planes__item planes__banner grid-four-four">
                <div className="planes__content">
                  <i className="planes__banner-icon"></i>
                  <h3 className="planes__banner-title">{texts.bannerTitle}</h3>
                  <p className="planes__banner-description">
                    {texts.bannerText}
                  </p>
                  <button
                    type="button"
                    className="planes__banner-button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open(urls.subsPrint, '_blank')
                      }
                    }}>
                    {texts.bannerButton}
                  </button>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="banners">
        <div className={isComercio ? 'wrapper' : 'wrapper-medium'}>
          <div className="banners__grid">
            <article
              className="banners__item grid-two-one"
              role="presentation"
              onClick={() => handleUniversity()}>
              <div className="banners__content">
                <h4 className="banners__content-title">
                  {texts.uniTitle}
                  <small>{texts.bannerNew}</small>
                </h4>
                <p className="banners__content-description">
                  {texts.uniDescription}
                </p>
              </div>
            </article>

            <article
              className="banners__item grid-two-two"
              role="presentation"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open(urls.bannerCorp[env], '_blank')
                }
              }}>
              <div className="banners__content">
                <h4 className="banners__content-title">
                  {texts.corporativeTitle}
                </h4>
                <p className="banners__content-description">
                  {texts.corporativeDescription}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="beneficios" id="beneficios">
        <div className="wrapper">
          <div className="beneficios__content">
            <h1 className="beneficios__content-title">
              Beneficios
              <div className="beneficios__content-logo"></div>
            </h1>
            <div className="beneficios__content-wrap">
              <div className="tabs">
                {benefist.map((item, i) => {
                  return (
                    <div key={`benfist-${i + 1}`}>
                      <input
                        type="radio"
                        name="tabs"
                        defaultChecked={i + 1 === 1}
                        className="tab"
                        id={`tab--${i + 1}`}
                        onChange={() => {}}
                      />
                      <label
                        className="button"
                        htmlFor={`tab--${i + 1}`}
                        id={`button--${i + 1}`}>
                        {item.menu}
                      </label>
                      <div className="display" id={`display--${i + 1}`}>
                        <div className="picture-mobile">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <h2 className="title-mobile">{item.title}</h2>
                        <p>
                          <strong>{item.title}</strong> {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="beneficios__content-slides">
              {benefist.map((item, i) => {
                return (
                  <img
                    key={`image-${i + 1}`}
                    className="picture"
                    id={`picture--tab--${i + 1}`}
                    src={item.image}
                    alt={item.title}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {isComercio && (
        <section className="video">
          <div className="wrapper">
            <div className="video__content">
              <h1 className="video__content-title">{texts.videoTitle}</h1>
              <p className="video__content-subtitle">{texts.videoSubstitle}</p>
              <p className="video__content-descripction">
                {texts.videoDescription}
              </p>
              <video
                id="video"
                className="video__content-video"
                muted
                controls="1"
                poster="https://perufront.com/web-paywall-2020/images/elcomercio/fondo_video.jpg"
                src="https://pub.minoticia.pe/elcomercio/el_comercio.mp4"></video>
            </div>
          </div>
        </section>
      )}

      <section className="ayuda">
        <div className="wrapper">
          <div className="ayuda__content">
            <h1 className="ayuda__content-title">
              {texts.helpTitle}
              <br />
              {texts.helpSubstitle}
            </h1>
            <p className="ayuda__content-description">
              {`${texts.helpDescription} `}
              <a target="_blank" rel="noreferrer" href={urls.preguntas[env]}>
                Preguntas Frecuentes
              </a>
              {' o '}
              <a target="_blank" rel="noreferrer" href={urls.default}>
                permítenos llamarte
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrapper">
          <div className="footer__content">
            <div className="footer__grid">
              <div className="footer__item grid-four-one">
                <div className="footer__content-mail">
                  <a target="_blank" rel="noreferrer" href={urls.homeUrl}>
                    <div className="footer__content-logo"></div>
                  </a>
                  <p>
                    Envíanos un correo a<br />
                    <a
                      href={`mailto:${emails.atencion}`}
                      className="footer__content-link">
                      {emails.atencion}
                    </a>
                  </p>
                </div>
              </div>
              <div className="footer__item grid-four-two">
                <div className="footer__content-ayuda footer__content-accordion">
                  <input type="checkbox" defaultChecked onChange={() => {}} />
                  <i></i>
                  <h4 className="footer__content-title">Ayuda</h4>
                  <div className="cont">
                    <p>
                      <a
                        href={urls.preguntas[env]}
                        target="_blank"
                        rel="noreferrer"
                        className="footer__content-link">
                        Preguntas Frecuentes
                      </a>
                    </p>
                    <p>
                      Servicio al cliente y Ventas:
                      <br />
                      <a
                        href={`mailto:${emails.atencion}`}
                        className="footer__content-link">
                        {emails.atencion}
                      </a>
                    </p>
                    {/* <p>
                      Pagos pendientes y Facturación:
                      <br />
                      <a
                        href={`mailto:${emails.cobranzas}`}
                        className="footer__content-link">
                        {emails.cobranzas}
                      </a>
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="footer__item grid-four-three">
                <div className="footer__content-legal footer__content-accordion">
                  <input type="checkbox" defaultChecked onChange={() => {}} />
                  <i></i>
                  <h4 className="footer__content-title">Legal</h4>
                  <div className="cont">
                    <p>
                      <a
                        href={urls.terminos}
                        target="_blank"
                        rel="noreferrer"
                        className="footer__content-link">
                        Términos y Condiciones
                        <span>(Actualizado al 2019)</span>
                      </a>
                    </p>
                    <p>
                      <a
                        href={urls.politicas}
                        target="_blank"
                        rel="noreferrer"
                        className="footer__content-link">
                        Política de Privacidad
                        <span>(Actualizado al 2019)</span>
                      </a>
                    </p>
                    <p>
                      <a
                        href={urls.reclamos}
                        target="_blank"
                        rel="noreferrer"
                        className="footer__content-link">
                        Libro de Reclamaciones
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="footer__item grid-four-four">
                <div className="footer__content-encuentranos">
                  <h4 className="footer__content-title">Encuéntranos</h4>
                  <div className="footer__content-encuentranos-social">
                    <a href={urls.twitter} target="_blank" rel="noreferrer">
                      <i className="icon-twitter"></i>
                    </a>
                    <a href={urls.facebook} target="_blank" rel="noreferrer">
                      <i className="icon-facebook"></i>
                    </a>
                    <a href={urls.instangram} target="_blank" rel="noreferrer">
                      <i className="icon-instangram"></i>
                    </a>
                  </div>
                  <div className="footer__content-encuentranos-apps">
                    <a href={urls.appStore} target="_blank" rel="noreferrer">
                      <i className="icon-appstore"></i>
                    </a>
                    <a href={urls.googlePlay} target="_blank" rel="noreferrer">
                      <i className="icon-googleplay"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__end">
            <p>{texts.footerEnd}</p>
          </div>
        </div>
      </footer>

      <button type="button" id="btn-arrow-top" className="arrow-up">
        <i></i>
      </button>

      {showSignwall && (
        <Landing
          typeDialog={showTypeLanding} // tipo de modal (students , landing)
          nameDialog={showTypeLanding} // nombre de modal
          onLogged={() => handleAfterLogged()}
          onLoggedFail={() => {}}
          onClose={() => {
            setShowSignwall(false)
            setShowTypeLanding('landing')
            QueryString.deleteQuery('signLanding') // remover queryString signLanding
          }}
        />
      )}

      <script
        type="text/javascript"
        src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: scriptsLanding,
        }}
      />
    </>
  )
}

export default LandingSubscriptions
