import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import Modal from '../common/modal'
import { Close } from '../common/iconos'

import FormLoginPaywall from './_children/form-login-paywall'
import FormRegister from './_children/form-register'
import FormForgotPass from './_children/form-forgot-pass'
import { ModalProvider, ModalConsumer } from './context'
import Taggeo from '../utils/taggeo'

@Consumer
class LoginPaywall extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    Taggeo('Web_Sign_Wall_Suscripciones', 'web_sws_open')
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  handleLeavePage = e => {
    e.preventDefault()
    Taggeo('Web_Sign_Wall_Suscripciones', 'web_sws_leave')
  }

  renderTemplate(template) {
    const { closePopup, brandModal, onLogged } = this.props
    const templates = {
      login: (
        <FormLoginPaywall
          closePopup={closePopup}
          typePopUp="suscripciones"
          typeForm="login"
          reloadLogin
          onLogged={onLogged}
        />
      ),
      register: (
        <FormRegister
          closePopup={closePopup}
          typePopUp="suscripciones"
          typeForm="registro"
          brandCurrent={brandModal}
          reloadRegister
        />
      ),
      forgot: (
        <FormForgotPass
          closePopup={closePopup}
          typePopUp="suscripciones"
          typeForm="login"
          brandCurrent={brandModal}
          reloadForgot
        />
      ),
    }
    return templates[template] || templates.login
  }

  render() {
    const {
      contextPath,
      arcSite,
      deployment,
      closePopup,
      noBtnClose,
    } = this.props
    const ImageBg =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/bg_login.png`
      ) || ''
    return (
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
                <div
                  className={`modal-body__middle intro-paywall intro-${arcSite}`}>
                  {!noBtnClose && (
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => {
                        Taggeo(`Web_Sign_Wall_Suscripciones`, `web_sws_cerrar`)
                        closePopup()
                      }}>
                      <Close color="#333333" />
                    </button>
                  )}
                  {this.renderTemplate(value.selectedTemplate)}
                </div>
              </div>
            </Modal>
          )}
        </ModalConsumer>
      </ModalProvider>
    )
  }
}

export default LoginPaywall
