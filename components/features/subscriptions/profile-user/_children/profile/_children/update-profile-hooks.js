/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import Identity from '@arc-publishing/sdk-identity'
import { useAppContext } from 'fusion:context'
// import { cleanLegacyAnchor } from 'components/utilities/tags'
// import { profile } from 'console'
// import Consumer from 'fusion:consumer'
// import { element } from 'prop-types'
import * as React from 'react'

// import { Close } from '../../../../../signwall/_children/icons'
// import { Modal } from '../../../../../signwall/_children/modal/index'
import GetProfile from '../../../../../signwall/_dependencies/get-profile'
// import { clean } from '../../../../../signwall/_dependencies/object'
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

    const [changesuser, saveChangesUser] = React.useState({
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

    if (changesuser.country) {
      getUbigeo(country, 'department').then((result) => {
        saveDeparments(...departments, result)
      })
    }
    if (changesuser.department) {
      getUbigeo(department, 'province').then((result) => {
        saveProvinces(...provinces, result)
      })
    }

    if (changesuser.province) {
      getUbigeo(province, 'district').then((result) => {
        saveDeparments(...departments, result)
      })
    }
  }, [])
  const [errors, saveErrors] = React.useState({
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

  const [loading, saveLoading] = React.useState(false)

  const [haschange, saveHasChange] = React.useState(false)

  const [haserror, saveHasError] = React.useState(false)

  const [showMsgSuccess, saveShowMsgSuccess] = React.useState(false)

  const [showMsgError, saveShowMsgError] = React.useState(false)

  const [messageErrorDelete, saveMessageErrorDelete] = React.useState(false)

  const [messageErrorPass, saveMessageErrorPass] = React.useState('')

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

  return (
    <>
      <form
        className="sign-profile_update-form-grid"
        onSubmit={(e) => {
          e.preventDefault()
          /* this.handleUpdateProfile() */
        }}>
        <div className="row btw">
          <h3 className="title">Mis Datos</h3>
        </div>

        {showMsgSuccess && (
          <div className="sign-profile_update-message sign-profile_update-message-success">
            Tus datos de perfil han sido actualizados correctamente.
          </div>
        )}

        {showMsgError && (
          <div className="sign-profile_update-message sign-profile_update-message-failed">
            {messageErrorDelete ? (
              <>
                {messageErrorDelete}
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
              messageErrorPass
            )}
          </div>
        )}

        <div className="row three">
          <div className="sign-profile_update-form-group">
            <input
              type="text"
              autoComplete="given-name"
              name="firstName"
              className="input capitalize"
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
            {/* {formErrors.firstName.length > 0 && (
              <span className="error">{formErrors.firstName}</span>
            )} */}
          </div>
          <div className="sign-profile_update-form-group">
            <input
              type="text"
              autoComplete="family-name"
              name="lastName"
              className="input capitalize"
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
            {/* {formErrors.lastName.length > 0 && (
              <span className="error">{formErrors.lastName}</span>
            )} */}
          </div>
          <div className="sign-profile_update-form-group">
            <input
              type="text"
              name="secondLastName"
              className="input capitalize"
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
            {/* {formErrors.secondLastName.length > 0 && (
              <span className="error">{formErrors.secondLastName}</span>
            )} */}
          </div>
        </div>

        <div className="row three">
          <div className="sign-profile_update-form-group">
            <div className="combo">
              <select
                name="documentType"
                className="input input-minimal"
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
                className="input"
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
            {/* {formErrors.documentNumber.length > 0 && (
              <span className="error">{formErrors.documentNumber}</span>
            )}
            {formErrors.typeDocument.length > 0 && (
              <span className="error">{formErrors.typeDocument}</span>
            )} */}
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
              className="input"
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
            {/* {formErrors.mobilePhone.length > 0 && (
              <span className="error">{formErrors.mobilePhone}</span>
            )} */}
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
              className="input"
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
            {/* {formErrors.userEmail.length > 0 && (
              <span className="error">{formErrors.userEmail}</span>
            )} */}
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
            <input
              type="date"
              name="fecha"
              step="1"
              // disabled={
              //   birthYear && birthMonth && birthDay ? 'disabled' : null
              // }
              // defaultValue={
              //   this.fechaConvertida === ''
              //     ? fechaConvertida
              //     : `${birthYear}-${birthMonth}-${birthDay}`
              // }
              // onChange={(e) => {
              //   this.handleValidation(e)
              //   this.handleDateBirthDay(e)
              // }}
              className="input capitalize"
            />
            <label htmlFor="fecha" className="label">
              Fecha de Nacimiento
            </label>
            {/* {formErrors.birthDay.length > 0 && (
              <span className="error">{formErrors.birthDay}</span>
            )} */}
          </div>

          <div className="sign-profile_update-form-group">
            <button
              className="signwall-inside_forms-btn"
              type="submit"
              style={{
                color: mainColorLink,
                backgroundColor: mainColorBtn,
              }}
              disabled={!haschange || loading || haserror}
              tabIndex="13">
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
