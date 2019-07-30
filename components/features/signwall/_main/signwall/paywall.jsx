import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import Modal from '../common/modal'

import FormLogin from './_children/form-login'
import FormRegister from './_children/form-register'
import FormForgotPass from './_children/form-forgot-pass'
import IntroPaywall from './_children/intro-paywall'

import { ModalProvider, ModalConsumer } from './context'

@Consumer
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
    return templates.intro
  }

  render() {
    const { closePopup, contextPath, arcSite } = this.props
    const ImageBg = `${contextPath}/resources/dist/${arcSite}/images/bg-popup.png`
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
                    <div
                      className="modal-body__middle bg-paywall"
                      style={{
                        background: `url(${ImageBg}) no-repeat`,
                      }}>
                      <p className="text-xl secondary-font">
                        Para acceder a este contenido exclusivo, adquiere tu
                      </p>
                      <h3 className="title-xl mt-30 font-bold">Plan Digital</h3>
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
