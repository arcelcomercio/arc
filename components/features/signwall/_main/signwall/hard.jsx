import React, { Component } from 'react'

import Modal from '../common/modal'
import Header from '../common/header'
import Taggeo from '../utils/taggeo'

import FormLogin from './_children/form-login'
import FormRegister from './_children/form-register'
import FormForgotPass from './_children/form-forgot-pass'
import ListBenefits from './_children/benefits'
import { ModalProvider, ModalConsumer } from './context'

class SignWallHard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    Taggeo('Web_Sign_Wall_Hard', 'web_swh_open')
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  handleLeavePage = e => {
    e.preventDefault()
    Taggeo('Web_Sign_Wall_Hard', 'web_swh_leave')
  }

  renderTemplate(template) {
    const { closePopup, brandModal } = this.props
    const templates = {
      login: (
        <FormLogin closePopup={closePopup} typePopUp="hard" typeForm="login" />
      ),
      register: (
        <FormRegister
          closePopup={closePopup}
          typePopUp="hard"
          typeForm="registro"
          brandCurrent={brandModal}
        />
      ),
      forgot: (
        <FormForgotPass
          closePopup={closePopup}
          typePopUp="hard"
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
      <div className="signwall">
        <div className="link-identity__content">
          <ModalProvider>
            <ModalConsumer>
              {value => (
                <Modal
                  size="large"
                  position="middle"
                  name="arc-popup-signwallhard"
                  id="arc-popup-signwallhard">
                  <Header closePopup={closePopup} typePopUp="hard" />
                  <div className="modal-body">
                    <div className="modal-body__left">
                      <ListBenefits
                        typeMessage="hard"
                        brandCurrent={brandModal}
                      />
                    </div>
                    <div className="modal-body__right">
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

export default SignWallHard
