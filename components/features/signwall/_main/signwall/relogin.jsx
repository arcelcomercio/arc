import React, { Component } from 'react'

import Modal from '../common/modal'
import Header from '../common/header'
import FormRelogin from './_children/form-relogin'
import FormForgotPass from './_children/form-forgot-pass'
import FormRegister from './_children/form-register'
import Taggeo from '../utils/taggeo'

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

  componentDidMount() {
    Taggeo('Web_Sign_Wall_Relogemail', 'web_swr_open')
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  handleLeavePage = e => {
    e.preventDefault()
    Taggeo('Web_Sign_Wall_Relogemail', 'web_swr_leave')
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
          typeForm="registro"
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
      <ModalProvider>
        <ModalConsumer>
          {value => (
            <Modal
              size="large"
              position="middle"
              name="arc-popup-relogin-email"
              id="arc-popup-relogin-email">
              <Header closePopup={closePopup} typePopUp="relogemail" />
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
            </Modal>
          )}
        </ModalConsumer>
      </ModalProvider>
    )
  }
}

export default SignWallRelogin
