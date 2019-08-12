import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
import { ModalConsumer } from '../context'
import Cookie from '../../utils/cookie'

const Cookies = new Cookie()
@Consumer
class SignWallPaywall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPaywallBtn: false,
    }

    const { arcSite } = this.props
    this.origin_api =
      ENV.ENVIRONMENT === 'elcomercio'
        ? `https://api.${arcSite}.pe`
        : `https://api-sandbox.${arcSite}.pe`
  }

  componentWillMount() {
    window.Identity.apiOrigin = this.origin_api
    if (window.Identity.userProfile) {
      this.setState({
        showPaywallBtn: true,
      })
    }
  }

  handleSuscription = e => {
    e.preventDefault()
    Cookies.setCookie('paywall_last_url', window.document.referrer, 1)
    window.sessionStorage.setItem('paywall_last_url', window.document.referrer)
    window.location.href =
      'https://elcomercio-gestion-sandbox.cdn.arcpublishing.com/paywall/?_website=gestion&outputType=paywall#step1'
  }

  render() {
    const { showPaywallBtn } = this.state
    return (
      <ModalConsumer>
        {value => (
          <div className="modal-body__wrapper">
            <div className="cont-price-detail">
              <div className="price">
                <i>s/</i>29
              </div>
              <div className="detail-price uppercase">
                <p>
                  <strong>
                    / Al mes <br />
                    por 6 meses
                  </strong>
                </p>
                <p> Luego S/ 39 cada mes</p>
              </div>
            </div>
            <h3 className="title-line uppercase text-center mt-30 mb-20">
              <span>Beneficios</span>
            </h3>
            <ul className="list-benefits mb-20">
              <li>
                Acceso a contenido exclusivo en gestion.pe y navegación
                ilimitada desde todos tus dispositivos
              </li>
            </ul>
            <div className="form-group">
              {showPaywallBtn ? (
                <input
                  type="button"
                  className="btn btn--blue btn-bg"
                  value="Suscribirme"
                  onClick={e => this.handleSuscription(e)}></input>
              ) : (
                <input
                  type="button"
                  onClick={() => value.changeTemplate('login')}
                  className="btn btn--blue btn-bg"
                  value="Iniciar Sesión"></input>
              )}
            </div>

            <p className="text-center mt-20 text-sm">
              Si eres suscriptor del diario impreso,
              <br /> descubre tu descuento.
            </p>
          </div>
        )}
      </ModalConsumer>
    )
  }
}

export default SignWallPaywall
