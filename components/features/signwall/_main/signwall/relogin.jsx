import React, { Component } from 'react'

import Modal from '../common/modal'
import Header from '../common/header'
import Footer from '../common/footer'

import FormRelogin from './_children/form-relogin'
import FormForgotPass from './_children/form-forgot-pass'
import FormRegister from './_children/form-register'

import ListBenefits from './_children/benefits'
import { ModalProvider, ModalConsumer } from './context'

class SignWallRelogin extends Component {
  constructor(props) {
    const getProfileMPP = window.localStorage.getItem('profileMPP')
    const profileMPP = JSON.parse(getProfileMPP)
    const userName = profileMPP ? profileMPP.firstName : 'lector'

    super(props)
    this.state = {
      nameMPP: userName !== 'undefined' ? userName : 'lector',
    }
  }

  renderTemplate(template) {
    const { closePopup, brandModal } = this.props
    const templates = {
      relogin: (
        <FormRelogin
          closePopup={closePopup}
          typePopUp="relogemail"
          typeForm="login"
          brandCurrent={brandModal}
        />
      ),
      register: (
        <FormRegister
          closePopup={closePopup}
          typePopUp="relogemail"
          typeForm="register"
          brandCurrent={brandModal}
        />
      ),
      forgot: (
        <FormForgotPass
          closePopup={closePopup}
          typePopUp="relogemail"
          typeForm="relogemail"
          brandCurrent={brandModal}
        />
      ),
    }
    return templates[template] || templates.relogin
  }

  render() {
    const { nameMPP } = this.state
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
                  name="arc-popup-relogin-email"
                  id="arc-popup-relogin-email">
                  <Header closePopup={closePopup} />
                  <div className="modal-body">
                    <div className="modal-body__left">
                      <ListBenefits
                        typeMessage="relogin"
                        brandCurrent={brandModal}
                        nameMPP={nameMPP || 'lector'}
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
        </div>
      </div>
    )
  }
}

export default SignWallRelogin
