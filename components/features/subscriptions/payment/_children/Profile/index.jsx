import React, { useState, useContext, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import * as Sentry from '@sentry/browser'
import useForm from '../../../_hooks/useForm'
import { getEntitlements } from '../../../_dependencies/Services'
import { AuthContext } from '../../../_context/auth'
import PropertiesSite from '../../../_dependencies/Properties'
import Modal from './children/modal'
import { Taggeo } from '../../../_dependencies/Taggeo'
import {
  conformProfile,
  isLogged,
  getStorageProfile,
  getStorageEmailProfile,
} from '../../../_dependencies/Session'
import {
  checkUndefined,
  checkFbEmail,
  checkFormatPhone,
  setLocaleStorage,
} from '../../../_dependencies/Utils'
import getCodeError, {
  formatEmail,
  formatNames,
  formatPhone,
} from '../../../_dependencies/Errors'

const styles = {
  step: 'step__left-progres',
  subtitle: 'step__left-subtitle',
  block: 'step__left-block',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
}

const nameTagCategory = 'Web_Paywall_Landing'

const Profile = ({ arcEnv }) => {
  const {
    arcSite,
    globalContent: { error, printedSubscriber },
  } = useFusionContext() || {}

  const { updateStep, userLogout, updateUser } = useContext(AuthContext)
  const { urls, emails } = PropertiesSite[arcSite]
  const { texts } = PropertiesSite.common

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
  } = conformProfile(getStorageProfile())

  const [msgError, setMsgError] = useState(false)
  const [msgErrorApi, setMsgErrorApi] = useState(error)
  const [loading, setLoading] = useState(false)
  const [loadText, setLoadText] = useState('Cargando...')
  const [linkLogin, setLinkLogin] = useState()
  const [showModal, setShowModal] = useState()

  const isFacebook = email && email.indexOf('facebook.com') >= 0

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      Sentry.configureScope(scope => {
        scope.setTag('brand', arcSite)
        scope.setUser({
          id: uuid,
          name: `${firstName} ${firstName} ${secondLastName || ''}`,
          email,
          phone,
          documentType,
          documentNumber,
          emailVerified,
        })
      })
    }
  }, [])

  const stateSchema = {
    uFirstName: { value: checkUndefined(firstName) || '', error: '' },
    uLastName: { value: checkUndefined(lastName) || '', error: '' },
    uSecondLastName: { value: checkUndefined(secondLastName) || '', error: '' },
    uDocumentType: {
      value:
        (printedSubscriber && printedSubscriber.documentType) ||
        documentType ||
        'DNI',
      error: '',
    },
    uDocumentNumber: {
      value:
        (printedSubscriber && printedSubscriber.documentNumber) ||
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
      mincaracts: true,
    },
    uLastName: {
      required: true,
      validator: formatNames(),
      mincaracts: true,
    },
    uSecondLastName: {
      required: false,
      validator: formatNames(),
      mincaracts: true,
    },
    uDocumentType: {
      required: true,
    },
    uDocumentNumber: {
      required: true,
      validator: {
        func: value => /^([0-9]{8})+$/.test(value),
        error: 'Formato Inválido',
      },
    },
    uPhone: {
      required: true,
      validator: formatPhone(),
    },
    uEmail: {
      required: true,
      validator: formatEmail(),
    },
  }

  const checkSubscriptions = () => {
    if (typeof window !== 'undefined') {
      return window.Identity.heartbeat()
        .then(resHeart => {
          return getEntitlements(urls.arcOrigin[arcEnv], resHeart.accessToken)
            .then(resEntitlements => {
              return (
                Array.isArray(resEntitlements.skus) &&
                resEntitlements.skus.length > 0
              )
            })
            .catch(errEntitlements => {
              Sentry.captureEvent({
                message: 'Error al verificar Suscripciones',
                level: 'error',
                extra: errEntitlements,
              })
            })
        })
        .catch(errHeart => {
          Sentry.captureEvent({
            message: 'Error al extender la sessión',
            level: 'error',
            extra: errHeart,
          })
        })
    }
    return ''
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
      let { attributes: uAttributes = [] } = window.Identity.userProfile || {}
      if (!uAttributes) uAttributes = []
      const addAttributes = (name, value) => {
        return uAttributes.push({
          name,
          value: value.trim(),
          type: 'String',
        })
      }
      addAttributes('documentType', uDocumentType)
      addAttributes('documentNumber', uDocumentNumber)
      const getUniqueListBy = (arr, key) => [
        ...new Map(arr.map(item => [item[key], item])).values(),
      ]
      const clearAttrRepeats = getUniqueListBy(uAttributes, 'name')
      const clearOriginReferer = clearAttrRepeats.map(attribute => {
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

      Sentry.addBreadcrumb({
        category: 'perfil',
        message: 'El Usuario completa sus datos',
        level: 'info',
      })

      if (
        (getStorageEmailProfile() !== uEmail && isFacebook) ||
        getStorageEmailProfile() === uEmail
      ) {
        setLoadText('Actualizando Perfil...')
        window.Identity.updateUserProfile(profile)
          .then(resProfile => {
            updateUser(resProfile)
            updateStep(3)
          })
          .catch(err => {
            if (err.code === '100018') {
              const currentProfile = window.Identity.userProfile
              const newProfile = Object.assign(currentProfile, profile)
              setLocaleStorage('ArcId.USER_PROFILE', newProfile)
              updateUser(newProfile)
              updateStep(3)
              Sentry.captureEvent({
                message: 'Usuario no actualizó perfil',
                level: 'info',
                extra: err,
              })
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
      message: 'El Usuario ha perdido su sesión/perfil',
      level: 'error',
    })
    setTimeout(() => {
      updateStep(1)
      window.location.reload()
    }, 1000)
  }

  const onFormProfile = (...props) => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      if (isLogged()) {
        setLoadText('Verificando Suscripciones...')
        checkSubscriptions().then(resSubs => {
          if (resSubs) {
            setShowModal(true)
            setLoading(false)
            Taggeo(nameTagCategory, 'web_paywall_open_validation')
          } else {
            updateProfile(...props)
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
    if (typeof window !== 'undefined') {
      setShowModal(false)
      window.sessionStorage.setItem('paywall_confirm_subs', '2')
      Taggeo(nameTagCategory, 'web_paywall_close_validation')
    }
  }

  const handleClickYes = () => {
    if (typeof window !== 'undefined') {
      setShowModal(false)
      updateProfile({
        uFirstName,
        uLastName,
        uSecondLastName,
        uDocumentType,
        uDocumentNumber,
        uPhone,
        uEmail,
      })
      window.sessionStorage.setItem('paywall_confirm_subs', '1')
      Taggeo(nameTagCategory, 'web_paywall_continue_validation')
    }
  }

  const handleChangeInput = e => {
    if (typeof window !== 'undefined') {
      if (isLogged()) {
        setMsgError(false)
        setMsgErrorApi(false)
        handleOnChange(e)
      } else {
        restoreClearSession()
      }
    }
  }

  const handleChangeSelect = e => {
    if (typeof window !== 'undefined') {
      if (isLogged()) {
        handleOnChange(e)
      } else {
        restoreClearSession()
      }
    }
  }

  const logoutUser = () => {
    if (typeof window !== 'undefined') {
      window.Identity.logout().finally(() => {
        userLogout()
      })
    }
  }

  const handleProfile = () => {
    if (typeof window !== 'undefined') {
      Taggeo(nameTagCategory, 'web_paywall_profile_validation')
      window.open(urls.profile[arcEnv], '_blank')
    }
  }

  return (
    <>
      <ul className={styles.step}>
        <li className="active">Perfil</li>
        <li>Pago</li>
        <li>Confirmación</li>
      </ul>
      <h3 className={styles.subtitle}>Ingresa tus datos personales</h3>

      {(msgError || msgErrorApi) && (
        <div className={styles.block}>
          <div className="msg-alert">
            {` ${msgError || msgErrorApi} `}
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
            Apellidos Materno
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
            <div className="cont-select-input">
              <select
                className={printedSubscriber && 'input-disabled'}
                name="uDocumentType"
                value={uDocumentType}
                onChange={handleChangeSelect}
                disabled={printedSubscriber}>
                <option value="DNI">DNI</option>
                <option value="CDI">CDI</option>
                <option value="CEX">CEX</option>
              </select>
              <input
                className={`${uDocumentNumberError &&
                  'input-error'} ${printedSubscriber && 'input-disabled'}`}
                type="text"
                name="uDocumentNumber"
                maxLength={uDocumentType === 'DNI' ? '8' : '15'}
                value={uDocumentNumber}
                required
                onChange={handleChangeInput}
                onBlur={handleChangeInput}
                disabled={loading || printedSubscriber}
              />
            </div>
            {uDocumentNumberError && (
              <span className="msn-error">{uDocumentNumberError}</span>
            )}
          </label>
        </div>

        <div className={styles.block}>
          <label htmlFor="uPhone">
            Teléfono
            <input
              className={uPhoneError && 'input-error'}
              type="text"
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
              <a href={`mailto:${emails.atencion}`}>{emails.atencion}</a>
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Profile
