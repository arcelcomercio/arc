/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { ModalProvider, ModalConsumer } from '../context'
import { Modal } from '../modal/index'
import { FormLoginPaywall } from '../forms/form_login_landing'
import { FormForgot } from '../forms/form_forgot'
import { FormRegister } from '../forms/form_register'
import { ContMiddle, FirstMiddle, SecondMiddle, CloseBtn } from './styled'
import Cookies from '../../_dependencies/cookies'
import { Close } from '../iconos'
import Taggeo from '../../_dependencies/taggeo'

const renderTemplate = (template, attributes) => {
  const templates = {
    login: <FormLoginPaywall {...attributes} />,
    forgot: <FormForgot {...attributes} />,
    register: <FormRegister {...attributes} />,
  }
  return templates[template] || templates.login
}

export const LandingInt = props => {
  const { onClose, onLogged, noBtnClose, pathSourcePNG, typeDialog } = props
  return (
    <ModalProvider>
      <ModalConsumer>
        {value => (
          <Modal size="medium" position="middle">
            <ContMiddle>
              {!noBtnClose && (
                <CloseBtn
                  type="button"
                  onClick={() => {
                    Cookies.deleteCookie('lostEmail')
                    Taggeo(
                      `Web_Sign_Wall_${typeDialog}`,
                      `web_sw${typeDialog[0]}_boton_cerrar`
                    )
                    if (window.Identity.userProfile) {
                      onLogged(window.Identity.userProfile)
                      onClose()
                    } else {
                      onClose()
                    }
                  }}>
                  <Close />
                </CloseBtn>
              )}
              <FirstMiddle pathSourcePNG={pathSourcePNG}></FirstMiddle>
              <SecondMiddle>
                {renderTemplate(value.selectedTemplate, { ...props })}
              </SecondMiddle>
            </ContMiddle>
          </Modal>
        )}
      </ModalConsumer>
    </ModalProvider>
  )
}

@Consumer
class Landing extends Component {
  render() {
    const { contextPath, deployment, typeDialog, arcSite } = this.props
    const IMG = typeDialog === 'landing' ? 'bg_login' : 'bg_students'

    const pathSourcePNG =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/${IMG}.jpg`
      ) || ''

    return (
      <LandingInt
        {...this.props}
        pathSourcePNG={pathSourcePNG}
        dispatchEvent={this.dispatchEvent.bind(this)}
      />
    )
  }
}

export { Landing }
