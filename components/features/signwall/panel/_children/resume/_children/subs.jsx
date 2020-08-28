import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Loading from '../../../../_children/loading'
import Domains from '../../../../_dependencies/domains'
import addScriptAsync from '../../../../_dependencies/script-async'
import Taggeo from '../../../../_dependencies/taggeo'
import { WrapperBlock } from '../styles'
import { ResumeDates, Title } from '../../../styled'

@Consumer
class Subs extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      paywallName: '-',
      paywallPrice: '-',
      paywallTitle: '-',
      paywallDesc: '-',
      isSubs: false,
      isLoad: true,
      userSubsDetail: [],
      showFree: false,
      listBundle: Domains.getListBundle() || [],
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
  }

  componentDidMount() {
    this._isMounted = true
    if (typeof window !== 'undefined') {
      window.Identity.options({ apiOrigin: this.origin_api })
      window.Identity.extendSession().then(() => {
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
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getListSubs = () => {
    this._isMounted = true
    if (typeof window !== 'undefined') {
      window.Sales.options({ apiOrigin: this.origin_api })
      return window.Sales.getAllActiveSubscriptions()
        .then(res => {
          let count = 0
          const newaray = []
          let p = Promise.resolve()
          for (let i = 0; i < res.length; i++) {
            if (res[i].subscriptionID) {
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
    return null
  }

  getCampain() {
    this._isMounted = true
    const { fetched } = this.getContent('paywall-campaing')

    fetched.then(resCam => {
      if (this._isMounted && typeof resCam === 'object') {
        const getPLanSelected = resCam.plans.reduce((prev, plan) => {
          return plan.description.checked ? plan : prev
        }, {})

        this.setState({
          paywallName: resCam.name || 'Plan',
          paywallPrice: getPLanSelected.amount || '-',
          showFree: getPLanSelected.amount === 0 || '-',
          paywallTitle:
            (getPLanSelected.description &&
              getPLanSelected.description.title) ||
            '-',
          paywallDesc:
            (getPLanSelected.description &&
              getPLanSelected.description.description) ||
            '-',
        })
      }
    })
  }

  handlePageChange = e => {
    const { arcSite } = this.props
    e.preventDefault()
    if (typeof window !== 'undefined') {
      window.location.href = Domains.getUrlPaywall(arcSite)
      window.sessionStorage.setItem('paywall_type_modal', 'organico')
      window.sessionStorage.setItem('paywall_last_url', '/')
    }
  }

  render() {
    const {
      isSubs,
      isLoad,
      paywallName,
      paywallPrice,
      paywallTitle,
      paywallDesc,
      userSubsDetail,
      listBundle,
      showFree,
    } = this.state
    const {
      arcSite,
      detail,
      siteProperties: {
        signwall: { primaryFont },
      },
    } = this.props
    return (
      <>
        {isLoad ? (
          <Loading arcSite={arcSite} typeBg="wait" />
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
                        <h3>Mi Suscripción</h3>
                        {reSubs.currentPaymentMethod.paymentPartner ===
                          'PayULATAM' && reSubs.status !== 3 ? (
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
                        <div className="details">
                          <div className="details-left">
                            <p className="small">DETALLE DE LA SUSCRIPCIÓN</p>
                            <h2 className="subtitle">{reSubs.productName}</h2>
                            <p className="small">
                              Estado:
                              {reSubs.status === 3 ? (
                                <strong className="orange"> ANULADO</strong>
                              ) : (
                                <strong className="green"> ACTIVO</strong>
                              )}
                            </p>
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
                      </div>
                    </WrapperBlock>
                  )
                })}
              </>
            ) : (
              <>
                {(arcSite === 'gestion' || arcSite === 'elcomercio') && (
                  <ResumeDates>
                    <div className="title-dates">
                      <h2 className="title">Mi suscripción</h2>
                    </div>
                    <div className="cont-subs">
                      <div className="first-subs">
                        <p>
                          Accede ilimitadamente a nuestro contenido, adquiere
                          el:
                        </p>
                        <Title s="30" f={primaryFont}>
                          {paywallName}
                        </Title>
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
                          <h3>SUSCRÍBETE {showFree && 'GRATIS'}</h3>
                          {showFree ? (
                            <>
                              <span> {paywallTitle} </span>
                              <br />
                              <span> {paywallDesc} </span>
                            </>
                          ) : (
                            <>
                              <span>DESDE S/ {paywallPrice} MENSUALES</span>
                              <br />
                              <span>
                                {paywallTitle}. {paywallDesc}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="title-dates"></div>
                    <div className="cont-note">
                      <p className="note-subs">
                        *Si cuentas con alguna suscripción adquirida por otro
                        canal, por el momento, no podrás visualizarla aquí.
                      </p>
                    </div>
                  </ResumeDates>
                )}
              </>
            )}
          </>
        )}
      </>
    )
  }
}
export default Subs
