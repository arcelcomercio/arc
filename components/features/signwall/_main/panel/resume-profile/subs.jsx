import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
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
      isSubs: false,
      isLoad: true,
      userSubsDetail: [],
      listBundle: Domains.getListBundle() || [],
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
  }

  componentDidMount() {
    this._isMounted = true
    window.Identity.apiOrigin = this.origin_api

    if (!window.Sales) {
      addScriptAsync({
        name: 'sdkSalesARC',
        url: Domains.getScriptSales(),
      }).then(() => {
        this.getListSubs().then(p => {
          setTimeout(() => {
            if (p.length && this._isMounted) {
              this.setState({
                userSubsDetail: p,
                isSubs: true,
                isLoad: false,
              })
            } else if (this._isMounted) {
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
          if (p.length && this._isMounted) {
            this.setState({
              userSubsDetail: p,
              isSubs: true,
              isLoad: false,
            })
          } else if (this._isMounted) {
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

  componentWillUnmount() {
    this._isMounted = false
  }

  getListSubs = () => {
    this._isMounted = true

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

        if (count === 0 && this._isMounted) {
          this.setState({
            isSubs: false,
          })
        }

        return p.then(() => newaray)
      })
      .catch(err => window.console.error(err))
  }

  getCampain() {
    this._isMounted = true
    const { fetched } = this.getContent('paywall-campaing')

    fetched.then(resCam => {
      if (this._isMounted && typeof resCam === 'object') {
        this.setState({
          paywallName: resCam.name || 'Plan',
          paywallPrice: resCam.plans[0].amount || '-',
          // paywallDescripcion: resCam.plans[0].description.description || '-',
        })
      }
    })
  }

  handlePageChange = e => {
    const { arcSite } = this.props
    e.preventDefault()
    window.location.href = Domains.getUrlPaywall(arcSite)
    window.sessionStorage.setItem('paywall_type_modal', 'organico')
    window.sessionStorage.setItem('paywall_last_url', '/')
  }

  render() {
    const {
      isSubs,
      isLoad,
      paywallName,
      paywallPrice,
      userSubsDetail,
      listBundle,
    } = this.state
    const { arcSite, detail } = this.props
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
                            onClick={() => {
                              detail(reSubs.subscriptionID)
                            }}>
                            EDITAR MÉTODO DE PAGO
                          </button>
                        ) : null}
                      </div>

                      <div className="right">
                        <div className="details-left">
                          <p className="small">DETALLE DE LA SUSCRIPCIÓN</p>
                          <h2>{reSubs.productName}</h2>
                        </div>
                        <div className="details-right">
                          {listBundle.includes(reSubs.priceCode) ? (
                            <p>
                              ¡Hola! Encuentra todos los detalles de tu
                              suscripción DIGITAL + IMPRESA en:{' '}
                              <a
                                className="link"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://suscripciones.${arcSite}.pe/suscripciones/?ref=SignWallProfile`}>
                                Suscripciones Online
                              </a>
                            </p>
                          ) : (
                            <>
                              <p>
                                <strong>Plan de pago: </strong>{' '}
                                {reSubs.paymentHistory[0] && (
                                  <span>
                                    {(new Date(
                                      reSubs.paymentHistory[0].periodTo
                                    ) -
                                      new Date(
                                        reSubs.paymentHistory[0].periodFrom
                                      )) /
                                      (1000 * 60 * 60 * 24) <=
                                    31
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
                            </>
                          )}
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
                {arcSite === 'gestion' || arcSite === 'elcomercio' ? (
                  <div className="resume__dates">
                    <div className="title-dates">
                      <h2 className="title">Mi suscripción</h2>
                    </div>
                    <div className="cont-subs">
                      <div className="first-subs">
                        <p>
                          Accede ilimitadamente a nuestro contenido, adquiere
                          el:
                        </p>
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
                ) : null}
              </>
            )}
          </>
        )}
      </>
    )
  }
}
export default Subs
