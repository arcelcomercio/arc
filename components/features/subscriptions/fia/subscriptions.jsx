import * as Sentry from '@sentry/browser'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import addScriptAsync from '../../../utilities/script-async'
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
      signwall: { mainColorBr, mainColorBg },
    },
    arcSite,
  } = useFusionContext() || {}

  const { urls } = PropertiesSite[arcSite]
  const { links } = PropertiesCommon
  const [isLogged, setLogged] = React.useState(false)

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
    if (
      'Identity' in window &&
      window.Identity.userProfile &&
      window.Identity.userIdentity.uuid
    ) {
      setLogged(true)
    }

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
  }, [links.identity, urls.arcOrigin])

  return (
    <>
      <Header {...{ arcSite, mainColorBg, buttonBack }} />
      <Container>
        <Wrapper>
          <NavigateProvider>
            <NavigateConsumer>
              {({ selectedTemplate, valueTemplate }) => (
                <PanelLeft>
                  {!isLogged ? (
                    renderTemplate(selectedTemplate, valueTemplate, {
                      arcSite,
                      isFia: true,
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
                </PanelLeft>
              )}
            </NavigateConsumer>
          </NavigateProvider>
        </Wrapper>
      </Container>
    </>
  )
}

const FiaSubscriptions = () => (
  <AuthProvider>
    <FiaSubscriptionsWrapper typeDialog="authfia" />
  </AuthProvider>
)

export default FiaSubscriptions
