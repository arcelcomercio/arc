import React, { Component } from 'react'

import Modal from '../common/modal'
import Header from '../common/header'
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
    Taggeo('Web_Sign_Wall_Resetpass', 'web_swr_open')
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  handleLeavePage = e => {
    e.preventDefault()
    Taggeo('Web_Sign_Wall_Resetpass', 'web_swr_leave')
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
                  size={brandModal !== 'peru21' ? 'large' : 'small'}
                  position="middle"
                  name="arc-popup-resetpass"
                  id="arc-popup-resetpass">
                  <Header closePopup={closePopup} typePopUp="resetpass" />
                  <div className="modal-body">
                    {brandModal !== 'peru21' ? (
                      <div className="modal-body__left">
                        <ListBenefits
                          typeMessage="organic"
                          brandCurrent={brandModal}
                        />
                      </div>
                    ) : null}
                    <div
                      className={
                        brandModal !== 'peru21'
                          ? 'modal-body__right'
                          : 'modal-body__full'
                      }>
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

export default SignWallReset
