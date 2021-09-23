/* eslint-disable jsx-a11y/label-has-for */
import Identity from '@arc-publishing/sdk-identity'
import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'
import {
  DialogType,
  PaywallHomeCampaign,
  SubsArcSite,
} from 'types/subscriptions'

import { SdksProvider } from '../../../contexts/subscriptions-sdks'
import useSentry from '../../../hooks/useSentry'
import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'
import { deleteQuery, getQuery } from '../../../utilities/parse/queries'
import {
  getUsername,
  isLoggedIn,
} from '../../../utilities/subscriptions/identity'
import Signwall from '../_children/Signwall'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import { PixelActions, sendAction, Taggeo } from '../_dependencies/Taggeo'
import scriptsLanding from '../_scripts/Landing'
import Footer from '../footer/subscriptions'
import BenefitsLanding from './_children/Benefits'
import CallinCallOut from './_children/CallDesktop'
import Callout from './_children/Callout'
import Cards from './_children/Cards'

type LandingSubscriptionsProps = {
  customFields?: {
    bannerUniComercio?: boolean
    bannerUniGestion?: boolean
    callInnCallOut?: boolean
    disableInlineFooter?: boolean
  }
}

const arcType = 'landing'

const Component = (props: LandingSubscriptionsProps) => {
  const {
    customFields: {
      bannerUniComercio = false,
      bannerUniGestion = false,
      callInnCallOut = false,
      disableInlineFooter = false,
    } = {},
  } = props
  const { arcSite, globalContent: items = [] } = useAppContext<
    PaywallHomeCampaign[]
  >()

  const [showSignwall, setShowSignwall] = React.useState(false)
  const [landingType, setLandingType] = React.useState<DialogType>('landing')
  const [showCallin, setShowCallin] = React.useState(false)
  const [showModalCall, setShowModalCall] = React.useState(false)
  const signwallButton = React.useRef<HTMLButtonElement>(null)

  const { urls, texts } = PropertiesSite[arcSite as SubsArcSite]
  const { links, urls: urlCommon } = PropertiesCommon
  const isComercio = arcSite === SITE_ELCOMERCIO
  const bannerUniv =
    (bannerUniComercio && isComercio) || (bannerUniGestion && !isComercio)
  const moduleCall = callInnCallOut && isComercio

  useSentry(urlCommon.sentrySubs)

  React.useEffect(() => {
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

    if (getQuery('signStudents')) {
      setLandingType('students')
    }

    const hasRedirectParam = !!(
      getQuery('signLanding') || getQuery('signStudents')
    )
    setShowSignwall(hasRedirectParam)
  }, [])

  const updateSignwallButton = async () => {
    if (isLoggedIn() && signwallButton?.current) {
      const username = await getUsername()
      if (username && signwallButton?.current) {
        signwallButton.current.innerHTML = username
      } else {
        signwallButton.current.innerHTML = 'Mi perfil'
      }
    }
  }

  React.useEffect(() => {
    updateSignwallButton()
  }, [])

  const handleUniversity = () => {
    Taggeo('Web_Sign_Wall_Students', 'web_link_ingresar_cuenta')
    setLandingType('students')
    setShowSignwall(!showSignwall)
  }

  const handleSignwall = () => {
    const isLogged = isLoggedIn()

    Taggeo(
      'Web_Sign_Wall_Suscripciones',
      `web_link_ingresar_${isLogged ? 'perfil' : 'cuenta'}`
    )
    if (isLogged) {
      window.location.href = links.profile
    } else {
      setShowSignwall(!showSignwall)
      if (signwallButton?.current)
        signwallButton.current.innerHTML = 'Inicia sesión'

      try {
        Identity.clearSession()
      } catch (error) {
        Sentry.captureEvent({
          message: 'Error al limpiar la sesión con Identity.clearSession()',
          level: Sentry.Severity.Error,
          extra: error || {},
        })
      }
    }
  }

  const handleAfterLogged = async () => {
    if (typeof window !== 'undefined') {
      updateSignwallButton()
      deleteQuery('signLanding')
      deleteQuery('dataTreatment')
    }
  }

  const handleCallIn = () => {
    window.document.location.href = 'tel:013115100'
  }

  return (
    <>
      <header className="header" id="header">
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
                <span>Llámanos</span>
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
              ref={signwallButton}
              onClick={handleSignwall}>
              Inicia sesión
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

      <BenefitsLanding arcSite={arcSite} />

      <section className="club" id="club">
        <div className="wrapper">
          <div className="club__content">
            <img
              className="logo-club"
              src="https://suscripciones.elcomercio.pe/static/partners/comercio/img/logo_club.png?v137"
              alt="Logo Club"
              loading="lazy"
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
                <p>En restaurantes, educación, hogar, entretenimiento y más.</p>
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
              <p className="video__content-subtitle">{texts.videoSubtitle}</p>
              <p className="video__content-descripction">
                {texts.videoDescription}
              </p>
              <video
                id="video"
                className="video__content-video"
                muted
                controls
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

      {disableInlineFooter ? null : <Footer customFields={{ type: arcType }} />}

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

      {showSignwall && (
        <Signwall
          fallback={<div>Cargando...</div>}
          typeDialog={landingType}
          nameDialog={landingType}
          onLogged={handleAfterLogged}
          onLoggedFail={() => {}}
          onClose={() => {
            setShowSignwall(false)
            setLandingType('landing')
          }}
        />
      )}

      {showModalCall ? (
        <Callout
          fallback={<div>Cargando...</div>}
          onClose={() => {
            setShowModalCall(false)
          }}
        />
      ) : null}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: scriptsLanding,
        }}
      />
    </>
  )
}

const LandingSubscriptions: FC<LandingSubscriptionsProps> = (props) => {
  const { customFields } = props
  return (
    <SdksProvider>
      <Component customFields={customFields} />
    </SdksProvider>
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
    disableInlineFooter: PropTypes.bool.tag({
      name: 'Deshabilitar footer interno',
      defaultValue: false,
    }),
  }),
}

LandingSubscriptions.label = 'Subscriptions - Landing Principal'

export default LandingSubscriptions
