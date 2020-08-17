/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext, useEffect } from 'react'
import TextMask from 'react-text-mask'
import useForm from '../../_hooks/useForm'
import getCodeError, { acceptCheckTermsPay } from '../../_dependencies/Errors'
import { conformProfile } from '../../_dependencies/Session'
import addPayU from '../../_dependencies/Payu'
import { AuthContext } from '../../_context/auth'
import { patternCard, patternDate, patterCvv } from '../../_dependencies/Regex'
import PropertiesSite from '../../_dependencies/Properties'
import addScriptAsync from '../../_dependencies/Async'

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

const Pay = ({ arcSite, arcEnv }) => {
  const { userProfile, userPlan, updatePurchase, updateLoadPage } = useContext(
    AuthContext
  )
  const { texts } = PropertiesSite.common
  const { urls } = PropertiesSite[arcSite]
  const { links } = PropertiesSite.common

  const {
    email,
    phone,
    firstName,
    lastName,
    secondLastName,
    documentType,
    documentNumber,
  } = conformProfile(userProfile) || {}

  const [msgError, setMsgError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [txtLoading, setTxtLoading] = useState('Cargando...')
  const [methodCard, setMethodCard] = useState()
  const [checkedTerms, setCheckedTerms] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      addScriptAsync({
        name: 'SalesSDK',
        url: links.sales[arcEnv],
        includeNoScript: false,
      }).then(() => window.Sales.options({ apiOrigin: urls.arcOrigin[arcEnv] }))

      addScriptAsync({
        name: 'PayuSDK',
        url: links.payu[arcEnv],
        includeNoScript: false,
      }).then(() => {
        window.payU.setURL(
          'https://sandbox.api.payulatam.com/payments-api/4.0/service'
        )
        window.payU.setPublicKey('PKaC6H4cEDJD919n705L544kSU')
        window.payU.setAccountID('512321')
        window.payU.setListBoxID('mylistID')
        window.payU.setLanguage('es') // optional
        window.payU.getPaymentMethods()
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
      let payUPaymentMethod
      let orderNumberDinamic

      // const fullUserName = `${firstName} ${lastName} ${secondLastName}`
      const cExpireMonth = cExpire.split('/')[0]
      const cExpireYear = cExpire.split('/')[1]

      setLoading(true)
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

              return addPayU(deviceSessionId)
                .then(payU => {
                  setTxtLoading('Solicitando Autorización...')
                  payU.setURL(payuBaseUrl)
                  payU.setPublicKey(publicKey)
                  payU.setAccountID(accountId)
                  // payU.setListBoxID('mylistID')
                  // payU.setLanguage('es')
                  // payU.getPaymentMethods()
                  payU.setCardDetails({
                    number: cNumber.replace(/\s/g, ''),
                    name_card: 'APPROVED', // APPROVED SOLO PARA FINES DE DESAROLLO fullUserName ES PARA PROD
                    payer_id: documentNumber,
                    exp_month: cExpireMonth,
                    exp_year: cExpireYear,
                    method: methodCard,
                    document: documentNumber,
                    cvv: cCvv,
                  })
                  return new Promise((resolve, reject) => {
                    setTxtLoading('Validando Solicitud...')
                    payU.createToken(response => {
                      if (response.error) {
                        reject(new Error(response.error))
                        setMsgError(response.error)
                        setLoading(false)
                        updateLoadPage(false)
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
                  return window.Sales.finalizePayment(
                    orderNumberDinamic,
                    paymentMethodID,
                    tokenDinamic
                  )
                    .then(resFinalize => {
                      const { status, total, subscriptionIDs } = resFinalize
                      // if (status !== 'Paid') {
                      //   setMsgError(getCodeError('NoPaid', status))
                      // }
                      updatePurchase(resFinalize)
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
                    })
                })
            })
        )
      // .catch(errNewOrder => {
      //   setMsgError(getCodeError(errNewOrder.code))
      //   setLoading(false)
      //   updateLoadPage(false)
      // })
    }
  }

  const validateCardNumber = e => {
    if (typeof window !== 'undefined') {
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
    setMsgError(false)
    handleOnChange(e)
  }

  const openNewTab = typeLink => {
    if (typeof window !== 'undefined') {
      window.open(urls[typeLink], '_blank')
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
              onBlur={handleOnChange}
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
                onFocus={handleOnChange}
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
                onBlur={handleOnChange}
                placeholder="***"
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
            {texts.textTermsAccept}
            <button
              className="step__btn-link"
              type="button"
              onClick={() => openNewTab('terminos')}>
              {texts.textTermsConditions}
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
