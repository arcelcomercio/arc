/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Identity from '@arc-publishing/sdk-identity'
import { DatePicker } from '@material-ui/pickers'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import TextMask from 'react-text-mask'

import { Close } from '../../../../../signwall/_children/icons'
import { Modal } from '../../../../../signwall/_children/modal/index'
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
    documentType = null,
    documentNumber = null,
    email,
    phone,
    gender,
    birthDay,
    birthMonth,
    birthYear,
    country = null,
    department = null,
    province = null,
    district = null,
    civilStatus = null,
    attributes = [],
  } = conformProfile(getStorageProfile())

  const [changeuser, setChangeUser] = React.useState({
    pFirstName: firstName,
    pLastName: lastName,
    pSecondLastName: secondLastName,
    pDocumentType: documentType,
    pDocumentNumber: documentNumber,
    pCivilStatus: civilStatus,
    pMobilePhone: phone,
    pCountry: country,
    pDepartment: department,
    pProvince: province,
    pDistrict: district,
    pEmail: email,
    pGender: gender,
    pBirthDay: birthDay,
    pBirthMonth: birthMonth,
    pBirthYear: birthYear,
  })

  const [loading, setLoading] = React.useState(false)
  const [msgError, setMsgError] = React.useState('')
  const [msgSuccess, setMsgSuccess] = React.useState(false)
  const [showModalConfirm, setShowModalConfirm] = React.useState(false)
  const [sending, setSending] = React.useState(true)
  const [textConfirmed, setTextConfirmed] = React.useState(false)
  const [dataDepartments, setDataDepartments] = React.useState([])
  const [dataProvinces, setDataProvinces] = React.useState([])
  const [dataDistricts, setDataDistricts] = React.useState([])
  const [showDocOption, setShowDocOption] = React.useState(
    documentType || 'DNI'
  )
  const [auxConvertedDate, setAuxConvertedDate] = React.useState(false)
  const [countConverted, setCountConverted] = React.useState(false)

  const convertDateStringDate = (year: string, month: string, day: string) => {
    const yearConverted = new Date(`${year}-${month}-${day}`)
    yearConverted.setDate(yearConverted.getDate() + 1)
    const newDate = new Date(yearConverted)
    return newDate
  }

  const stateSchema = {
    pFirstName: { value: checkUndefined(firstName) || '', error: '' },
    pLastName: { value: checkUndefined(lastName) || '', error: '' },
    pSecondLastName: { value: checkUndefined(secondLastName) || '', error: '' },
    pDocumentType: { value: documentType || 'DNI', error: '' },
    // pDocumentType: { value: documentType || '', error: '' },
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
          convertDateStringDate(birthYear, birthMonth, birthDay)) ||
        null,
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
      min2caracts: true,
      validator: formatSecondLastName(),
    },
    pDocumentType: {
      required: false,
    },
    pDocumentNumber: {
      required: false,
      validator: {
        func: (value: string) =>
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
      minAge: true,
      maxAge: true,
    },
  }

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

  const setUbigeo = (value: string, type: string) => {
    getUbigeo(value).then((list) => {
      switch (type) {
        case 'country':
          setDataDepartments(list)
          setDataProvinces([])
          setDataDistricts([])
          break
        case 'department':
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

  const createAttribute = (
    nameP?: string,
    valueP?: string,
    typeP = 'String'
  ) => {
    const object = {
      name: nameP,
      value: valueP,
      type: typeP,
    }
    return object
  }

  const handleUpdateProfile = () => {
    const profile: any = {
      firstName: changeuser.pFirstName || null,
      lastName: changeuser.pLastName || null,
      secondLastName: changeuser.pSecondLastName || null,
      email,
      birthDay: changeuser.pBirthDay || null,
      birthMonth: changeuser.pBirthMonth || null,
      birthYear: changeuser.pBirthYear || null,
      gender: changeuser.pGender || null,
      contacts: changeuser.pMobilePhone
        ? [
            {
              phone: changeuser.pMobilePhone,
              type: 'PRIMARY',
            },
          ]
        : null,
    }

    const objCivilStatus = createAttribute(
      'civilStatus',
      changeuser.pCivilStatus
    )
    const objCountry = createAttribute('country', changeuser.pCountry)
    const objDepartment = createAttribute('department', changeuser.pDepartment)
    const objProvince = createAttribute('province', changeuser.pProvince)
    const objDistrict = createAttribute('district', changeuser.pDistrict)

    const objDocumentType = createAttribute(
      'documentType',
      changeuser.pDocumentType
    )

    const objDocumentNumber = createAttribute(
      'documentNumber',
      changeuser.pDocumentNumber
    )

    const clean = attributes.filter(
      (attribute: any) =>
        attribute.name !== 'civilStatus' &&
        attribute.name !== 'country' &&
        attribute.name !== 'department' &&
        attribute.name !== 'province' &&
        attribute.name !== 'district' &&
        attribute.name !== 'documentType' &&
        attribute.name !== 'documentNumber'
    )

    const cleanAttributes = [
      ...clean,
      objCivilStatus,
      objCountry,
      objDepartment,
      objProvince,
      objDistrict,
      objDocumentType,
      objDocumentNumber,
    ].filter((attribute) => {
      if (attribute.name === 'originReferer' && attribute.value) {
        return {
          ...attribute,
          value: attribute.value
            .split('&')[0]
            .replace(/(\/|=|#|\/#|#\/|=\/|\/=)$/, ''),
        }
      }
      if (
        attribute.name &&
        attribute.value &&
        attribute.value !== 'DEFAULT' &&
        attribute.value !== 'default'
      ) {
        return {
          ...attribute,
        }
      }
    })

    profile.attributes = cleanAttributes
    console.log('profile despues:', profile)

    setLoading(true)

    // console.log('solo atributos:', attributes)
    // console.log('profile atributos:', profile.attributes)

    Identity.updateUserProfile(profile)
      .then(() => {
        setMsgSuccess(true)
        setLoading(false)

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
          setMsgSuccess(false)
        }, 5000)
      })
      .catch((errUpdate: any) => {
        // console.log(errUpdate)
        const { code } = errUpdate
        setLoading(false)
        if (code === '100018') {
          setShowModalConfirm(true)
        } else if (code === '3001001') {
          const message: string = getCodeError(code)
          setMsgError(message)
          setTimeout(() => {
            setMsgError('')
          }, 5000)
        } else {
          setMsgError(getCodeError(code))
          setTimeout(() => {
            setMsgError('')
          }, 5000)
        }
      })
  }

  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [errorPass, setErrorPass] = React.useState('')

  const submitConfirmPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTextConfirmed(true)
    if (typeof window !== 'undefined' && errorPass.trim.length === 0) {
      setSending(true)
      const Identity1: any = Identity
      const currentEmail = email || Identity1.userProfile.email

      Identity.login(currentEmail, confirmPassword, {
        rememberMe: true,
        cookie: true,
      })
        .then(() => {
          handleUpdateProfile()
          setMsgSuccess(true)
          setTimeout(() => {
            setMsgSuccess(false)
          }, 5000)
          setSending(false)
          setTextConfirmed(false)
        })
        .catch(() => {
          setMsgError(
            'Ha ocurrido un error al actualizar. Contraseña Incorrecta.'
          )
          setTextConfirmed(false)
          setSending(false)

          setTimeout(() => {
            setMsgError('')
          }, 5000)
        })
        .finally(() => {
          setShowModalConfirm(false)
          setConfirmPassword('')
          const ModalProfile = document.getElementById('profile-signwall')
            ?.parentElement
          if (ModalProfile) {
            ModalProfile.style.overflow = 'auto'
          }
        })
    }
  }

  const togglePopupModalConfirm = () => {
    setShowModalConfirm(false)
    const ModalProfile = document.getElementById('profile-signwall')
      ?.parentElement
    if (ModalProfile) {
      if (showModalConfirm) {
        ModalProfile.style.overflow = 'auto'
      } else {
        ModalProfile.style.overflow = 'hidden'
      }
    }
  }

  const changeValidationConfirm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value } = e.target
    setConfirmPassword(value)

    const space =
      value.indexOf(' ') >= 0
        ? 'Contraseña inválida, no se permite espacios'
        : ''
    const min = value.length < 8 ? 'Mínimo 8 caracteres' : space
    setErrorPass(value.length === 0 ? 'Este campo es requerido' : min)
    if (value.length === 8 && errorPass.length >= 1) {
      setSending(false)
    }
    if ((errorPass.length >= 0 && value.length < 8) || errorPass.length > 0) {
      setSending(true)
    } else {
      setSending(false)
    }
  }

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

  const handleChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    handleOnChange(e)
    setMsgError('')
  }

  const handleOnChangeInputProfile = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (e.target.name === 'pDateBirth') {
      if (e.target.value === null) {
        setCountConverted(true)
        setAuxConvertedDate(true)
        setChangeUser({
          ...changeuser,
          pBirthDay: null,
          pBirthMonth: null,
          pBirthYear: null,
        })
      } else {
        const per = new Date(e.target.value)
        if (
          pDateBirth === null &&
          auxConvertedDate === false &&
          countConverted === false
        ) {
          console.log('llego al caso 1')
          setCountConverted(true)
        } else if (
          (pDateBirth !== null &&
            auxConvertedDate === false &&
            countConverted === false) ||
          (pDateBirth !== null &&
            auxConvertedDate === false &&
            countConverted === false)
        ) {
          console.log('llego al caso 2')
          // setCountConverted(true)
          per.setDate(per.getDate() - 1)
        }
        const fullyear = new Date(per)
        const year = `${fullyear.getUTCFullYear()}`
        const month =
          fullyear.getUTCMonth() + 1 < 10
            ? `0${fullyear.getUTCMonth() + 1}`
            : `${fullyear.getUTCMonth() + 1}`

        const day =
          fullyear.getUTCDate() < 10
            ? `0${fullyear.getUTCDate()}`
            : `${fullyear.getUTCDate()}`
        setChangeUser({
          ...changeuser,
          pBirthYear: year,
          pBirthMonth: month,
          pBirthDay: day,
        })
        setAuxConvertedDate(true)
      }
    } else {
      setChangeUser({ ...changeuser, [e.target.name]: e.target.value })
    }
  }

  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className="sign-profile_update-form-grid"
        noValidate>
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
              maxLength={50}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              tabIndex={1}
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
              maxLength={50}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              tabIndex={2}
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
              maxLength={50}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              tabIndex={3}
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
                value={pDocumentType || 'default'}
                onChange={(e) => {
                  handleChangeInput(e)
                  handleOnChangeInputProfile(e)
                  setShowDocOption(e.target.value)
                }}
                tabIndex={4}
                disabled={!email}>
                <option disabled value="default">
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
                maxLength={pDocumentNumber === 'DNI' ? '8' : '15'}
                minLength={pDocumentNumber === 'DNI' ? '8' : '5'}
                onChange={(e) => {
                  handleChangeInput(e)
                  handleOnChangeInputProfile(e)
                }}
                onBlur={handleOnChange}
                tabIndex={5}
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
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              tabIndex={6}
              disabled={!email}>
              <option value="default">Seleccione</option>
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
              maxLength={12}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              tabIndex={7}
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
                handleOnChangeInputProfile(e)
                setUbigeo(e.target.value, 'country')
              }}
              tabIndex={8}
              disabled={!email}>
              <option value="default">Seleccione</option>
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
                handleOnChangeInputProfile(e)
                setUbigeo(e.target.value, 'department')
              }}
              tabIndex={9}
              disabled={!email}>
              <option value="default">Seleccione</option>
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
                handleOnChangeInputProfile(e)
                setUbigeo(e.target.value, 'province')
              }}
              tabIndex={10}
              disabled={!email}>
              <option value="default">Seleccione</option>
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
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              tabIndex={11}
              disabled={!email}>
              <option value="default">Seleccione</option>
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
              maxLength={30}
              tabIndex={12}
              disabled={email !== null}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
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
              value={pGender ? pGender.toUpperCase() : ''}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              tabIndex={13}
              disabled={!email}>
              <option value="">Seleccione</option>
              <option value="MALE">Hombre</option>
              <option value="FEMALE">Mujer</option>
            </select>
            <label htmlFor="pGender" className="label">
              Género
            </label>
            {genderError && <span className="error">{genderError}</span>}
          </div>
        </div>

        <div className="row three">
          <div className={styles.group}>
            <DatePicker
              clearable
              format="dd MMM yyyy"
              name="pDateBirth"
              className={dateBirthError ? 'input error' : 'input'}
              value={pDateBirth}
              onChange={(e) => {
                const ep: any = {
                  target: {
                    name: 'pDateBirth',
                    value: e,
                  },
                }
                handleChangeInput(ep)
                handleOnChangeInputProfile(ep)
              }}
              clearLabel="limpiar"
              cancelLabel="cancelar"
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
              tabIndex={15}>
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </form>

      {showModalConfirm && (
        <Modal
          size="mini"
          position="middle"
          bgColor="white"
          arcSite={undefined}>
          <div className="text-right">
            <button type="button" onClick={togglePopupModalConfirm}>
              <Close />
            </button>
          </div>

          <form
            className="sign-profile_update-form-grid"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              submitConfirmPassword(e)
            }
            noValidate>
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
                className={errorPass.length > 0 ? 'input error' : 'input'}
                placeholder="Contraseña"
                maxLength={50}
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => {
                  changeValidationConfirm(e)
                }}
              />
              <label htmlFor="currentPassword" className="label">
                Contraseña
              </label>
              {errorPass.length > 0 && (
                <span className="error">{errorPass}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={!(confirmPassword.length > 7 && errorPass.length === 0)}
              className="signwall-inside_forms-btn"
              style={{ color: mainColorBtn, backgroundColor: mainColorLink }}>
              {sending && textConfirmed ? 'CONFIRMANDO...' : 'CONFIRMAR'}
            </button>
          </form>
        </Modal>
      )}
    </>
  )
}

export default UpdateProfile
