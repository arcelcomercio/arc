/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import ENV from 'fusion:environment'
import * as S from './styles'
import { Button, Table, Wrapper } from '../../../_styles/common'
import { Notice, Cvv, Close } from '../../common/iconos'
import Domains from '../../utils/domains'
import Loading from '../../common/loading'
import Modal from '../../common/modal'
import addPayU from '../../utils/payu'
import { PayuError } from '../../utils/payu-error'
import Services from '../../utils/services'
import Radiobox from './Radiobox'

const services = new Services()

const Cards = [
  {
    name: 'VISA',
    image:
      'data:image/png;base64,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',
  },
  {
    name: 'MASTERCARD',
    image:
      'data:image/png;base64,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',
  },
  {
    name: 'DINERS',
    image:
      'data:image/png;base64,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',
  },
  {
    name: 'AMEX',
    image:
      'data:image/png;base64,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',
  },
]
@Consumer
class SubDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checksNews: {},
      resDetail: {},
      isLoading: true,
      showModalConfirm: false,
      idSubsDelete: null,
      numcard: null,
      dateexpire: null,
      codecvv: null,
      formErrors: {
        numcard: '',
        dateexpire: '',
        codecvv: '',
      },
      // eslint-disable-next-line react/no-unused-state
      fullName: JSON.parse(window.localStorage.getItem('ArcId.USER_PROFILE')),
      selectedOption: 'VISA',
      showMessageSuccess: false,
      showMessageFailed: false,
      statusButton: 'ACTUALIZAR',
      disabledButton: false,
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

  handleChangeValidation = e => {
    // window.console.log('validation', e)
    const { name, value } = e.target
    const { formErrors } = this.state

    switch (name) {
      case 'numcard':
        if (value.length === 0) {
          formErrors.usernamereg = 'Este campo es requerido'
        } else if (value.length < 19) {
          formErrors.passwordreg = 'Mínimo 16 caracteres'
        } else {
          formErrors.usernamereg = ''
        }
        break
      case 'dateexpire':
        if (value.length === 0) {
          formErrors.passwordreg = 'Este campo es requerido'
        } else if (value.length < 7) {
          formErrors.passwordreg = 'Fecha inválida'
        } else {
          formErrors.passwordreg = ''
        }
        break
      case 'codecvv':
        if (value.length === 0) {
          formErrors.passwordreg = 'Este campo es requerido'
        } else if (value.length < 4) {
          formErrors.passwordreg = 'Cvv Inválido'
        } else {
          formErrors.passwordreg = ''
        }
        break
      default:
        return null
    }
    this.setState({ formErrors, [name]: value })
  }

  handleCheckbox(e, name) {
    // window.console.log(e, name)
    // const newState = { ...this.state }
    // newState.checksNews[name] = e.target.checked
    // this.setState(newState)
    this.setState({
      selectedOption: name,
    })
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

  submitUpdateCard(userDNI, subsID) {
    const {
      numcard,
      dateexpire,
      codecvv,
      selectedOption,
      fullName,
    } = this.state

    this.setState({
      disabledButton: true,
      statusButton: 'ACTUALIZANDO...',
    })

    const { arcSite } = this.props

    window.Sales.apiOrigin = this.origin_api
    window.Sales.getPaymentOptions().then(res => {
      const providerID = res[0].paymentMethodID // 1246

      services
        .initPaymentUpdate(
          subsID,
          providerID,
          arcSite,
          window.Identity.userIdentity.accessToken
        )
        .then(resUpdate => {
          const {
            parameter1: publicKey,
            parameter2: accountId,
            parameter3: payuBaseUrl,
            parameter4: deviceSessionId,
          } = resUpdate

          return addPayU(arcSite, deviceSessionId)
            .then(payU => {
              payU.setURL(payuBaseUrl)
              payU.setPublicKey(publicKey)
              payU.setAccountID(accountId)
              payU.setListBoxID('mylistID')
              payU.getPaymentMethods()
              payU.setLanguage('es')
              payU.setCardDetails({
                number: numcard.replace(/\s/g, ''),
                name_card:
                  ENV.ENVIRONMENT === 'elcomercio'
                    ? `${fullName.firstName || 'Usuario'} ${fullName.lastName ||
                        'Usuario'}`
                    : 'APPROVED',
                payer_id: userDNI.split('_')[1],
                exp_month: dateexpire.split('/')[0],
                exp_year: dateexpire.split('/')[1],
                method: selectedOption,
                document: userDNI.split('_')[1],
                cvv: codecvv,
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
              services
                .finalizePaymentUpdate(
                  subsID,
                  providerID,
                  arcSite,
                  window.Identity.userIdentity.accessToken,
                  `${token}~${deviceSessionId}~${codecvv}`
                )
                .then(resFin => {
                  if (resFin.code === '300123,300124') {
                    this.setState({
                      showMessageFailed: true,
                      disabledButton: false,
                      statusButton: 'ACTUALIZAR'
                    })
                  } else {
                    this.setState({
                      showMessageSuccess: true,
                      disabledButton: false,
                      statusButton: 'ACTUALIZAR'
                    })
                  }
                })
                .catch(() => {
                  this.setState({
                    showMessageFailed: true,
                    disabledButton: false,
                    statusButton: 'ACTUALIZAR'
                  })
                })
            })
        })
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
      isLoading,
      resDetail,
      showModalConfirm,
      idSubsDelete,
      formErrors,
      fullName,
      selectedOption,
      showMessageSuccess,
      showMessageFailed,
      checksNews,
      statusButton,
      disabledButton,
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
                {/* <small>*POR 6 MESES LUEGO S/ 20 CADA MES</small> */}
                <small>*</small>
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
                {resDetail.currentPaymentMethod.creditCardType.toUpperCase()}{' '}
                que termina en
                <strong> {resDetail.currentPaymentMethod.lastFour} </strong>
              </div>
              <div className="right">
                <Button type="button" onClick={() => this.showUpdatePayment()}>
                  {ShowUpdateCard ? 'CERRAR' : 'EDITAR'}
                </Button>
              </div>
            </S.Fieldset>

            {ShowUpdateCard && (
              <S.Fieldset>
                <legend>Datos de la tarjeta</legend>

                {showMessageSuccess && (
                  <S.Message success>
                    Se actualizó correctamente los datos de la tarjeta.
                  </S.Message>
                )}
                {showMessageFailed && (
                  <S.Message failed>
                    Ha ocurrido un error al actualizar. Inténtalo nuevamente.
                  </S.Message>
                )}

                <S.Group pt="10" ac>
                  <div className="subtitle">Selecciona un tipo de tarjeta</div>
                  <div>
                    {Cards.map(item => (
                      <label key={item.name}>
                        <Radiobox
                          key={item.name}
                          image={item.image}
                          name={item.name}
                          checked={selectedOption === item.name}
                          onChange={e => this.handleCheckbox(e, item.name)}
                          value={item.name}
                        />
                      </label>
                    ))}
                  </div>
                </S.Group>

                <S.Block pt="30"></S.Block>

                <S.Group>
                  <S.FormGroup width="40">
                    <S.InputMask
                      mask={[
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      guide={false}
                      type="text"
                      name="numcard"
                      placeholder="Número de tarjeta"
                      maxLength="19" // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                      tabIndex="1"
                      onChange={e => {
                        this.handleChangeValidation(e)
                      }}
                      // eslint-disable-next-line no-return-assign
                      ref={numcard => (this.numcard = numcard)}
                    />
                    <label htmlFor="numcard" className="form-group__label">
                      Número de tarjeta
                    </label>
                    {formErrors.numcard.length > 0 && (
                      <span className="message__error">
                        {formErrors.numcard}
                      </span>
                    )}
                  </S.FormGroup>

                  <S.FormGroup width="30">
                    <S.InputMask
                      mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                      guide={false}
                      type="text"
                      name="dateexpire"
                      placeholder="F. de Vencimiento"
                      maxLength="7" // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                      tabIndex="2"
                      onChange={e => {
                        this.handleChangeValidation(e)
                      }}
                      // eslint-disable-next-line no-return-assign
                      ref={dateexpire => (this.dateexpire = dateexpire)}
                    />
                    <label htmlFor="dateexpire" className="form-group__label">
                      F. de Vencimiento
                    </label>
                    {formErrors.dateexpire.length > 0 && (
                      <span className="message__error">
                        {formErrors.dateexpire}
                      </span>
                    )}
                  </S.FormGroup>

                  <S.FormGroup width="20">
                    <S.Input
                      type="text"
                      name="codecvv"
                      placeholder="CVV"
                      maxLength="4" // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                      tabIndex="3"
                      onChange={e => {
                        this.handleChangeValidation(e)
                      }}
                      // eslint-disable-next-line no-return-assign
                      ref={codecvv => (this.codecvv = codecvv)}
                    />
                    <label htmlFor="codecvv" className="form-group__label">
                      CVV
                    </label>
                    {formErrors.codecvv.length > 0 && (
                      <span className="message__error">
                        {formErrors.codecvv}
                      </span>
                    )}
                  </S.FormGroup>

                  <S.Msgcvv>
                    <Cvv />
                    <small>Se encuentra en el reverso de su tarjeta*</small>
                  </S.Msgcvv>
                </S.Group>

                <S.Block ar pt="10">
                  <Button
                    disabled={disabledButton}
                    type="button"
                    onClick={() =>
                      this.submitUpdateCard(
                        resDetail.billingAddress.line2,
                        resDetail.currentPaymentMethod.paymentMethodID
                      )
                    }>
                    {statusButton}
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
              <div className="cont-table">
                <Table>
                  <thead>
                    <tr>
                      <th className="left">Suscriptor</th>
                      <th>Producto</th>
                      <th>Plan</th>
                      <th>Fecha</th>
                      {/* <th>Acción</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {resDetail.paymentHistory.map(reSubs => {
                      return (
                        <tr key={reSubs.sku}>
                          <td>
                            <strong>
                              {fullName.firstName || 'Usuario'}{' '}
                              {fullName.lastName}
                            </strong>
                            <p>
                              DNI:{' '}
                              {resDetail.billingAddress.line2.split('_')[1]}
                            </p>
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
                          {/* <td className="center">
                            <button type="button">Ver</button>
                            <button type="button">Borrar</button>
                          </td> */}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </S.Fieldset>

            <S.Notice>
              <Notice />
              <div>
                <strong>
                  Para cualquier gestión o consulta sobre tu suscripción
                </strong>
                <p>
                  Contactanos al 01 311-5100 o{' '}
                  {arcSite === 'elcomercio'
                    ? 'suscripciones@comercio.com.pe'
                    : 'suscriptores@diariogestion.com.pe'}
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
