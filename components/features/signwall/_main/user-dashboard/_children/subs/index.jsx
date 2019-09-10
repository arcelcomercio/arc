import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Modal from '../../../common/modal'
import Loading from '../../../common/loading'
import { Close } from '../../../common/iconos'
import Domains from '../../../utils/domains'
import addScriptAsync from '../../../utils/script-async'
import ResumeSubs from '../home/subs'

@Consumer
class MySubs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paywallPrice: '-',
      paywallFrecuency: '-',
      paywallTitle: '-',
      paywallDescripcion: '-',
      featuresDescription: [],
      showModalConfirm: false,
      loading: true,
      isSubs: false,
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
  }

  componentDidMount() {
    if (!window.Sales) {
      addScriptAsync({
        name: 'sdkSalesARC',
        url: Domains.getScriptSales(),
      }).then(() => {
        this.getCampain()
        this.getListSubs()
      })
    } else {
      this.getCampain()
      this.getListSubs()
    }
  }

  getListSubs() {
    if (window.Sales) {
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
      })
    })
  }

  handleSuscription = e => {
    e.preventDefault()
    window.location.href = Domains.getUrlPaywall()
  }

  openModalConfirm = () => {
    this.setState({
      showModalConfirm: true,
    })
    const ModalProfile =
      document.querySelector('#arc-popup-profile').parentNode ||
      document.querySelector('#arc-popup-profile').parentElement
    ModalProfile.style.overflow = 'hidden'

    setTimeout(() => {
      const modalConfirmPass = document.querySelector('#arc-popup-profile')
      modalConfirmPass.scrollIntoView()
    }, 500)
  }

  closeModalConfirm() {
    const { showModalConfirm } = this.state
    this.setState({
      showModalConfirm: !showModalConfirm,
    })

    const ModalProfile =
      document.querySelector('#arc-popup-profile').parentNode ||
      document.querySelector('#arc-popup-profile').parentElement
    if (showModalConfirm) {
      ModalProfile.style.overflow = 'auto'
    } else {
      ModalProfile.style.overflow = 'hidden'
    }
  }

  render() {
    const frecuency = {
      Month: 'al mes',
      Year: 'al año',
    }

    const {
      paywallPrice,
      paywallFrecuency,
      paywallTitle,
      paywallDescripcion,
      featuresDescription,
      loading,
      isSubs,
      showModalConfirm,
    } = this.state

    const { arcSite } = this.props

    return loading ? (
      <Loading site={arcSite} />
    ) : (
      <>
        {isSubs ? (
          <ResumeSubs />
        ) : (
          // <div className="resume__dates">
          //   <div className="cont-subs-large">
          //     <div className="first-subs">
          //       <p>DETALLE DE LA SUSCRIPCIÓN</p>
          //       <h3>Plan Digital</h3>
          //       <br />
          //       <p>Plan de pago: Mensual</p>
          //       <p>Precio: S/{paywallPrice}*</p>
          //       <p className="mini">*{paywallDescripcion}</p>
          //     </div>
          //     <div className="last-subs">
          //       <p>
          //         <strong>Beneficios</strong>
          //       </p>
          //       <ul className="list-benefits mb-20">
          //         {featuresDescription.map(item => {
          //           return <li key={item}>{item}</li>
          //         })}
          //       </ul>
          //     </div>
          //   </div>
          //   <hr />
          //   <div className="cont-link">
          //     <button
          //       type="button"
          //       className="link"
          //       onClick={() => this.openModalConfirm()}>
          //       ANULAR MI SUSCRIPCIÓN
          //     </button>
          //   </div>
          // </div>
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
                      value="VER PLANES"
                      onClick={e => {
                        this.handleSuscription(e)
                      }}></input>
                  </div>

                  <p className="text-center mt-20 text-sm message-paywall">
                    ¿ESTÁS SUSCRITO AL DIARIO IMPRESO? <br />
                    Disfruta <strong>3 meses GRATIS</strong> y luego S/19 al
                    mes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {showModalConfirm && (
          <Modal
            size="small"
            position="middle"
            bg="white"
            name="modal-div-confirmpass"
            id="modal-div-confirmpass">
            <div className="text-right">
              <button type="button" className="link-close" onClick={e => this.closeModalConfirm(e)}>
                <Close />
              </button>
            </div>

            <div className="modal-body__wrapper">
              <form
                className="form-grid"
                onSubmit={e => this.submitConfirmPassword(e)}>
                <div className="row-grid">
                  <h2 className="form-grid__label--title text-center">
                    ¿Estás seguro que deseas anular tu suscripción a
                    www.gestion.pe?
                  </h2>
                  <p className="form-grid__label form-grid__label--information text-center">
                    Ten en cuenta que tu suscripción se desactivará al finalizar
                    tu periodo de facturación.
                  </p>
                </div>
                <div className="row-grid">
                  <div className="form-group form-froup-confirm">
                    <input
                      type="button"
                      className="btn btn--blue btn-bg"
                      value="NO"
                    />
                    <input
                      type="button"
                      className="btn input-button"
                      value="SI"
                    />
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        )} */}
      </>
    )
  }
}
export default MySubs
