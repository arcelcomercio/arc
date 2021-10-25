import Sales from '@arc-publishing/sdk-sales'
import Consumer from 'fusion:consumer'
import * as React from 'react'

import {
  SITE_ELCOMERCIO,
  SITE_GESTION,
} from '../../../../../../utilities/constants/sitenames'
import { extendSession } from '../../../../../../utilities/subscriptions/identity'
import Loading from '../../../../../signwall/_children/loading'
import {
  getListBundle,
  getOriginAPI,
  getUrlPaywall,
} from '../../../../../signwall/_dependencies/domains'
import { Taggeo } from '../../../../_dependencies/Taggeo'

@Consumer
class Subs extends React.Component {
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
      listBundle: getListBundle || [],
    }

    const { arcSite } = this.props
    this.origin_api = getOriginAPI(arcSite)
  }

  componentDidMount() {
    this._isMounted = true
    extendSession().then(() => {
      this.checkSubscriptions()
      this.getCampain()
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getListSubs = () => {
    this._isMounted = true
    return Sales.getAllActiveSubscriptions()
      .then((res) => {
        let count = 0
        const newaray = []
        let p = Promise.resolve()
        for (let i = 0; i < res.length; i++) {
          if (res[i].subscriptionID) {
            count += 1
            p = p.then(() => {
              Sales.getSubscriptionDetails(res[i].subscriptionID)
                .then((resDetail) => {
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
      .catch((err) => window.console.error(err))
  }

  getCampain() {
    this._isMounted = true
    const { fetched } = this.getContent('paywall-campaing')

    fetched.then((resCam) => {
      if (this._isMounted && typeof resCam === 'object') {
        const selectedPlan = resCam.plans.find(
          (plan) => plan.description.checked
        )

        const { amount, description } = selectedPlan || {}

        this.setState({
          paywallName: resCam.name || 'Plan',
          paywallPrice: amount || '-',
          paywallTitle: description?.title || '-',
          paywallDesc: description?.description || '-',
        })
      }
    })
  }

  handlePageChange = (e) => {
    const { arcSite } = this.props
    e.preventDefault()
    if (typeof window !== 'undefined') {
      window.location.href = getUrlPaywall(arcSite)
      window.sessionStorage.setItem('paywall_type_modal', 'organico')
      window.sessionStorage.setItem('paywall_last_url', '/')
    }
  }

  namePeriod = (dataPeriod) => {
    if (dataPeriod) {
      const daysPeriod =
        (new Date(dataPeriod.periodTo) - new Date(dataPeriod.periodFrom)) /
        (1000 * 60 * 60 * 24)
      switch (true) {
        case daysPeriod >= 88 && daysPeriod <= 93:
          return 'TRIMESTRAL'
        case daysPeriod >= 178 && daysPeriod <= 186:
          return 'SEMESTRAL'
        case daysPeriod >= 358 && daysPeriod <= 372:
          return 'ANUAL'
        default:
          return 'MENSUAL'
      }
    }
    return '-'
  }

  checkSubscriptions() {
    this.getListSubs().then((p) => {
      setTimeout(() => {
        if (p?.length && this._isMounted) {
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
          <Loading typeBg="block" />
        ) : (
          <>
            {isSubs ? (
              <>
                {userSubsDetail.map((reSubs) => (
                  <div
                    className="sign-profile_resume"
                    style={{ padding: '0px' }}
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
                                <span>
                                  {this.namePeriod(reSubs.paymentHistory[0])}
                                </span>
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {(arcSite === SITE_GESTION || arcSite === SITE_ELCOMERCIO) && (
                  <div className="sign-profile_general-resume-dates">
                    <div className="title-dates">
                      <h2 className="title">Mi suscripción</h2>
                    </div>
                    <div className="cont-subs">
                      <div className="first-subs">
                        <p>
                          Accede ilimitadamente a nuestro contenido, adquiere
                          el:
                        </p>
                        <h3
                          className="sign-profile_general-title"
                          style={{ fontSize: '30px', fontFamily: primaryFont }}>
                          {paywallName}
                        </h3>
                      </div>
                      <div className="last-subs">
                        <button
                          className="btn-subs"
                          type="button"
                          onClick={(e) => {
                            Taggeo(
                              `Web_Paywall_Perfil`,
                              `web_paywall_boton_suscribirme`
                            )
                            this.handlePageChange(e)
                          }}>
                          <h3>
                            SUSCRÍBETE {paywallPrice === 0 ? 'GRATIS' : ''}
                          </h3>
                          {paywallPrice === 0 ? (
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
                    <div className="title-dates" />
                    <div className="cont-note">
                      <p className="note-subs">
                        *Si cuentas con alguna suscripción adquirida por otro
                        canal, por el momento, no podrás visualizarla aquí.
                      </p>
                    </div>
                  </div>
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
