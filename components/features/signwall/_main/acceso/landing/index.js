import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { ModalProvider, ModalConsumer } from '../../signwall/context'
import { Modal } from '../../common/modal/index'
import { FormLoginPaywall } from '../_children/form_login_landing'
import { FormForgot } from '../_children/form_forgot'
import { FormRegister } from '../_children/form_register'
import { ContMiddle, FirstMiddle, SecondMiddle, CloseBtn } from './styles'
import { Close } from '../../common/iconos'

const renderTemplate = (template, attributes) => {
  const templates = {
    // eslint-disable-next-line react/jsx-filename-extension
    login: <FormLoginPaywall {...attributes} />,
    forgot: <FormForgot {...attributes} />,
    register: <FormRegister {...attributes} />,
  }
  return templates[template] || templates.login
}

// eslint-disable-next-line import/prefer-default-export
export const LandingInt = props => {
  const { onClose, onLogged, typeDialog, pathSource } = props
  const IMG = typeDialog === 'landing' ? 'bg_login' : 'bg_students'
  return (
    <ModalProvider>
      <ModalConsumer>
        {value => (
          <Modal size="medium" position="middle">
            <ContMiddle>
              <CloseBtn
                type="button"
                onClick={() => {
                  if (window.Identity.userProfile) {
                    onLogged(window.Identity.userProfile)
                    onClose()
                  } else {
                    onClose()
                  }
                }}>
                <Close />
              </CloseBtn>
              <FirstMiddle>
                <picture>
                  <source
                    srcSet={`${pathSource}/${IMG}.webp`}
                    type="image/webp"
                  />
                  <source
                    srcSet={`${pathSource}/${IMG}.png`}
                    type="image/png"
                  />
                  <img src={`${pathSource}/${IMG}.png`} alt="img" />
                </picture>
              </FirstMiddle>
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
    const { contextPath, deployment, arcSite } = this.props

    const pathSource =
      deployment(`${contextPath}/resources/dist/${arcSite}/images`) || ''

    return (
      <LandingInt
        {...this.props}
        pathSource={pathSource}
        dispatchEvent={this.dispatchEvent.bind(this)}
      />
    )
  }
}

export { Landing }
