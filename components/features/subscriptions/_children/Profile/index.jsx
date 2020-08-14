/* eslint-disable react/jsx-filename-extension */

/**
 * OJO Este componente cuenta con 2 tipos de Profile:
 * @Profile
 * @ProfilePrint
 */

import React, { useState, useContext, useEffect } from 'react'
import useForm from '../../_hooks/useForm'
import { conformProfile } from '../../_dependencies/Session'
import { getEntitlements } from '../../_dependencies/Services'
import { AuthContext } from '../../_context/auth'
import PropertiesSite from '../../_dependencies/Properties'
import Modal from './children/modal'

import {
  checkUndefined,
  checkFbEmail,
  checkFormatPhone,
} from '../../_dependencies/Utils'
import getCodeError, {
  formatEmail,
  formatNames,
  formatPhone,
} from '../../_dependencies/Errors'

const styles = {
  step: 'step__left-progres',
  subtitle: 'step__left-subtitle',
  block: 'step__left-block',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
}

const Profile = ({ arcSite, arcEnv }) => {
  const { updateStep, userLogout, updateUser } = useContext(AuthContext)
  const [msgError, setMsgError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadText, setLoadText] = useState('Cargando...')
  const [linkLogin, setLinkLogin] = useState()
  const { urls, emails } = PropertiesSite[arcSite]
  const { texts } = PropertiesSite.common
  const [showModal, setShowModal] = useState()

  const {
    firstName,
    lastName,
    secondLastName,
    documentType,
    documentNumber,
    email,
    phone,
    emailVerified,
  } = conformProfile(
    JSON.parse(window.localStorage.getItem('ArcId.USER_PROFILE') || '{}')
  )

  const stateSchema = {
    uFirstName: { value: checkUndefined(firstName) || '', error: '' },
    uLastName: { value: checkUndefined(lastName) || '', error: '' },
    uSecondLastName: { value: checkUndefined(secondLastName) || '', error: '' },
    uDocumentType: { value: documentType || 'DNI', error: '' },
    uDocumentNumber: { value: checkUndefined(documentNumber) || '', error: '' },
    uPhone: { value: checkFormatPhone(phone) || '', error: '' },
    uEmail: { value: checkFbEmail(email) || '', error: '' },
  }

  const isFaacebook = email.indexOf('facebook.com') >= 0

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
          return getEntitlements(
            urls.arcOrigin[arcEnv],
            resHeart.accessToken
          ).then(resEntitlements => {
            return (
              Array.isArray(resEntitlements.skus) &&
              resEntitlements.skus.length > 0
            )
          })
        })
        .catch(errHeart => {
          window.console.error(errHeart) // Temporal hasta implementar Sentry
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
            value: attribute.value.split('&')[0].replace(/(\/#|#|\/)$/, ''),
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
      setLoadText('Actualizando Perfil...')
      window.Identity.updateUserProfile(profile)
        .then(resProfile => {
          updateUser(resProfile)
          updateStep(3)
        })
        .catch(err => {
          setMsgError(getCodeError(err.code))
          setLinkLogin(
            err.code === '100018' ||
              err.code === '3001001' ||
              err.code === '100011'
          )
        })
        .finally(() => setLoading(false))
    }
  }

  const onFormProfile = (...props) => {
    setLoading(true)
    setLoadText('Verificando Suscripciones...')
    checkSubscriptions().then(resSubs => {
      if (resSubs) {
        setShowModal(true)
        setLoading(false)
      } else {
        updateProfile(...props)
      }
    })
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
    // disable,
  } = useForm(stateSchema, stateValidatorSchema, onFormProfile)

  const handleClickCancel = () => {
    if (typeof window !== 'undefined') {
      setShowModal(false)
      window.sessionStorage.setItem('paywall_confirm_subs', '2')
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
    }
  }

  const handleChangeInput = e => {
    setMsgError(false)
    handleOnChange(e)
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
      window.open(urls.profile[arcEnv], '_blank')
    }
  }

  useEffect(() => {
    // window.addEventListener('click', clickLoginSocialEcoID)
    return () => {
      // window.removeEventListener('click', clickLoginSocialEcoID)
      // window.removeEventListener('message', authSocialProvider)
      // window.removeEventListener('onmessage', authSocialProvider)
    }
  }, [])

  return (
    <>
      <ul className={styles.step}>
        <li className="active">Perfil</li>
        <li>Pago</li>
        <li>Confirmación</li>
      </ul>
      <h3 className={styles.subtitle}>Ingresa tus datos personales</h3>

      {msgError && (
        <div className={styles.block}>
          <div className="msg-alert">
            {` ${msgError} `}
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
              onBlur={handleOnChange}
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
              onBlur={handleOnChange}
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
                name="uDocumentType"
                value={uDocumentType}
                onChange={handleOnChange}>
                <option value="DNI">DNI</option>
                <option value="CDI">CDI</option>
                <option value="CEX">CEX</option>
              </select>
              <input
                className={uDocumentNumberError && 'input-error'}
                type="text"
                name="uDocumentNumber"
                maxLength="8"
                value={uDocumentNumber}
                required
                onChange={handleChangeInput}
                onBlur={handleOnChange}
                disabled={loading}
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
              onBlur={handleOnChange}
              disabled={loading}
            />
            {uPhoneError && <span className="msn-error">{uPhoneError}</span>}
          </label>
        </div>

        <div className={styles.block}>
          <label htmlFor="uEmail">
            Correo electrónico
            <input
              // prettier-ignore
              className={`${emailVerified && !isFaacebook ? 'email-verify' : ''} 
              ${!emailVerified && !isFaacebook ? 'email-noverify' : ''} 
              ${uEmailError && 'input-error'}`}
              type="text"
              name="uEmail"
              value={uEmail}
              required
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              maxLength="80"
              disabled={!isFaacebook || loading}
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

// export const ProfilePrint = () => {
//   const [showThirdPerson, setShowThirdPerson] = useState()

//   const ToogleThirdPerson = () => {
//     if (typeof window !== 'undefined') {
//       const divStep = window.document.getElementById('main-steps')
//       if (divStep) divStep.classList.toggle('height-full')
//       setShowThirdPerson(!showThirdPerson)
//     }
//   }

//   return (
//     <>
//       <ul className={styles.step}>
//         <li className="active">Perfil</li>
//         <li>Reparto</li>
//         <li>Pago</li>
//         <li>Confirmación</li>
//       </ul>
//       <h3 className={styles.subtitle}>Ingresa tus datos personales</h3>

//       <div className={styles.block}>
//         <label htmlFor="ppago_nombre">
//           Nombre
//           <input id="ppago_nombre" type="text" name="nombre" />
//         </label>
//       </div>

//       <div className={styles.block}>
//         <label htmlFor="id_ppago_apepat">
//           Apellido Paterno
//           <input id="id_ppago_apepat" type="text" name="paterno" />
//         </label>
//       </div>

//       <div className={styles.block}>
//         <label htmlFor="id_ppago_apemat">
//           Apellidos Materno
//           <input id="id_ppago_apemat" type="text" name="materno" />
//         </label>
//       </div>

//       <div className={styles.block}>
//         <label htmlFor="id_ppago_numdoc">
//           Documento de Identidad
//           <div className="cont-select-input">
//             <select id="id_ppago_tipodoc2">
//               <option>DNI</option>
//               <option>Pasaporte</option>
//               <option>C. Extranjería</option>
//             </select>
//             <input
//               id="id_ppago_numdoc"
//               type="text"
//               name="documento"
//               maxLength="8"
//             />
//           </div>
//         </label>
//       </div>

//       <div className={styles.block}>
//         <label htmlFor="id_ppago_telefono">
//           Teléfono
//           <input id="id_ppago_telefono" type="text" name="phone" />
//         </label>
//       </div>

//       <div className={styles.block}>
//         <label htmlFor="id_ppago_email">
//           Correo electrónico
//           <input id="id_ppago_email" type="text" name="correo" />
//         </label>
//       </div>

//       <div className={styles.block}>
//         <label htmlFor="thirdPerson" className="terms">
//           <input id="thirdPerson" type="checkbox" onClick={ToogleThirdPerson} />
//           Comprando para alguien más
//           <span className="checkmark"></span>
//         </label>
//       </div>

//       {showThirdPerson && (
//         <div className="step__left-cont-form">
//           <div className={styles.block}>
//             <label htmlFor="id_otroppago_nombre">
//               Nombre
//               <input id="id_otroppago_nombre" type="text" name="nombre" />
//             </label>
//           </div>

//           <div className={styles.block}>
//             <label htmlFor="id_otroppago_apepat">
//               Apellido Paterno
//               <input id="id_otroppago_apepat" type="text" name="paterno" />
//             </label>
//           </div>

//           <div className={styles.block}>
//             <label htmlFor="id_otroppago_apemat">
//               Apellidos Materno
//               <input id="id_otroppago_apemat" type="text" name="materno" />
//             </label>
//           </div>

//           <div className={styles.block}>
//             <label htmlFor="id_otroppago_numdoc">
//               Documento de Identidad
//               <div className="cont-select-input">
//                 <select id="id_otroppago_tipodoc2">
//                   <option>DNI</option>
//                   <option>Pasaporte</option>
//                   <option>C. Extranjería</option>
//                 </select>
//                 <input
//                   id="id_otroppago_numdoc"
//                   type="text"
//                   name="documento"
//                   maxLength="8"
//                 />
//               </div>
//             </label>
//           </div>

//           <div className={styles.block}>
//             <label htmlFor="id_otroppago_telefono">
//               Teléfono
//               <input id="id_otroppago_telefono" type="text" name="phone" />
//             </label>
//           </div>

//           <div className={styles.block}>
//             <label htmlFor="id_otroppago_email">
//               Correo electrónico
//               <input id="id_otroppago_email" type="text" name="correo" />
//             </label>
//           </div>
//         </div>
//       )}

//       <div className={styles.block}>
//         <button className={styles.btn} type="button">
//           Continuar
//         </button>
//       </div>
//     </>
//   )
// }
