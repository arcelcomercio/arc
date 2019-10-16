import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import * as S from './styles'
import { Button, Table, Wrapper } from '../../../_styles/common'
import { Notice, Cvv } from '../../common/iconos'
import Domains from '../../utils/domains'
import Loading from '../../common/loading'

@Consumer
class SubDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ShowUpdateCard: false,
      paymentHistory: [],
      currentPaymentMethod: [],
      loading: false,
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
  }

  componentDidMount() {
    const { idSubs } = this.props
    window.Sales.apiOrigin = this.origin_api
    window.Sales.getSubscriptionDetails(idSubs).then(resDetail => {
      // window.console.log(resDetail)
      setTimeout(() => {
        this.setState({
          paymentHistory: resDetail.paymentHistory,
          currentPaymentMethod: resDetail.currentPaymentMethod,
          loading: false,
        })
      }, 2000)
    })
  }

  showUpdatePayment() {
    const { ShowUpdateCard } = this.state
    this.setState({
      ShowUpdateCard: !ShowUpdateCard,
    })
  }

  render() {
    const {
      ShowUpdateCard,
      paymentHistory,
      currentPaymentMethod,
      loading,
    } = this.state
    const { arcSite } = this.props

    console.log(currentPaymentMethod)

    return (
      <Wrapper>
        {!loading ? (
          <S.WrapperBlock>
            <S.Subsdetail nopadding nocolumn>
              <div className="details-left">
                <small>DETALLE DE LA SUSCRIPCIÓN</small>
                <h2>DIGITAL</h2>
                <p>Plan Pago: Mensual</p>
                <p>Precio: S/ 50*</p>
                <small>*POR 6 MESES LUEGO S/ 20 CADA MES</small>
              </div>

              <div className="details-right">
                <p>
                  <strong>BENEFICIOS</strong>
                </p>
                <ul>
                  <li>
                    Contenido Premium: análisis e informes exclusivamente
                    desarrollados para gestion.pe.
                  </li>
                  <li>Navegación ilimitada desde todos tus dispositivos.</li>
                </ul>
              </div>
            </S.Subsdetail>

            <S.Fieldset>
              <legend>Método de pago</legend>

              {/* {currentPaymentMethod.map(resPay => {
                return (
                  <>
                    <div className="left">
                      {resPay.creditCardType} que termina en
                      <strong>{resPay.lastFour}</strong>
                    </div>
                    <div className="right">
                      <Button
                        type="button"
                        onClick={() => this.showUpdatePayment()}>
                        EDITAR
                      </Button>
                    </div>
                  </>
                )
              })} */}
            </S.Fieldset>

            {ShowUpdateCard && (
              <S.Fieldset>
                <legend>Datos de la tarjeta</legend>
                <S.Group>
                  <S.Input type="text" placeholder="Número de tarjeta" />
                  <S.Input type="text" placeholder="F. de Vencimiento" />
                  <S.Input type="text" placeholder="CVV" />
                  <S.Msgcvv>
                    <Cvv />
                    <small>Se encuentra en el reverso de su tarjeta*</small>
                  </S.Msgcvv>
                </S.Group>
                <S.Block ar pt="10">
                  <Button type="button">ACTUALIZAR</Button>
                </S.Block>
              </S.Fieldset>
            )}

            <S.Block ar bt>
              <Button type="button" link>
                ANULAR MI SUSCRIPCIÓN
              </Button>
            </S.Block>

            <S.Fieldset>
              <legend>Historial del pago</legend>
              <Table>
                <thead>
                  <tr>
                    <th className="left">Suscriptor</th>
                    <th>Producto</th>
                    <th>Plan</th>
                    <th>Renovación</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {paymentHistory.map(reSubs => {
                    return (
                      <tr>
                        <td>
                          <strong>Armando Beraun</strong>
                          <p>DNI: 45503790</p>
                        </td>
                        <td>{reSubs.productName}</td>
                        <td className="center">{reSubs.priceCode}</td>
                        <td className="center">{reSubs.transactionDate}</td>
                        <td className="center">
                          <button type="button">Ver</button>
                          <button type="button">Borrar</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody> */}
              </Table>
            </S.Fieldset>

            <S.Notice>
              <Notice />
              <div>
                <strong>
                  Para cualquier gestión o consulta sobre tu suscripción
                </strong>
                <p>
                  Contactanos al 01 311-5100 o suscriptores@diariogestion.com.pe
                </p>
              </div>
            </S.Notice>
          </S.WrapperBlock>
        ) : (
          <Loading site={arcSite} />
        )}
      </Wrapper>
    )
  }
}

export default SubDetail
