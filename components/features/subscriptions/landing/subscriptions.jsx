/* eslint-disable jsx-a11y/label-has-for */
import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'

import { env } from '../../../utilities/arc/env'
import { PROD } from '../../../utilities/constants/environment'
import addScriptAsync from '../../../utilities/script-async'
import QueryString from '../../signwall/_dependencies/querystring'
import Taggeo from '../../signwall/_dependencies/taggeo'
import Signwall from '../_children/Signwall'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import { getUserName, isLogged } from '../_dependencies/Session'
import { PixelActions, sendAction } from '../_dependencies/Taggeo'
import { FooterLand } from '../_layouts/footer'
import scriptsLanding from '../_scripts/Landing'
import Benefits from './_children/Benefits'
import CallinCallOut from './_children/CallinCallout'
import Callout from './_children/Callout'
import Cards from './_children/Cards'

const arcType = 'landing'
const LandingSubscriptions = (props) => {
  const {
    customFields: {
      bannerUniComercio = false,
      bannerUniGestion = false,
      callInnCallOut = false,
      btnOnTop = false,
    } = {},
  } = props
  const { arcSite, deployment, globalContent: items = [] } =
    useAppContext() || {}

  const [showSignwall, setShowSignwall] = React.useState(false)
  const [showTypeLanding, setShowTypeLanding] = React.useState('landing')
  const [showProfile, setShowProfile] = React.useState(false)
  const [showCallin, setShowCallin] = React.useState(false)
  const [showModalCall, setShowModalCall] = React.useState(false)

  const { urls, texts } = PropertiesSite[arcSite]
  const { links, urls: urlCommon } = PropertiesCommon
  const isComercio = arcSite === 'elcomercio'
  const bannerUniv =
    (bannerUniComercio && isComercio) || (bannerUniGestion && !isComercio)
  const moduleCall = callInnCallOut && isComercio

  React.useEffect(() => {
    Sentry.init({
      dsn: urlCommon.dsnSentry,
      debug: env !== PROD,
      release: `arc-deployment@${deployment}`,
      environment: env,
      ignoreErrors: [
        'Unexpected end of JSON input',
        'JSON.parse: unexpected end of data at line 1 column 1 of the JSON data',
        'JSON Parse error: Unexpected EOF',
      ],
      // allowUrls: [
      //   // API + origin
      //   /https:\/\/.+(elcomercio|gestion).pe/,
      //   // Sandbox CDN
      //   /https:\/\/elcomercio-(elcomercio|gestion)-sandbox\.cdn\.arcpublishing.com/,
      //   // Identity & Sales SDKs
      //   /https:\/\/arc-subs-sdk\.s3\.amazonaws\.com/,
      //   // PayU
      //   /https?:\/\/.+payulatam\.com/,
      // ],
      denyUrls: [/delivery\.adrecover\.com/, /analytics/, /facebook/],
    })

    Sentry.configureScope((scope) => {
      scope.setTag('brand', arcSite)
    })

    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity,
      includeNoScript: false,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: urls.arcOrigin })
      })
      .catch((errIdentitySDK) => {
        Sentry.captureEvent({
          message: 'SDK Identity no ha cargado correctamente',
          level: 'error',
          extra: errIdentitySDK || {},
        })
      })

    sendAction(PixelActions.PRODUCT_IMPRESSION, {
      ecommerce: {
        currencyCode: items[0].price.currencyCode,
        impressions: items.map((item) => ({
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
    Taggeo(
      'Web_Sign_Wall_Suscripciones',
      `web_link_ingresar_${isLogged() ? 'perfil' : 'cuenta'}`
    )
    if (isLogged()) {
      window.location.href = links.profile
    } else {
      setShowSignwall(!showSignwall)
      const signwallButton = document.getElementById('btn-signwall')
      if (signwallButton) signwallButton.innerHTML = 'Inicia sesión'
      try {
        window.Identity.clearSession()
      } catch (e) {
        Sentry.captureEvent({
          message:
            'Ocurrió un error al limpiar la sesión con Identity.clearSession()',
          level: 'error',
          extra: e || {},
        })
      }
    }
  }

  const handleAfterLogged = () => {
    if (typeof window !== 'undefined') {
      let userfirstName = ''
      let userlastName = ''
      try {
        const { firstName, lastName } = window.Identity.userProfile || {}
        userfirstName = firstName
        userlastName = lastName
      } catch (e) {
        Sentry.captureEvent({
          message:
            'Ha ocurrido un error intentar al obtener firstName y lastName desde Identity.userProfile',
          level: 'error',
          extra: e || {},
        })
      }

      setShowProfile(getUserName(userfirstName, userlastName))
    }
  }

  const handleCallIn = () => {
    window.document.location.href = 'tel:013115100'
  }

  return (
    <>
      <>
        <header className="header active" id="header">
          <div className="wrapper">
            <div
              className={`header__content ${
                !isComercio || !moduleCall ? 'box-cont' : ''
              }`}>
              <a
                href={urls.mainHome}
                target="_blank"
                rel="noreferrer"
                className="header__content-link"
                aria-label={arcSite}>
                <div className="header__content-logo" />
              </a>

              {moduleCall && (
                <div className="header__content-call">
                  <span>Llama Gratis</span>
                  <button
                    type="button"
                    className="icon-phone"
                    onClick={handleCallIn}>
                    01 311 5100
                  </button>
                  <button
                    type="button"
                    className="icon-support"
                    onClick={() => setShowCallin(!showCallin)}>
                    Te Llamamos
                  </button>
                </div>
              )}

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

        {moduleCall && showCallin && <CallinCallOut />}

        <section className="planes">
          <div className={isComercio ? 'wrapper' : 'wrapper-full'}>
            {!isComercio && (
              <>
                <h1 className="planes__title">{texts.mainTop}</h1>
                <p className="planes__description">
                  {texts.parrafOne} <br />
                  {texts.parrafTwo}
                </p>
              </>
            )}

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
                    <i className="planes__banner-icon" />
                    <h3 className="planes__banner-title">
                      {texts.bannerTitle}
                    </h3>
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
                    window.open(links.bannerCorp, '_blank')
                  }
                }}>
                <div className="banners__content">
                  <h4 className="banners__content-title">
                    {texts.corporativeTitle}
                  </h4>
                  <p className="banners__content-description">
                    {texts.corporativeDescrip}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <Benefits arcSite={arcSite} />

        <section className="club" id="club">
          <div className="wrapper">
            <div className="club__content">
              <img
                className="logo-club"
                src="https://suscripciones.elcomercio.pe/static/partners/comercio/img/logo_club.png?v137"
                alt="Logo Club"
                loading="lazy"
                importance="low"
                decoding="async"
              />

              <h3 className="title-club">
                El programa de beneficios para los suscriptores <br /> de las
                ediciones impresas y digitales que te ofrece:
              </h3>

              <div className="rows-club">
                <div className="row-club">
                  <i className="icon-descuento" />
                  <h4>Cientos de descuentos</h4>
                  <p>
                    En restaurantes, educación, hogar, entretenimiento y más.
                  </p>
                </div>
                <div className="row-club">
                  <i className="icon-limite" />
                  <h4>Las veces que quieras</h4>
                  <p>Utilízalos todas las veces que quieras, ¡no hay límite</p>
                </div>
                <div className="row-club">
                  <i className="icon-pago" />
                  <h4>Con cualquier medio de pago</h4>
                  <p>
                    Paga como prefieras, con cualquier tarjeta que acepte el
                    establecimiento o en efectivo.
                  </p>
                </div>
                <div className="row-club">
                  <i className="icon-compartir" />
                  <h4>Compártelo con alguien más</h4>
                  <p>
                    Registra a un invitado para que disfrute de todos los
                    beneficios del club.
                  </p>
                </div>
              </div>

              <div className="button-club">
                <button
                  type="button"
                  onClick={() => {
                    window.open(`${links.clubComercio}_${arcSite}`, '_blank')
                  }}>
                  Ver más en <span>clubelcomercio.pe</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {isComercio && (
          <section className="video">
            <div className="wrapper">
              <div className="video__content">
                <h1 className="video__content-title">{texts.videoTitle}</h1>
                <p className="video__content-subtitle">
                  {texts.videoSubstitle}
                </p>
                <p className="video__content-descripction">
                  {texts.videoDescription}
                </p>
                <video
                  id="video"
                  className="video__content-video"
                  muted
                  controls="1"
                  poster="https://cdna.elcomercio.pe/resources/dist/elcomercio/images/landing/fondo_video.jpg"
                  src="https://pub.minoticia.pe/elcomercio/el_comercio.mp4"
                />
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
                <a target="_blank" rel="noreferrer" href={links.preguntas}>
                  Preguntas Frecuentes
                </a>
              </p>
            </div>
          </div>
        </section>

        <FooterLand arcType={arcType} btnOnTop={btnOnTop} />

        {moduleCall && (
          <section className="callin-movil">
            <button type="button" className="icon-phone" onClick={handleCallIn}>
              01 311 5100
            </button>
            <button
              type="button"
              className="icon-support"
              onClick={() => setShowModalCall(true)}>
              Te Llamamos
            </button>
          </section>
        )}

        {QueryString.getQuery('signLanding') ||
        QueryString.getQuery('signStudents') ||
        showSignwall ? (
          <Signwall
            fallback={<div>Cargando...</div>}
            typeDialog={showTypeLanding}
            nameDialog={showTypeLanding}
            onLogged={handleAfterLogged}
            onLoggedFail={() => {}}
            onClose={() => {
              setShowSignwall(false)
              setShowTypeLanding('landing')
            }}
          />
        ) : null}

        {showModalCall ? (
          <Callout
            fallback={<div>Cargando...</div>}
            typeDialog={showTypeLanding}
            nameDialog={showTypeLanding}
            onLoggedFail={() => {}}
            onClose={() => {
              setShowModalCall(false)
            }}
          />
        ) : null}
      </>
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
    callInnCallOut: PropTypes.bool.tag({
      name: 'Módulo Call In Call Out',
      defaultValue: false,
      description: 'Mostrar/Ocultar Módulo Call In Call Out',
    }),
    btnOnTop: PropTypes.bool.tag({
      name: 'Botón subir arriba',
      defaultValue: false,
      description: 'Mostrar/Ocultar Botón subir arriba',
    }),
  }),
}

export default LandingSubscriptions
