/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import Sales from '@arc-publishing/sdk-sales'
import * as Sentry from '@sentry/browser'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'
import TextMask from 'react-text-mask'

// import { isSandbox } from '../../../../../utilities/arc/env'
import addScriptAsync from '../../../../../utilities/script-async'
import { useAuthContext } from '../../../_context/auth'
import getCodeError, {
  acceptCheckTermsPay,
} from '../../../_dependencies/Errors'
import {
  PropertiesCommon,
  PropertiesSite,
} from '../../../_dependencies/Properties'
import PWA from '../../../_dependencies/Pwa'
import {
  patterCvv,
  patternCard,
  patternDate,
} from '../../../_dependencies/Regex'
import { conformProfile, isLogged } from '../../../_dependencies/Session'
import {
  eventCategory,
  PixelActions,
  sendAction,
  TaggeoJoao,
  TagsAdsMurai,
} from '../../../_dependencies/Taggeo'
import { getSessionStorage } from '../../../_dependencies/Utils'
import useForm from '../../../_hooks/useForm'

const styles = {
  step: 'step__left-progres',
  card: 'step__left-cards',
  subtitle: 'step__left-subtitle',
  tabpay: 'step__left-tab-pay',
  block: 'step__left-block',
  btn: 'step__left-btn-next',
  secure: 'step__left-text-security',
  notes: 'step__notes-footer text-center',
  cvvAmex: 'img-info-cvvamex',
  cvvAll: 'img-info-cvv',
  tabCard1: 'step__left-tab-cards tab1',
  tabCard2: 'step__left-tab-efectivo tab2',
}

