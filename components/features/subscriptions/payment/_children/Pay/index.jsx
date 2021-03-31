/* eslint-disable jsx-a11y/label-has-for */
import * as React from 'react'
import { useAppContext } from 'fusion:context'
import TextMask from 'react-text-mask'
import * as Sentry from '@sentry/browser'

import useForm from '../../../_hooks/useForm'
import { conformProfile, isLogged } from '../../../_dependencies/Session'
// import addPayU from '../../../_dependencies/Payu'
import { AuthContext } from '../../../_context/auth'
import addScriptAsync from '../../../_dependencies/Async'
import {
  PixelActions,
  sendAction,
  TaggeoJoao,
  eventCategory,
} from '../../../_dependencies/Taggeo'
import { getSessionStorage } from '../../../_dependencies/Utils'
import PWA from '../../../_dependencies/Pwa'
import {
  PropertiesSite,
  PropertiesCommon,
  ArcEnv,
} from '../../../_dependencies/Properties'
import {
  patternCard,
  patternDate,
  patterCvv,
} from '../../../_dependencies/Regex'
import getCodeError, {
  acceptCheckTermsPay,
} from '../../../_dependencies/Errors'

const styles = {
  step: 'step__left-progres',
  card: 'step__left-cards',
  subtitle: 'step__left-subtitle',
  block: 'step__left-block',
  btn: 'step__left-btn-next',
  secure: 'step__left-text-security',
  notes: 'step__left-notes-footer',
  cvvAmex: 'img-info-cvvamex',
  cvvAll: 'img-info-cvv',
}

const Pay = () => {
  const {
    arcSite,
    globalContent: { plans = [], printedSubscriber, event },
  } = useAppContext() || {}

  const {
    userProfile,
    userPlan,
    userPeriod,
    updateStep,
    updatePurchase,
    updateLoadPage,
  } = React.useContext(AuthContext)
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
  } = conformProfile(userProfile || {})

  const [msgError, setMsgError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [txtLoading, setTxtLoading] = React.useState('Cargando...')
  const [methodCard, setMethodCard] = React.useState()
  const [checkedTerms, setCheckedTerms] = React.useState()

  const getPLanSelected = plans.reduce((prev, plan) => {
    return plan.priceCode === userPlan.priceCode ? plan : prev
  }, null)

  const { amount, sku, billingFrequency, priceCode, name } =
    getPLanSelected || {}

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    Sentry.configureScope(scope => {
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
      name: 'SalesSDK',
      url: links.sales,
      includeNoScript: false,
    })
      .then(() => {
        Sentry.addBreadcrumb({
          type: 'info',
          category: 'pago',
          message: 'Definiendo apiOrigin para proceso de pago',
          data: { 'Sales.options': { apiOrigin: urls.arcOrigin } },
          level: 'info',
        })
        window.Sales.options({ apiOrigin: urls.arcOrigin })
      })
      .catch(errSalesSDK => {
        Sentry.captureEvent({
          message: 'SDK Sales no ha cargado correctamente',
          level: 'error',
          extra: errSalesSDK || {},
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
      .catch(errPayuSDK => {
        Sentry.captureEvent({
          message: 'El SDK PayU no ha cargado correctamente',
          level: 'error',
          extra: errPayuSDK || {},
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        func: value =>
          'payU' in window &&
          window.payU.validateCard(value.replace(/\s/g, '')),
        error: 'Número tarjeta inválido.',
      },
    },
    cExpire: {
      required: true,
      validator: {
        func: value =>
          /^(0[1-9]|1[0-2])\/?(((202)\d{1}|(202)\d{1})|(2)\d{1})$/.test(value),
        error: 'Fecha incorrecta',
      },
    },
    cCvv: {
      required: true,
      validator: {
        func: value => /^([0-9]{3,})+$/.test(value),
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

        window.Sales.clearCart()
          .then(() => {
            Sentry.addBreadcrumb({
              type: 'info',
              category: 'pago',
              message: 'Agregando elemento al carrito',
              data: { 'Sales.addItemToCart': [userPlan] },
              level: 'info',
            })
            return window.Sales.addItemToCart([userPlan])
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
            return window.Sales.createNewOrder(
              { country: 'PE', line2: `${documentType}_${documentNumber}` },
              email,
              phone,
              firstName,
              lastName,
              secondLastName,
              { country: 'PE' }
            )
          })
          .then(resOrder => {
            Sentry.addBreadcrumb({
              type: 'info',
              category: 'pago',
              message: 'Obteniendo opciones de pago',
              data: {
                'Sales.getPaymentOptions': 'function',
              },
              level: 'info',
            })
            return window.Sales.getPaymentOptions()
              .then(resPayOptions => {
                setTxtLoading('Iniciando Proceso...')

                payUPaymentMethod = resPayOptions?.find(
                  m => m?.paymentMethodType === 8
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

                return window.Sales.initializePayment(
                  orderNumberDinamic,
                  paymentMethodID
                )
              })
              .catch(paymentError => {
                Sentry.captureEvent({
                  message:
                    paymentError?.error || getCodeError(paymentError?.code),
                  level: 'error',
                  extra: paymentError || {},
                })
              })
              .then(resInitialize => {
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
                  name_card: ArcEnv === 'sandbox' ? 'APPROVED' : fullUserName, // APPROVED SOLO PARA FINES DE DESAROLLO fullUserName ES PARA PROD
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
                  window.payU.createToken(response => {
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
                          action: `${userPeriod} - ${response.error ||
                            getCodeError('errorFinalize')}`,
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

                return handleCreateToken.then(resToken => {
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

                  return window.Sales.finalizePayment(
                    orderNumberDinamic,
                    paymentMethodID,
                    tokenDinamic
                  )
                    .then(resFinalize => {
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
                          action: userPeriod,
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
                          action: `${userPeriod} - ${errFinalize.message ||
                            getCodeError('errorFinalize')}`,
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

  const validateCardNumber = e => {
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

  const handleOnChangeInput = e => {
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

  const openNewTab = typeLink => {
    if (typeof window !== 'undefined') {
      window.open(urls[typeLink], '_blank')
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

  return (
    <>
      <ul className={styles.step}>
        <li className="active">Perfil</li>
        <li className="active">Pago</li>
        <li>Confirmación</li>
      </ul>

      <h3 className={styles.subtitle}>{texts.titlePay}</h3>

      <div className={styles.card}>
        <p>Aceptamos:</p>
        <i className="icon-visa"></i>
        <i className="icon-mc"></i>
        <i className="icon-amex"></i>
        <i className="icon-dinners"></i>
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
            {cNumberError && <span className="msn-error">{cNumberError}</span>}
            <div id="mylistID" className="img-input-card"></div>
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
                      methodCard === 'AMEX' ? styles.cvvAmex : styles.cvvAll
                    }></i>
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
              {cCvvError && <span className="msn-error">{cCvvError}</span>}
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
              onChange={e => {
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
              className={`checkmark ${cTermsError && 'input-error'}`}></span>
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
        <i className="icon-security"></i>
        {texts.showSecure}
      </p>

      <p className={styles.notes}>{texts.rememberRecurrency}</p>
    </>
  )
}

export default Pay
