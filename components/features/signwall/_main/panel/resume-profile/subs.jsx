import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Modal from '../../common/modal'
import { Close } from '../../common/iconos'
import Loading from '../../common/loading'
import Domains from '../../utils/domains'
import addScriptAsync from '../../utils/script-async'
import Taggeo from '../../utils/taggeo'
import { WrapperBlock } from './styles'

@Consumer
class Subs extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      paywallName: '-',
      paywallPrice: '-',
      // paywallDescripcion: '-',
      showModalConfirm: false,
      isSubs: false,
      isLoad: true,
      idSubsDelete: null,
      // userSubs: {},
      userSubsDetail: [],
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
  }

  componentDidMount() {
    this._isMounted = true

    if (this._isMounted) {
      if (!window.Sales) {
        addScriptAsync({
          name: 'sdkSalesARC',
          url: Domains.getScriptSales(),
        }).then(() => {
          this.getListSubs().then(p => {
            setTimeout(() => {
              if (p.length) {
                this.setState({
                  userSubsDetail: p,
                  isSubs: true,
                  isLoad: false,
                })
              } else {
                this.setState({
                  isSubs: false,
                  isLoad: false,
                })
              }
            }, 2000)
          })
          this.getCampain()
        })
      } else {
        this.getListSubs().then(p => {
          setTimeout(() => {
            if (p.length) {
              this.setState({
                userSubsDetail: p,
                isSubs: true,
                isLoad: false,
              })
            } else {
              this.setState({
                isSubs: false,
                isLoad: false,
              })
            }
          }, 2000)
        })
        this.getCampain()
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getDetail(id) {
    window.Sales.apiOrigin = this.origin_api
    return window.Sales.getSubscriptionDetails(id).then(resDetail => {
      return resDetail.salesOrders[0].total || '-'
    })
  }

  getListSubs = () => {
    window.Sales.apiOrigin = this.origin_api

    return window.Sales.getAllActiveSubscriptions()
      .then(res => {
        let count = 0
        const newaray = []
        let p = Promise.resolve()
        for (let i = 0; i < res.length; i++) {
          if (res[i].paymentMethod && res[i].subscriptionID) {
            count += 1
            p = p.then(() => {
              window.Sales.getSubscriptionDetails(res[i].subscriptionID)
                .then(resDetail => {
                  newaray.push(resDetail)
                })
                .catch(window.console.error)
            })
          }
        }

        if (count === 0) {
          this.setState({
            isSubs: false,
          })
        }

        return p.then(() => newaray)
      })
      .catch(err => window.console.error(err))
  }

  getCampain() {
    const { fetched } = this.getContent('paywall-campaing')
    fetched.then(resCam => {
      this.setState({
        paywallName: resCam.name || 'Plan',
        paywallPrice: resCam.plans[0].amount || '-',
        // paywallDescripcion: resCam.plans[0].description.description || '-',
      })
    })
  }

  handlePageChange = e => {
    e.preventDefault()
    window.location.href = Domains.getUrlPaywall()
    window.sessionStorage.setItem('paywall_type_modal', 'organico')
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
    window.Sales.apiOrigin = this.origin_api
    window.Sales.cancelSubscription(idSubsDelete, { reason: undefined }).then(
      () => {
        this.setState({
          isLoad: true,
        })
        this.getListSubs().then(p => {
          setTimeout(() => {
            if (p.length) {
              this.setState({
                userSubsDetail: p,
                isSubs: true,
                isLoad: false,
              })
            } else {
              this.setState({
                isSubs: false,
                isLoad: false,
              })
            }
          }, 2000)
        })
        this.closeModalConfirm()
      }
    )
  }

  render() {
    const {
      // userSubs,
      isSubs,
      isLoad,
      paywallName,
      paywallPrice,
      showModalConfirm,
      // paywallDescripcion,
      userSubsDetail,
      idSubsDelete,
    } = this.state
    const { arcSite } = this.props
    return (
      <>
        {isLoad ? (
          <Loading site={arcSite} />
        ) : (
          <>
            {isSubs ? (
              <>
                {userSubsDetail.map(reSubs => {
                  return (
                    <WrapperBlock
                      nopadding
                      nocolumn
                      key={reSubs.subscriptionID}
                      id={reSubs.subscriptionID}>
                      <div className="left">
                        <h3>Mi suscripción</h3>
                        {reSubs.currentPaymentMethod.paymentPartner ===
                        'PayULATAM' ? (
                          <button
                            type="button"
                            className="link"
                            onClick={() =>
                              this.openModalConfirm(reSubs.subscriptionID)
                            }>
                            ANULAR MI SUSCRIPCIÓN
                          </button>
                        ) : (
                          ''
                        )}
                      </div>

                      <div className="right">
                        <div className="details-left">
                          <p className="small">DETALLE DE LA SUSCRIPCIÓN</p>
                          <h2>{reSubs.productName}</h2>
                        </div>
                        <div className="details-right">
                          <p>
                            <strong>Plan de pago: </strong>{' '}
                            {reSubs.paymentHistory[0] && (
                              <span>
                                {(new Date(reSubs.paymentHistory[0].periodTo) -
                                  new Date(
                                    reSubs.paymentHistory[0].periodFrom
                                  )) /
                                  (1000 * 60 * 60 * 24) ===
                                30
                                  ? 'MENSUAL'
                                  : 'ANUAL'}
                              </span>
                            )}
                          </p>
                          <p>
                            <strong>Precio: </strong>{' '}
                            {reSubs.salesOrders[0] && (
                              <span>
                                {reSubs.salesOrders[0].total !== 0
                                  ? ` S/ ${reSubs.salesOrders[0].total}`
                                  : 'GRATIS'}
                              </span>
                            )}
                          </p>
                          {/* <p className="small">
                              *POR 6 MESES LUEGO S/ 20 CADA MES
                            </p> */}
                        </div>
                      </div>
                    </WrapperBlock>
                  )
                })}
              </>
            ) : (
              <>
                {arcSite === 'gestion' && (
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
                          onClick={e => {
                            Taggeo(
                              `Web_Paywall_Perfil`,
                              `web_paywall_boton_suscribirme`
                            )
                            this.handlePageChange(e)
                          }}>
                          <h3>SUSCRÍBETE</h3>
                          <span>DESDE S/ {paywallPrice} MENSUALES</span>
                          {/* <span>{paywallDescripcion}</span> */}
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
                  </div>
                )}
              </>
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
                    className="form-grid form-group-confirm"
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
    )
  }
}
export default Subs
