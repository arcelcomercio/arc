import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Modal from '../../common/modal'
import { Close } from '../../common/iconos'
import Loading from '../../common/loading'
import Domains from '../../utils/domains'
import addScriptAsync from '../../utils/script-async'
import { WrapperBlock } from './styles'
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
      userSubsDetail: [],
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
        this.getListSubs()
        this.getCampain()
      })
    } else {
      this.getListSubs()
      this.getCampain()
    }
  }

  getListSubs() {
    if (window.Sales) {
      window.Sales.apiOrigin = this.origin_api
      window.Sales.getAllActiveSubscriptions()
        .then(res => {
          let count = 0
          for (let i = 0; i < res.length; i++) {
            if (res[i].paymentMethod) count += 1

            if (res[i].paymentMethod && res[i].subscriptionID) {
              // window.console.log(res[i])
              window.Sales.getSubscriptionDetails(res[i].subscriptionID)
                .then(resDetail => {
                  // window.console.log(resDetail)
                  this.setState({
                    userSubsDetail: resDetail,
                  })
                })
                .catch(window.console.error)
            }
          }

          if (count >= 1) {
            this.setState({
              userSubs: res,
              isSubs: true,
            })
          } else {
            this.setState({
              userSubs: res,
              isSubs: false,
            })
          }

          this.setState({
            isLoad: false,
          })
        })
        .catch(err => window.console.error(err))
    }
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

  handlePageChange = e => {
    e.preventDefault()
    window.location.href = Domains.getUrlPaywall('organico')
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
    window.Sales.apiOrigin = this.origin_api
    window.Sales.cancelSubscription(idSubsDelete, { reason: undefined }).then(
      res => {
        window.console.log(res)
        this.getListSubs()
        this.closeModalConfirm()
        // window.location.reload()
        // const htmlCurrent = document.getElementById(idSubsDelete)
        // if (htmlCurrent) htmlCurrent.remove()
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
      userSubsDetail,
      idSubsDelete,
    } = this.state
    const { arcSite } = this.props
    window.console.log(userSubsDetail)
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
                      <WrapperBlock
                        nopadding
                        nocolumn
                        key={reSubs.subscriptionID}
                        id={reSubs.subscriptionID}>
                        <div className="left">
                          <h3>Mi suscripción</h3>
                          <button
                            type="button"
                            className="link"
                            onClick={() =>
                              this.openModalConfirm(reSubs.subscriptionID)
                            }>
                            ANULAR MI SUSCRIPCIÓN
                          </button>
                        </div>

                        <div className="right">
                          <div className="details-left">
                            <p className="small">DETALLE DE LA SUSCRIPCIÓN</p>
                            <h2>{reSubs.productName}</h2>
                          </div>
                          <div className="details-right">
                            <p>Plan de pago: - </p>
                            <p>Precio: - </p>
                            <p className="small">
                              *POR 6 MESES LUEGO S/ 20 CADA MES
                            </p>
                          </div>
                        </div>
                      </WrapperBlock>
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
                      onClick={e => this.handlePageChange(e)}>
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
