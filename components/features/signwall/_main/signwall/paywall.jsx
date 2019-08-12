import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import Modal from '../common/modal'

import FormLogin from './_children/form-login'
import FormRegister from './_children/form-register'
import FormForgotPass from './_children/form-forgot-pass'
import FormPaywall from './_children/form-paywall'

import { ModalProvider, ModalConsumer } from './context'

@Consumer
class PayWallPremium extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderTemplate(template) {
    const { closePopup, brandModal } = this.props
    const templates = {
      intro: (
        <FormPaywall
          closePopup={closePopup}
          typePopUp="paywall"
          typeForm="intro"
          brandCurrent={brandModal}
        />
      ),
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
    }
    return templates[template] || templates.intro
  }

  render() {
    const {
      closePopup,
      typeModal,
      contextPath,
      arcSite,
      deployment,
    } = this.props
    const ImageBg =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/bg_paywall.png`
      ) || ''
    return (
      <div className="signwall">
        <div className="link-identity__content">
          <ModalProvider>
            <ModalConsumer>
              {value => (
                <Modal
                  size="medium"
                  position="middle"
                  name={`arc-popup-${typeModal}`}
                  id={`arc-popup-${typeModal}`}>
                  <div className="modal-body">
                    <div
                      className="modal-body__middle bg-paywall"
                      style={{
                        backgroundImage: `url(${ImageBg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}>
                      <p className="text-xl secondary-font">
                        {typeModal === 'paywall'
                          ? 'Para continuar leyendo, adquiere el'
                          : `Para acceder a este contenido exclusivo, adquiere tu`}
                      </p>
                      <h3 className="title-xl mt-30 font-bold">Plan Digital</h3>
                    </div>
                    <div className="modal-body__middle intro-paywall">
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => closePopup()}>
                        <i className="icon-close"></i>
                      </button>
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

export default PayWallPremium
