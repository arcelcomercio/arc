import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
// import Services from '../../../utils/services'
import Loading from '../../../common/loading'
// import { ModalConsumer } from '../../../signwall/context'

// const services = new Services()

@Consumer
class Subs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paywallPrice: '-',
      paywallDescripcion: '-',
      isSubs: false,
      isLoad: true,
    }

    const { arcSite } = this.props

    this.origin_api =
      ENV.ENVIRONMENT === 'elcomercio'
        ? `https://api.${arcSite}.pe`
        : `https://api-sandbox.${arcSite}.pe`
  }

  componentDidMount() {
    this.getListSubs()
    this.getCampain()
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
          isLoad: false,
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
      })
    })
  }

  handlePageChange = () => {
    if (ENV.ENVIRONMENT === 'elcomercio') {
      window.location.href = '/suscripcionesdigitales/' // URL LANDING
    } else {
      window.location.href =
        '/suscripcionesdigitales/?_website=gestion&outputType=paywall#step1' // URL LANDING
    }
  }

  render() {
    const { isSubs, isLoad, paywallPrice, paywallDescripcion } = this.state
    return (
      // <ModalConsumer>
      //   {val => (
          <div className="resume__dates">
            {isLoad ? (
              <Loading />
            ) : (
              <>
                <div className="title-dates">
                  <h2 className="title">Mi suscripción</h2>
                  {isSubs && (
                    <button
                      type="button"
                      className="link"
                      onClick={() => {
                        document.getElementById('btn-menu-subscrip').click()
                        // val.changeTemplate('subscrip')
                      }}>
                      EDITAR MÉTODO DE PAGO
                    </button>
                  )}
                </div>

                {isSubs ? (
                  <div className="cont-subs">
                    <div className="first-subs">
                      <p>DETALLE DE LA SUSCRIPCIÓN</p>
                      <h3>Plan Digital</h3>
                    </div>
                    <div className="last-subs">
                      <p>Plan de pago: Mensual</p>
                      <p>Precio: S/ {paywallPrice}*</p>
                      <p className="mini">*{paywallDescripcion}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="cont-subs">
                      <div className="first-subs">
                        <p>Accede a nuestro contenido exclusivo, adquiere tu</p>
                        <h3>Plan Digital</h3>
                      </div>
                      <div className="last-subs">
                        <button
                          className="btn-subs"
                          type="button"
                          onClick={() => this.handlePageChange()}>
                          <h3>SUSCRÍBETE</h3>
                          <span>DESDE S/ 29 MENSUALES</span>
                        </button>
                      </div>
                    </div>
                    <div className="title-dates"></div>
                    <div className="cont-note">
                      <p className="note-subs">
                        *si cuentas con alguna suscripción adquirida por otro
                        canal, por el momento, no podrás visualizarla aquí.
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
      //   )}
      // </ModalConsumer>
    )
  }
}
export default Subs
