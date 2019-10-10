import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { ModalConsumer } from '../context'
import Loading from '../../common/loading'
import Taggeo from '../../utils/taggeo'
import Domains from '../../utils/domains'

@Consumer
class SignWallPaywall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPaywallBtn: false,
      paywallPrice: '-',
      paywallFrecuency: '-',
      paywallTitle: '-',
      paywallDescripcion: '-',
      featuresDescription: [],
      isLoading: true,
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
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
        paywallFrecuency: resCam.plans[0].billingFrequency || '-',
        paywallTitle: resCam.plans[0].description.title || '-',
        paywallDescripcion: resCam.plans[0].description.description || '-',
        featuresDescription: resCam.summary.feature || [],
        isLoading: false,
      })
    })
  }

  handleSuscription = e => {
    const { removeBefore, typePopUp, arcSite } = this.props
    e.preventDefault()
    window.sessionStorage.setItem(
      'paywall_last_url',
      window.document.referrer
        ? window.document.referrer.split(window.location.origin)[1]
        : ''
    )
    removeBefore() // dismount before
    window.location.href = Domains.getUrlPaywall(arcSite)
    window.sessionStorage.setItem('paywall_type_modal', typePopUp)
  }

  render() {
    const frecuency = {
      Month: 'al mes',
      Year: 'al año',
    }
    const {
      showPaywallBtn,
      paywallPrice,
      paywallFrecuency,
      paywallTitle,
      paywallDescripcion,
      featuresDescription,
      isLoading,
    } = this.state
    const { typePopUp, arcSite } = this.props

    return (
      <ModalConsumer>
        {value => (
          <div className="modal-body__wrapper">
            {isLoading ? (
              <Loading site={arcSite} />
            ) : (
              <>
                <div className="cont-price-detail">
                  <div className="price">
                    <i>s/</i>
                    {paywallPrice}
                  </div>
                  <div className="detail-price">
                    <p>
                      <strong>{frecuency[paywallFrecuency]}</strong>
                    </p>
                    <p>
                      <strong>{paywallTitle}</strong>
                    </p>
                    <p>{paywallDescripcion}</p>
                  </div>
                </div>
                <h3
                  className={`title-line line-${arcSite} uppercase text-center mt-30 mb-20`}>
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
                      value="VER PLANES"
                      onClick={e => {
                        Taggeo(
                          `Web_${typePopUp}_Hard`,
                          `web_${typePopUp}_boton_ver_planes`
                        )
                        this.handleSuscription(e)
                      }}></input>
                  ) : (
                    <input
                      type="button"
                      onClick={() => {
                        Taggeo(
                          `Web_${typePopUp}_Hard`,
                          `web_${typePopUp}_boton_iniciar_continuar`
                        )

                        window.sessionStorage.setItem(
                          'paywall_last_url',
                          window.document.referrer
                            ? window.document.referrer.split(
                                window.location.origin
                              )[1]
                            : ''
                        )

                        value.changeTemplate('login')
                      }}
                      className="btn btn--blue btn-bg"
                      value="CONTINUAR"></input>
                  )}
                </div>

                <p className="text-center mt-20 text-md message-paywall">
                  ¿ESTÁS SUSCRITO AL DIARIO IMPRESO? <br />
                  Disfruta
                  <strong>
                    {arcSite === 'elcomercio' ? ' 6 ' : ' 3 '} meses GRATIS {' '}
                  </strong>
                  y luego S/{arcSite === 'elcomercio' ? ' 10 ' : ' 19 '} al mes.
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
