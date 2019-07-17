import React, { Component } from 'react'

import Modal from '../common/modal'
import Header from '../common/header'
import Footer from '../common/footer'

import FormVerify from './_children/form-verify'

import ListBenefits from './_children/benefits'
import { ModalProvider, ModalConsumer } from './context'

class SignWallVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderTemplate(template) {
    const { closePopup, brandModal } = this.props
    const templates = {
      verify: (
        <FormVerify
          closePopup={closePopup}
          typePopUp="verify"
          typeForm="verify"
          brandCurrent={brandModal}
        />
      )
    }
    return templates[template] || template.verify
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
                  name="arc-popup-verifyaccount"
                  id="arc-popup-verifyaccount">
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
        </div>
      </div>
    )
  }
}

export default SignWallVerify
