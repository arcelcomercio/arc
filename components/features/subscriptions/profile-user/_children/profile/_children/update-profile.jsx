/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import Identity from '@arc-publishing/sdk-identity'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import TextMask from 'react-text-mask'

// import { Close } from '../../../../../signwall/_children/icons'
// import { Modal } from '../../../../../signwall/_children/modal/index'
import { clean } from '../../../../../signwall/_dependencies/object'
import { getUbigeo } from '../../../../../signwall/_dependencies/services'
import getCodeError, {
  formatEmail,
  formatNames,
  formatPhone,
  formatSecondLastName,
} from '../../../../_dependencies/Errors'
import { docPatterns, maskDocuments } from '../../../../_dependencies/Regex'
import {
  conformProfile,
  getStorageProfile,
  // isLogged,
} from '../../../../_dependencies/Session'
import {
  checkFbEmail,
  checkFormatPhone,
  checkUndefined,
} from '../../../../_dependencies/Utils'
import useForm from '../../../../_hooks/useForm'

const styles = {
  group: 'sign-profile_update-form-group',
  btn: 'signwall-inside_forms-btn',
}

const UpdateProfile = () => {
  const {
    siteProperties: {
      signwall: { mainColorLink, mainColorBtn },
    },
  } = useAppContext() || {}

  const {
    firstName,
    lastName,
    secondLastName,
    documentType,
    documentNumber,
    email,
    phone,
    // emailVerified,
    gender,
    birthDay,
    birthMonth,
    birthYear,
    country,
    department,
    province,
    district,
    civilStatus,
  } = conformProfile(getStorageProfile())

  const [loading, setLoading] = React.useState()
  const [msgError, setMsgError] = React.useState()
  const [msgSuccess, setMsgSuccess] = React.useState()
  const [dataDepartments, setDataDepartments] = React.useState([])
  const [dataProvinces, setDataProvinces] = React.useState([])
  const [dataDistricts, setDataDistricts] = React.useState([])
  const [showDocOption, setShowDocOption] = React.useState(
    documentType || 'DNI'
  )

  const stateSchema = {
    pFirstName: { value: checkUndefined(firstName) || '', error: '' },
    pLastName: { value: checkUndefined(lastName) || '', error: '' },
    pSecondLastName: { value: checkUndefined(secondLastName) || '', error: '' },
    pDocumentType: { value: documentType || 'DNI', error: '' },
    pDocumentNumber: { value: checkUndefined(documentNumber) || '', error: '' },
    pCivilStatus: { value: civilStatus || '', error: '' },
    pMobilePhone: { value: checkFormatPhone(phone) || '', error: '' },
    pCountry: { value: country, error: '' },
    pDepartment: { value: department, error: '' },
    pProvince: { value: province, error: '' },
    pDistrict: { value: district, error: '' },
    pEmail: { value: checkFbEmail(email) || '', error: '' },
    pGender: { value: gender || '', error: '' },
    pDateBirth: {
      value:
        (birthDay &&
          birthMonth &&
          birthYear &&
          `${birthDay}-${birthMonth}-${birthYear}`) ||
        '',
      error: '',
    },
  }

  const stateValidatorSchema = {
    pFirstName: {
      required: false,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    pLastName: {
      required: false,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    pSecondLastName: {
      required: false,
      invalidtext: true,
      validator: formatSecondLastName(),
    },
    pDocumentType: {
      required: false,
    },
    pDocumentNumber: {
      required: false,
      validator: {
        func: (value) =>
          docPatterns[showDocOption].test(value.replace(/\s/g, '')) &&
          !value.match(/00000000|12345678/),
        error: 'Formato inválido.',
      },
    },
    pCivilStatus: {
      required: false,
    },
    pMobilePhone: {
      required: false,
      validator: formatPhone(),
      min6caracts: true,
    },
    pCountry: {
      required: false,
    },
    pDepartment: {
      required: false,
    },
    pProvince: {
      required: false,
    },
    pDistrict: {
      required: false,
    },
    pEmail: {
      required: false,
      validator: formatEmail(),
    },
    pGender: {
      required: false,
    },
    pDateBirth: {
      required: false,
    },
  }

  // constructor(props) {
  //   super(props)
  //   const { publicProfile } = new GetProfile()
  //   const { attributes = [] } = publicProfile
  //   const attributesObj = this.attributeToObject(attributes)

  //   this._backup_attributes = Array.isArray(attributes)
  //     ? attributes.filter(({ name }) => !GET_ATTRIBUTES_PROFILE.includes(name))
  //     : []

  //   const customVars = {
  //     showMsgSuccess: false,
  //     showMsgError: false,
  //     showModalConfirm: false,
  //     currentPassword: '',
  //     formErrorsConfirm: {
  //       currentPassword: '',
  //     },
  //     sending: true,
  //     sendingConfirmText: 'CONFIRMAR',
  //     messageErrorPass: '',
  //     messageErrorDelete: '',
  //   }

  //   this.state = {
  //     dataDepartments: [],
  //     dataProvinces: [],
  //     dataDistricts: [],
  //     formErrors: {
  //       firstName: '',
  //       lastName: '',
  //       secondLastName: '',
  //       mobilePhone: '',
  //       documentNumber: '',
  //       typeDocument: '',
  //       userEmail: '',
  //     },
  //     loading: false,
  //     hasChange: false,
  //     textSubmit: 'GUARDAR CAMBIOS',
  //     typeDocLenghtMax: attributesObj.documentType !== 'dni' ? '15' : '8',
  //     typeDocLenghtMin: attributesObj.documentType !== 'dni' ? '5' : '8',
  //     typeDoc: attributesObj.documentType !== 'dni' ? 'text' : 'numeric',
  //     ...publicProfile,
  //     ...attributesObj,
  //     ...customVars,
  //   }
  // }

  React.useEffect(() => {
    if (country) {
      getUbigeo(country).then((listDepartaments) => {
        setDataDepartments(listDepartaments)
      })
    }

    if (department) {
      getUbigeo(department).then((listProvinces) => {
        setDataProvinces(listProvinces)
      })
    }

    if (province) {
      getUbigeo(province).then((listDistrics) => {
        setDataDistricts(listDistrics)
      })
    }
  }, [])

  const setUbigeo = (value, type) => {
    getUbigeo(value).then((list) => {
      switch (type) {
        case 'country':
          setDataDepartments(list)
          setDataProvinces([])
          setDataDistricts([])
          break
        case 'departament':
          setDataProvinces(list)
          setDataDistricts([])
          break
        case 'province':
          setDataDistricts(list)
          break
        default:
          return null
      }
      return null
    })
  }

  // const attributeToObject = (attributes = []) => {
  //   if (attributes === null) return {}

  //   const clearObject = []
  //   for (let i = 0; i < attributes.length; i++) {
  //     if (attributes[i].value !== null) {
  //       clearObject.push(attributes[i])
  //     }
  //   }

  //   return clearObject.reduce((prev, { name, value }) => {
  //     const newPrev = prev
  //     switch (name) {
  //       case 'mobilePhone':
  //         newPrev.contacts = [{ type: 'PRIMARY', phone: value }]
  //         break
  //       default:
  //         newPrev[name] = value
  //         break
  //     }
  //     return prev
  //   }, {})
  // }

  // const getAtributes = (state, list = []) => {
  //   if (typeof window !== 'undefined') {
  //     return list.reduce((prev, item) => {
  //       if (
  //         Object.prototype.hasOwnProperty.call(state, item) &&
  //         state[item] !== ''
  //       ) {
  //         prev.push({
  //           name: item,
  //           value: state[item],
  //           type: 'String',
  //         })
  //       }
  //       return prev
  //     }, [])
  //   }
  //   return null
  // }

  const handleUpdateProfile = () => {
    // const {
    //   firstName,
    //   lastName,
    //   secondLastName,
    //   displayName,
    //   email,
    //   contacts,
    //   ...restState
    // } = this.state

    const profile = {
      firstName,
      lastName,
      secondLastName,
      // displayName,
      email,
      // contacts,
    }

    clean(profile)

    setLoading(true)

    // profile.attributes = [
    //   ...this.getAtributes(restState, SET_ATTRIBUTES_PROFILE),
    //   ...this._backup_attributes,
    // ].map((attribute) => {
    //   if (attribute.name === 'originReferer' && attribute.value) {
    //     return {
    //       ...attribute,
    //       value: attribute.value
    //         .split('&')[0]
    //         .replace(/(\/|=|#|\/#|#\/|=\/|\/=)$/, ''),
    //     }
    //   }
    //   if (!attribute.value) {
    //     return {
    //       ...attribute,
    //       value: 'undefined',
    //     }
    //   }
    //   return attribute
    // })

    Identity.updateUserProfile(profile)
      .then(() => {
        // this.setState({
        //   showMsgSuccess: true,
        //   loading: false,
        //   hasChange: false,
        //   textSubmit: 'GUARDAR CAMBIOS',
        // })

        setMsgSuccess(true)

        const modalConfirmPass = document.getElementById('profile-signwall')
        if (modalConfirmPass) {
          modalConfirmPass.scrollIntoView()
        }

        const textProfile = document.getElementById('name-user-profile')
        if (textProfile) {
          textProfile.textContent = `Hola ${
            profile.firstName ? profile.firstName : 'Usuario'
          }`
        }

        setTimeout(() => {
          // this.setState({
          //   showMsgSuccess: false,
          // })
        }, 5000)

        // this.dispatchEvent('profileUpdate', profile)
      })
      .catch((errUpdate) => {
        setMsgError(getCodeError(errUpdate.code))
        if (errUpdate.code === '100018') {
          // this.setState({
          //   showModalConfirm: true,
          // })
        } else if (errUpdate.code === '3001001') {
          // this.setState({
          //   messageErrorDelete:
          //     'Al parecer hubo un problema con su cuenta, intente ingresar nuevamente. ',
          //   showMsgError: true,
          // })
        } else {
          // this.setState({
          //   messageErrorPass:
          //     'Ha ocurrido un error al actualizar. Inténtalo en otro momento.',
          //   showMsgError: true,
          // })
          // setTimeout(() => {
          //   this.setState({
          //     showMsgError: false,
          //   })
          // }, 5000)
        }
      })
  }

  // const submitConfirmPassword = (e) => {
  //   e.preventDefault()

  //   const { formErrorsConfirm, currentPassword, email } = this.state
  //   const { arcSite } = this.props

  //   formErrorsConfirm.oldPassword =
  //     currentPassword.length === 0 ? 'Este campo es requerido' : ''
  //   this.setState({ formErrorsConfirm })

  //   if (
  //     typeof window !== 'undefined' &&
  //     formErrorsConfirm.currentPassword === ''
  //   ) {
  //     this.setState({ sending: true, sendingConfirmText: 'CONFIRMANDO...' })

  //     const currentEmail = email || Identity.userProfile.email

  //     Identity.login(currentEmail, currentPassword, {
  //       rememberMe: true,
  //       cookie: true,
  //     })
  //       .then(() => {
  //         this.handleUpdateProfile()
  //         this.setState({
  //           showMsgSuccess: true,
  //         })
  //         setTimeout(() => {
  //           this.setState({
  //             showMsgSuccess: false,
  //           })
  //         }, 5000)
  //       })
  //       .catch(() => {
  //         this.setState({
  //           messageErrorPass:
  //             'Ha ocurrido un error al actualizar. Contraseña Incorrecta.',
  //           showMsgError: true,
  //         })

  //         setTimeout(() => {
  //           this.setState({
  //             showMsgError: false,
  //           })
  //         }, 5000)
  //       })
  //       .finally(() => {
  //         this.setState({
  //           currentPassword: '',
  //           showModalConfirm: false,
  //           sending: false,
  //           sendingConfirmText: 'CONFIRMAR',
  //         })

  //         const ModalProfile =
  //           document.getElementById('profile-signwall').parentNode ||
  //           document.getElementById('profile-signwall').parentElement
  //         ModalProfile.style.overflow = 'auto'
  //       })
  //   }
  // }

  // const togglePopupModalConfirm = () => {
  //   const { showModalConfirm } = this.state
  //   this.setState({
  //     showModalConfirm: !showModalConfirm,
  //   })

  //   const ModalProfile =
  //     document.getElementById('profile-signwall').parentNode ||
  //     document.getElementById('profile-signwall').parentElement
  //   if (showModalConfirm) {
  //     ModalProfile.style.overflow = 'auto'
  //   } else {
  //     ModalProfile.style.overflow = 'hidden'
  //   }
  // }

  const {
    values: {
      pFirstName,
      pLastName,
      pSecondLastName,
      pDocumentType,
      pDocumentNumber,
      pCivilStatus,
      pMobilePhone,
      pCountry,
      pDepartment,
      pProvince,
      pDistrict,
      pEmail,
      pGender,
      pDateBirth,
    },
    errors: {
      pFirstName: firstNameError,
      pLastName: lastNameError,
      pSecondLastName: secondLastNameError,
      pDocumentType: documentTypeError,
      pDocumentNumber: documentNumberError,
      pCivilStatus: civilStatusError,
      pMobilePhone: mobilePhoneError,
      pCountry: countryError,
      pDepartment: departmentError,
      pProvince: provinceError,
      pDistrict: districtError,
      pEmail: emailError,
      pGender: genderError,
      pDateBirth: dateBirthError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, handleUpdateProfile)

  const handleChangeInput = (e) => {
    handleOnChange(e)
    setMsgError(false)
  }

  return (
    <>
      <form onSubmit={handleOnSubmit} className="sign-profile_update-form-grid">
        <div className="row btw">
          <h3 className="title">Mis Datos</h3>
        </div>

        {msgSuccess && (
          <div className="sign-profile_update-message sign-profile_update-message-success">
            Tus datos de perfil han sido actualizados correctamente.
          </div>
        )}

        {msgError && (
          <div className="sign-profile_update-message sign-profile_update-message-failed">
            {msgError}
          </div>
        )}

        <div className="row three">
          <div className={styles.group}>
            <input
              type="text"
              autoComplete="given-name"
              name="pFirstName"
              value={pFirstName}
              className={`input capitalize ${firstNameError ? 'error' : ''}`}
              placeholder="Nombres"
              noValidate
              maxLength="50"
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              tabIndex="1"
              disabled={!email}
            />
            <label htmlFor="pFirstName" className="label">
              Nombres
            </label>
            {firstNameError && <span className="error">{firstNameError}</span>}
          </div>
          <div className={styles.group}>
            <input
              type="text"
              autoComplete="family-name"
              name="pLastName"
              value={pLastName}
              className={`input capitalize ${lastNameError ? 'error' : ''}`}
              placeholder="Apellido Paterno"
              noValidate
              maxLength="50"
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              tabIndex="2"
              disabled={!email}
            />
            <label htmlFor="pLastName" className="label">
              Apellido Paterno
            </label>
            {lastNameError && <span className="error">{lastNameError}</span>}
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="pSecondLastName"
              value={pSecondLastName}
              className={`input capitalize ${
                secondLastNameError ? 'error' : ''
              }`}
              placeholder="Apellido Materno"
              noValidate
              maxLength="50"
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              tabIndex="3"
              disabled={!email}
            />
            <label htmlFor="pSecondLastName" className="label">
              Apellido Materno
            </label>
            {secondLastNameError && (
              <span className="error">{secondLastNameError}</span>
            )}
          </div>
        </div>

        <div className="row three">
          <div className={styles.group}>
            <div className="combo">
              <select
                name="pDocumentType"
                className={`input input-minimal ${
                  documentTypeError ? 'error' : ''
                }`}
                value={pDocumentType ? pDocumentType.toUpperCase() : 'default'}
                onChange={(e) => {
                  handleChangeInput(e)
                  setShowDocOption(e.target.value)
                }}
                tabIndex="4"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                <option value="DNI">DNI</option>
                <option value="CEX">CEX</option>
                <option value="CDI">CDI</option>
              </select>
              <label htmlFor="pDocumentType" className="label">
                Tipo Doc.
              </label>
              <TextMask
                mask={maskDocuments[pDocumentType]}
                guide={false}
                type="text"
                name="pDocumentNumber"
                value={pDocumentNumber}
                className={documentNumberError ? 'input error' : 'input'}
                placeholder="Num. Documento"
                noValidate
                maxLength={pDocumentNumber === 'DNI' ? '8' : '15'}
                minLength={pDocumentNumber === 'DNI' ? '8' : '5'}
                onChange={handleChangeInput}
                onBlur={handleOnChange}
                tabIndex="5"
                disabled={!email}
              />
            </div>
            {(documentNumberError || documentTypeError) && (
              <span className="error">
                {documentNumberError || documentTypeError}
              </span>
            )}
          </div>
          <div className={styles.group}>
            <select
              name="pCivilStatus"
              className={`input input-minimal ${
                civilStatusError ? 'error' : ''
              }`}
              value={pCivilStatus ? pCivilStatus.toUpperCase() : 'default'}
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              tabIndex="6"
              disabled={!email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              <option value="SO">Soltero(a)</option>
              <option value="CA">Casado(a)</option>
              <option value="DI">Divorciado(a)</option>
              <option value="VI">Viudo(a)</option>
            </select>
            <label htmlFor="pCivilStatus" className="label">
              Estado Civil
            </label>
            {civilStatusError && (
              <span className="error">{civilStatusError}</span>
            )}
          </div>
          <div className={styles.group}>
            <input
              type="text"
              inputMode="tel"
              autoComplete="tel"
              name="pMobilePhone"
              value={pMobilePhone}
              className={`input ${mobilePhoneError ? 'error' : ''}`}
              placeholder="Número de Celular"
              noValidate
              maxLength="12"
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              tabIndex="7"
              disabled={!email}
            />
            <label htmlFor="pMobilePhone" className="label">
              Número de Celular
            </label>
            {mobilePhoneError && (
              <span className="error">{mobilePhoneError}</span>
            )}
          </div>
        </div>

        <div className="row three">
          <div className={styles.group}>
            <select
              className="input input-minimal"
              name="pCountry"
              value={pCountry || 'default'}
              onChange={(e) => {
                handleChangeInput(e)
                setUbigeo(e.target.value, 'country')
              }}
              tabIndex="8"
              disabled={!email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              <option value="260000">Perú</option>
            </select>
            <label htmlFor="pCountry" className="label">
              País
            </label>
            {countryError && <span className="error">{countryError}</span>}
          </div>
          <div className={styles.group}>
            <select
              className="input input-minimal"
              name="pDepartment"
              value={pDepartment || 'default'}
              onChange={(e) => {
                handleChangeInput(e)
                setUbigeo(e.target.value, 'departament')
              }}
              tabIndex="9"
              disabled={!email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              {dataDepartments.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="pDepartment" className="label">
              Departamento
            </label>
            {departmentError && (
              <span className="error">{departmentError}</span>
            )}
          </div>
          <div className={styles.group}>
            <select
              className="input input-minimal"
              name="pProvince"
              value={pProvince || 'default'}
              onChange={(e) => {
                handleChangeInput(e)
                setUbigeo(e.target.value, 'province')
              }}
              tabIndex="10"
              disabled={!email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              {dataProvinces.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="pProvince" className="label">
              Provincia
            </label>
            {provinceError && <span className="error">{provinceError}</span>}
          </div>
        </div>

        <div className="row three">
          <div className={styles.group}>
            <select
              className="input input-minimal"
              name="pDistrict"
              value={pDistrict || 'default'}
              onChange={handleChangeInput}
              tabIndex="11"
              disabled={!email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              {dataDistricts.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="pDistrict" className="label">
              Distrito
            </label>
            {districtError && <span className="error">{districtError}</span>}
          </div>

          <div className={styles.group}>
            <input
              type="text"
              inputMode="email"
              autoComplete="email"
              name="pEmail"
              value={pEmail}
              className={emailError ? 'input error' : 'input'}
              placeholder="Correo electrónico"
              noValidate
              maxLength="30"
              tabIndex="12"
              disabled={email !== null}
              onChange={handleChangeInput}
              onBlur={handleOnChange}
            />
            <label htmlFor="pEmail" className="label">
              Correo electrónico
            </label>
            {emailError && <span className="error">{emailError}</span>}
          </div>

          <div className={styles.group}>
            <select
              className={`input input-minimal ${genderError ? 'error' : ''} `}
              name="pGender"
              value={pGender ? pGender.toUpperCase() : 'default'}
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              tabIndex="13"
              disabled={!email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              <option value="M">Hombre</option>
              <option value="F">Mujer</option>
            </select>
            <label htmlFor="pGender" className="label">
              Género
            </label>
            {genderError && <span className="error">{genderError}</span>}
          </div>
        </div>

        <div className="row three">
          <div className={styles.group}>
            <input
              type="date"
              name="pDateBirth"
              value={pDateBirth}
              className={dateBirthError ? 'input error' : 'input'}
              placeholder="Fecha Cumpleaños"
              noValidate
              maxLength="30"
              tabIndex="14"
              onChange={handleChangeInput}
              onBlur={handleOnChange}
            />
            <label htmlFor="pDateBirth" className="label">
              Fecha Cumpleaños
            </label>
            {dateBirthError && <span className="error">{dateBirthError}</span>}
          </div>

          <div className={styles.group} />

          <div className={styles.group}>
            <button
              className={styles.btn}
              type="submit"
              style={{
                color: mainColorBtn,
                backgroundColor: mainColorLink,
              }}
              disabled={disable || loading}
              tabIndex="15">
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </form>

      {/* {showModalConfirm && (
        <Modal size="mini" position="middle" bgColor="white">
          <div className="text-right">
            <button
              type="button"
              onClick={(e) => this.togglePopupModalConfirm(e)}>
              <Close />
            </button>
          </div>

          <form
            className="sign-profile_update-form-grid"
            onSubmit={(e) => this.submitConfirmPassword(e)}>
            <p
              style={{
                lineHeight: '28px',
              }}
              className="signwall-inside_forms-text mt-10 mb-10 center">
              Para realizar los cambios, por favor ingresa tu contraseña
            </p>

            <div
              className={styles.group}
              style={{
                width: '100%',
                margin: '10px 0px',
              }}>
              <input
                type="password"
                name="currentPassword"
                className={
                  formErrorsConfirm.currentPassword.length > 0
                    ? 'input error'
                    : 'input'
                }
                placeholder="Contraseña"
                noValidate
                maxLength="50"
                autoComplete="off"
                onChange={(e) => {
                  this.setState({ currentPassword: e.target.value })
                  this.changeValidationConfirm(e)
                }}
              />
              <label htmlFor="currentPassword" className="label">
                Contraseña
              </label>
              {formErrorsConfirm.currentPassword.length > 0 && (
                <span className="error">
                  {formErrorsConfirm.currentPassword}
                </span>
              )}
            </div>

            <button
              className="signwall-inside_forms-btn"
              type="submit"
              disabled={sending}
              style={{ color: mainColorBtn, backgroundColor: mainColorLink }}>
              {sendingConfirmText}
            </button>
          </form>
        </Modal>
      )} */}
    </>
  )
}

export default UpdateProfile
