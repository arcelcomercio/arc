import Identity from '@arc-publishing/sdk-identity'
import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import TextMask from 'react-text-mask'

import Modal from '../../../_children/modal'
import { useAuthContext } from '../../../_context/auth'
import getCodeError, {
  formatEmail,
  formatNames,
  formatPhone,
  formatSecondLastName,
} from '../../../_dependencies/Errors'
import {
  PropertiesCommon,
  PropertiesSite,
} from '../../../_dependencies/Properties'
import PWA from '../../../_dependencies/Pwa'
import { docPatterns, maskDocuments } from '../../../_dependencies/Regex'
import { getEntitlements } from '../../../_dependencies/Services'
import {
  conformProfile,
  getStorageEmailProfile,
  getStorageProfile,
  isLogged,
} from '../../../_dependencies/Session'
import {
  eventCategory,
  PixelActions,
  sendAction,
  Taggeo,
  TaggeoJoao,
  TagsAdsMurai,
} from '../../../_dependencies/Taggeo'
import {
  checkFbEmail,
  checkFormatPhone,
  checkUndefined,
  getSessionStorage,
  setLocaleStorage,
} from '../../../_dependencies/Utils'
import useForm from '../../../_hooks/useForm'

const styles = {
  step: 'step__left-progres',
  subtitle: 'step__left-subtitle',
  block: 'step__left-block',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
}

const nameTagCategory = 'Web_Paywall_Landing'

