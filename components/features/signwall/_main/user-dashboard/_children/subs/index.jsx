import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
import Loading from '../../../common/loading'

@Consumer
class MySubs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paywallPrice: '-',
      paywallDescripcion: '-',
      featuresDescription: [],
      loading: true,
      isSubs: false,
    }

    const { arcSite } = this.props

    this.origin_api =
      ENV.ENVIRONMENT === 'elcomercio'
        ? `https://api.${arcSite}.pe`
        : `https://api-sandbox.${arcSite}.pe`
  }

  componentDidMount() {
    this.getCampain()
    this.getListSubs()
  }

  getListSubs() {
    window.Sales.apiOrigin = this.origin_api
    window.Sales.getAllActiveSubscriptions()
      .then(res => {
        if (res.length > 0) {
          this.setState({
            isSubs: true,
          })
        }
        this.setState({
          loading: false,
        })
      })
      .catch(err => window.console.error(err))
  }

  getCampain() {
    const { fetched } = this.getContent('paywall-campaing')
    fetched.then(resCam => {
      this.setState({
        paywallPrice: resCam.plans[0].amount || '-',
        paywallDescripcion: resCam.plans[0].description.description || '-',
        featuresDescription: resCam.summary.feature || [],
      })
    })
  }

  handleSuscription = e => {
    e.preventDefault()
    if (ENV.ENVIRONMENT === 'elcomercio') {
      window.location.href = '/suscripcionesdigitales/' // URL LANDING
    } else {
      window.location.href =
        '/suscripcionesdigitales/?_website=gestion&outputType=paywall#step1' // URL LANDING
    }
  }

  render() {
    const {
      paywallPrice,
      paywallDescripcion,
      featuresDescription,
      loading,
      isSubs,
    } = this.state
    return loading ? (
      <Loading />
    ) : (
      <>
        {isSubs ? (
          <div className="resume__dates">
            <div className="cont-subs-large">
              <div className="first-subs">
                <p>DETALLE DE LA SUSCRIPCIÓN</p>
                <h3>Digital</h3>
                <br />
                <p>Plan de pago: Mensual</p>
                <p>Precio: S/{paywallPrice}*</p>
                <p className="mini">*{paywallDescripcion}</p>
              </div>
              <div className="last-subs">
                <p>
                  <strong>Beneficios</strong>
                </p>
                <ul className="list-benefits mb-20">
                  {featuresDescription.map(item => {
                    return <li key={item}>{item}</li>
                  })}
                </ul>
              </div>
            </div>
            <hr />
            <div className="cont-link">
              <button type="button" className="link">
                ANULAR MI SUSCRIPCIÓN
              </button>
            </div>
          </div>
        ) : (
          <div className="resume__dates">
            <div className="cont-plan">
              <div className="first-plan">
                <p>Accede a nuestro contenido exclusivo, adquiere tu</p>
                <h3>Plan Digital</h3>
              </div>

              <div className="last-plan">
                <div className="intro-paywall bg-white">
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
                    <input
                      type="button"
                      className="btn btn--blue btn-bg"
                      value="Suscribirme"
                      onClick={e => {
                        this.handleSuscription(e)
                      }}></input>
                  </div>

                  <p className="text-center mt-20 text-sm">
                    Si eres suscriptor del diario impreso,
                    <br /> descubre tu descuento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}
export default MySubs
