/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import Identity from '@arc-publishing/sdk-identity'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { DatePicker } from '@material-ui/pickers'

import { Close } from '../../../../../signwall/_children/icons'
import { Modal } from '../../../../../signwall/_children/modal/index'
import { clean } from '../../../../../signwall/_dependencies/object'
import GetProfile from '../../../../../signwall/_dependencies/get-profile'
import { getUbigeo } from '../../../../../signwall/_dependencies/services'
// import {
//   docRegex,
//   emailRegex,
//   /* fechaRegex, */
//   namesRegex,
//   numberRegex,
//   phoneRegex,
// } from '../../../../_dependencies/Regex'

export default function UpdateProfile() {
  const {
    siteProperties: {
      signwall: { mainColorLink, mainColorBtn },
    },
  } = useAppContext() || {}

  const { publicProfile } = new GetProfile()

  const [departments, saveDeparments] = React.useState([])

  const [provinces, saveProvinces] = React.useState([])

  const [districts, saveDistricts] = React.useState([])

  const [converteddate, saveConvertedDate] = React.useState('')

  const [changesuser, saveChangesUser] = React.useState({
    firstName: '',
    lastName: '',
    secondLastName: '',
    phone: '',
    email: '',
    civilStatus: '',
    country: '',
    department: '',
    province: '',
    district: '',
    gender: '',
    documentType: '',
    documentNumber: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
  })

  React.useEffect(() => {
    const {
      firstName = null,
      lastName = null,
      secondLastName = null,
      contacts = [],
      attributes = [],
      email = null,
      gender = null,
      birthDay = null,
      birthMonth = null,
      birthYear = null,
    } = publicProfile

    console.log(publicProfile)

    let phone = contacts.find((valor) => valor.phone) || ''

    if (phone.phone) {
      phone = phone.phone
    } else {
      phone = ''
    }

    let documentType =
      attributes.find(
        (valor) =>
          valor.name === 'typeDocument' || valor.name === 'documentType'
      ) || ''

    if (documentType.value) {
      documentType = documentType.value
    } else {
      documentType = ''
    }

    let documentNumber =
      attributes.find(
        (valor) => valor.name === 'document' || valor.name === 'documentNumber'
      ) || ''

    if (documentNumber.value) {
      documentNumber = documentNumber.value
    } else {
      documentNumber = ''
    }

    let civilStatus =
      attributes.find((valor) => valor.name === 'civilStatus') || ''

    if (civilStatus.value) {
      civilStatus = civilStatus.value
    } else {
      civilStatus = ''
    }

    /* Obtener ubiacion */
    let country = attributes.find((valor) => valor.name === 'country') || ''

    if (country.value) {
      country = country.value
    } else {
      country = ''
    }

    let department =
      attributes.find((valor) => valor.name === 'department') || ''

    if (department.value) {
      department = department.value
    } else {
      department = ''
    }

    let province = attributes.find((valor) => valor.name === 'province') || ''

    if (province.value) {
      province = province.value
    } else {
      province = ''
    }

    let district = attributes.find((valor) => valor.name === 'district') || ''

    if (district.value) {
      district = district.value
    } else {
      district = ''
    }

    saveChangesUser({
      firstName,
      lastName,
      secondLastName,
      phone,
      email,
      civilStatus,
      country,
      department,
      province,
      district,
      gender,
      documentType,
      documentNumber,
      birthDay,
      birthMonth,
      birthYear,
    })

    if (country) {
      console.log('entro aqui en la api featch')
      getUbigeo(country, 'department').then((result) => {
        saveDeparments(...departments, result)
        if (department) {
          getUbigeo(department, 'province').then((result1) => {
            saveProvinces(...provinces, result1)
            if (province) {
              getUbigeo(province, 'district').then((result2) => {
                saveDistricts(...districts, result2)
              })
            }
          })
        }
      })
    }

    if (
      birthDay &&
      birthMonth &&
      birthYear &&
      birthDay !== '' &&
      birthMonth !== '' &&
      birthYear !== ''
    ) {
      const converted = new Date(`${birthYear}-${birthMonth}-${birthDay}`)
      converted.setDate(converted.getDate() + 1)
      const convertido = new Date(converted)
      saveConvertedDate(convertido)
    } else {
      saveConvertedDate(null)
    }
  }, [])

  const [formErrors /* , saveErrors */] = React.useState({
    firstName: '',
    lastName: '',
    secondLastName: '',
    phone: '',
    email: '',
    documentType: '',
    documentNumber: '',
    birthDay: '',
  })

  const handleOnChange = (e) => {
    saveChangesUser({ ...changesuser, [e.target.name]: e.target.value })
  }

  const onLogout = (e) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      const linkLogout = document.getElementById('web_link_cerrarsesion')
      if (linkLogout) {
        linkLogout.click()
      }
    }
  }

  const [customVars, saveCustomVars] = React.useState({
    showMsgSuccess: false,
    showMsgError: false,
    showModalConfirm: false,
    currentPassword: '',
    formErrorsConfirm: {
      currentPassword: '',
    },
    sending: true,
    sendingConfirmText: 'CONFIRMAR',
    messageErrorPass: '',
    messageErrorDelete: '',
    loading: false,
    hasChange: false,
    hasError: false,
    textSubmit: 'GUARDAR CAMBIOS',
    typeDocLenghtMax: changesuser.documentType !== 'dni' ? '15' : '8',
    typeDocLenghtMin: changesuser.documentType !== 'dni' ? '5' : '8',
    typeDoc: changesuser.documentType !== 'dni' ? 'text' : 'numeric',
  })
  const calculateAge = (date) => {
    const birthday = new Date(date)
    const currentDate = new Date()

    const time = parseInt(
      (currentDate.getTime() - birthday.getTime()) / (1000 * 3600 * 24) / 365,
      10
    )

    if (time < 5) {
      formErrors.birthDay = 'No cumple con la edad mínima'
    } else if (time > 100) {
      formErrors.birthDay = '¿Está seguro que tiene esa edad?'
    } else {
      formErrors.birthDay = ''
    }
  }

  const handleDateBirthDayPicker = (e) => {
    if (e === '' || e === null) {
      saveChangesUser({
        ...changesuser,
        birthYear: '',
        birthMonth: '',
        birthDay: '',
      })
      formErrors.birthDay = ''
      saveCustomVars({ ...customVars, hasChange: false })
      saveConvertedDate(null)
    } else {
      calculateAge(e)
      saveConvertedDate(e)

      const per = new Date(e)
      per.setDate(per.getDate() - 1)
      const fullyear = new Date(per)

      const year = `${fullyear.getUTCFullYear()}`
      const month =
        fullyear.getUTCMonth() + 1 < 10
          ? `0${fullyear.getUTCMonth() + 1}`
          : `${fullyear.getUTCMonth() + 1}`

      const day =
        fullyear.getUTCDate() + 1 < 10
          ? `0${fullyear.getUTCDate()}`
          : `${fullyear.getUTCDate()}`

      saveChangesUser({
        ...changesuser,
        birthYear: year,
        birthMonth: month,
        birthDay: day,
      })
      saveCustomVars({ ...customVars, hasChange: false })
    }
  }

  const handleUpdateProfile = () => {
    const { getattributes = [] } = publicProfile

    console.log('entro a handleUpdateProfile')
    const {
      firstName,
      lastName,
      secondLastName,
      phone,
      email,
      civilStatus,
      country,
      department,
      province,
      district,
      gender,
      documentType,
      documentNumber,
      birthDay,
      birthMonth,
      birthYear,
      /* ...restState */
    } = changesuser

    console.log(country, department, province, district)

    const profile = {
      firstName,
      lastName,
      secondLastName,
      email,
      birthDay,
      birthMonth,
      birthYear,
      gender,
      contacts: [{ phone, type: 'PRIMARY' }],
    }

    clean(profile)

    getattributes.push(
      {
        name: 'civilStatus',
        value: civilStatus,
        type: 'String',
      },
      { name: 'country', value: country, type: 'String' },
      { name: 'department', value: department, type: 'String' },
      { name: 'province', value: province, type: 'String' },
      { name: 'district', value: district, type: 'String' },
      { name: 'documentType', value: documentType, type: 'String' },
      { name: 'documentNumber', value: documentNumber, type: 'String' }
    )

    profile.attributes = getattributes.map((attribute) => {
      if (attribute.name === 'originReferer' && attribute.value) {
        return {
          ...attribute,
          value: attribute.value
            .split('&')[0]
            .replace(/(\/|=|#|\/#|#\/|=\/|\/=)$/, ''),
        }
      }
      if (!attribute.value) {
        return {
          ...attribute,
          value: 'undefined',
        }
      }
      return attribute
    })

    saveCustomVars({ ...customVars, loading: true, textSubmit: 'GUARDANDO...' })

    if (typeof window !== 'undefined') {
      Identity.updateUserProfile(profile)
        .then(() => {
          console.log('entro al then de update profile')
          saveCustomVars({
            ...customVars,
            showMsgSuccess: true,
            loading: false,
            hasChange: false,
            textSubmit: 'GUARDAR CAMBIOS',
          })

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
            saveCustomVars({
              ...customVars,
              showMsgSuccess: false,
            })
          }, 5000)
        })
        .catch((errUpdate) => {
          console.log(errUpdate)
          if (errUpdate.code === '100018') {
            saveCustomVars({
              ...customVars,
              showModalConfirm: true,
            })
            console.log('llego al error de inicio de sesion')
          } else if (errUpdate.code === '3001001') {
            saveCustomVars({
              ...customVars,
              messageErrorDelete:
                'Al parecer hubo un problema con su cuenta, intente ingresar nuevamente. ',
              showMsgError: true,
            })
          } else {
            saveCustomVars({
              ...customVars,
              messageErrorPass:
                'Ha ocurrido un error al actualizar. Inténtalo en otro momento.',
              showMsgError: true,
            })
            setTimeout(() => {
              saveCustomVars({
                ...customVars,
                showMsgError: false,
              })
            }, 5000)
          }
        })
        .finally(() => {
          customVars.loading = false
          customVars.textSubmit = 'GUARDAR CAMBIOS'
        })
    }
  }

  const changeValidationConfirm = (e) => {
    const { name, value } = e.target
    const { formErrorsConfirm } = customVars
    const space =
      value.indexOf(' ') >= 0
        ? 'Contraseña inválida, no se permite espacios'
        : ''
    const min = value.length < 8 ? 'Mínimo 8 caracteres' : space

    formErrorsConfirm.currentPassword =
      value.length === 0 ? 'Este campo es requerido' : min

    saveCustomVars({ ...customVars, formErrorsConfirm, [name]: value })

    if (formErrorsConfirm.currentPassword.length >= 1) {
      saveCustomVars({ ...customVars, sending: true })
    } else {
      saveCustomVars({ ...customVars, sending: false })
    }
  }

  const submitConfirmPassword = (e) => {
    e.preventDefault()

    const { formErrorsConfirm, currentPassword } = customVars
    const { email } = changesuser
    /* const { arcSite } = this.props */

    formErrorsConfirm.oldPassword =
      currentPassword.length === 0 ? 'Este campo es requerido' : ''
    saveCustomVars({ ...customVars, formErrorsConfirm })

    if (
      typeof window !== 'undefined' &&
      formErrorsConfirm.currentPassword === ''
    ) {
      saveCustomVars({
        ...customVars,
        sending: true,
        sendingConfirmText: 'CONFIRMANDO...',
      })

      const currentEmail = email || Identity.userProfile.email

      Identity.login(currentEmail, currentPassword, {
        rememberMe: true,
        cookie: true,
      })
        .then(() => {
          console.log('entro al then login')
          handleUpdateProfile()
          saveCustomVars({
            ...customVars,
            showMsgSuccess: true,
          })
          setTimeout(() => {
            saveCustomVars({
              ...customVars,
              showMsgSuccess: false,
            })
          }, 5000)
        })
        .catch((pe) => {
          console.log('entro al catch login', pe)
          saveCustomVars({
            ...customVars,
            messageErrorPass:
              'Ha ocurrido un error al actualizar. Contraseña Incorrecta.',
            showMsgError: true,
          })

          // setTimeout(() => {
          //   saveCustomVars({
          //     ...customVars,
          //     showMsgError: false,
          //   })
          // }, 5000)
        })
        .finally(() => {
          // saveCustomVars({
          //   ...customVars,
          //   currentPassword: '',
          //   showModalConfirm: false,
          //   sending: false,
          //   sendingConfirmText: 'CONFIRMAR',
          // })

          const ModalProfile =
            document.getElementById('profile-signwall').parentNode ||
            document.getElementById('profile-signwall').parentElement
          ModalProfile.style.overflow = 'auto'
        })
    }
  }

  const togglePopupModalConfirm = () => {
    const { showModalConfirm } = customVars
    saveCustomVars({
      ...customVars,
      showModalConfirm: !showModalConfirm,
    })

    const ModalProfile =
      document.getElementById('profile-signwall').parentNode ||
      document.getElementById('profile-signwall').parentElement
    if (showModalConfirm) {
      ModalProfile.style.overflow = 'auto'
    } else {
      ModalProfile.style.overflow = 'hidden'
    }
  }

  return (
    <>
      <form
        className="sign-profile_update-form-grid"
        onSubmit={(e) => {
          e.preventDefault()
          handleUpdateProfile()
        }}>
        <div className="row btw">
          <h3 className="title">Mis Datos</h3>
        </div>

        {customVars.showMsgSuccess && (
          <div className="sign-profile_update-message sign-profile_update-message-success">
            Tus datos de perfil han sido actualizados correctamente.
          </div>
        )}

        {customVars.showMsgError && (
          <div className="sign-profile_update-message sign-profile_update-message-failed">
            {customVars.messageErrorDelete ? (
              <>
                {customVars.messageErrorDelete}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onLogout(e)
                  }}>
                  Clic Aquí
                </a>
              </>
            ) : (
              customVars.messageErrorPass
            )}
          </div>
        )}

        <div className="row three">
          <div className="sign-profile_update-form-group">
            <input
              type="text"
              autoComplete="given-name"
              name="firstName"
              className={
                formErrors.firstName.length > 0
                  ? 'input error capitalize'
                  : 'input capitalize'
              }
              placeholder="Nombres"
              noValidate
              maxLength="50"
              onChange={(e) => {
                handleOnChange(e)
                // handleValidation(e)
              }}
              value={changesuser.firstName || ''}
              tabIndex="1"
              disabled={!changesuser.email}
            />
            <label htmlFor="firstName" className="label">
              Nombres
            </label>
            {formErrors.firstName.length > 0 && (
              <span className="error">{formErrors.firstName}</span>
            )}
          </div>
          <div className="sign-profile_update-form-group">
            <input
              type="text"
              autoComplete="family-name"
              name="lastName"
              className={
                formErrors.lastName.length > 0
                  ? 'input error capitalize'
                  : 'input capitalize'
              }
              placeholder="Apellido Paterno"
              noValidate
              maxLength="50"
              onChange={(e) => {
                handleOnChange(e)
              }}
              value={changesuser.lastName || ''}
              tabIndex="2"
              disabled={!changesuser.email}
            />
            <label htmlFor="lastnameP" className="label">
              Apellido Paterno
            </label>
            {formErrors.lastName.length > 0 && (
              <span className="error">{formErrors.lastName}</span>
            )}
          </div>
          <div className="sign-profile_update-form-group">
            <input
              type="text"
              name="secondLastName"
              className={
                formErrors.secondLastName.length > 0
                  ? 'input error capitalize'
                  : 'input capitalize'
              }
              placeholder="Apellido Materno"
              noValidate
              maxLength="50"
              onChange={(e) => {
                handleOnChange(e)
              }}
              value={changesuser.secondLastName || ''}
              tabIndex="3"
              disabled={!changesuser.email}
            />
            <label htmlFor="secondLastName" className="label">
              Apellido Materno
            </label>
            {formErrors.secondLastName.length > 0 && (
              <span className="error">{formErrors.secondLastName}</span>
            )}
          </div>
        </div>

        <div className="row three">
          <div className="sign-profile_update-form-group">
            <div className="combo">
              <select
                name="documentType"
                className={
                  formErrors.documentType.length > 0
                    ? 'input input-minimal error'
                    : 'input input-minimal'
                }
                value={
                  changesuser.documentType
                    ? changesuser.documentType.toUpperCase()
                    : 'default'
                }
                onChange={(e) => {
                  handleOnChange(e)
                  // this.handleTypeDocument(e)
                  // this.handleValidation(e)
                }}
                tabIndex="4"
                disabled={!changesuser.email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                <option value="DNI">DNI</option>
                <option value="CEX">CEX</option>
                <option value="CDI">CDI</option>
              </select>
              <label htmlFor="statusCivil" className="label">
                Tipo Doc.
              </label>

              <input
                type="text"
                name="documentNumber"
                className={
                  formErrors.documentNumber.length > 0 ? 'input error' : 'input'
                }
                placeholder="Num Documento"
                noValidate
                // minLength={typeDocLenghtMin}
                // maxLength={typeDocLenghtMax}
                value={changesuser.documentNumber}
                onChange={(e) => {
                  handleOnChange(e)
                  // this.handleValidation(e)
                }}
                // onBlur={(e) => handleValidation(e)}
                tabIndex="5"
                disabled={!changesuser.email}
              />
            </div>
            {formErrors.documentNumber.length > 0 && (
              <span className="error">{formErrors.documentNumber}</span>
            )}
            {formErrors.documentType.length > 0 && (
              <span className="error">{formErrors.documentType}</span>
            )}
          </div>
          <div className="sign-profile_update-form-group">
            <select
              name="civilStatus"
              className="input input-minimal"
              value={
                changesuser.civilStatus
                  ? changesuser.civilStatus.toUpperCase()
                  : 'default'
              }
              onChange={(e) => {
                handleOnChange(e)
                // this.handleValidation(e)
              }}
              tabIndex="6"
              disabled={!changesuser.email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              <option value="SO">Soltero(a)</option>
              <option value="CA">Casado(a)</option>
              <option value="DI">Divorciado(a)</option>
              <option value="VI">Viudo(a)</option>
            </select>
            <label htmlFor="statusCivil" className="label">
              Estado Civil
            </label>
          </div>
          <div className="sign-profile_update-form-group">
            <input
              type="text"
              inputMode="tel"
              autoComplete="tel"
              name="phone"
              className={formErrors.phone.length > 0 ? 'input error' : 'input'}
              placeholder="Número de Celular"
              noValidate
              maxLength="12"
              onChange={(e) => {
                handleOnChange(e)
                // this.handleValidation(e)
              }}
              value={changesuser.phone}
              tabIndex="7"
              disabled={!changesuser.email}
            />
            <label htmlFor="phone" className="label">
              Número de Celular
            </label>
            {formErrors.phone.length > 0 && (
              <span className="error">{formErrors.phone}</span>
            )}
          </div>
        </div>

        <div className="row three">
          <div className="sign-profile_update-form-group">
            <select
              name="country"
              className="input input-minimal"
              value={changesuser.country || 'default'}
              onChange={(e) => {
                handleOnChange(e)
                getUbigeo(e.target.value, 'department').then((result) => {
                  saveDeparments(...departments, result)
                })
                // this.handleValidation(e)
              }}
              tabIndex="8"
              disabled={!changesuser.email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              <option value="260000">Perú</option>
            </select>
            <label htmlFor="country" className="label">
              País
            </label>
          </div>
          <div className="sign-profile_update-form-group">
            <select
              name="department"
              className="input input-minimal"
              value={changesuser.department || 'default'}
              onChange={(e) => {
                handleOnChange(e)
                getUbigeo(e.target.value, 'province').then((result) => {
                  saveProvinces(...provinces, result)
                })
                // handleValidation(e)
              }}
              tabIndex="9"
              disabled={!changesuser.email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              {departments.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

            <label htmlFor="Departamento" className="label">
              Departamento
            </label>
          </div>
          <div className="sign-profile_update-form-group">
            <select
              name="province"
              className="input input-minimal"
              value={changesuser.province || 'default'}
              onChange={(e) => {
                handleOnChange(e)
                getUbigeo(e.target.value, 'district').then((result) => {
                  saveDistricts(...districts, result)
                })
                // this.handleValidation(e)
              }}
              tabIndex="10"
              disabled={!changesuser.email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              {provinces.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="province" className="label">
              Provincia
            </label>
          </div>
        </div>

        <div className="row three">
          <div className="sign-profile_update-form-group">
            <select
              name="district"
              className="input input-minimal"
              value={changesuser.district || 'default'}
              onChange={(e) => {
                // this.handleValidation(e)
                handleOnChange(e)
              }}
              tabIndex="11"
              disabled={!changesuser.email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              {districts.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="district" className="label">
              Distrito
            </label>
          </div>
          <div className="sign-profile_update-form-group">
            <input
              type="text"
              inputMode="email"
              autoComplete="email"
              name="email"
              className={formErrors.email.length > 0 ? 'input error' : 'input'}
              placeholder="Correo electrónico"
              noValidate
              maxLength="30"
              value={changesuser.email}
              tabIndex="12"
              disabled={changesuser.email !== null}
              onChange={(e) => {
                // this.handleValidation(e)
                handleOnChange(e)
              }}
            />
            <label htmlFor="email" className="label">
              Correo electrónico
            </label>
            {formErrors.email.length > 0 && (
              <span className="error">{formErrors.email}</span>
            )}
          </div>
          <div className="sign-profile_update-form-group">
            <select
              name="gender"
              className="input input-minimal"
              value={changesuser.gender || 'default'}
              onChange={(e) => {
                handleOnChange(e)
              }}
              tabIndex="11"
              disabled={!changesuser.email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              <option value="MALE">Masculino</option>
              <option value="FEMALE">Femenino</option>
            </select>
            <label htmlFor="gender" className="label">
              Género
            </label>
          </div>
        </div>
        <div className="row three">
          <div className="sign-profile_update-form-group">
            <DatePicker
              clearable
              format="dd MMM yyyy"
              name="fecha"
              className={
                formErrors.birthDay.length > 0
                  ? 'input input-minimal error'
                  : 'input input-minimal'
              }
              value={converteddate}
              onChange={(e) => {
                handleDateBirthDayPicker(e)
              }}
              clearLabel="limpiar"
              cancelLabel="cancelar"
            />
            <label htmlFor="fecha" className="label">
              Fecha de Nacimiento
            </label>
            {formErrors.birthDay.length > 0 && (
              <span className="error">{formErrors.birthDay}</span>
            )}
          </div>

          <div className="sign-profile_update-form-group">
            <button
              className="signwall-inside_forms-btn"
              type="submit"
              style={{
                color: mainColorLink,
                backgroundColor: mainColorBtn,
              }}
              // disabled={
              //   !customVars.hasChange ||
              //   customVars.loading ||
              //   customVars.hasError
              // }
              tabIndex="13">
              {customVars.textSubmit}
            </button>
          </div>
        </div>
      </form>
      {customVars.showModalConfirm && (
        <Modal size="mini" position="middle" bgColor="white">
          <div className="text-right">
            <button type="button" onClick={() => togglePopupModalConfirm()}>
              <Close />
            </button>
          </div>

          <form
            className="sign-profile_update-form-grid"
            onSubmit={(e) => submitConfirmPassword(e)}>
            <p
              style={{
                lineHeight: '28px',
              }}
              className="signwall-inside_forms-text mt-10 mb-10 center">
              Para realizar los cambios, por favor ingresa tu contraseña
            </p>

            <div
              className="sign-profile_update-form-group"
              style={{
                width: '100%',
                margin: '10px 0px',
              }}>
              <input
                type="password"
                name="currentPassword"
                className={
                  customVars.formErrorsConfirm.currentPassword.length > 0
                    ? 'input error'
                    : 'input'
                }
                placeholder="Contraseña"
                noValidate
                maxLength="50"
                autoComplete="off"
                onChange={(e) => {
                  saveCustomVars({
                    ...customVars,
                    currentPassword: e.target.value,
                  })
                  changeValidationConfirm(e)
                }}
              />
              <label htmlFor="currentPassword" className="label">
                Contraseña
              </label>
              {customVars.formErrorsConfirm.currentPassword.length > 0 && (
                <span className="error">
                  {customVars.formErrorsConfirm.currentPassword}
                </span>
              )}
            </div>

            <button
              className="signwall-inside_forms-btn"
              type="submit"
              disabled={customVars.sending}
              style={{ color: mainColorBtn, backgroundColor: mainColorLink }}>
              {customVars.sendingConfirmText}
            </button>
          </form>
        </Modal>
      )}
    </>
  )
}
