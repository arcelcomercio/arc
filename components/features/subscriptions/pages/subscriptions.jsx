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
import { AuthContext, AuthProvider } from '../_context/auth'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import { getUserName, isLogged } from '../_dependencies/Session'
import { FooterLand } from '../_layouts/footer'
import HeaderSubs from '../_layouts/header'
import scriptsLanding from '../_scripts/Landing'
import CallinCallOut from '../landing/_children/CallinCallout'
import Callout from '../landing/_children/Callout'
import PageCompany from './_children/Company'
import PageFaq from './_children/Faq'

const arcType = 'pages'
const WrapperPageSubs = ({ properties }) => {
  const {
    customFields: {
      callInnCallOut = false,
      pageSubscriptions,
      btnOnTop = false,
    } = {},
  } = properties

  const { arcSite, deployment, contextPath } = useAppContext() || {}
  const [showSignwall, setShowSignwall] = React.useState(false)
  const [showTypeLanding, setShowTypeLanding] = React.useState('landing')
  const [showProfile, setShowProfile] = React.useState(false)
  const [showCallin, setShowCallin] = React.useState(false)
  const [showModalCall, setShowModalCall] = React.useState(false)

  const { userProfile } = React.useContext(AuthContext)
  const { urls } = PropertiesSite[arcSite]
  const { links, urls: urlCommon } = PropertiesCommon
  const isComercio = arcSite === 'elcomercio'
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
  }, [])

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
                    id="btn-signwall"
                    onClick={handleSignwall}>
                    {showProfile || 'Inicia sesión'}
                  </button>
                </div>
              </div>
            </header>
            {moduleCall && showCallin && <CallinCallOut />}
          </>
        ) : (
          <HeaderSubs
            userProfile={userProfile}
            arcSite={arcSite}
            arcType={arcType}
          />
        )}

        {pageSubscriptions === 'faqPage' ? (
          <PageFaq arcSite={arcSite} />
        ) : (
          <PageCompany arcSite={arcSite} contextPath={contextPath} />
        )}

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

        {(QueryString.getQuery('signLanding') ||
          QueryString.getQuery('signStudents') ||
          showSignwall) && (
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
        )}

        {showModalCall && (
          <Callout
            fallback={<div>Cargando...</div>}
            typeDialog={showTypeLanding}
            nameDialog={showTypeLanding}
            onLoggedFail={() => {}}
            onClose={() => {
              setShowModalCall(false)
            }}
          />
        )}
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

const PagesSubscriptions = (props) => (
  <AuthProvider>
    <WrapperPageSubs properties={props} />
  </AuthProvider>
)

PagesSubscriptions.propTypes = {
  customFields: PropTypes.shape({
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
    pageSubscriptions: PropTypes.oneOf(['faqPage', 'companyPage']).tag({
      name: 'Seleccione Página ',
      labels: {
        faqPage: 'Preguntas Frecuentes',
        companyPage: 'Formulario Corporativo',
      },
      defaultValue: 'faqPage',
    }),
  }),
}

export default PagesSubscriptions