const Profile = () => {
  const {
    arcSite,
    globalContent: { plans = [], error, subscriber, printedSubscriber, event },
  } = useAppContext() || {}

  const {
    updateStep,
    userLogout,
    updateUser,
    userErrorApi,
    updateErrorApi,
    userPlan,
    userPeriod,
  } = useAuthContext()

  const { urls, emails } = PropertiesSite[arcSite]
  const { texts, links } = PropertiesCommon

  const {
    uuid,
    firstName,
    lastName,
    secondLastName,
    documentType,
    documentNumber,
    email,
    phone,
    emailVerified,
    province,
  } = conformProfile(getStorageProfile())

  const [msgError, setMsgError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [loadText, setLoadText] = React.useState('Cargando...')
  const [linkLogin, setLinkLogin] = React.useState()
  const [showModal, setShowModal] = React.useState()
  const [showDocOption, setShowDocOption] = React.useState(
    documentType || 'DNI'
  )
  const [valNumDocument, setValNumDocument] = React.useState()

  const isFacebook = email && email.indexOf('facebook.com') >= 0

  const selectedPlan = plans.find(
    (plan) => plan.priceCode === userPlan.priceCode
  )

  const {
    amount,
    sku,
    billingFrequency,
    priceCode,
    name: namePlanApi,
    productName,
  } = selectedPlan || {}

  React.useEffect(() => {
    window.scrollTo(0, 0)

    const origin = getSessionStorage('paywall_type_modal') || 'organico'
    const referer = getSessionStorage('paywall_last_url') || ''

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'checkoutOption',
      ecommerce: {
        checkout_option: {
          actionField: { step: 2 },
        },
      },
    })

    sendAction(PixelActions.PAYMENT_PROFILE, {
      sku: `${sku}`,
      periodo: billingFrequency,
      referer,
      medioCompra: origin,
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

    Sentry.configureScope((scope) => {
      scope.setTag('document', documentNumber || 'none')
      scope.setTag('phone', phone || 'none')
      scope.setTag('email', email || 'none')
      scope.setTag('step', 'Perfil')
      scope.setUser({
        id: uuid,
        name: `${firstName} ${lastName} ${secondLastName || ''}`,
        email,
        phone,
        documentType,
        documentNumber,
        emailVerified,
      })
    })

    if (printedSubscriber || error) {
      TaggeoJoao(
        {
          event: 'Pasarela Suscripciones Digitales',
          category: 'P0_Plan_Suscriptor',
          action: printedSubscriber ? 'Aceptado' : `Denegado - ${error}`,
          label: uuid,
        },
        window.location.pathname
      )
    }

    if (error) updateErrorApi(error)
  }, [])

  const stateSchema = {
    uFirstName: { value: checkUndefined(firstName) || '', error: '' },
    uLastName: { value: checkUndefined(lastName) || '', error: '' },
    uSecondLastName: { value: checkUndefined(secondLastName) || '', error: '' },
    uDocumentType: {
      value:
        (printedSubscriber && subscriber?.documentType) ||
        documentType ||
        'DNI',
      error: '',
    },
    uDocumentNumber: {
      value:
        (printedSubscriber && subscriber?.documentNumber) ||
        checkUndefined(documentNumber) ||
        '',
      error: '',
    },
    uPhone: { value: checkFormatPhone(phone) || '', error: '' },
    uEmail: { value: checkFbEmail(email) || '', error: '' },
  }

  const stateValidatorSchema = {
    uFirstName: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    uLastName: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    uSecondLastName: {
      required: false,
      invalidtext: true,
      validator: formatSecondLastName(),
    },
    uDocumentType: {
      required: true,
    },
    uDocumentNumber: {
      required: true,
      validator: {
        func: (value) =>
          docPatterns[showDocOption].test(value.replace(/\s/g, '')) &&
          !value.match(/00000000|12345678/),
        error: 'Formato inválido.',
      },
    },
    uPhone: {
      required: true,
      validator: formatPhone(),
      min6caracts: true,
    },
    uEmail: {
      required: true,
      validator: formatEmail(),
    },
  }

  const checkSubscriptions = () => {
    if (typeof window !== 'undefined') {
      Sentry.addBreadcrumb({
        type: 'info',
        category: 'perfil',
        message: 'Verificando suscripciones para extender sesión',
        data: { 'Identity.heartbeat': 'function' },
        level: 'info',
      })
      return Identity.heartbeat()
        .then((resHeart) =>
          getEntitlements(urls.arcOrigin, resHeart.accessToken)
            .then(
              (resEntitlements) =>
                Array.isArray(resEntitlements.skus) &&
                resEntitlements.skus.length > 0
            )
            .catch((errEntitlements) => {
              Sentry.captureEvent({
                message: 'Error al verificar Suscripciones',
                level: 'error',
                extra: errEntitlements,
              })
            })
        )
        .catch((errHeart) => {
          Sentry.captureEvent({
            message: 'Error al extender la sesión',
            level: 'error',
            extra: errHeart,
          })
        })
    }
    return ''
  }

  const TaggeoEcommerce = () => {
    // este taggeo lo enviaba en el paso 1 al selecionar plan
    window.dataLayer.push({
      event: 'productClick',
      ecommerce: {
        click: {
          products: [
            {
              name: productName,
              id: sku,
              price: amount,
              brand: arcSite,
              category: namePlanApi,
              subCategory: billingFrequency,
            },
          ],
        },
      },
    })

    window.fbq('track', 'InitiateCheckout', {
      content_category: namePlanApi,
      content_ids: [priceCode],
      contents: [{ id: priceCode, quantity: 1 }],
      currency: 'PEN',
      num_items: 1,
      value: amount,
    })

    window.dataLayer.push({
      event: 'checkout',
      ecommerce: {
        checkout: {
          actionField: { step: 1 },
          products: [
            {
              name: productName,
              id: sku,
              price: amount,
              brand: arcSite,
              category: namePlanApi,
              subCategory: billingFrequency,
            },
          ],
        },
      },
    })
  }

  const updateProfile = ({
    uFirstName,
    uLastName,
    uSecondLastName,
    uEmail,
    uPhone,
    uDocumentType,
    uDocumentNumber,
  }) => {
    if (typeof window !== 'undefined') {
      Sentry.addBreadcrumb({
        type: 'info',
        category: 'perfil',
        message: 'Usuario inicia actualización de datos de perfil',
        data: {
          uFirstName,
          uLastName,
          uSecondLastName,
          uEmail,
          uPhone,
          uDocumentType,
          uDocumentNumber,
        },
        level: 'info',
      })

      let { attributes: uAttributes = [] } = Identity.userProfile || {}
      if (!uAttributes) uAttributes = []
      const addAttributes = (name, value) =>
        uAttributes.push({
          name,
          value: value.trim(),
          type: 'String',
        })
      addAttributes('documentType', uDocumentType)
      addAttributes('documentNumber', uDocumentNumber)
      const getUniqueListBy = (arr, key) => [
        ...new Map(arr.map((item) => [item[key], item])).values(),
      ]
      const clearAttrRepeats = getUniqueListBy(uAttributes, 'name')
      const clearOriginReferer = clearAttrRepeats.map((attribute) => {
        if (attribute.name === 'originReferer') {
          return {
            ...attribute,
            value: attribute.value
              .split('&')[0]
              .replace(/(\/|=|#|\/#|#\/|=\/|\/=)$/, ''),
          }
        }
        return attribute
      })

      let profile = {
        contacts: [{ phone: uPhone.trim(), type: 'PRIMARY' }],
        attributes: clearOriginReferer,
        displayName: uEmail.trim(),
        email: uEmail.trim(),
        firstName: uFirstName.trim(),
        lastName: uLastName.trim(),
      }

      if (uSecondLastName.length >= 2) {
        profile = Object.assign(profile, {
          secondLastName: uSecondLastName.trim(),
        })
      }

      TaggeoJoao(
        {
          event: 'Pasarela Suscripciones Digitales',
          category: eventCategory({
            step: 1,
            event,
            hasPrint: printedSubscriber,
            plan: namePlanApi,
          }),
          action: userPeriod,
          label: uuid,
        },
        window.location.pathname
      )

      TagsAdsMurai(
        {
          event: 'AddToCart',
          content_ids: sku,
          content_type: 'product',
          content_name: namePlanApi,
          value: amount,
          currency: 'PEN',
          subscription_type: userPeriod,
        },
        window.location.pathname
      )

      if (
        (getStorageEmailProfile() !== uEmail && isFacebook) ||
        getStorageEmailProfile() === uEmail
      ) {
        setLoadText('Actualizando Perfil...')
        Sentry.addBreadcrumb({
          type: 'info',
          category: 'perfil',
          message: 'Actualizando datos de perfil',
          data: { 'Identity.updateUserProfile': profile },
          level: 'info',
        })

        Identity.updateUserProfile(profile)
          .then((resProfile) => {
            updateUser(resProfile)
            TaggeoEcommerce()
            updateStep(3)
          })
          .catch((err) => {
            if (err.code === '100018' || err.code === '300040') {
              const currentProfile = Identity.userProfile
              const newProfile = Object.assign(currentProfile, profile)
              setLocaleStorage('ArcId.USER_PROFILE', newProfile)
              updateUser(newProfile)
              TaggeoEcommerce()
              Sentry.captureEvent({
                message: 'Usuario no actualizó perfil',
                level: 'info',
                extra: err,
              })
              updateStep(3)
            } else {
              setMsgError(getCodeError(err.code))
              Sentry.captureEvent({
                message: 'Error al actualizar perfil',
                level: 'error',
                extra: err,
              })
            }
            setLinkLogin(err.code === '3001001' || err.code === '100011')
          })
          .finally(() => setLoading(false))
      } else {
        Sentry.captureEvent({
          message: 'El Usuario intentó actualizar datos de otra sesión',
          level: 'info',
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    }
  }

  const restoreClearSession = () => {
    Sentry.captureEvent({
      message: getCodeError('lostSession'),
      level: 'error',
    })
    setTimeout(() => {
      updateStep(1)
      window.location.reload()
    }, 1000)
  }

  const onFormProfile = (props) => {
    if (typeof window !== 'undefined') {
      const { uDocumentType, uDocumentNumber } = props

      if (uDocumentType === 'DNI' && uDocumentNumber.length !== 8) {
        setValNumDocument('Formato inválido.')
        return
      }

      updateErrorApi(null)
      setLoading(true)
      if (isLogged()) {
        setLoadText('Verificando Suscripciones...')
        checkSubscriptions().then((resSubs) => {
          if (resSubs) {
            setShowModal(true)
            setLoading(false)
            Taggeo(nameTagCategory, 'web_paywall_open_validation')
          } else {
            updateProfile(props)
          }
        })
      } else {
        restoreClearSession()
      }
    }
  }

  const {
    values: {
      uFirstName,
      uLastName,
      uSecondLastName,
      uDocumentType,
      uDocumentNumber,
      uPhone,
      uEmail,
    },
    errors: {
      uFirstName: uFirstNameError,
      uLastName: uLastNameError,
      uSecondLastName: uSecondLastNameError,
      uDocumentNumber: uDocumentNumberError,
      uPhone: uPhoneError,
      uEmail: uEmailError,
    },
    handleOnChange,
    handleOnSubmit,
  } = useForm(stateSchema, stateValidatorSchema, onFormProfile)

  const handleClickCancel = () => {
    setShowModal(false)
    window.sessionStorage.setItem('paywall_confirm_subs', '2')
    Taggeo(nameTagCategory, 'web_paywall_close_validation')

    // Datalayer solicitados por Joao
    TaggeoJoao(
      {
        event: 'Pasarela Suscripciones Digitales',
        category: eventCategory({
          step: 1,
          event,
          hasPrint: printedSubscriber,
          plan: namePlanApi,
          cancel: true,
        }),
        action: userPeriod,
        label: uuid,
      },
      window.location.pathname
    )
  }

  const handleClickYes = () => {
    setShowModal(false)
    window.sessionStorage.setItem('paywall_confirm_subs', '1')
    Taggeo(nameTagCategory, 'web_paywall_continue_validation')
    updateProfile({
      uFirstName,
      uLastName,
      uSecondLastName,
      uDocumentType,
      uDocumentNumber,
      uPhone,
      uEmail,
    })
  }

  const handleChangeInput = (e) => {
    if (isLogged()) {
      if (e.target.name === 'uDocumentType') {
        const numDoc = document.getElementsByName('uDocumentNumber')[0].value
        if (numDoc && e.target.value === 'DNI' && numDoc.length !== 8) {
          setValNumDocument(false)
        }
      }
      setMsgError(false)
      updateErrorApi(null)
      setValNumDocument(false)
      handleOnChange(e)
    } else {
      restoreClearSession()
    }
  }

  const logoutUser = () => {
    Identity.logout()
      .catch((err) =>
        Sentry.captureEvent({
          message: 'Error al cerrar sesión con Identity',
          level: 'error',
          extra: err,
        })
      )
      .finally(() => {
        userLogout()
      })
  }

  const handleProfile = () => {
    Taggeo(nameTagCategory, 'web_paywall_profile_validation')
    window.open(links.profile, '_blank')
  }

  return (
    <>
      <ul className={styles.step}>
        <li className="active">Perfil</li>
        <li>Pago</li>
        <li>Confirmación</li>
      </ul>
      <h3 className={styles.subtitle}>Ingresa tus datos personales</h3>

      {(msgError || userErrorApi) && (
        <div className={styles.block}>
          <div className="msg-alert">
            {` ${msgError || userErrorApi} `}
            {linkLogin && (
              <>
                <button
                  className="step__btn-link"
                  type="button"
                  onClick={logoutUser}>
                  Click aquí
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {printedSubscriber && (
        <div className={styles.block}>
          <div className="msg-success">{texts.successSubsPrint}</div>
        </div>
      )}

      <form onSubmit={handleOnSubmit} className="form-profile">
        <div className={styles.block}>
          <label htmlFor="uFirstName">
            Nombre
            <input
              className={uFirstNameError && 'input-error'}
              type="text"
              autoComplete="given-name"
              name="uFirstName"
              value={uFirstName}
              required
              onChange={handleChangeInput}
              maxLength="50"
              onBlur={handleChangeInput}
              disabled={loading}
            />
            {uFirstNameError && (
              <span className="msn-error">{uFirstNameError}</span>
            )}
          </label>
        </div>

        <div className={styles.block}>
          <label htmlFor="uLastName">
            Apellido Paterno
            <input
              className={uLastNameError && 'input-error'}
              type="text"
              autoComplete="family-name"
              name="uLastName"
              value={uLastName}
              required
              onChange={handleChangeInput}
              maxLength="50"
              onBlur={handleChangeInput}
              disabled={loading}
            />
            {uLastNameError && (
              <span className="msn-error">{uLastNameError}</span>
            )}
          </label>
        </div>

        <div className={styles.block}>
          <label htmlFor="uSecondLastName">
            Apellido Materno
            <input
              className={uSecondLastNameError && 'input-error'}
              type="text"
              name="uSecondLastName"
              value={uSecondLastName}
              maxLength="50"
              onChange={handleChangeInput}
              disabled={loading}
            />
            {uSecondLastNameError && (
              <span className="msn-error">{uSecondLastNameError}</span>
            )}
          </label>
        </div>

        <div className={styles.block}>
          <label htmlFor="uDocumentType">
            Documento de Identidad
            <span className="note-label">
              (Indispensable para el uso de tus descuentos)
            </span>
            <div className="cont-select-input">
              <select
                className={printedSubscriber && 'input-disabled'}
                name="uDocumentType"
                value={uDocumentType}
                onChange={(e) => {
                  handleChangeInput(e)
                  setShowDocOption(e.target.value)
                }}
                disabled={printedSubscriber}>
                <option value="DNI">DNI</option>
                <option value="CDI">CDI</option>
                <option value="CEX">CEX</option>
              </select>
              <TextMask
                mask={maskDocuments[uDocumentType]}
                guide={false}
                className={`${
                  (uDocumentNumberError || valNumDocument) && 'input-error'
                } ${printedSubscriber && 'input-disabled'}`}
                type="text"
                name="uDocumentNumber"
                maxLength={uDocumentType === 'DNI' ? '8' : '15'}
                minLength={uDocumentType === 'DNI' ? '8' : '5'}
                value={uDocumentNumber}
                required
                onChange={handleChangeInput}
                onBlur={handleChangeInput}
                disabled={loading || printedSubscriber}
              />
            </div>
            {(uDocumentNumberError || valNumDocument) && (
              <span className="msn-error">
                {uDocumentNumberError || valNumDocument}
              </span>
            )}
          </label>
        </div>

        <div className={styles.block}>
          <label htmlFor="uPhone">
            Teléfono
            <input
              className={uPhoneError && 'input-error'}
              type="text"
              inputMode="tel"
              autoComplete="tel"
              name="uPhone"
              value={uPhone}
              maxLength="12"
              required
              onChange={handleChangeInput}
              onBlur={handleChangeInput}
              disabled={loading}
            />
            {uPhoneError && <span className="msn-error">{uPhoneError}</span>}
          </label>
        </div>

        <div className={styles.block}>
          <label htmlFor="uEmail">
            Correo electrónico
            <input
              className={`${emailVerified && !isFacebook ? 'email-verify' : ''} 
              ${!emailVerified && !isFacebook ? 'email-noverify' : ''} 
              ${uEmailError && 'input-error'}`}
              type="text"
              inputMode="email"
              autoComplete="email"
              name="uEmail"
              value={uEmail}
              required
              onChange={handleChangeInput}
              onBlur={handleChangeInput}
              maxLength="80"
              disabled={!isFacebook || loading}
            />
            {uEmailError && <span className="msn-error">{uEmailError}</span>}
          </label>
        </div>

        <div className={styles.block}>
          <button
            className={`${styles.btn} ${loading && 'btn-loading'}`}
            type="submit"
            disabled={loading}>
            {loading ? loadText : 'Continuar'}
          </button>
        </div>
      </form>

      {showModal && (
        <Modal
          onClose={() => {}}
          showClose="true"
          scrollable="true"
          allowEsc={false}>
          <div className="modal-container">
            <h4>
              {texts.haveSuscription}
              <button
                className={styles.link}
                type="button"
                onClick={handleProfile}>
                Mi Perfil
              </button>
            </h4>
            <p>{texts.continuedShop}</p>
            <div className="modal-group-middle">
              <button
                type="button"
                className="modal-btn"
                onClick={handleClickCancel}>
                Cancelar
              </button>
              <button
                type="button"
                className="modal-btn"
                onClick={handleClickYes}>
                Sí
              </button>
            </div>
            <p>
              {texts.contactTo}
              <span>{texts.sendTo}</span>
              <a href={`mailto:${emails.atencion}`}>{emails.atencion}</a>
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Profile
