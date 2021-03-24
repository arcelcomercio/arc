import * as React from 'react'
import { useFusionContext } from 'fusion:context'

import Login from '../_children/login'
import Register from '../_children/register'
import Forgot from '../_children/forgot'
import { NavigateProvider, NavigateConsumer } from '../_context/navigate'
import { AuthProvider } from '../_context/auth'
import addScriptAsync from '../_dependencies/Async'
import { PropertiesSite, PropertiesCommon } from '../_dependencies/Properties'
import { deleteCookie } from '../_dependencies/Cookies'
import { Container, Wrapper, PanelLeft } from '../_layouts/containers'
import stylesPayment from '../_styles/Payment'

import Header from './_children/header'
import CallToActionFia from './_children/call_to_action'

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

  const handleCallToAction = status => {
    setLogged(status)
  }

  const logoutSession = () => {
    if (typeof window !== 'undefined') {
      window.Identity.options({ apiOrigin: urls.arcOrigin })
      window.Identity.logout()
      deleteCookie('arc_e_id')
      window.sessionStorage.removeItem('paywall_last_url') // url redireccion despues de compra
      setLogged(false)
    }
  }

  const buttonBack = () => {
    if (typeof window !== 'undefined') {
      window.location.href = document.referrer ? document.referrer : '/'
    }
  }

  React.useEffect(() => {
    if (window.Identity.userProfile && window.Identity.userIdentity.uuid) {
      setLogged(true)
    }

    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity,
      includeNoScript: false,
    }).then(() => {
      window.Identity.options({ apiOrigin: urls.arcOrigin })
    })
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: stylesPayment[arcSite] }} />

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
