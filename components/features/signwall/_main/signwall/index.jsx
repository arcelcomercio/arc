import React, { Component } from 'react'

import Modal from '../common/modal'
import Header from '../common/header'
import Footer from '../common/footer'

import FormLogin from './_children/form-login'
import FormRegister from './_children/form-register'
import FormForgotPass from './_children/form-forgot-pass'

import ListBenefits from './_children/benefits'
import { ModalProvider, ModalConsumer } from './context'

class LoginRegister extends Component {
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
    }
    return templates[template] || templates.login
  }

  render() {
    const { closePopup, brandModal } = this.props
    return (
      <ModalProvider>
        <ModalConsumer>
          {value => (
            <Modal
              size="large"
              position="middle"
              name="arc-popup-signwall"
              id="arc-popup-signwall">
              <Header closePopup={closePopup} />
              <div className="modal-body">
                <div className="modal-body__left">
                  <ListBenefits
                    typeMessage="organic"
                    brandCurrent={brandModal}
                  />
                </div>
                <div className="modal-body__right">
                  {this.renderTemplate(value.selectedTemplate)}
                </div>
              </div>
              <Footer position="right" />
            </Modal>
          )}
        </ModalConsumer>
      </ModalProvider>
    )
  }
}

export default LoginRegister
