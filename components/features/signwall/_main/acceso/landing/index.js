import React from 'react'
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
  const { onClose, bgMmodalPng, onLogged, bgMmodalWebp } = props
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
                  <picture>
                    <source srcSet={bgMmodalWebp} type="image/webp" />
                    <source srcSet={bgMmodalPng} type="image/png" />
                    <img src={bgMmodalPng} alt="img" />
                  </picture>
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
class Landing extends React.Component {
  render() {
    const { contextPath, deployment, arcSite } = this.props

    const backImagePng =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/bg_login.png`
      ) || ''
    const backImageWebp =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/bg_login.webp`
      ) || ''

    return (
      <LandingInt
        {...this.props}
        bgMmodalPng={backImagePng}
        bgMmodalWebp={backImageWebp}
        dispatchEvent={this.dispatchEvent.bind(this)}
        addEventListener={this.addEventListener.bind(this)}
        removeEventListener={this.removeEventListener.bind(this)}
      />
    )
  }
}

export { Landing }
