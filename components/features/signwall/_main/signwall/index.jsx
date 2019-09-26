import React, { Component } from 'react'

import Modal from '../common/modal'
import Header from '../common/header'
import Taggeo from '../utils/taggeo'

import FormLogin from './_children/form-login'
import FormRegister from './_children/form-register'
import FormForgotPass from './_children/form-forgot-pass'

import ListBenefits from './_children/benefits'
import { ModalProvider, ModalConsumer } from './context'

class LoginRegister extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this._isMounted = true

    if (this._isMounted) {
      Taggeo('Web_Sign_Wall_Organico', 'web_swo_open')
      window.addEventListener('beforeunload', this.handleLeavePage)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  handleLeavePage = e => {
    e.preventDefault()
    Taggeo('Web_Sign_Wall_0rganico', 'web_swo_leave')
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
              size={
                brandModal === 'peru21' || brandModal === 'peru21g21'
                  ? 'small'
                  : 'large'
              }
              position="middle"
              name="arc-popup-signwall"
              id="arc-popup-signwall">
              <Header closePopup={closePopup} typePopUp="organico" />
              <div className="modal-body">
                {brandModal === 'peru21' ||
                brandModal === 'peru21g21' ? null : (
                  <div className="modal-body__left">
                    <ListBenefits
                      typeMessage="organic"
                      brandCurrent={brandModal}
                    />
                  </div>
                )}

                <div
                  className={
                    brandModal === 'peru21' || brandModal === 'peru21g21'
                      ? 'modal-body__full'
                      : 'modal-body__right'
                  }>
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

export default LoginRegister
