import React, { useState, useEffect } from 'react'
import Consumer from 'fusion:consumer'
import styled from 'styled-components'
import { ModalConsumer, ModalProvider } from '../_children/context'
import { SecondMiddle } from '../main/_main/generic/styled'
import { FormLogin } from '../main/_main/_children/form_login'
import { FormRegister } from '../main/_main/_children/form_register'
import { FormForgot } from '../main/_main/_children/form_forgot'
import CallToActionFia from './_children/call_to_action'
import { device } from '../_dependencies/breakpoints'
import Domains from '../_dependencies/domains'
import Cookies from '../_dependencies/cookies'

const renderTemplate = (template, attributes) => {
  const templates = {
    login: <FormLogin {...attributes} />,
    register: <FormRegister {...attributes} />,
    forgot: <FormForgot {...attributes} />,
  }

  return templates[template] || templates.login
}

const _AuthWrapper = props => {
  const {
    siteProperties: {
      signwall: { mainColorBr },
    },
    arcSite,
    typeDialog,
  } = props

  const [isLogged, setLogged] = useState(false)

  const handleCallToAction = status => {
    setLogged(status)
  }

  const logoutSession = () => {
    if (typeof window !== 'undefined') {
      window.Identity.apiOrigin = Domains.getOriginAPI(arcSite)
      window.Identity.logout()
      Cookies.deleteCookie('arc_e_id')
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
          {value => (
            <SecondMiddle>
              {!isLogged ? (
                renderTemplate(value.selectedTemplate, {
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
                  urlPlan={Domains.getUrlPaywall(arcSite)}
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
    return (
      <_AuthWrapper
        {...this.props}
        typeDialog="authfia"
        getContent={this.getContent.bind(this)}
      />
    )
  }
}

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

export default AuthWrapper
