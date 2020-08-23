/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react'
import ENV from 'fusion:environment'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import { sendAction, PixelActions } from '../../paywall/_dependencies/analitycs'
import stylesLanding from '../_styles/Landing'
import PropertiesSite from '../_dependencies/Properties'
import { Landing } from '../../signwall/_children/landing/index'
import Cards from './_children/Cards'
import QueryString from '../../signwall/_dependencies/querystring'
import Taggeo from '../../signwall/_dependencies/taggeo'
import { getUserName, isLogged } from '../_dependencies/Session'
import { FooterLand } from '../_layouts/footer'
import scriptsLanding from '../_scripts/Landing'
import addScriptAsync from '../_dependencies/Async'

const arcType = 'landing'
const LandingSubscriptions = () => {
  const {
    arcSite,
    globalContent: items = [],
    customFields: { bannerUniComercio = false, bannerUniGestion = false } = {},
  } = useFusionContext() || {}

  const { urls, texts, benefist = [] } = PropertiesSite[arcSite]
  const { links } = PropertiesSite.common
  const isComercio = arcSite === 'elcomercio'
  const [showSignwall, setShowSignwall] = useState(false)
  const [showTypeLanding, setShowTypeLanding] = useState('landing')
  const [showProfile, setShowProfile] = useState(false)
  const arcEnv = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
  const bannerUniv =
    (bannerUniComercio && isComercio) || (bannerUniGestion && !isComercio)

  useEffect(() => {
    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity[arcEnv],
      includeNoScript: false,
    }).then(() => {
      if (typeof window !== 'undefined') {
        window.Identity.options({ apiOrigin: urls.arcOrigin[arcEnv] })
      }
    })

    sendAction(PixelActions.PRODUCT_IMPRESSION, {
      ecommerce: {
        currencyCode: items[0].price.currencyCode,
        impressions: items.map(item => ({
          name: item.title,
          id: item.sku,
          price: item.price.amount,
          brand: arcSite,
          category: 'Suscripcion',
        })),
      },
    })
  }, [])

  const handleUniversity = () => {
    Taggeo('Web_Sign_Wall_Students', 'web_link_ingresar_cuenta')
    setShowTypeLanding('students')
    setShowSignwall(!showSignwall)
  }

  const handleSignwall = () => {
    if (typeof window !== 'undefined') {
      Taggeo(
        'Web_Sign_Wall_Suscripciones',
        `web_link_ingresar_${isLogged() ? 'perfil' : 'cuenta'}`
      )
      if (isLogged()) {
        window.location.href = urls.profile[arcEnv]
      } else {
        setShowSignwall(!showSignwall)
        document.getElementById('btn-signwall').innerHTML = 'Inicia sesión'
        window.Identity.clearSession()
      }
    }
  }

  const handleAfterLogged = () => {
    if (typeof window !== 'undefined') {
      const { firstName, lastName } = window.Identity.userProfile || {}
      const newName = getUserName(firstName, lastName)
      setShowProfile(newName)
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
              href={urls.mainHome[arcEnv]}
              target="_blank"
              rel="noreferrer"
              className="header__content-link">
              <div className="header__content-logo"></div>
            </a>
            <button
              className="header__content-button"
              type="button"
              id="btn-signwall"
              onClick={handleSignwall}>
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
          <div
            className={`banners__grid ${!bannerUniv && 'banners__grid-one'}`}>
            {bannerUniv && (
              <article
                className="banners__item grid-two-one"
                role="presentation"
                onClick={handleUniversity}>
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
            )}

            <article
              className={`banners__item ${
                bannerUniv ? 'grid-two-two' : 'banners__item-one'
              }`}
              role="presentation"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open(urls.bannerCorp[arcEnv], '_blank')
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
                        {item.title}
                      </label>
                      <div className="display" id={`display--${i + 1}`}>
                        <div className="picture-mobile">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <h2 className="title-mobile">{item.title}</h2>
                        <p>{item.description}</p>
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
                poster="https://cdna.elcomercio.pe/resources/dist/elcomercio/images/landing/fondo_video.jpg"
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
              <a target="_blank" rel="noreferrer" href={urls.preguntas[arcEnv]}>
                Preguntas Frecuentes
              </a>
              {/* {' o '}
              <a target="_blank" rel="noreferrer" href={urls.default}>
                permítenos llamarte
              </a> */}
            </p>
          </div>
        </div>
      </section>

      <FooterLand {...{ arcSite, arcEnv, arcType }} />

      {QueryString.getQuery('signLanding') ||
      QueryString.getQuery('signStudents') ||
      showSignwall ? (
        <Landing
          typeDialog={showTypeLanding} // tipo de modal (students , landing)
          nameDialog={showTypeLanding} // nombre de modal (students , landing)
          onLogged={handleAfterLogged}
          onLoggedFail={() => {}}
          onClose={() => {
            setShowSignwall(false)
            setShowTypeLanding('landing')
          }}
        />
      ) : null}

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

LandingSubscriptions.propTypes = {
  customFields: PropTypes.shape({
    bannerUniComercio: PropTypes.bool.tag({
      name: 'Banner Univ. El Comercio',
      defaultValue: false,
      description: 'Mostrar/Ocultar Banner Universitario El Comercio.',
    }),
    bannerUniGestion: PropTypes.bool.tag({
      name: 'Banner Univ. Gestión',
      defaultValue: false,
      description: 'Mostrar/Ocultar Banner Universitario Gestíon.',
    }),
  }),
}

export default LandingSubscriptions
