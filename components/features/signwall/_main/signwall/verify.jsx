import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
import Modal from '../common/modal'
import Header from '../common/header'
import Footer from '../common/footer'
import Taggeo from '../utils/taggeo'

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

    const { arcSite } = this.props
    this.origin_api =
      ENV.ENVIRONMENT === 'elcomercio'
        ? `https://api.${arcSite}.pe`
        : `https://api-sandbox.${arcSite}.pe`

    this.validateToken()
  }

  componentDidMount() {
    window.Identity.apiOrigin = this.origin_api
    Taggeo('Web_Sign_Wall_Verify', 'web_swv_open')
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  handleLeavePage = e => {
    e.preventDefault()
    Taggeo('Web_Sign_Wall_Verify', 'web_swv_leave')
  }

  validateToken = () => {
    const { tokenVerify } = this.props

    window.Identity.apiOrigin = this.origin_api
    window.Identity.verifyEmail(tokenVerify).then(() => {
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
                      <Header closePopup={closePopup} typePopUp="verify" />
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
                      {/* <Footer position="right" /> */}
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
