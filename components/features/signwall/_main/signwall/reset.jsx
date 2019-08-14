import React, { Component } from 'react'

import Modal from '../common/modal'
import Header from '../common/header'
import Footer from '../common/footer'

import FormReset from './_children/form-reset'
import Taggeo from '../utils/taggeo'

import ListBenefits from './_children/benefits'
import { ModalProvider, ModalConsumer } from './context'

class SignWallReset extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    Taggeo('Web_Sign_Wall_Resetpass', 'web_resetpass_open')
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  handleLeavePage = e => {
    e.preventDefault()
    Taggeo('Web_Sign_Wall_Resetpass', 'web_resetpass_leave')
  }

  renderTemplate(template) {
    const { closePopup, brandModal, tokenReset } = this.props
    const templates = {
      reset: (
        <FormReset
          closePopup={closePopup}
          typePopUp="resetpass"
          typeForm="resetpass"
          brandCurrent={brandModal}
          tokenReset={tokenReset}
        />
      ),
    }
    return templates[template] || templates.reset
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
                  name="arc-popup-resetpass"
                  id="arc-popup-resetpass">
                  <Header closePopup={closePopup} typePopUp="resetpass" />
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
        </div>
      </div>
    )
  }
}

export default SignWallReset
