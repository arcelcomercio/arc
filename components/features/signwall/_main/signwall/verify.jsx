import React, { Component } from 'react'

import Consumer from 'fusion:consumer'
import Modal from '../common/modal'
import Header from '../common/header'
import Footer from '../common/footer'

import FormVerify from './_children/form-verify'

import ListBenefits from './_children/benefits'
import { ModalProvider, ModalConsumer } from './context'

@Consumer
class SignWallVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showVerify: false,
    }
    this.validateToken()
  }

  validateToken = () => {
    const {
      tokenVerify,
      siteProperties: {
        signwall: { ORIGIN_API },
      },
    } = this.props

    window.Identity.apiOrigin = ORIGIN_API
    window.Identity.verifyEmail(tokenVerify)
      .then(() => {
        this.setState({
          showVerify: true,
        })
      })
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
      ),
    }
    return templates[template] || templates.verify
  }

  render() {
    const { showVerify } = this.state
    const { closePopup, brandModal } = this.props
    return (
      <>
        {showVerify ? (
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
        ) : null}
      </>
    )
  }
}

export default SignWallVerify
