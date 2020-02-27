import React, { useState, useEffect } from 'react'
import Consumer from 'fusion:consumer'
import styled from 'styled-components'
import { ModalConsumer, ModalProvider } from '../_children/context'
import { SecondMiddle } from '../main/_main/generic/styled'
import { FormLogin } from '../main/_main/_children/form_login'
import { FormRegister } from '../main/_main/_children/form_register'
import { FormForgot } from '../main/_main/_children/form_forgot'
// import { FormReset } from '../main/_main/_children/form_reset'
// import { FormVerify } from '../main/_main/_children/form_verify'
// import { FormRelogin } from '../main/_main/_children/form_relogin'
import CallToActionFia from './_children/call_to_action'
import { device } from '../_dependencies/breakpoints'

const renderTemplate = (template, attributes) => {
  const { typeDialog } = attributes
  const templates = {
    login: <FormLogin {...attributes} />,
    register: <FormRegister {...attributes} />,
    forgot: <FormForgot {...attributes} />,
  }

  const getDefault = () => {
    switch (typeDialog) {
      case 'resetpass':
        return templates.reset
      case 'verify':
        return templates.verify
      case 'relogemail':
      case 'reloghash':
        return templates.relogin
      default:
        return templates.login
    }
  }

  return templates[template] || getDefault()
}

const _AuthWrapper = props => {
  const { arcSite } = props
  const [isLogged, setLogged] = useState(false)

  const handleCallToAction = status => {
    setLogged(status)
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
                  onClose: () => window.close(),
                })
              ) : (
                <CallToActionFia arcSite={arcSite} />
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
        typeDialog="fia-signwall"
        getContent={this.getContent.bind(this)}
      />
    )
  }
}

const AuthBox = styled.div`
  padding: 20px 0;
  width: 305px;
  min-height: 280px;
  margin: 0 auto;

  @media ${device.desktop} {
    width: 350px;
    & > * {
      width: 100%;
    }
  }
`

export default AuthWrapper
