/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useContext, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import TextMask from 'react-text-mask'
import * as Sentry from '@sentry/browser'
import useForm from '../../../_hooks/useForm'
import { conformProfile, isLogged } from '../../../_dependencies/Session'
import addPayU from '../../../_dependencies/Payu'
import { AuthContext } from '../../../_context/auth'
import addScriptAsync from '../../../_dependencies/Async'
import { PixelActions, sendAction } from '../../../_dependencies/Taggeo'
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
    globalContent: { plans = [], printedSubscriber },
  } = useFusionContext() || {}

  const {
    userProfile,
    userPlan,
    updateStep,
    updatePurchase,
    updateLoadPage,
  } = useContext(AuthContext)
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

  const [msgError, setMsgError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [txtLoading, setTxtLoading] = useState('Cargando...')
  const [methodCard, setMethodCard] = useState()
  const [checkedTerms, setCheckedTerms] = useState()

  const getPLanSelected = plans.reduce((prev, plan) => {
    return plan.priceCode === userPlan.priceCode ? plan : prev
  }, null)

  const { amount, sku, billingFrequency, priceCode, name } =
    getPLanSelected || {}

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })

      addScriptAsync({
        name: 'SalesSDK',
        url: links.sales,
        includeNoScript: false,
      }).then(() => window.Sales.options({ apiOrigin: urls.arcOrigin }))

      addScriptAsync({
        name: 'PayuSDK',
        url: links.payu,
        includeNoScript: false,
      }).then(() => {
        window.payU.setURL(links.payuPayments)
        window.payU.setPublicKey('PKaC6H4cEDJD919n705L544kSU')
        window.payU.setAccountID('512321')
        window.payU.setListBoxID('mylistID')
        window.payU.setLanguage('es')
        window.payU.getPaymentMethods()
      })

      Sentry.configureScope(scope => {
        scope.setTag('brand', arcSite)
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
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = getSessionStorage('paywall_type_modal') || 'organico'
      const referer = getSessionStorage('paywall_last_url') || ''

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
    }
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
          typeof window.payU === 'object' &&
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
          category: 'pago',
          message: 'El Usuario realiza el pago',
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
          .then(() => window.Sales.addItemToCart([userPlan]))
          .then(() =>
            window.Sales.createNewOrder(
              { country: 'PE', line2: `${documentType}_${documentNumber}` },
              email,
              phone,
              firstName,
              lastName,
              secondLastName,
              { country: 'PE' }
            )
          )
          .then(resOrder =>
            window.Sales.getPaymentOptions()
              .then(resPayOptions => {
                setTxtLoading('Iniciando Proceso...')
                payUPaymentMethod = resPayOptions.find(
                  m => m.paymentMethodType === 8
                )
                orderNumberDinamic = resOrder.orderNumber
                const { paymentMethodID } = payUPaymentMethod
                return window.Sales.initializePayment(
                  orderNumberDinamic,
                  paymentMethodID
                )
              })
              .then(resInitialize => {
                const {
                  parameter1: publicKey,
                  parameter2: accountId,
                  parameter3: payuBaseUrl,
                  parameter4: deviceSessionId,
                } = resInitialize

                Sentry.addBreadcrumb({
                  category: 'pago',
                  message: 'Iniciando proceso',
                  data: resInitialize || {},
                  level: 'info',
                })

                return addPayU(deviceSessionId)
                  .then(payU => {
                    setTxtLoading('Solicitando Autorización...')
                    payU.setURL(payuBaseUrl)
                    payU.setPublicKey(publicKey)
                    payU.setAccountID(accountId)
                    payU.validateNumber(cNumber.replace(/\s/g, ''))
                    payU.setCardDetails({
                      number: cNumber.replace(/\s/g, ''),
                      name_card:
                        ArcEnv === 'sandbox' ? 'APPROVED' : fullUserName, // APPROVED SOLO PARA FINES DE DESAROLLO fullUserName ES PARA PROD
                      payer_id: documentNumber,
                      exp_month: cExpireMonth,
                      exp_year: cExpireYear,
                      method: methodCard || payU.card.method,
                      document: documentNumber,
                      cvv: cCvv,
                    })

                    Sentry.addBreadcrumb({
                      category: 'compra',
                      message: 'solicitando autorización',
                      level: 'info',
                    })

                    return new Promise((resolve, reject) => {
                      setTxtLoading('Validando Solicitud...')
                      payU.createToken(response => {
                        if (response.error) {
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
                          Sentry.captureEvent({
                            message:
                              response.error ||
                              getCodeError('transactionError'),
                            level: 'error',
                            extra: response || {},
                          })
                        } else {
                          resolve(response.token)
                        }
                      })
                    })
                  })
                  .then(tokenPayu => {
                    const {
                      paymentMethodID,
                      paymentMethodType,
                    } = payUPaymentMethod
                    const tokenDinamic = `${tokenPayu}~${deviceSessionId}~${cCvv}`
                    setTxtLoading('Finalizando Proceso...')

                    Sentry.addBreadcrumb({
                      category: 'compra',
                      message: 'Finalizando proceso',
                      data: { tokenDinamic },
                      level: 'info',
                    })

                    return window.Sales.finalizePayment(
                      orderNumberDinamic,
                      paymentMethodID,
                      tokenDinamic
                    )
                      .then(resFinalize => {
                        const { status, total, subscriptionIDs } = resFinalize
                        updatePurchase(resFinalize)

                        Sentry.addBreadcrumb({
                          category: 'compra',
                          message: 'Compra confirmada',
                          data: resFinalize,
                          level: 'info',
                        })

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
                      .catch(errFinalize => {
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
                        Sentry.captureEvent({
                          message:
                            errFinalize.message ||
                            getCodeError('errorFinalize'),
                          level: 'error',
                          extra: errFinalize || {},
                        })
                      })
                  })
              })
          )
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
    if (typeof window !== 'undefined' && typeof window.payU === 'object') {
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
    if (typeof window !== 'undefined' && typeof window.payU === 'object') {
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
              <button type="button" className="tooltip step__btn-link">
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
