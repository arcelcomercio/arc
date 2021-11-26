import Identity from '@arc-publishing/sdk-identity'
import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'
import { SubsArcSite } from 'types/subscriptions'
import { ValuesOf } from 'types/utils'

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
import { Taggeo } from '../_dependencies/Taggeo'
import HeaderSubs from '../_layouts/header'
import Footer from '../footer/subscriptions'
import CallinCallOut from '../landing/_children/CallDesktop'
import Callout from '../landing/_children/Callout'
import PageCompany from './_children/Company'
import PageFaq from './_children/Faq'

type PageOptions = ValuesOf<Pages>

enum Pages {
  Faqs = 'faqPage',
  Company = 'companyPage',
}

type PagesSubscriptionsProps = {
  customFields?: {
    callInnCallOut?: boolean
    disableInlineFooter?: boolean
    pageSubscriptions?: PageOptions
  }
}

const arcType = 'pages'

const Component: React.FC<PagesSubscriptionsProps> = (props) => {
  const {
    customFields: {
      callInnCallOut = false,
      disableInlineFooter = false,
      pageSubscriptions = Pages.Faqs,
    } = {},
  } = props

  const { arcSite, contextPath } = useAppContext()
  const [showSignwall, setShowSignwall] = React.useState(false)
  const [landingType, setLandingType] = React.useState('landing')
  const [showCallin, setShowCallin] = React.useState(false)
  const [showModalCall, setShowModalCall] = React.useState(false)
  const signwallButton = React.useRef<HTMLButtonElement>(null)

  const { urls } = PropertiesSite[arcSite as SubsArcSite]
  const { links, urls: urlCommon } = PropertiesCommon

  const isComercio = arcSite === SITE_ELCOMERCIO
  const moduleCall = callInnCallOut && isComercio

  useSentry(urlCommon.sentrySubs)

  React.useEffect(() => {
    const hasRedirectParam = !!getQuery('signLanding')
    setShowSignwall(hasRedirectParam)
  }, [])

  const updateSignwallButton = async () => {
    if (isLoggedIn() && signwallButton?.current) {
      const username = await getUsername()
      if (username && signwallButton?.current) {
        signwallButton.current.innerHTML = username
      } else {
        signwallButton.current.innerHTML = 'Usuario'
      }
    }
  }

  React.useEffect(() => {
    updateSignwallButton()
  }, [])

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
          message:
            'Ocurrió un error al limpiar la sesión con Identity.clearSession()',
          level: Sentry.Severity.Error,
          extra: error || {},
        })
      }
    }
  }

  const handleAfterLogged = async () => {
    if (typeof window !== 'undefined') {
      updateSignwallButton()
      setShowSignwall(false)
      deleteQuery('signLanding')
      deleteQuery('dataTreatment')
    }
  }

  const handleCallIn = () => {
    window.document.location.href = 'tel:013115100'
  }

  return (
    <>
      {isComercio ? (
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
                  ref={signwallButton}
                  id="btn-signwall"
                  onClick={handleSignwall}>
                  Inicia sesión
                </button>
              </div>
            </div>
          </header>

          {moduleCall && showCallin && <CallinCallOut />}
        </>
      ) : (
        <HeaderSubs
          userProfile={Identity.userProfile}
          arcSite={arcSite}
          arcType={arcType}
        />
      )}

      {pageSubscriptions === Pages.Faqs ? (
        <PageFaq arcSite={arcSite} />
      ) : (
        <PageCompany arcSite={arcSite} contextPath={contextPath} />
      )}

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

      {showModalCall && (
        <Callout
          fallback={<div>Cargando...</div>}
          onClose={() => {
            setShowModalCall(false)
          }}
        />
      )}
    </>
  )
}

const PagesSubscriptions: FC<PagesSubscriptionsProps> = (props) => {
  const { customFields } = props
  return (
    <SdksProvider>
      <Component customFields={customFields} />
    </SdksProvider>
  )
}

PagesSubscriptions.propTypes = {
  customFields: PropTypes.shape({
    callInnCallOut: PropTypes.bool.tag({
      name: 'Módulo Call In Call Out',
      defaultValue: false,
      description: 'Mostrar/Ocultar Módulo Call In Call Out',
    }),
    disableInlineFooter: PropTypes.bool.tag({
      name: 'Deshabilitar footer interno',
      defaultValue: false,
    }),
    pageSubscriptions: PropTypes.oneOf([Pages.Faqs, Pages.Company]).tag({
      name: 'Seleccione Página ',
      labels: {
        faqPage: 'Preguntas Frecuentes',
        companyPage: 'Formulario Corporativo',
      },
      defaultValue: Pages.Faqs,
    }),
  }),
}

export default PagesSubscriptions
