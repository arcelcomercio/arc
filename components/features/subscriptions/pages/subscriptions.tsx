import Identity from '@arc-publishing/sdk-identity'
import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'
import { SubsArcSite } from 'types/subscriptions'

import useSentry from '../../../hooks/useSentry'
import { deleteQuery, getQuery } from '../../../utilities/parse/queries'
import Signwall from '../_children/Signwall'
import { AuthProvider, useAuthContext } from '../_context/auth'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import { getUserName } from '../_dependencies/Session'
import { Taggeo } from '../_dependencies/Taggeo'
import { FooterLand } from '../_layouts/footer'
import HeaderSubs from '../_layouts/header'
import CallinCallOut from '../landing/_children/CallinCallout'
import Callout from '../landing/_children/Callout'
import PageCompany from './_children/Company'
import PageFaq from './_children/Faq'

type PagesSubscriptionsProps = {
  customFields?: {
    callInnCallOut?: boolean
    btnOnTop?: boolean
    pageSubscriptions?: 'faqPage' | 'companyPage'
  }
}

const arcType = 'pages'

const PagesSubscriptions: FC<PagesSubscriptionsProps> = (props) => {
  const {
    customFields: {
      callInnCallOut = false,
      btnOnTop = false,
      pageSubscriptions = 'faqPage',
    } = {},
  } = props

  const { arcSite, contextPath } = useAppContext()
  const [showSignwall, setShowSignwall] = React.useState(false)
  const [landingType, setLandingType] = React.useState('landing')
  const [profileButtonText, setProfileButtonText] = React.useState(
    'Inicia sesión'
  )
  const [showCallin, setShowCallin] = React.useState(false)
  const [showModalCall, setShowModalCall] = React.useState(false)

  const { userProfile } = useAuthContext()

  const { urls } = PropertiesSite[arcSite as SubsArcSite]
  const { links, urls: urlCommon } = PropertiesCommon

  const isComercio = arcSite === 'elcomercio'
  const moduleCall = callInnCallOut && isComercio

  useSentry(urlCommon.sentrySubs)

  React.useEffect(() => {
    const hasRedirectParam = !!getQuery('signLanding')
    setShowSignwall(hasRedirectParam)
  }, [])

  const handleSignwall = async () => {
    const isLoggedIn = await Identity.isLoggedIn()

    Taggeo(
      'Web_Sign_Wall_Suscripciones',
      `web_link_ingresar_${isLoggedIn ? 'perfil' : 'cuenta'}`
    )

    if (isLoggedIn) {
      window.location.href = links.profile
    } else {
      setShowSignwall(!showSignwall)
      const signwallButton = document.getElementById('btn-signwall')
      if (signwallButton) signwallButton.innerHTML = 'Inicia sesión'

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

  const handleAfterLogged = () => {
    if (typeof window !== 'undefined') {
      let userfirstName = ''
      let userlastName = ''

      try {
        const { firstName, lastName } = Identity.userProfile || {}
        if (firstName && lastName) {
          userfirstName = firstName
          userlastName = lastName
        }
      } catch (error) {
        Sentry.captureEvent({
          message:
            'Error intentar al obtener firstName y lastName desde Identity.userProfile',
          level: Sentry.Severity.Error,
          extra: error || {},
        })
      }

      setProfileButtonText(getUserName(userfirstName, userlastName))
      setShowSignwall(false)
      deleteQuery('signLanding')
      deleteQuery('dataTreatment')
    }
  }

  const handleCallIn = () => {
    window.document.location.href = 'tel:013115100'
  }

  return (
    <AuthProvider>
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
                  {profileButtonText}
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
          typeDialog={landingType}
          nameDialog={landingType}
          onLoggedFail={() => {}}
          onClose={() => {
            setShowModalCall(false)
          }}
        />
      )}
    </AuthProvider>
  )
}

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
