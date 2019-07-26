import React, { Component } from 'react'

import Modal from '../common/modal'

import FormLogin from './_children/form-login'
import FormRegister from './_children/form-register'
import FormForgotPass from './_children/form-forgot-pass'
import IntroPaywall from './_children/intro-paywall'

import { ModalProvider, ModalConsumer } from './context'

class PayWall extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderTemplate(template) {
    const { closePopup, brandModal } = this.props
    const templates = {
      login: (
        <FormLogin
          closePopup={closePopup}
          typePopUp="organico"
          typeForm="login"
        />
      ),
      register: (
        <FormRegister
          closePopup={closePopup}
          typePopUp="organico"
          typeForm="registro"
          brandCurrent={brandModal}
        />
      ),
      forgot: (
        <FormForgotPass
          closePopup={closePopup}
          typePopUp="organico"
          typeForm="login"
          brandCurrent={brandModal}
        />
      ),
      intro: <IntroPaywall />,
    }
    return  templates.intro
  }

  render() {
    const { closePopup } = this.props
    return (
      <div className="signwall">
        <div className="link-identity__content">
          <ModalProvider>
            <ModalConsumer>
              {value => (
                <Modal
                  size="medium"
                  position="middle"
                  name="arc-popup-paywall"
                  id="arc-popup-paywall">
                  {/* <Header closePopup={closePopup} /> */}
                  <div className="modal-body">
                    <div className="modal-body__middle">
                      <h2>
                        Para acceder a este contenido exclusivo, adquiere tu
                      </h2>
                      <h1>Plan Digital</h1>
                    </div>
                    <div className="modal-body__middle intro-paywall">
                      {this.renderTemplate(value.selectedTemplate)}
                    </div>
                  </div>
                </Modal>
              )}
            </ModalConsumer>
          </ModalProvider>
        </div>
      </div>
    )
  }
}

export default PayWall
