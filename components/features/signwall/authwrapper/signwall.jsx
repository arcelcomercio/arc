import Consumer from 'fusion:consumer'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ModalConsumer, ModalProvider } from '../_children/context'
import { FormForgot } from '../_children/forms/form_forgot'
import { FormLogin } from '../_children/forms/form_login'
import FormRegister from '../_children/forms/form_register'
import { device } from '../_dependencies/breakpoints'
import Cookies from '../_dependencies/cookies'
import Domains from '../_dependencies/domains'
import { SecondMiddle } from '../mainpage/_children/generic/styled'
import CallToActionFia from './_children/call_to_action'

const AuthBox = styled.div`
  padding: 20px 0;
  width: 100%;
  min-height: 280px;

  @media ${device.tablet} {
    width: 380px;
    margin: 0 auto;
    & > * {
      width: 100%;
      margin: 0 auto;
    }
  }
`
const renderTemplate = (template, valTemplate, attributes) => {
  const templates = {
    login: <FormLogin {...{ valTemplate, attributes }} />,
    register: <FormRegister {...attributes} />,
    forgot: <FormForgot {...attributes} />,
  }

  return templates[template] || templates.login
}

const AuthContWrapper = (props) => {
  const {
    siteProperties: {
      signwall: { mainColorBr },
    },
    arcSite,
    typeDialog,
  } = props

  const [isLogged, setLogged] = useState(false)

  const handleCallToAction = (status) => {
    setLogged(status)
  }

  const logoutSession = () => {
    if (typeof window !== 'undefined') {
      window.Identity.apiOrigin = Domains.getOriginAPI(arcSite)
      window.Identity.logout()
      Cookies.deleteCookie('arc_e_id')
      window.sessionStorage.removeItem('paywall_last_url') // url redireccion despues de compra
      setLogged(false)
    }
  }

  useEffect(() => {
    if (window.Identity.userProfile && window.Identity.userIdentity.uuid) {
      setLogged(true)
    }
  }, [])

  return (
    <ModalProvider>
      <AuthBox>
        <ModalConsumer>
          {(value) => (
            <SecondMiddle>
              {!isLogged ? (
                renderTemplate(value.selectedTemplate, value.valTemplate, {
                  ...props,
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
                  urlPlan={Domains.getUrlPaywallFia(arcSite)}
                />
              )}
            </SecondMiddle>
          )}
        </ModalConsumer>
      </AuthBox>
    </ModalProvider>
  )
}

@Consumer
class AuthWrapper extends React.PureComponent {
  render() {
    return <AuthContWrapper {...this.props} typeDialog="authfia" />
  }
}

export default AuthWrapper
