import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import Modal from '../common/modal'

import FormLogin from './_children/form-login'
import FormRegister from './_children/form-register'
import FormForgotPass from './_children/form-forgot-pass'
import FormPaywall from './_children/form-paywall'
import Taggeo from '../utils/taggeo'

import { ModalProvider, ModalConsumer } from './context'

@Consumer
class PayWallPremium extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { typeModal } = this.props
    Taggeo(`Web_${typeModal}_Hard`, `web_${typeModal}_open`)
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  handleLeavePage = e => {
    e.preventDefault()
    const { typeModal } = this.props
    Taggeo(`Web_${typeModal}_Hard`, `web_${typeModal}_leave`)
  }

  renderTemplate(template) {
    const { closePopup, brandModal, typeModal } = this.props
    const templates = {
      intro: (
        <FormPaywall
          closePopup={closePopup}
          typePopUp={typeModal} // paywall, premium
          typeForm="intro"
          removeBefore={() => window.removeEventListener('beforeunload', this.handleLeavePage)}
          brandCurrent={brandModal}
        />
      ),
      login: (
        <FormLogin
          closePopup={closePopup}
          typePopUp={typeModal} // paywall, premium
          typeForm="login"
        />
      ),
      register: (
        <FormRegister
          closePopup={closePopup}
          typePopUp={typeModal} // paywall, premium
          typeForm="registro"
          brandCurrent={brandModal}
        />
      ),
      forgot: (
        <FormForgotPass
          closePopup={closePopup}
          typePopUp={typeModal} // paywall, premium
          typeForm="login"
          brandCurrent={brandModal}
        />
      ),
    }
    return templates[template] || templates.intro
  }

  render() {
    const {
      closePopup,
      typeModal,
      contextPath,
      siteProperties,
      arcSite,
      deployment,
    } = this.props

    const ImageBg =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/bg_paywall.png`
      ) || ''

    return (
      <div className="signwall">
        <div className="link-identity__content">
          <ModalProvider>
            <ModalConsumer>
              {value => (
                <Modal
                  size="medium"
                  position="middle"
                  name={`arc-popup-${typeModal}`}
                  id={`arc-popup-${typeModal}`}>
                  <div className="modal-body">
                    <div
                      className="modal-body__middle bg-paywall"
                      style={{
                        backgroundImage: `url(${ImageBg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}>
                      <p className="text-xl secondary-font">
                        {typeModal === 'paywall'
                          ? 'Has alcanzado el límite de noticias.'
                          : 'Para acceder a este contenido'}
                        <br />
                        {typeModal === 'paywall'
                          ? 'Para continuar leyendo, adquiere el'
                          : 'exclusivo, adquiere tu'}
                      </p>
                      <h3 className="title-xl mt-30 font-bold">Plan Digital</h3>
                      <center>
                        {/* <img
                          className="modal-header__img mt-40"
                          alt=""
                          src={deployment(
                            `${contextPath}/resources/dist/${arcSite}/images/${siteProperties.assets.nav.logo}`
                          )}
                        /> */}
                        <img
                          style={{ maxWidth: '320px', height: 'auto' }}
                          className="modal-header__img mt-40"
                          alt=""
                          src={deployment(
                            `${contextPath}/resources/dist/${arcSite}/images/logo_ges.png`
                          )}
                        />
                      </center>
                    </div>
                    <div className="modal-body__middle intro-paywall">
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          Taggeo(
                            `Web_${typeModal}_Hard`,
                            `web_${typeModal}_cerrar`
                          )
                          closePopup()
                        }}>
                        <i className="icon-close"></i>
                      </button>
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

export default PayWallPremium
