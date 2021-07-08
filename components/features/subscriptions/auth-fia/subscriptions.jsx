import * as Sentry from '@sentry/browser'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import addScriptAsync from '../../../utilities/script-async'
import Loading from '../../signwall/_children/loading'
import Forgot from '../_children/forgot'
import Login from '../_children/login'
import Register from '../_children/register'
import { AuthProvider } from '../_context/auth'
import { NavigateConsumer, NavigateProvider } from '../_context/navigate'
import { deleteCookie } from '../_dependencies/Cookies'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import { Container, PanelLeft, Wrapper } from '../_layouts/containers'
import CallToActionFia from './_children/call_to_action'
import Header from './_children/header'

const renderTemplate = (template, contTempl, attributes) => {
  const templates = {
    login: <Login {...{ contTempl, ...attributes }} />,
    register: <Register {...{ ...attributes }} />,
    forgot: <Forgot {...{ ...attributes }} />,
  }

  return templates[template] || templates.login
}

const FiaSubscriptionsWrapper = ({ typeDialog }) => {
  const {
    siteProperties: {
      signwall: { mainColorBr, mainColorBg, mainColorTxt },
    },
    arcSite,
  } = useFusionContext() || {}

  const { selectedTemplate, valueTemplate } = React.useContext(NavigateConsumer)
  const { urls } = PropertiesSite[arcSite]
  const { links } = PropertiesCommon
  const [isLogged, setLogged] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const handleCallToAction = (status) => {
    setLogged(status)
  }

  const logoutSession = () => {
    if (typeof window !== 'undefined') {
      if ('Identity' in window) {
        window.Identity.options({ apiOrigin: urls.arcOrigin })
        window.Identity.logout()
        deleteCookie('arc_e_id')
        window.sessionStorage.removeItem('paywall_last_url') // url redireccion despues de compra
        setLogged(false)
      } else {
        Sentry.captureEvent({
          message:
            'No se puede cerrar sesión - SDK Identity no ha cargado correctamente',
          level: 'error',
          extra: {},
        })
      }
    }
  }

  const buttonBack = () => {
    if (typeof window !== 'undefined') {
      window.location.href = document.referrer ? document.referrer : '/'
    }
  }

  React.useEffect(() => {
    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity,
      includeNoScript: false,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: urls.arcOrigin })
        if (
          'Identity' in window &&
          window.Identity.userProfile &&
          window.Identity.userIdentity.uuid
        ) {
          setLogged(true)
        }
        setLoading(false)
      })
      .catch((errIdentitySDK) => {
        Sentry.captureEvent({
          message: 'SDK Identity no ha cargado correctamente',
          level: 'error',
          extra: errIdentitySDK || {},
        })
      })
  }, [links.identity, urls.arcOrigin])

  return (
    <>
      {loading ? (
        <Loading typeBg="full" />
      ) : (
        <>
          <Header
            arcSite={arcSite}
            mainColorBg={mainColorBg}
            mainColorTxt={mainColorTxt}
            buttonBack={buttonBack}
          />
          <Container>
            <Wrapper>
              <AuthProvider>
                <PanelLeft>
                  {!isLogged ? (
                    renderTemplate(selectedTemplate, valueTemplate, {
                      arcSite,
                      isFia: true,
                      typeDialog,
                      handleCallToAction,
                      onClose: () => {
                        if (
                          'Identity' in window &&
                          window.Identity.userProfile &&
                          window.Identity.userIdentity.uuid
                        ) {
                          setLogged(true)
                        }
                      },
                    })
                  ) : (
                    <CallToActionFia
                      mainColorBr={mainColorBr}
                      logoutSession={logoutSession}
                      arcSite={arcSite}
                      typeDialog={typeDialog}
                      urlPlan={links.landingFia}
                    />
                  )}

                  {/* <div id="divLog" />
                  {`USER AGENT: ${
                    typeof window !== 'undefined'
                      ? window.navigator.userAgent
                      : ''
                  }`} */}
                </PanelLeft>
              </AuthProvider>
            </Wrapper>
          </Container>
        </>
      )}
    </>
  )
}

const FiaSubscriptions = () => (
  <NavigateProvider>
    <FiaSubscriptionsWrapper typeDialog="authfia" />
  </NavigateProvider>
)

FiaSubscriptions.label = 'Signwall - Login / Registo FIA'

export default FiaSubscriptions
