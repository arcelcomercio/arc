import React, { Component } from 'react'

import Modal from '../common/modal'
import Header from '../common/header'
import FormRelogin from './_children/form-relogin'
import FormForgotPass from './_children/form-forgot-pass'
import FormRegister from './_children/form-register'
import Taggeo from '../utils/taggeo'

import ListBenefits from './_children/benefits'
import { ModalProvider, ModalConsumer } from './context'

class SignwallReHash extends Component {
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
    Taggeo('Web_Sign_Wall_Reloghash', 'web_swr_open')
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  handleLeavePage = e => {
    e.preventDefault()
    Taggeo('Web_Sign_Wall_Reloghash', 'web_swr_leave')
  }

  renderTemplate(template) {
    const { closePopup, brandModal } = this.props
    const templates = {
      relogin: (
        <FormRelogin
          closePopup={closePopup}
          typePopUp="reloghash"
          typeForm="login"
          brandCurrent={brandModal}
        />
      ),
      register: (
        <FormRegister
          closePopup={closePopup}
          typePopUp="reloghash"
          typeForm="registro"
          brandCurrent={brandModal}
        />
      ),
      forgot: (
        <FormForgotPass
          closePopup={closePopup}
          typePopUp="reloghash"
          typeForm="reloghash"
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
              name="arc-popup-relogin-hash"
              id="arc-popup-relogin-hash">
              <Header closePopup={closePopup} typePopUp="reloghash" type="noclose"/>
              <div className="modal-body">
                <div className="modal-body__left">
                  <ListBenefits
                    typeMessage="reloginhash"
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

export default SignwallReHash
