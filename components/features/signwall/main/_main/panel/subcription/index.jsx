import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Loading from '../../common/loading'
import Domains from '../../utils/domains'
import addScriptAsync from '../../utils/script-async'
import Subs from '../resume-profile/subs'
import { Wrapper } from '../../../_styles/common'
import Taggeo from '../../utils/taggeo'
import { ModalConsumer } from '../../signwall/context'

@Consumer
class Subscription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paywallName: '-',
      paywallPrice: '-',
      paywallFrecuency: '-',
      paywallTitle: '-',
      paywallDescripcion: '-',
      featuresDescription: [],
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
    if (window.Sales && window.Identity) {
      window.Identity.options({ apiOrigin: this.origin_api })
      window.Identity.extendSession().then(() => {
        window.Sales.options({ apiOrigin: this.origin_api })
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
      })
    }
  }

  getCampain() {
    const { fetched } = this.getContent('paywall-campaing')
    fetched.then(resCam => {
      this.setState({
        paywallName: resCam.name || '-',
        paywallPrice: resCam.plans[0].amount || '-',
        paywallFrecuency: resCam.plans[0].billingFrequency || '-',
        paywallTitle: resCam.plans[0].description.title || '-',
        paywallDescripcion: resCam.plans[0].description.description || '-',
        featuresDescription: resCam.summary.feature || [],
      })
    })
  }

  handleSuscription = e => {
    const { arcSite } = this.props
    e.preventDefault()
    window.location.href = Domains.getUrlPaywall(arcSite)
    window.sessionStorage.setItem('paywall_type_modal', 'organico')
    window.sessionStorage.setItem('paywall_last_url', '/')
  }

  render() {
    const frecuency = {
      Month: 'al mes',
      Year: 'al año',
    }

    const {
      paywallName,
      paywallPrice,
      paywallFrecuency,
      paywallTitle,
      paywallDescripcion,
      featuresDescription,
      loading,
      isSubs,
    } = this.state

    const { arcSite } = this.props

    return (
      <ModalConsumer>
        {value => (
          <Wrapper>
            {!loading ? (
              <>
                {isSubs ? (
                  <Subs detail={id => value.changeTemplate('detail', id)} />
                ) : (
                  <div className="resume__dates">
                    <div className="cont-plan">
                      <div className="first-plan">
                        <p>
                          Accede ilimitadamente a nuestro contenido, adquiere
                          el:
                        </p>
                        <h3>{paywallName}</h3>
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
                              className="btn btn-bg"
                              value="VER PLANES"
                              onClick={e => {
                                this.handleSuscription(e)
                                Taggeo(
                                  `Web_Paywall_Perfil`,
                                  `web_paywall_boton_suscribirme`
                                )
                              }}></input>
                          </div>

                          <p className="text-center mt-20 text-sm message-paywall">
                            ¿ESTÁS SUSCRITO AL DIARIO IMPRESO? <br />
                            Disfruta
                            <strong>
                              {arcSite === 'elcomercio' ? ' 6 ' : ' 3 '} meses
                              GRATIS{' '}
                            </strong>
                            y luego S/
                            {arcSite === 'elcomercio' ? ' 10 ' : ' 19 '}
                            al mes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Loading site={arcSite} />
            )}
          </Wrapper>
        )}
      </ModalConsumer>
    )
  }
}
export default Subscription