const Pay = () => {
  const {
    arcSite,
    globalContent: { plans = [], printedSubscriber, event },
    customFields: {
      disablePagoEfectivo = false,
      allowedDomainsPagoEfectivo,
    } = {},
  } = useFusionContext() || {}

  const {
    userProfile,
    userPlan,
    userPeriod,
    updateStep,
    updatePurchase,
    updateLoadPage,
    updateMethodPay,
    updatePeOption,
  } = useAuthContext()
  const { texts, links } = PropertiesCommon
  const { urls } = PropertiesSite[arcSite]

  const {
    uuid,
    email,
    phone,
    firstName,
    lastName,
    secondLastName = '',
    documentType,
    documentNumber,
    emailVerified,
    province,
  } = conformProfile(userProfile || {})

  const [msgError, setMsgError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [txtLoading, setTxtLoading] = React.useState('Cargando...')
  const [methodCard, setMethodCard] = React.useState()
  const [checkedTerms, setCheckedTerms] = React.useState()

  // Si no hay ningún dominio listado, quiere decir que acepta todos
  const isAllowedDomainPagoEfectivo =
    allowedDomainsPagoEfectivo && allowedDomainsPagoEfectivo?.length > 0
      ? allowedDomainsPagoEfectivo?.includes(email.split('@')[1])
      : true

  const selectedPlan = plans.find(
    (plan) => plan.priceCode === userPlan.priceCode
  )

  const { amount, sku, billingFrequency, priceCode, name } = selectedPlan || {}

  React.useEffect(() => {
    window.scrollTo(0, 0)

    Sentry.configureScope((scope) => {
      scope.setTag('document', documentNumber || 'none')
      scope.setTag('phone', phone || 'none')
      scope.setTag('email', email || 'none')
      scope.setTag('step', 'Pago')
      scope.setUser({
        id: uuid,
        name: `${firstName} ${lastName} ${secondLastName}`,
        email,
        phone,
        documentType,
        documentNumber,
        emailVerified,
      })
    })

    addScriptAsync({
      name: 'PayuSDK',
      url: links.payu,
      includeNoScript: false,
    })
      .then(() => {
        Sentry.addBreadcrumb({
          type: 'info',
          category: 'pago',
          message:
            'Definiendo configuración y obteniendo métodos de pago disponibles',
          data: {
            'payU.setUrl': links.payuPayments,
            'payU.setPublicKey': links.payuPublicKey,
            'payU.setAccountID': links.payuAccountID,
            'payU.setListBoxID': 'mylistID',
            'payU.setLanguage': 'es',
            'payU.getPaymentMethods': 'function',
          },
          level: 'info',
        })
        window.payU.setURL(links.payuPayments)
        window.payU.setPublicKey(links.payuPublicKey)
        window.payU.setAccountID(links.payuAccountID)
        window.payU.setListBoxID('mylistID')
        window.payU.setLanguage('es')
        window.payU.getPaymentMethods()
      })
      .catch((errPayuSDK) => {
        Sentry.captureEvent({
          message: 'El SDK PayU no ha cargado correctamente',
          level: 'error',
          extra: errPayuSDK || {},
        })
      })
  }, [])

  React.useEffect(() => {
    const origin = getSessionStorage('paywall_type_modal') || 'organico'
    const referer = getSessionStorage('paywall_last_url') || ''

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'checkoutOption',
      ecommerce: {
        checkout_option: {
          actionField: { step: 3 },
        },
      },
    })

    sendAction(PixelActions.PAYMENT_CARD_INFO, {
      sku: `${sku}`,
      referer,
      medioCompra: origin,
      periodo: billingFrequency,
      priceCode,
      suscriptorImpreso: printedSubscriber ? 'si' : 'no',
      pwa: PWA.isPWA() ? 'si' : 'no',
    })

    TagsAdsMurai(
      {
        event: 'adsmurai_pageview',
        em: email,
        fn: `${firstName || ''}`,
        ln: `${lastName || ''} ${secondLastName || ''}`,
        ct: `${province || ''}`,
        ph: `${phone || ''}`,
      },
      window.location.pathname
    )

    updateLoadPage(false)
  }, [])

  const stateSchema = {
    cNumber: { value: '', error: '' },
    cExpire: { value: '', error: '' },
    cCvv: { value: '', error: '' },
    cTerms: { value: 'no', error: '' },
  }

  const stateValidatorSchema = {
    cNumber: {
      required: true,
      validator: {
        func: (value) =>
          'payU' in window &&
          window.payU.validateCard(value.replace(/\s/g, '')),
        error: 'Número tarjeta inválido.',
      },
    },
    cExpire: {
      required: true,
      validator: {
        func: (value) =>
          /^(0[1-9]|1[0-2])\/?(((202)\d{1}|(202)\d{1})|(2)\d{1})$/.test(value),
        error: 'Fecha incorrecta',
      },
    },
    cCvv: {
      required: true,
      validator: {
        func: (value) => /^([0-9]{3,})+$/.test(value),
        error: 'CVV Inválido',
      },
    },
    cTerms: {
      required: true,
      validator: acceptCheckTermsPay(),
    },
  }

  const onFormPay = ({ cNumber, cExpire, cCvv }) => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      if (isLogged()) {
        let payUPaymentMethod
        let orderNumberDinamic

        window.fbq('track', 'AddPaymentInfo', {
          content_category: name,
          content_ids: [sku],
          contents: [{ id: sku, quantity: 1 }],
          currency: 'PEN',
          value: amount,
          num_items: 1,
        })

        Sentry.addBreadcrumb({
          type: 'info',
          category: 'pago',
          message: 'El usuario ha iniciado el proceso de pago',
          data: {
            'payU.validateNumber': 'private',
            'Sales.clearCart': 'function',
          },
          level: 'info',
        })

        window.payU.validateNumber(cNumber.replace(/\s/g, ''))

        const fullUserName = `${firstName} ${lastName} ${
          secondLastName && secondLastName !== 'undefined' ? secondLastName : ''
        }`
        const cExpireMonth = cExpire.split('/')[0]
        const cExpireYear = cExpire.split('/')[1]

        updateLoadPage(true)
        setMsgError(false)
        setTxtLoading('Preparando Orden...')

        Sales.clearCart()
          .then(() => {
            Sentry.addBreadcrumb({
              type: 'info',
              category: 'pago',
              message: 'Agregando elemento al carrito',
              data: { 'Sales.addItemToCart': [userPlan] },
              level: 'info',
            })
            return Sales.addItemToCart([userPlan])
          })
          .then(() => {
            Sentry.addBreadcrumb({
              type: 'info',
              category: 'pago',
              message: 'Creando nuevo pedido',
              data: {
                'Sales.createNewOrder': {
                  document: `${documentType}_${documentNumber}`,
                  email,
                  phone,
                  firstName,
                  lastName,
                  secondLastName,
                },
              },
              level: 'info',
            })
            return Sales.createNewOrder(
              { country: 'PE', line2: `${documentType}_${documentNumber}` },
              email,
              phone,
              firstName,
              lastName,
              secondLastName,
              { country: 'PE' }
            )
          })
          .then((resOrder) => {
            Sentry.addBreadcrumb({
              type: 'info',
              category: 'pago',
              message: 'Obteniendo opciones de pago',
              data: {
                'Sales.getPaymentOptions': 'function',
              },
              level: 'info',
            })
            return Sales.getPaymentOptions()
              .then((resPayOptions) => {
                setTxtLoading('Iniciando Proceso...')

                payUPaymentMethod = resPayOptions?.find(
                  (m) => m?.paymentMethodType === 8
                )
                orderNumberDinamic = resOrder?.orderNumber
                const { paymentMethodID } = payUPaymentMethod || {}

                Sentry.addBreadcrumb({
                  type: 'info',
                  category: 'pago',
                  message: 'Iniciando proceso de pago',
                  data: {
                    options: resPayOptions,
                    'Sales.initializePayment': {
                      orderNumberDinamic,
                      paymentMethodID,
                    },
                  },
                  level: 'info',
                })

                return Sales.initializePayment(
                  orderNumberDinamic,
                  paymentMethodID
                )
              })
              .catch((paymentError) => {
                Sentry.captureEvent({
                  message:
                    paymentError?.error || getCodeError(paymentError?.code),
                  level: 'error',
                  extra: paymentError || {},
                })
              })
              .then((resInitialize) => {
                const {
                  orderNumber,
                  parameter1: publicKey,
                  parameter2: accountId,
                  parameter3: payuBaseUrl,
                  parameter4: deviceSessionId,
                } = resInitialize || {}

                Sentry.addBreadcrumb({
                  type: 'info',
                  category: 'compra',
                  message: 'Solicitando autorización',
                  data:
                    {
                      orderNumber,
                      deviceSessionId,
                      'payU.setURL': payuBaseUrl,
                      'payU.setPublicKey': publicKey,
                      'payU.setAccountID': accountId,
                      'payU.validateNumber': 'private',
                      'payU.setCardDetails': 'private',
                    } || {},
                  level: 'info',
                })

                setTxtLoading('Solicitando Autorización...')
                window.payU.setURL(payuBaseUrl)
                window.payU.setPublicKey(publicKey)
                window.payU.setAccountID(accountId)
                window.payU.validateNumber(cNumber.replace(/\s/g, ''))
                window.payU.setCardDetails({
                  number: cNumber.replace(/\s/g, ''),
                  // name_card: isSandbox ? 'APPROVED' : fullUserName.replace(/'/g, ''),
                  name_card: fullUserName.replace(/'/g, ''),
                  payer_id: documentNumber,
                  exp_month: cExpireMonth,
                  exp_year: cExpireYear,
                  method: methodCard || window.payU.card.method,
                  document: documentNumber,
                  cvv: cCvv,
                })

                const handleCreateToken = new Promise((resolve, reject) => {
                  setTxtLoading('Validando Solicitud...')
                  Sentry.addBreadcrumb({
                    type: 'info',
                    category: 'compra',
                    message: 'Creando token de compra',
                    data: {
                      'payU.createToken': 'callback',
                    },
                    level: 'info',
                  })
                  window.payU.createToken((response) => {
                    if (response?.error) {
                      reject(new Error(response.error))
                      setMsgError(response.error)
                      setLoading(false)
                      updateLoadPage(false)
                      window.dataLayer.push({
                        event: 'failedTransaction',
                        ecommerce: {
                          failedTransaction: {
                            actionField: { id: orderNumberDinamic },
                          },
                        },
                      })

                      // Datalayer solicitados por Joao
                      TaggeoJoao(
                        {
                          event: 'Pasarela Suscripciones Digitales',
                          category: eventCategory({
                            step: 2,
                            event,
                            hasPrint: printedSubscriber,
                            plan: name,
                            cancel: true,
                          }),
                          action: `${userPeriod}  | Tarjeta - ${
                            methodCard || window.payU.card.method
                          } - ${
                            response.error || getCodeError('errorFinalize')
                          }`,
                          label: uuid,
                        },
                        window.location.pathname
                      )

                      Sentry.captureEvent({
                        message:
                          response.error || getCodeError('transactionError'),
                        level: 'error',
                        extra: response || {},
                      })
                    } else if (response?.token) {
                      resolve(response.token)
                    } else {
                      reject(new Error(getCodeError('errorNoTokenPayU')))
                      setMsgError(getCodeError('errorNoTokenPayU'))
                      setLoading(false)
                      Sentry.captureEvent({
                        message: getCodeError('errorNoTokenPayU'),
                        level: 'error',
                        extra: {},
                      })
                    }
                  })
                })

                return handleCreateToken.then((resToken) => {
                  const { paymentMethodID, paymentMethodType } =
                    payUPaymentMethod || {}
                  const tokenDinamic = `${resToken}~${deviceSessionId}~${cCvv}`
                  setTxtLoading('Finalizando Proceso...')

                  Sentry.addBreadcrumb({
                    type: 'info',
                    category: 'compra',
                    message: 'Finalizando proceso de compra',
                    data: {
                      'Sales.finalizePayment': {
                        orderNumberDinamic,
                        paymentMethodID,
                        tokenDinamic: 'private',
                      },
                    },
                    level: 'info',
                  })

                  return Sales.finalizePayment(
                    orderNumberDinamic,
                    paymentMethodID,
                    tokenDinamic
                  )
                    .then((resFinalize) => {
                      Sentry.addBreadcrumb({
                        type: 'info',
                        category: 'compra',
                        message: 'Compra confirmada',
                        data: resFinalize,
                        level: 'info',
                      })

                      const { status, total, subscriptionIDs } =
                        resFinalize || {}
                      updatePurchase(resFinalize)

                      // Datalayer solicitados por Joao
                      TaggeoJoao(
                        {
                          event: 'Pasarela Suscripciones Digitales',
                          category: eventCategory({
                            step: 2,
                            event,
                            hasPrint: printedSubscriber,
                            plan: name,
                          }),
                          action: `${userPeriod} | Tarjeta - ${
                            methodCard || window.payU.card.method
                          }`,
                          label: uuid,
                        },
                        window.location.pathname
                      )

                      return {
                        publicKey,
                        accountId,
                        payuBaseUrl,
                        deviceSessionId,
                        paymentMethodID,
                        paymentMethodType,
                        subscriptionIDs,
                        status,
                        total,
                      }
                    })
                    .catch((errFinalize = {}) => {
                      setMsgError(getCodeError(errFinalize.code))
                      setLoading(false)
                      updateLoadPage(false)
                      window.dataLayer.push({
                        event: 'failedTransaction',
                        ecommerce: {
                          failedTransaction: {
                            actionField: { id: orderNumberDinamic },
                          },
                        },
                      })

                      // Datalayer solicitados por Joao
                      TaggeoJoao(
                        {
                          event: 'Pasarela Suscripciones Digitales',
                          category: eventCategory({
                            step: 2,
                            event,
                            hasPrint: printedSubscriber,
                            plan: name,
                            cancel: true,
                          }),
                          action: `${userPeriod}  | Tarjeta - ${
                            methodCard || window.payU.card.method
                          } - ${
                            errFinalize.message || getCodeError('errorFinalize')
                          }`,
                          label: uuid,
                        },
                        window.location.pathname
                      )

                      Sentry.captureEvent({
                        message:
                          errFinalize.message || getCodeError('errorFinalize'),
                        level: 'error',
                        extra: errFinalize || {},
                      })
                    })
                })
              })
          })
      } else {
        Sentry.captureEvent({
          message: getCodeError('lostSession'),
          level: 'error',
        })
        setTimeout(() => {
          updateStep(1)
          window.location.reload()
        }, 1000)
      }
    }
  }

  const validateCardNumber = (e) => {
    if (typeof window !== 'undefined' && 'payU' in window) {
      window.payU.validateCard(e.target.value)
      setMethodCard(window.payU.card.method)
    }
  }

  const {
    values: { cNumber, cExpire, cCvv },
    errors: {
      cNumber: cNumberError,
      cExpire: cExpireError,
      cCvv: cCvvError,
      cTerms: cTermsError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFormPay)

  const handleOnChangeInput = (e) => {
    if (typeof window !== 'undefined') {
      if (isLogged()) {
        setMsgError(false)
        handleOnChange(e)
      } else {
        updateStep(1)
        window.location.reload()
      }
    }
  }

  const openNewTab = (typeLink) => {
    if (typeof window !== 'undefined') {
      window.open(urls[typeLink] ? urls[typeLink] : typeLink, '_blank')
    }
  }

  const getCardNumber = () => {
    if (typeof window !== 'undefined' && 'payU' in window) {
      if (cNumber.length >= 1) {
        window.payU.validateNumber(cNumber.replace(/\s/g, ''))
        setMethodCard(window.payU.card.method)
      }
    }
  }

  const handlePayEfective = (e) => {
    if (typeof window !== 'undefined') {
      const nameButon = e.target.name.split('-').join(' ')
      setLoading(true)
      setTxtLoading('Generando CIP...')
      updatePeOption(nameButon)

      // Datalayer solicitados por Joao
      TaggeoJoao(
        {
          event: 'Pasarela Suscripciones Digitales',
          category: eventCategory({
            step: 2,
            event,
            plan: name,
          }),
          action: `${userPeriod} | PE - ${nameButon}`,
          label: uuid,
        },
        window.location.pathname
      )

      setTimeout(() => {
        updateStep(5)
      }, 1000)
    }
  }

  return (
    <>
      <ul className={styles.step}>
        <li className="active">Perfil</li>
        <li className="active">Pago</li>
        <li>Confirmación</li>
      </ul>

      <h3 className={styles.subtitle}>{texts.titlePay}</h3>

      <div className="payment-tab">
        <input
          defaultChecked
          id="tab1"
          type="radio"
          name="optpay"
          onChange={() => updateMethodPay('cardCreDeb')}
        />
        <input
          id="tab2"
          type="radio"
          name="optpay"
          onChange={() => updateMethodPay('payEfectivo')}
        />

        {userPeriod !== 'Mensual' &&
          !disablePagoEfectivo &&
          isAllowedDomainPagoEfectivo && (
            <nav>
              <ul className={styles.tabpay}>
                <li className="cards tab1">
                  <label htmlFor="tab1">
                    Tarjeta de <br /> crédito / Débito <i />
                  </label>
                </li>
                <li className="efectivo tab2">
                  <label htmlFor="tab2">
                    <i /> Transferencias /Depósitos en efectivo
                  </label>
                </li>
              </ul>
            </nav>
          )}

        <section>
          <div className={styles.tabCard1}>
            <div className={styles.card}>
              <p>Aceptamos:</p>
              <i className="icon-visa" />
              <i className="icon-mc" />
              <i className="icon-amex" />
              <i className="icon-dinners" />
            </div>

            {msgError && (
              <div className={styles.block}>
                <div className="msg-alert">{msgError}</div>
              </div>
            )}

            <form onSubmit={handleOnSubmit} className="form-pay">
              <div className={styles.block}>
                <label htmlFor="cNumber">
                  {texts.labelcNumber}
                  <TextMask
                    mask={patternCard}
                    guide={false}
                    className={cNumberError && 'input-error'}
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    name="cNumber"
                    maxLength="19"
                    value={cNumber}
                    required
                    onChange={handleOnChangeInput}
                    onBlur={handleOnChangeInput}
                    onKeyUp={validateCardNumber}
                    placeholder="0000 0000 0000 0000"
                    disabled={loading}
                  />
                  {cNumberError && (
                    <span className="msn-error">{cNumberError}</span>
                  )}
                  <div id="mylistID" className="img-input-card" />
                </label>
              </div>

              <div className="step__left-block-middle">
                <div className="block">
                  <label htmlFor="cExpire">
                    {texts.labelcExpire}
                    <TextMask
                      mask={patternDate}
                      guide={false}
                      className={cExpireError && 'input-error'}
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      name="cExpire"
                      maxLength="7"
                      value={cExpire}
                      required
                      onChange={handleOnChangeInput}
                      onBlur={handleOnChangeInput}
                      onKeyUp={getCardNumber}
                      placeholder="mm/aaaa"
                      disabled={loading}
                    />
                    {cExpireError && (
                      <span className="msn-error">{cExpireError}</span>
                    )}
                  </label>
                </div>

                <div className="block">
                  <label htmlFor="cCvv">
                    {texts.labelcCvv}
                    <button
                      type="button"
                      className="tooltip step__btn-link"
                      tabIndex={-1}>
                      <i className="icon-info"> </i>
                      <span className="tooltiptext-leftarrow">
                        {texts.whereCvv}
                        <i
                          className={
                            methodCard === 'AMEX'
                              ? styles.cvvAmex
                              : styles.cvvAll
                          }
                        />
                      </span>
                    </button>
                    <TextMask
                      mask={patterCvv}
                      guide={false}
                      className={cCvvError && 'input-error'}
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      name="cCvv"
                      maxLength={methodCard === 'AMEX' ? '4' : '3'}
                      value={cCvv}
                      required
                      onChange={handleOnChangeInput}
                      onBlur={handleOnChangeInput}
                      onKeyUp={getCardNumber}
                      placeholder={methodCard === 'AMEX' ? '****' : '***'}
                      disabled={loading}
                    />
                    {cCvvError && (
                      <span className="msn-error">{cCvvError}</span>
                    )}
                  </label>
                </div>
              </div>

              <div className={styles.block}>
                <label htmlFor="cTerms" className="terms">
                  <input
                    id="cTerms"
                    value={checkedTerms ? 'si' : 'no'}
                    type="checkbox"
                    name="cTerms"
                    required
                    disabled={loading}
                    onChange={(e) => {
                      handleOnChange(e)
                      setCheckedTerms(!checkedTerms)
                    }}
                  />
                  {texts.termsAccept}
                  <button
                    className="step__btn-link"
                    type="button"
                    onClick={() => openNewTab('terminos')}>
                    {texts.termsConditions}
                  </button>
                  {texts.textTermsThe}
                  <button
                    className="step__btn-link"
                    type="button"
                    onClick={() => openNewTab('politicas')}>
                    {texts.textTermsPolices}
                  </button>
                  {texts.textTermsAccord}
                  <span
                    className={`checkmark ${cTermsError && 'input-error'}`}
                  />
                </label>
              </div>

              {cTermsError && (
                <div className={styles.block}>
                  <div className="msg-alert">{cTermsError}</div>
                </div>
              )}

              <div className={styles.block}>
                <button
                  className={`${styles.btn} ${loading && 'btn-loading'}`}
                  type="submit"
                  disabled={disable || loading}>
                  {loading ? txtLoading : 'Pagar suscripción'}
                </button>
              </div>
            </form>

            <p className={styles.secure}>
              <i className="icon-security" />
              {texts.showSecure}
            </p>
          </div>

          <div className={styles.tabCard2}>
            <div className="efectivo-tab">
              <input defaultChecked id="tab3" type="radio" name="optefectivo" />
              <input id="tab4" type="radio" name="optefectivo" />

              <nav>
                <ul>
                  <li className="tab3">
                    <label htmlFor="tab3">
                      Banca Móvil
                      <span className="checkmark" />
                    </label>
                  </li>
                  <li className="tab4">
                    <label htmlFor="tab4">
                      Agentes y Bodegas
                      <span className="checkmark" />
                    </label>
                  </li>
                </ul>
              </nav>

              <section>
                <div className="tab3">
                  {texts.textBanca}
                  <button
                    className="step__btn-link"
                    type="button"
                    onClick={() => openNewTab(links.howItWork)}>
                    {texts.howItWork}
                  </button>
                  <div className="img-movil" />
                  <form className="form-pay">
                    <div className={styles.block}>
                      <button
                        className={`${styles.btn} ${loading && 'btn-loading'}`}
                        type="button"
                        name="Banca-por-Internet"
                        onClick={handlePayEfective}
                        disabled={loading}>
                        {loading ? txtLoading : 'Generar código'}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="tab4">
                  {texts.textAgentes}
                  <button
                    className="step__btn-link"
                    type="button"
                    onClick={() => openNewTab(links.howItWork)}>
                    {texts.howItWork}
                  </button>
                  <div className="img-agentes" />
                  <form className="form-pay">
                    <div className={styles.block}>
                      <button
                        className={`${styles.btn} ${loading && 'btn-loading'}`}
                        type="button"
                        name="Agencia"
                        onClick={handlePayEfective}
                        disabled={loading}>
                        {loading ? txtLoading : 'Generar código'}
                      </button>
                    </div>
                  </form>
                </div>
                <p className={styles.secure}>
                  <i className="icon-security" />
                  {texts.showSecure}
                </p>
              </section>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Pay
