import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import * as S from './styles'
import { Button, Table, Wrapper } from '../../../_styles/common'
import { Notice, Cvv, Close } from '../../common/iconos'
import Domains from '../../utils/domains'
import Loading from '../../common/loading'
import Modal from '../../common/modal'
import addPayU from '../../utils/payu'
import { PayuError } from '../../utils/payu-error'
import Services from '../../utils/services'

const services = new Services()

@Consumer
class SubDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resDetail: {},
      isLoading: true,
      showModalConfirm: false,
      idSubsDelete: null,
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
  }

  componentDidMount() {
    const { IdSubscription } = this.props
    window.Sales.apiOrigin = this.origin_api
    window.Sales.getSubscriptionDetails(IdSubscription).then(resDetail => {
      this.setState({
        resDetail,
        isLoading: false,
      })
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
      () => {
        this.setState({
          isLoading: true,
        })
        this.closeModalConfirm()
        window.document.getElementById('btn-mis-suscripciones').click()
      }
    )
  }

  showUpdatePayment() {
    const { ShowUpdateCard } = this.state
    this.setState({
      ShowUpdateCard: !ShowUpdateCard,
    })
  }

  submitUpdateCard() {
    window.Sales.apiOrigin = this.origin_api
    window.Sales.getPaymentOptions().then(res => {
      window.console.log(res)

      services
        .initPaymentUpdate(
          '2801',
          '1246',
          'gestion',
          window.Identity.userIdentity.accessToken
        )
        .then(resUpdate => {
          window.console.log(resUpdate)

          const {
            parameter1: publicKey,
            parameter2: accountId,
            parameter3: payuBaseUrl,
            parameter4: deviceSessionId,
          } = resUpdate

          return addPayU('gestion', deviceSessionId)
            .then(payU => {
              payU.setURL(payuBaseUrl)
              payU.setPublicKey(publicKey)
              payU.setAccountID(accountId)
              payU.setListBoxID('mylistID')
              payU.getPaymentMethods()
              payU.setLanguage('es')
              payU.setCardDetails({
                number: '4111111111111111',
                name_card: 'jorge duenas',
                payer_id: '45503790',
                exp_month: '12',
                exp_year: '2020',
                method: 'VISA',
                document: '45503790',
                cvv: '123',
              })
              return new Promise((resolve, reject) => {
                payU.createToken(response => {
                  if (response.error) {
                    reject(new PayuError(response.error))
                  } else {
                    resolve(response.token)
                  }
                })
              })
            })
            .then(token => {
              window.console.log(token)
              return token
            })
            .then(token => {
              // const { paymentMethodID, paymentMethodType } = payUPaymentMethod
              // const sandboxToken = `${token}~${deviceSessionId}~${cvv}`
              window.console.log(token)
            })
        })
    })
  }

  render() {
    const {
      ShowUpdateCard,
      isLoading,
      resDetail,
      showModalConfirm,
      idSubsDelete,
    } = this.state

    const { arcSite } = this.props

    return (
      <Wrapper>
        {isLoading ? (
          <Loading site={arcSite} />
        ) : (
          <S.WrapperBlock>
            <S.Subsdetail nopadding nocolumn>
              <div className="details-left">
                <small>DETALLE DE LA SUSCRIPCIÓN</small>
                <h2>{resDetail.productName}</h2>
                <p>
                  <strong>Plan Pago: </strong>
                  {(new Date(resDetail.paymentHistory[0].periodTo) -
                    new Date(resDetail.paymentHistory[0].periodFrom)) /
                    (1000 * 60 * 60 * 24) <=
                  31
                    ? 'Mensual'
                    : 'Anual'}
                </p>
                <p>
                  <strong>Precio: </strong> S/ {resDetail.salesOrders[0].total}{' '}
                  *
                </p>
                <small>*POR 6 MESES LUEGO S/ 20 CADA MES</small>
              </div>

              <div className="details-right">
                <p>
                  <strong>BENEFICIOS</strong>
                </p>
                <ul>
                  <li>
                    Contenido Premium: análisis e informes exclusivamente
                    desarrollados para {arcSite}.pe.
                  </li>
                  <li>Navegación ilimitada desde todos tus dispositivos.</li>
                </ul>
              </div>
            </S.Subsdetail>

            <S.Fieldset>
              <legend>Método de pago</legend>

              <div className="left">
                {resDetail.currentPaymentMethod.creditCardType} que termina en
                <strong> {resDetail.currentPaymentMethod.lastFour} </strong>
              </div>
              <div className="right">
                <Button type="button" onClick={() => this.showUpdatePayment()}>
                  EDITAR
                </Button>
              </div>
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
                  <Button type="button" onClick={this.submitUpdateCard()}>
                    ACTUALIZAR
                  </Button>
                </S.Block>
              </S.Fieldset>
            )}

            <S.Block ar bt>
              <Button
                type="button"
                link
                onClick={() => this.openModalConfirm(resDetail.subscriptionID)}>
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
                <tbody>
                  {resDetail.paymentHistory.map(reSubs => {
                    return (
                      <tr key={reSubs.sku}>
                        <td>
                          <strong>Armando Beraun</strong>
                          <p>DNI: 45503790</p>
                        </td>
                        <td className="center">{resDetail.productName}</td>
                        <td className="center">
                          {(new Date(reSubs.periodTo) -
                            new Date(reSubs.periodFrom)) /
                            (1000 * 60 * 60 * 24) <=
                          31
                            ? 'Mensual'
                            : 'Anual'}
                        </td>
                        <td className="center">{`${new Date(
                          reSubs.transactionDate
                        ).getDate()}/${new Date(
                          reSubs.transactionDate
                        ).getMonth() + 1}/${new Date(
                          reSubs.transactionDate
                        ).getFullYear()}`}</td>
                        <td className="center">
                          <button type="button">Ver</button>
                          <button type="button">Borrar</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
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
                    {`¿Estás seguro que deseas anular tu suscripción a
                        www.${arcSite}.pe?`}
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
      </Wrapper>
    )
  }
}

export default SubDetail
