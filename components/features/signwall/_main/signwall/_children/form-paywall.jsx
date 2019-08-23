import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
import { ModalConsumer } from '../context'
import Cookie from '../../utils/cookie'
import Loading from '../../common/loading'
import Taggeo from '../../utils/taggeo'

const Cookies = new Cookie()
@Consumer
class SignWallPaywall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPaywallBtn: false,
      paywallPrice: '-',
      paywallDescripcion: '-',
      featuresDescription: [],
      isLoading: true,
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
    this.getCampain()
  }

  getCampain() {
    const { fetched } = this.getContent('paywall-campaing')
    fetched.then(resCam => {
      this.setState({
        paywallPrice: resCam.plans[0].amount || '-',
        paywallDescripcion: resCam.plans[0].description.description || '-',
        featuresDescription: resCam.summary.feature || [],
        isLoading: false,
      })
    })
  }

  handleSuscription = e => {
    e.preventDefault()
    Cookies.setCookie('paywall_last_url', window.document.referrer, 1)
    window.sessionStorage.setItem('paywall_last_url', window.document.referrer)
    if (ENV.ENVIRONMENT === 'elcomercio') {
      window.location.href = '/suscripcionesdigitales/' // URL LANDING
    } else {
      window.location.href =
        '/suscripcionesdigitales/?_website=gestion&outputType=paywall#step1' // URL LANDING
    }
  }

  render() {
    const {
      showPaywallBtn,
      paywallPrice,
      paywallDescripcion,
      featuresDescription,
      isLoading,
    } = this.state
    const { typePopUp } = this.props

    return (
      <ModalConsumer>
        {value => (
          <div className="modal-body__wrapper">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div className="cont-price-detail">
                  <div className="price">
                    <i>s/</i>
                    {paywallPrice}
                  </div>
                  <div className="detail-price uppercase">
                    <p>{paywallDescripcion}</p>
                  </div>
                </div>
                <h3 className="title-line uppercase text-center mt-30 mb-20">
                  <span>Beneficios</span>
                </h3>
                <ul className="list-benefits mb-20">
                  {featuresDescription.map(item => {
                    return <li key={item}>{item}</li>
                  })}
                </ul>
                <div className="form-group">
                  {showPaywallBtn ? (
                    <input
                      type="button"
                      className="btn btn--blue btn-bg"
                      value="Suscribirme"
                      onClick={e => {
                        Taggeo(
                          `Web_${typePopUp}_Hard`,
                          `web_${typePopUp}_boton_suscribirme`
                        )
                        this.handleSuscription(e)
                      }}></input>
                  ) : (
                    <input
                      type="button"
                      onClick={() => {
                        Taggeo(
                          `Web_${typePopUp}_Hard`,
                          `web_${typePopUp}_boton_iniciar_sesion`
                        )
                        value.changeTemplate('login')
                      }}
                      className="btn btn--blue btn-bg"
                      value="Iniciar Sesión"></input>
                  )}
                </div>

                <p className="text-center mt-20 text-sm">
                  Si eres suscriptor del diario impreso,
                  <br /> descubre tu descuento.
                </p>
              </>
            )}
          </div>
        )}
      </ModalConsumer>
    )
  }
}

export default SignWallPaywall
