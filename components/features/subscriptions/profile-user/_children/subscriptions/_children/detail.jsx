/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import { useFusionContext } from 'fusion:context'
import * as React from 'react'
import TextMask from 'react-text-mask'

import addScriptAsync from '../../../../../../utilities/script-async'
import { ContMask } from '../../../../../signwall/_children/forms/control_input_select'
import { Close, Notice } from '../../../../../signwall/_children/icons'
import Loading from '../../../../../signwall/_children/loading'
import { Modal } from '../../../../../signwall/_children/modal/index'
import { getOriginAPI } from '../../../../../signwall/_dependencies/domains'
import {
  finalizePaymentUpdate,
  getProfilePayu,
  initPaymentUpdate,
} from '../../../../../signwall/_dependencies/services'
import getCodeError from '../../../../_dependencies/Errors'
import { PropertiesCommon } from '../../../../_dependencies/Properties'
import { Taggeo } from '../../../../_dependencies/Taggeo'
import useForm from '../../../../_hooks/useForm'
import { Radiobox, RadioboxSimple } from './radiobox'

const LOGO_VISA =
  'data:image/png;base64,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'

const LOGO_MASTER_CARD =
  'data:image/png;base64,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'

const LOGO_AMEX =
  'data:image/png;base64,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'

const LOGO_DINERS_CLUB =
  'data:image/png;base64,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'

const Cards = {
  VISA: LOGO_VISA,
  MASTERCARD: LOGO_MASTER_CARD,
  AMEX: LOGO_AMEX,
  DINERS: LOGO_DINERS_CLUB,
}

const ListCards = [
  {
    name: 'VISA',
    image: LOGO_VISA,
  },
  {
    name: 'MASTERCARD',
    image: LOGO_MASTER_CARD,
  },
  {
    name: 'AMEX',
    image: LOGO_AMEX,
  },
  {
    name: 'DINERS',
    image: LOGO_DINERS_CLUB,
  },
]

const listOptionsComercio = [
  'El precio es elevado',
  'Cuenta con otra suscripción',
  'No estoy interesado en el contenido',
  'Otro motivo',
]

const listOptionsGestion = [
  'Solo me suscribí para leer un tema puntual',
  'Ya no lo necesito para mi trabajo y/o estudios',
  'El contenido no es lo que me interesa',
  'Otro motivo',
]

const cardPatterns = {
  VISA: /^(4)(\d{12}|\d{15})$|^(606374\d{10}$)/,
  MASTERCARD: /^(5[1-5]\d{14}$)|^(2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))\d{12}$)/,
  AMEX: /^3[47][0-9]{13}$/,
  DINERS: /(^[35](?:0[0-5]|[268][0-9])[0-9]{11}$)|(^30[0-5]{11}$)|(^3095(\d{10})$)|(^36{12}$)|(^3[89](\d{12})$)/,
}

