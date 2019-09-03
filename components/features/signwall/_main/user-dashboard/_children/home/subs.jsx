import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
import Modal from '../../../common/modal'
import { Close } from '../../../common/iconos'
import Loading from '../../../common/loading'
// import { ModalConsumer } from '../../../signwall/context'

@Consumer
class Subs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paywallName: '-',
      paywallPrice: '-',
      paywallDescripcion: '-',
      showModalConfirm: false,
      isSubs: false,
      isLoad: true,
      idSubsDelete: null,
      userSubs: {},
    }

    const { arcSite } = this.props
    if (arcSite !== 'peru21') {
      this.origin_api =
        ENV.ENVIRONMENT === 'elcomercio'
          ? `https://api.${arcSite}.pe`
          : `https://api-sandbox.${arcSite}.pe`
    } else {
      this.origin_api =
        ENV.ENVIRONMENT === 'elcomercio'
          ? `https://api.${arcSite}.pe`
          : `https://api-elcomercio-peru21-sandbox.cdn.arcpublishing.com`
    }
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
            userSubs: res,
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
        paywallName: resCam.name || 'Plan',
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

  notIsSub = () => {
    this.setState({
      isSubs: false,
    })
  }

  openModalConfirm = idSubs => {
    this.setState({
      showModalConfirm: true,
      idSubsDelete: idSubs,
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
      idSubsDelete: null,
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

  deleteSub() {
    const { idSubsDelete } = this.state
    window.console.log(idSubsDelete)
    window.Sales.apiOrigin = this.origin_api
    window.Sales.cancelSubscription(idSubsDelete, { reason: undefined }).then(
      res => {
        window.console.log(res)
        window.location.reload()
      }
    )
  }

  render() {
    const {
      userSubs,
      isSubs,
      isLoad,
      paywallName,
      paywallPrice,
      showModalConfirm,
      paywallDescripcion,
      idSubsDelete,
    } = this.state
    const { arcSite } = this.props
    return (
      // <ModalConsumer>
      //   {val => (
      <>
        {isLoad ? (
          <Loading site={arcSite} />
        ) : (
          <>
            {isSubs ? (
              <>
                {userSubs.map(reSubs => {
                  if (reSubs.paymentMethod) {
                    return (
                      <div
                        className="resume__dates"
                        key={reSubs.subscriptionID}>
                        <div className="title-dates">
                          <h2 className="title">Mi suscripción</h2>
                          {/* <button
                            type="button"
                            className="link"
                            id={reSubs.subscriptionID}
                            onClick={() => {
                              document.getElementById('btn-menu-subscrip').click()
                            }}>
                            EDITAR MÉTODO DE PAGO
                          </button> */}
                          <button
                            type="button"
                            className="link"
                            id={reSubs.subscriptionID}
                            onClick={() =>
                              this.openModalConfirm(reSubs.subscriptionID)
                            }>
                            ANULAR MI SUSCRIPCIÓN
                          </button>
                        </div>

                        <div className="cont-subs">
                          <div className="first-subs">
                            <p>DETALLE DE LA SUSCRIPCIÓN</p>
                            <h3>{reSubs.productName}</h3>
                          </div>
                          <div className="last-subs">
                            <p>Plan de pago: Mensual</p>
                            {/* <p>Precio: S/ {paywallPrice}*</p>
                            <p className="mini">*{paywallDescripcion}</p> */}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </>
            ) : (
              <div className="resume__dates">
                <div className="title-dates">
                  <h2 className="title">Mi suscripción</h2>
                </div>
                <div className="cont-subs">
                  <div className="first-subs">
                    <p>Accede a nuestro contenido exclusivo, adquiere tu</p>
                    <h3>{paywallName}</h3>
                  </div>
                  <div className="last-subs">
                    <button
                      className="btn-subs"
                      type="button"
                      onClick={() => this.handlePageChange()}>
                      <h3>SUSCRÍBETE</h3>
                      <span>DESDE S/ {paywallPrice} MENSUALES</span>
                      {/* <span>{paywallDescripcion}</span> */}
                    </button>
                  </div>
                </div>
                <div className="title-dates"></div>
                <div className="cont-note">
                  <p className="note-subs">
                    *si cuentas con alguna suscripción adquirida por otro canal,
                    por el momento, no podrás visualizarla aquí.
                  </p>
                </div>
              </div>
            )}

            {showModalConfirm && (
              <Modal
                size="small"
                position="middle"
                bg="white"
                name="modal-div-confirmpass"
                id="modal-div-confirmpass">
                <div className="text-right">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={e => this.closeModalConfirm(e)}>
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
                        Ten en cuenta que tu suscripción se desactivará al
                        finalizar tu periodo de facturación.
                      </p>
                    </div>
                    <div className="row-grid">
                      <div className="form-group form-froup-confirm">
                        <input
                          type="button"
                          className="btn btn--blue btn-bg"
                          onClick={e => this.closeModalConfirm(e)}
                          value="NO"
                        />
                        <input
                          type="button"
                          className="btn input-button"
                          onClick={() => this.deleteSub(idSubsDelete)}
                          value="SI"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </Modal>
            )}
          </>
        )}
      </>
      //   )}
      // </ModalConsumer>
    )
  }
}
export default Subs
