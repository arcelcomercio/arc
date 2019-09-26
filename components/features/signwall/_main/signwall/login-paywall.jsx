import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import Modal from '../common/modal'
import { Close } from '../common/iconos'

import FormLoginPaywall from './_children/form-login-paywall'
import FormRegister from './_children/form-register'
import FormForgotPass from './_children/form-forgot-pass'

import { ModalProvider, ModalConsumer } from './context'

@Consumer
class LoginPaywall extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderTemplate(template) {
    const { closePopup, brandModal } = this.props
    const templates = {
      login: (
        <FormLoginPaywall
          closePopup={closePopup}
          typePopUp="organico"
          typeForm="login"
          reloadLogin
        />
      ),
      register: (
        <FormRegister
          closePopup={closePopup}
          typePopUp="organico"
          typeForm="registro"
          brandCurrent={brandModal}
          reloadRegister
        />
      ),
      forgot: (
        <FormForgotPass
          closePopup={closePopup}
          typePopUp="organico"
          typeForm="login"
          brandCurrent={brandModal}
          reloadForgot
        />
      ),
    }
    return templates[template] || templates.login
  }

  render() {
    const { contextPath, arcSite, deployment, closePopup } = this.props
    const ImageBg =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/bg_login.png`
      ) || ''
    return (
      // <div className="signwall">
      //   <div className="link-identity__content">
          <ModalProvider>
            <ModalConsumer>
              {value => (
                <Modal
                  size="medium"
                  position="middle"
                  name="arc-popup-paywall"
                  id="arc-popup-paywall">
                  <div className="modal-body">
                    <div
                      className="modal-body__middle bg-paywall hidden-mobile"
                      style={{
                        backgroundImage: `url(${ImageBg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}></div>
                    <div className="modal-body__middle intro-paywall">
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          closePopup()
                        }}>
                        <Close color="#333333" />
                      </button>
                      {this.renderTemplate(value.selectedTemplate)}
                    </div>
                  </div>
                </Modal>
              )}
            </ModalConsumer>
          </ModalProvider>
      //   </div>
      // </div>
    )
  }
}

export default LoginPaywall