// prettier-ignore
const Mask = {
  CARD_NUMBER: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
  EXPIRY_DATE: [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  CARD_CVV: [/\d/, /\d/, /\d/, /\d/],
}

const SubsDetail = ({ IdSubscription }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorBtn, mainColorTitle },
    },
  } = useFusionContext() || {}

  const { links } = PropertiesCommon

  const [showLoading, setShowLoading] = React.useState(true)
  const [showLoadingSubmit, setShowLoadingSubmit] = React.useState(false)
  const [showResDetail, setShowResDetail] = React.useState({})
  const [showResLastSubs, setShowResLastSubs] = React.useState(null)
  const [showModalConfirm, setShowModalConfirm] = React.useState(false)
  const [showModalRecovery, setShowModalRecovery] = React.useState(false)
  const [showMessageSuccess, setShowMessageSuccess] = React.useState(false)
  const [showMessageFailed, setShowMessageFailed] = React.useState(false)
  const [showUpdateCard, setShowUpdateCard] = React.useState(false)
  const [showSelectedOption, setShowSelectedOption] = React.useState('VISA')
  const [showTypeAmex, setShowTypeAmex] = React.useState(false)
  const [showLastFour, setShowLastFour] = React.useState('0000')
  const [showLastCard, setShowLastCard] = React.useState('VISA')
  const [showCustomMsgFailed, setShowCustomMsgFailed] = React.useState(null)
  const [showOpenUpdate, setShowOpenUpdate] = React.useState(false)
  const [showStepCancel, setShowStepCancel] = React.useState(1)
  const [showOptionCancel, setShowOptionCancel] = React.useState(null)
  const [showErrorCancel, setShowErrorCancel] = React.useState('')
  const [showLoadCancel, setShowLoadCancel] = React.useState('')
  const [showLoadRescue, setShowLoadRescue] = React.useState('')
  const [txtMotivo, setTxtMotivo] = React.useState('')

  const validateMotivo = () => {
    let respuesta = ''
    if (txtMotivo.length <= 0) {
      respuesta = 'Campo obligatorio'
    }
    if (txtMotivo.length >= 1 && txtMotivo.length <= 9) {
      respuesta = 'Mínimo 10 caracteres'
    }
    // eslint-disable-next-line no-useless-escape
    const paternValMotivo = /^([a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\!\¡\?\¿\-]+\s)*[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\!\¡\?\¿\-]+$/
    if (txtMotivo.length > 0 && !txtMotivo.match(paternValMotivo)) {
      respuesta = 'Formato inválido o caracteres no permitidos'
    }
    return respuesta
  }

  const stateSchema = {
    numcard: { value: '', error: '' },
    dateexpire: { value: '', error: '' },
    codecvv: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    numcard: {
      required: true,
      validator: {
        func: (value) =>
          cardPatterns[showSelectedOption].test(value.replace(/\s/g, '')),
        error: 'Formato inválido.',
      },
    },
    dateexpire: {
      required: true,
      validator: {
        func: (value) =>
          /^(0[1-9]|1[0-2])\/?(((202)\d{1}|(202)\d{1})|(2)\d{1})$/.test(value),
        error: 'Formato inválido.',
      },
    },
    codecvv: {
      required: true,
      validator: {
        func: (value) => /^(\d{3,4})/.test(value),
        error: 'Mínimo 3 caracteres',
      },
    },
  }

  React.useEffect(() => {
    window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
    window.Identity.extendSession().then(() => {
      window.Sales.options({ apiOrigin: getOriginAPI(arcSite) })
      window.Sales.getSubscriptionDetails(IdSubscription).then((resDetail) => {
        setShowResDetail(resDetail)
        setShowLoading(false)
        setShowLastCard(
          resDetail.currentPaymentMethod.creditCardType
            .replace(/\s|Club/g, '')
            .toUpperCase()
        )
        setShowLastFour(resDetail.currentPaymentMethod.lastFour)
        setShowSelectedOption(
          resDetail.currentPaymentMethod.creditCardType
            .replace(/\s|Club/g, '')
            .toUpperCase()
        )
        setShowResLastSubs(
          resDetail.paymentHistory[resDetail.paymentHistory.length - 1].periodTo
        )
      })
    })

    addScriptAsync({
      name: 'PayuSDK',
      url: links.payu,
      includeNoScript: false,
    }).then(() => {
      window.payU.setURL(links.payuPayments)
      window.payU.setPublicKey(links.payuPublicKey)
      window.payU.setAccountID(links.payuAccountID)
      window.payU.setListBoxID('mylistID')
      window.payU.setLanguage('es')
      window.payU.getPaymentMethods()
    })
  }, [IdSubscription, arcSite])

  const openModalConfirm = (type) => {
    if (type === 'anulacion') {
      setShowModalConfirm(true)
      Taggeo(`Web_Sign_Wall_General`, `web_swg_open_anulacion_step1`)
    } else {
      setShowModalRecovery(true)
      Taggeo(`Web_Sign_Wall_General`, `web_swg_open_recuperar`)
    }

    const ModalProfile =
      document.getElementById('profile-signwall').parentNode ||
      document.getElementById('profile-signwall').parentElement
    ModalProfile.style.overflow = 'hidden'

    setTimeout(() => {
      const modalConfirmPass = document.getElementById('profile-signwall')
      modalConfirmPass.scrollIntoView()
    }, 500)
  }

  const onSubmitForm = ({ numcard, dateexpire, codecvv }) => {
    const subsID = showResDetail.currentPaymentMethod.paymentMethodID

    setShowMessageSuccess(false)
    setShowMessageFailed(false)
    setShowLoadingSubmit(true)
    setShowOpenUpdate(true)

    if (typeof window !== 'undefined') {
      window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
      window.Identity.extendSession().then(() => {
        window.Sales.options({ apiOrigin: getOriginAPI(arcSite) })
        window.Sales.getPaymentOptions().then((res) => {
          const providerID = res[0].paymentMethodID
          const accessTOKEN = window.Identity.userIdentity.accessToken
          initPaymentUpdate(subsID, providerID, arcSite, accessTOKEN).then(
            (resUpdate) => {
              const {
                parameter1: publicKey,
                parameter2: accountId,
                parameter3: payuBaseUrl,
                parameter4: deviceSessionId,
              } = resUpdate

              getProfilePayu(accessTOKEN, IdSubscription, arcSite).then(
                (profilePayu) => {
                  const fullUserName = `${
                    profilePayu.name ||
                    window.Identity.userProfile.firstName ||
                    'Usuario'
                  } ${
                    profilePayu.lastname ||
                    window.Identity.userProfile.firstName ||
                    ''
                  }`

                  window.payU.setURL(payuBaseUrl)
                  window.payU.setPublicKey(publicKey)
                  window.payU.setAccountID(accountId)
                  window.payU.setCardDetails({
                    number: numcard.replace(/\s/g, ''),
                    // name_card:
                    //   ENVIRONMENT === 'elcomercio'
                    //     ? fullUserName.replace(/'/g, '')
                    //     : 'APPROVED',
                    name_card: fullUserName.replace(/'/g, ''),
                    payer_id: new Date().getTime(),
                    exp_month: dateexpire.split('/')[0],
                    exp_year:
                      dateexpire.split('/')[1].length <= 2
                        ? `20${dateexpire.split('/')[1]}`
                        : dateexpire.split('/')[1],
                    method: showSelectedOption,
                    document: profilePayu.doc_number,
                    cvv: codecvv,
                  })

                  const handleCreateToken = new Promise((resolve, reject) => {
                    window.payU.createToken((response) => {
                      if (response.error) {
                        reject(new Error(response.error))
                        setShowMessageFailed(true)
                        setShowCustomMsgFailed(
                          response.error ||
                            'Ha ocurrido un error inesperado. Por favor inténtalo más tarde ó contáctanos al 01 311-5100.'
                        )
                        setShowLoadingSubmit(false)
                        setShowOpenUpdate(false)
                        setTimeout(() => {
                          setShowMessageFailed(false)
                        }, 5000)
                      } else {
                        resolve(response.token)
                      }
                    })
                  })

                  handleCreateToken.then((token) => {
                    const tokenDinamic = `${token}~${deviceSessionId}~${codecvv}`
                    const documentPay = `${profilePayu.doc_type}_${profilePayu.doc_number}`

                    finalizePaymentUpdate(
                      subsID,
                      providerID,
                      arcSite,
                      accessTOKEN,
                      tokenDinamic,
                      profilePayu.email,
                      documentPay,
                      profilePayu.phone
                    )
                      .then((resFin) => {
                        if (
                          resFin.cardholderName &&
                          resFin.creditCardLastFour
                        ) {
                          setShowLastFour(resFin.creditCardLastFour)
                          setShowMessageSuccess(true)
                          setShowUpdateCard(false)
                          setShowLastCard(showSelectedOption)
                        } else {
                          setShowMessageFailed(true)
                          setShowCustomMsgFailed(
                            'Ha ocurrido un error al actualizar. Revise sus datos de tarjeta e inténtelo nuevamente.'
                          )
                        }
                      })
                      .catch(() => {
                        setShowMessageFailed(true)
                        setShowCustomMsgFailed(
                          'Ha ocurrido un error inesperado. Por favor inténtalo más tarde ó contáctanos al 01 311-5100.'
                        )
                      })
                      .finally(() => {
                        setShowLoadingSubmit(false)
                        setShowOpenUpdate(false)
                        setTimeout(() => {
                          setShowMessageFailed(false)
                          setShowMessageSuccess(false)
                        }, 5000)
                      })
                  })
                }
              )
            }
          )
        })
      })
    }
  }

  const closeModalConfirm = (type) => {
    if (type === 'anulacion') {
      setShowModalConfirm(!showModalConfirm)
      setShowStepCancel(1)
      setShowOptionCancel(null)
      setShowErrorCancel('')
      setTxtMotivo('')
      Taggeo(`Web_Sign_Wall_General`, `web_swg_close_anulacion`)
    } else {
      setShowModalRecovery(false)
      Taggeo(`Web_Sign_Wall_General`, `web_swg_close_recuperar`)
    }

    const ModalProfile =
      document.getElementById('profile-signwall').parentNode ||
      document.getElementById('profile-signwall').parentElement
    if (showModalConfirm) {
      ModalProfile.style.overflow = 'auto'
    } else {
      ModalProfile.style.overflow = 'hidden'
    }
  }

  const recoverySubscription = (idSubsRecovery) => {
    if (typeof window !== 'undefined') {
      setShowLoadRescue('Recuperando...')
      window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
      window.Identity.extendSession().then(() => {
        window.Sales.rescueSubscription(idSubsRecovery)
          .then(() => {
            Taggeo(`Web_Sign_Wall_General`, `web_swg_success_recuperacion`)
            window.document.getElementById('btn-subs').click()
          })
          .catch(() => {
            Taggeo(`Web_Sign_Wall_General`, `web_swg_error_recuperacion`)
          })
          .finally(() => {
            setShowLoadRescue('')
          })
      })
    }
  }

  const deleteSubscription = (idSubsDelete, option) => {
    if (typeof window !== 'undefined') {
      setShowLoadCancel('Finalizando...')

      const valMotivo = option === 'Otro motivo' ? txtMotivo.trim() : option
      window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
      window.Identity.extendSession().then(() => {
        window.Sales.options({ apiOrigin: getOriginAPI(arcSite) })
        window.Sales.cancelSubscription(idSubsDelete, valMotivo || undefined)
          .then(() => {
            Taggeo(`Web_Sign_Wall_General`, `web_swg_success_anulacion`)
            window.document.getElementById('btn-subs').click()
          })
          .catch((resError) => {
            setShowErrorCancel(getCodeError(resError.code))
            Taggeo(`Web_Sign_Wall_General`, `web_swg_error_anulacion`)
          })
          .finally(() => {
            setShowLoadCancel('')
          })
      })
    }
  }

  const dateFormat = (date) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    const formatDay = day <= 9 ? `0${day}` : day
    const formatMonth = month <= 9 ? `0${month}` : month
    return `${formatDay}/${formatMonth}/${year}`.toString()
  }

  const docFormat = (doc) => (doc ? doc.replace('_', ': ') : 'Sin Documento')

  const nameFormat = () => {
    if (typeof window !== 'undefined') {
      return window.Identity.userProfile
        ? `${window.Identity.userProfile.firstName || 'Usuario'} ${
            window.Identity.userProfile.lastName || ''
          }`
        : 'Usuario'
    }
    return false
  }

  const periodFormat = (to, from) => {
    if (to && from) {
      return (new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24) <= 31
        ? 'Mensual'
        : 'Anual'
    }
    return '-'
  }

  const {
    values: { numcard, dateexpire, codecvv },
    errors,
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  // const clearValues = () => {
  //   errors.numcard = ''
  //   errors.dateexpire = ''
  //   errors.codecvv = ''
  //   numcard = ''
  //   dateexpire = ''
  //   codecvv = ''
  // }

  const changeCardTrigger = (card) => {
    if (typeof window !== 'undefined') {
      const buttonUpdate = window.document.getElementById('btn-update-card')
      if (numcard.length >= 16 && buttonUpdate) {
        errors.numcard = cardPatterns[card].test(numcard.replace(/\s/g, ''))
          ? ''
          : 'Formato inválido.'
        if (!errors.numcard && !errors.dateexpire && !errors.codecvv) {
          buttonUpdate.disabled = false
        } else {
          buttonUpdate.disabled = true
        }
      }
    }
  }

  return (
    <div className="sign-profile_general-wrapper">
      {showLoading ? (
        <Loading typeBg="block" />
      ) : (
        <div className="sign-profile_subscriptions-wrapper-block">
          <div
            className="sign-profile_subscriptions-subs-detail"
            style={{
              padding: '0px',
              columnCount: '0',
            }}>
            <div className="details-left">
              <div id="mylistID" style={{ display: 'none' }} />
              <small>DETALLE DE LA SUSCRIPCIÓN</small>
              <h2>{showResDetail.productName}</h2>
              <p>
                Plan Pago:
                <strong>
                  {periodFormat(
                    showResDetail.paymentHistory[0].periodTo,
                    showResDetail.paymentHistory[0].periodFrom
                  )}
                </strong>
              </p>
              <p>
                Precio:
                <strong> S/ {showResDetail.salesOrders[0].total} </strong>
              </p>
              <p>
                Estado:
                {showResDetail.status === 3 ? (
                  <strong className="orange"> ANULADO</strong>
                ) : (
                  <strong className="green"> ACTIVO</strong>
                )}
              </p>
            </div>

            <div className="details-right">
              <p>
                <strong>BENEFICIOS</strong>
              </p>
              <ul>
                {arcSite === 'elcomercio' ? (
                  <>
                    <li>
                      Acceso sin límites a información exclusiva: reportajes,
                      informes y la mejor selección de historias elaboradas por
                      El Comercio.
                    </li>
                    <li>
                      Navegación ilimitada a elcomercio.pe desde todos tus
                      dispositivos.
                    </li>
                  </>
                ) : (
                  <>
                    {showResDetail.productName.indexOf('Universitario') >= 0 ? (
                      <>
                        <li>
                          Acceso a Plus G: análisis e informes exclusivos.
                        </li>
                        <li>
                          Potencia tu perfil: datos sobre empleabilidad,
                          finanzas y más.
                        </li>
                        <li>Fácil acceso: desde cualquier dispositivo.</li>
                      </>
                    ) : (
                      <>
                        <li>
                          Contenido premium: análisis e informes exclusivamente
                          desarrollados para gestion.pe. Navegación ilimitada
                          desde todos tus dispositivos.
                        </li>
                        <li>
                          La mejor selección de artículos e informes elaborados
                          por el diario Gestión, The Economist y la agencia
                          Bloomberg.
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>

          {showResDetail.status !== 3 && (
            <fieldset
              className="sign-profile_subscriptions-fieldset"
              id="div-signwall-updatecard">
              <legend>Método de pago</legend>

              {showMessageSuccess && (
                <div className="sign-profile_subscriptions-message sign-profile_subscriptions-message-success">
                  Se actualizó correctamente los datos de la tarjeta.
                </div>
              )}

              <div className="left">
                <img src={Cards[showLastCard]} alt={showLastCard} />
                <p>
                  &nbsp;&nbsp; que termina en
                  <strong>{` ${showLastFour}`}</strong>
                </p>
              </div>
              <div className="right">
                <button
                  type="button"
                  className="sign-profile_general-button"
                  disabled={showOpenUpdate}
                  id="btn-signwall-editcard"
                  onClick={() => {
                    setShowUpdateCard(!showUpdateCard)
                    // clearValues()
                  }}>
                  {showUpdateCard ? 'CERRAR' : 'EDITAR'}
                </button>
              </div>
            </fieldset>
          )}

          {showUpdateCard && (
            <fieldset className="sign-profile_subscriptions-fieldset">
              {showOpenUpdate && <Loading typeBg="transparent" />}

              <legend>Datos de la tarjeta</legend>

              {showMessageFailed && (
                <div className="sign-profile_subscriptions-message sign-profile_subscriptions-message-failed">
                  {showCustomMsgFailed}
                </div>
              )}

              <div
                className="sign-profile_subscriptions-group"
                style={{
                  alignItems: 'center',
                }}>
                <div className="subtitle">Selecciona un tipo de tarjeta</div>
                <div>
                  {ListCards.map((item) => (
                    <label key={item.name}>
                      <Radiobox
                        key={item.name}
                        image={item.image}
                        name={item.name}
                        checked={showSelectedOption === item.name}
                        onChange={() => {
                          setShowSelectedOption(item.name)
                          setShowTypeAmex(item.name === 'AMEX')
                          changeCardTrigger(item.name)
                        }}
                        value={item.name}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <br />

              <form
                className="signwall-inside_forms-form npadding"
                onSubmit={handleOnSubmit}>
                <div className="sign-profile_subscriptions-align">
                  <div className="sign-profile_subscriptions-form-group width-card">
                    <ContMask error={errors.numcard}>
                      <TextMask
                        type="text"
                        id="numcard"
                        name="numcard"
                        guide={false}
                        mask={Mask.CARD_NUMBER}
                        required
                        placeholder="Número de tarjeta"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={numcard}
                        maxLength="19"
                        tabIndex="1"
                        className={`${errors.numcard && 'error'}`}
                        onChange={(e) => {
                          handleOnChange(e)
                          setShowMessageFailed(false)
                        }}
                        onFocus={(e) => {
                          handleOnChange(e)
                          setShowMessageFailed(false)
                        }}
                      />
                    </ContMask>
                  </div>

                  <div className="sign-profile_subscriptions-form-group">
                    <ContMask error={errors.dateexpire} nolabelerror>
                      <TextMask
                        type="text"
                        id="dateexpire"
                        name="dateexpire"
                        guide={false}
                        mask={Mask.EXPIRY_DATE}
                        required
                        placeholder="F. de Vencimiento"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        value={dateexpire}
                        maxLength="7"
                        tabIndex="2"
                        className={`${errors.dateexpire && 'error'}`}
                        onChange={(e) => {
                          handleOnChange(e)
                          setShowMessageFailed(false)
                        }}
                        onFocus={(e) => {
                          handleOnChange(e)
                          setShowMessageFailed(false)
                        }}
                      />
                    </ContMask>
                  </div>

                  <div className="sign-profile_subscriptions-form-group">
                    <ContMask error={errors.codecvv} nolabelerror>
                      <TextMask
                        type="text"
                        id="codecvv"
                        name="codecvv"
                        guide={false}
                        mask={Mask.CARD_CVV}
                        required
                        placeholder="CVV"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        value={codecvv}
                        maxLength="4"
                        tabIndex="3"
                        className={`${errors.codecvv && 'error'}`}
                        onChange={(e) => {
                          handleOnChange(e)
                          setShowMessageFailed(false)
                        }}
                        onFocus={(e) => {
                          handleOnChange(e)
                          setShowMessageFailed(false)
                        }}
                      />
                    </ContMask>
                  </div>

                  <div className="sign-profile_subscriptions-form-group">
                    <div className="sign-profile_subscriptions-msg-cvv">
                      <img
                        src={`https://signwall.e3.pe/images/logo-${
                          showTypeAmex ? 'card-amex' : 'card-info'
                        }.png`}
                        alt="card-info"
                      />
                      <small>{`Se encuentra en el ${
                        showTypeAmex ? 'anverso' : 'reverso'
                      } de su tarjeta*`}</small>
                    </div>
                  </div>
                </div>
                <div
                  className="sign-profile_subscriptions-block"
                  style={{
                    textAlign: 'right',
                    paddingTop: '10px',
                  }}>
                  <div className="sign-profile_subscriptions-form-group">
                    <button
                      type="submit"
                      className="sign-profile_general-button"
                      id="btn-update-card"
                      color={mainColorBtn}
                      disabled={disable || showLoadingSubmit}>
                      {showLoadingSubmit ? 'ACTUALIZANDO...' : 'ACTUALIZAR'}
                    </button>
                  </div>
                </div>
              </form>
            </fieldset>
          )}

          <div
            className="sign-profile_subscriptions-block"
            style={{
              borderTop: '1px solid #e8e8e8',
              textAlign: 'right',
            }}>
            {showResDetail.status !== 3 ? (
              <button
                type="button"
                className="sign-profile_general-button sign-profile_general-button-link"
                onClick={() => {
                  Taggeo(`Web_Sign_Wall_General`, `web_swg_boton_anulacion`)
                  openModalConfirm('anulacion')
                }}>
                ANULAR MI SUSCRIPCIÓN
              </button>
            ) : (
              <button
                type="button"
                className="sign-profile_general-button sign-profile_general-button-link"
                onClick={() => {
                  Taggeo(`Web_Sign_Wall_General`, `web_swg_boton_recuperar`)
                  openModalConfirm('recovery')
                }}>
                RECUPERAR MI SUSCRIPCIÓN
              </button>
            )}
          </div>

          <fieldset className="sign-profile_subscriptions-fieldset">
            <legend>Historial del pago</legend>
            <div className="cont-table">
              <table className="sign-profile_general-table">
                <thead>
                  <tr>
                    <th className="left">Suscriptor</th>
                    <th>Producto</th>
                    <th>Plan</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {showResDetail.paymentHistory.map((reSubs) => (
                    <tr key={reSubs.transactionDate}>
                      <td>
                        <strong>{nameFormat()}</strong>
                        <p>{docFormat(showResDetail.billingAddress.line2)}</p>
                      </td>
                      <td className="center">
                        {showResDetail.productName || 'Ninguno'}
                      </td>
                      <td className="center">
                        {periodFormat(reSubs.periodTo, reSubs.periodFrom)}
                      </td>
                      <td className="center">
                        {dateFormat(reSubs.transactionDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <div className="sign-profile_subscriptions-notice">
            <Notice />
            <div>
              <strong>
                Para cualquier gestión o consulta sobre tu suscripción
              </strong>
              <p>
                Contactanos enviando un correo a
                atencionalcliente@comercio.com.pe
              </p>
            </div>
          </div>
        </div>
      )}

      {showModalConfirm && (
        <Modal size="small" position="middle" bgColor="white">
          <button
            className="close-modal"
            type="button"
            onClick={() => {
              closeModalConfirm('anulacion')
            }}>
            <Close />
          </button>

          <form className="signwall-inside_forms-form">
            {showStepCancel === 1 && (
              <>
                {arcSite === 'elcomercio' ? (
                  <>
                    <h4
                      style={{
                        fontSize: '16px',
                      }}
                      className="signwall-inside_forms-title justify mt-40 mb-20">
                      Queremos que sepas que gracias a tu suscripción podemos
                      reforzar nuestro compromiso con el periodismo de calidad.
                    </h4>
                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Nuestro trabajo periodístico va más allá de mantenerte
                      informado. Queremos darte una opción de análisis para que
                      tomes decisiones a través de contenidos exclusivos y notas
                      de valor agregado especialmente creados para ti.
                    </p>
                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text  justify mb-20">
                      Gracias a lectores como tú renovamos a diario nuestro
                      deber con la información veraz y confiable que nos
                      permiten mantener más de 180 años de trayectoria.
                    </p>
                  </>
                ) : (
                  <>
                    <h4
                      style={{
                        fontSize: '16px',
                      }}
                      className="signwall-inside_forms-title justify mt-40 mb-20">
                      Lamentamos mucho que estés por tomar la decisión de
                      cancelar tu suscripción con Gestion.pe y quieras dejar de
                      formar parte de nuestro selecto grupo de suscriptores.
                    </h4>
                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Durante todo el tiempo que estás con nosotros, un
                      experimentado equipo de 50 periodistas trabaja
                      intensamente para ofrecerte primicias y una selección de
                      las noticias más importantes de economía y negocios del
                      Perú y el mundo, lo que incluye a alrededor de 600
                      artículos mensuales Plus G exclusivos para suscriptores.
                    </p>
                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-20">
                      ¿Deseas continuar con la anulación de tu suscripción?
                    </p>
                  </>
                )}

                <div
                  className="sign-profile_subscriptions-block"
                  style={{
                    textAlign: 'center',
                    paddingTop: '10px',
                    paddingBottom: '20px',
                  }}>
                  <button
                    type="button"
                    className="sign-profile_general-button sign-profile_general-button-border"
                    onClick={() => {
                      setShowStepCancel(2)
                      Taggeo(
                        `Web_Sign_Wall_General`,
                        `web_swg_open_anulacion_step2`
                      )
                    }}>
                    Continuar con la anulación
                  </button>
                </div>
              </>
            )}

            {showStepCancel === 2 && (
              <>
                <h4
                  style={{ fontSize: '20px', color: mainColorTitle }}
                  className="signwall-inside_forms-title center mt-40 mb-20">
                  ¿De qué te perderás si cancelas tu suscripción?
                </h4>

                {arcSite === 'elcomercio' ? (
                  <>
                    <h4
                      style={{ fontSize: '16px' }}
                      className="signwall-inside_forms-title justify mt-10 mb-10">
                      Con tu Plan Digital tienes acceso exclusivo a:
                    </h4>

                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Reportajes, entrevistas, artículos de opinión,
                      suplementos, informes y la mejor selección de historias
                      elaboradas por El Comercio, todo creado especialmente para
                      ti.
                    </p>

                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Navegación ilimitada a {arcSite}.pe desde todos tus
                      dispositivos.
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Contenido premium Plus G exclusivo para suscriptores
                    </p>

                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Lectura ilimitada del contenido abierto desde todos tus
                      dispositivos.
                    </p>

                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-20">
                      La mejor selección de artículos e informes elaborados por
                      el diario Gestión, The Economist y la agencia Bloomberg.
                    </p>
                  </>
                )}

                <div
                  className="sign-profile_subscriptions-block"
                  style={{
                    textAlign: 'center',
                    paddingTop: '10px',
                    paddingBottom: '20px',
                  }}>
                  <button
                    type="button"
                    className="sign-profile_general-button sign-profile_general-button-border"
                    onClick={() => {
                      setShowStepCancel(3)
                      Taggeo(
                        `Web_Sign_Wall_General`,
                        `web_swg_open_anulacion_step3`
                      )
                    }}>
                    Continuar con la anulación
                  </button>
                </div>
              </>
            )}

            {showStepCancel === 3 && (
              <>
                <h4
                  style={{
                    fontSize: '20px',
                    color: mainColorTitle,
                  }}
                  className="signwall-inside_forms-title center mt-40 mb-20">
                  {` ${
                    new Date() >= new Date(showResLastSubs)
                      ? 'Tu suscripción no se puede anular, ya que se encuentra en proceso de renovación automática desde el'
                      : 'Ten en cuenta que solo tendrás acceso a tu plan digital hasta el'
                  }  ${dateFormat(showResLastSubs)}`}
                </h4>

                <h4
                  style={{
                    fontSize: '16px',
                  }}
                  className="signwall-inside_forms-title center mt-20 mb-20">
                  {`${
                    new Date() >= new Date(showResLastSubs)
                      ? '¿Deseas renovar en este momento?'
                      : '¿Deseas continuar con la anulación de tu suscripción?'
                  } `}
                </h4>

                <div
                  className="sign-profile_subscriptions-block"
                  style={{
                    textAlign: 'center',
                    paddingTop: '10px',
                    paddingBottom: '20px',
                  }}>
                  {new Date() >= new Date(showResLastSubs) ? (
                    <>
                      <div className="sign-profile_subscriptions-form-group">
                        <button
                          type="button"
                          className="sign-profile_general-button"
                          onClick={() => {
                            closeModalConfirm('anulacion')
                          }}>
                          Cancelar
                        </button>
                      </div>

                      <div className="sign-profile_subscriptions-form-group">
                        <button
                          type="button"
                          className="sign-profile_general-button sign-profile_general-button-border"
                          onClick={() => {
                            Taggeo(
                              `Web_Sign_Wall_General`,
                              `web_swg_boton_anulacion_renovar`
                            )
                            setShowUpdateCard(true)
                            closeModalConfirm('anulacion')
                            setTimeout(() => {
                              const divUpdateCard = document.getElementById(
                                'div-signwall-updatecard'
                              )
                              if (divUpdateCard) divUpdateCard.scrollIntoView()
                            }, 100)
                          }}>
                          Renovar suscripción
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="sign-profile_general-button sign-profile_general-button-border"
                      onClick={() => {
                        setShowStepCancel(4)
                        Taggeo(
                          `Web_Sign_Wall_General`,
                          `web_swg_open_anulacion_step4`
                        )
                      }}>
                      Continuar con la anulación
                    </button>
                  )}
                </div>
              </>
            )}

            {showStepCancel === 4 && (
              <>
                <h4
                  style={{
                    fontSize: '20px',
                    color: mainColorTitle,
                  }}
                  className="signwall-inside_forms-title center mt-40 mb-20">
                  Finalizar suscripción
                </h4>

                {showErrorCancel && (
                  <div className="sign-profile_subscriptions-message sign-profile_subscriptions-message-failed">
                    {showErrorCancel}
                  </div>
                )}

                <h4
                  styles={{ fontSize: '16px' }}
                  className="signwall-inside_forms-title justify mt-10 mb-10">
                  Antes de hacer efectiva la anulación, por favor, cuéntanos los
                  motivos por los que deseas anular tu suscripción:
                </h4>

                {arcSite === 'elcomercio'
                  ? listOptionsComercio.map((item) => (
                      <label key={item}>
                        <RadioboxSimple
                          key={item}
                          name={item}
                          checked={showOptionCancel === item}
                          onChange={() => {
                            setShowOptionCancel(item)
                          }}
                          value={item}
                        />
                      </label>
                    ))
                  : listOptionsGestion.map((item) => (
                      <label key={item}>
                        <RadioboxSimple
                          key={item}
                          name={item}
                          checked={showOptionCancel === item}
                          onChange={() => {
                            setShowOptionCancel(item)
                          }}
                          value={item}
                        />
                      </label>
                    ))}

                {showOptionCancel === 'Otro motivo' && (
                  <div
                    className="sign-profile_subscriptions-block"
                    style={{
                      paddingTop: '10px',
                    }}>
                    <div
                      style={{
                        width: '100%',
                        margin: '0px',
                      }}
                      className={`sign-profile_subscriptions-form-group ${
                        validateMotivo() ? 'group-required' : ''
                      }`}>
                      <p>{validateMotivo()}</p>
                      <textarea
                        id="motivo-detalle"
                        required={showOptionCancel === 'Otro motivo'}
                        onChange={(e) => {
                          setTxtMotivo(e.target.value)
                          validateMotivo()
                        }}
                        value={txtMotivo}
                        placeholder="Ingresa motivo"
                        maxLength="200"
                      />
                    </div>
                  </div>
                )}

                <div
                  className="sign-profile_subscriptions-block"
                  style={{
                    textAlign: 'center',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                  }}>
                  <div className="sign-profile_subscriptions-form-group">
                    <button
                      type="button"
                      className="sign-profile_general-button"
                      onClick={() => {
                        closeModalConfirm('anulacion')
                      }}>
                      Cancelar
                    </button>
                  </div>
                  <div className="sign-profile_subscriptions-form-group">
                    <button
                      type="button"
                      className="sign-profile_general-button sign-profile_general-button-border"
                      disabled={
                        showOptionCancel === null ||
                        (showOptionCancel === 'Otro motivo' &&
                          validateMotivo()) ||
                        showLoadCancel
                      }
                      onClick={() => {
                        deleteSubscription(
                          showResDetail.subscriptionID,
                          showOptionCancel
                        )
                        Taggeo(
                          `Web_Sign_Wall_General`,
                          `web_swg_boton_finalizar_anulacion`
                        )
                      }}>
                      {showLoadCancel || 'Finalizar Suscripción'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </Modal>
      )}

      {showModalRecovery && (
        <Modal size="small" position="middle" bgColor="white">
          <button
            className="close-modal"
            type="button"
            onClick={() => {
              closeModalConfirm('recuperar')
            }}>
            <Close />
          </button>

          <form className="signwall-inside_forms-form">
            <h4
              style={{ fontSize: '18px' }}
              className="signwall-inside_forms-title center mt-40 mb-20">
              Confirmar Recuperación
            </h4>
            <p
              style={{
                fontSize: '16px',
                lineHeight: '26px',
              }}
              className="signwall-inside_forms-text center mb-10">
              Al recuperar se volverá a activar la recurrencia de pagos de
              acuerdo a su plan.
            </p>
            <p
              style={{
                fontSize: '16px',
                lineHeight: '26px',
              }}
              className="signwall-inside_forms-text center mb-10">
              ¿Desea recuperar su suscripción?
            </p>
            <div
              className="sign-profile_subscriptions-block"
              style={{ textAlign: 'center', paddingTop: '20px' }}>
              <div className="sign-profile_subscriptions-form-group">
                <button
                  type="button"
                  className="sign-profile_general-button"
                  onClick={() => {
                    closeModalConfirm('recuperar')
                  }}>
                  Cancelar
                </button>
              </div>
              <div className="sign-profile_subscriptions-form-group">
                <button
                  type="button"
                  className="sign-profile_general-button sign-profile_general-button-border"
                  disabled={showLoadRescue}
                  onClick={() => {
                    recoverySubscription(showResDetail.subscriptionID)
                    Taggeo(
                      `Web_Sign_Wall_General`,
                      `web_swg_boton_finalizar_recuperacion`
                    )
                  }}>
                  {showLoadRescue || 'Recuperar'}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default SubsDetail
