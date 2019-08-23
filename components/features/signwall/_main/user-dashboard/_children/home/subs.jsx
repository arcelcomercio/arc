import React, { Component } from 'react'
import Services from '../../../utils/services'

const services = new Services()

class Subs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubs: false,
    }
  }

  componentDidMount() {
    this.getListSubs().then(p => {
      if (p.length > 0) {
        this.setState({
          isSubs: true,
        })
      }
    })
  }

  getListSubs() {
    return services
      .getEntitlement(window.Identity.userIdentity.accessToken)
      .then(res => {
        if (res.skus) {
          const result = Object.keys(res.skus).map(key => {
            return res.skus[key].sku
          })
          this.listSubs = result
          return result
        }
        return []
      })
      .catch(err => window.console.error(err))
  }

  render() {
    const { isSubs } = this.state
    return (
      <div className="resume__dates">
        <div className="title-dates">
          <h2 className="title">Mi suscripción</h2>
          {isSubs && (
            <button className="link" type="button">
              EDITAR MÉTODO DE PAGO
            </button>
          )}
        </div>

        {isSubs ? (
          <div className="cont-subs">
            <div className="first-subs">
              <p>DETALLE DE LA SUSCRIPCIÓN</p>
              <h3>Digital</h3>
            </div>
            <div className="last-subs">
              <p>Plan de pago: Mensual</p>
              <p>Precio: S/ 50.00*</p>
              <p className="mini">*POR 6 MESES LUEGO S/ 20 CADA MES</p>
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
                <button className="btn-subs" type="button">
                  <h3>SUSCRÍBETE</h3>
                  <span>DESDE S/ 29 MENSUALES</span>
                </button>
              </div>
            </div>
            <div className="title-dates" />
            <div className="cont-note">
              <p className="note-subs">
                *si cuentas con alguna suscripción adquirida por otro canal, por
                el momento, no podrás visualizarla aquí.
              </p>
            </div>
          </>
        )}
      </div>
    )
  }
}
export default Subs
