import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
@Consumer
class SignWallPaywall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPaywall: false,
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
        showPaywall: true,
      })
    }
  }

  render() {
    const { showPaywall } = this.state
    return (
      <div className="">
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
          <p> Luego S/39 cada mes</p>
        </div>
        <h3 className="title-line uppercase text-center mt-40 mb-40">
          <span>Beneficios</span>
        </h3>
        <ul className="list-benefits mb-20">
          <li>
            Acceso a contenido exclusivo en gestion.pe y navegación ilimitada
            desde todos los dispositivos
          </li>
        </ul>
        <div className="form-group">
          {showPaywall ? (
            <input
              type="button"
              className="btn btn--blue btn-bg"
              value="Suscríbete"
              // eslint-disable-next-line no-return-assign
              onClick={() =>
                (window.location.href =
                  'https://elcomercio-gestion-sandbox.cdn.arcpublishing.com/paywall/?_website=gestion&outputType=paywall#step1')
              }></input>
          ) : (
            <input
              type="button"
              className="btn btn--blue btn-bg"
              value="Iniciar Sesión"></input>
          )}
        </div>

        <p className="text-center mt-20 text-sm">
          Si eres suscriptor del diario impreso,
          <br /> descubre tu descuento
        </p>
      </div>
    )
  }
}

export default SignWallPaywall
