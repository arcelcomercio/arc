import Identity from '@arc-publishing/sdk-identity'
import {
  BaseUserProfile,
  // UserProfile,
} from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import { DatePicker } from '@material-ui/pickers'
// import { getUserProfile } from '../../../../../../utilities/subscriptions/identity'
// import GetProfile from 'components/features/signwall/_dependencies/get-profile'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import TextMask from 'react-text-mask'
import { UserDocumentType } from 'types/subscriptions'

import useProfile from '../../../../../../hooks/useProfile'
import { getUbigeo } from '../../../../../signwall/_dependencies/services'
import getCodeError, {
  formatEmail,
  formatNames,
  formatPhone,
  formatSecondLastName,
} from '../../../../_dependencies/Errors'
import { docPatterns, maskDocuments } from '../../../../_dependencies/Regex'
import {
  conformProfile /* ,
  getStorageProfile, */,
} from '../../../../_dependencies/Session'
// import { checkFbEmail,checkFormatPhone,checkUndefined} from '../../../../_dependencies/Utils'
import useForm from '../../../../_hooks/useForm'
import ConfirmPass from './confirm-pass'

export type AttributeNames =
  | 'documentNumber'
  | 'phone'
  | 'documentType'
  | 'civilStatus'
  | 'country'
  | 'province'
  | 'department'
  | 'district'

interface ProfileWithAttributes
  extends BaseUserProfile,
    Record<AttributeNames, string> {
  documentType: UserDocumentType
  attributes: never
}

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
  const [userProfile, updateUserProfile] = useProfile()
  console.log(userProfile)

  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState(false)
  const [showPassConfirmation, setShowPassConfirmation] = React.useState(false)

  const [departaments, setDepartaments] = React.useState([])
  const [provinces, setProvices] = React.useState([])
  const [districts, setDisctricts] = React.useState([])

  const [
    selectedDocumentType,
    setSelectedDocumentType,
  ] = React.useState<UserDocumentType>('DNI')

  const [auxConvertedDate, setAuxConvertedDate] = React.useState(false)
  const [countConverted, setCountConverted] = React.useState(false)

  const convertDateStringDate = (year: string, month: string, day: string) => {
    const yearConverted = new Date(`${year}-${month}-${day}`)
    yearConverted.setDate(yearConverted.getDate() + 1)
    const newDate = new Date(yearConverted)
    return newDate
  }

  // let stateSchema = {
  //   firstName: { value: '', error: '' },
  //   lastName: { value: '', error: '' },
  //   secondLastName: { value: '', error: '' },
  //   documentType: { value: 'DNI', error: '' },
  //   documentNumber: { value: '', error: '' },
  //   civilStatus: { value: '', error: '' },
  //   pMobilePhone: { value: '', error: '' },
  //   country: { value: '', error: '' },
  //   department: { value: '', error: '' },
  //   province: { value: '', error: '' },
  //   district: { value: '', error: '' },
  //   email: { value: '', error: '' },
  //   gender: { value: '', error: '' },
  //   birthDate: {
  //     value: '',
  //     error: '',
  //   },
  // }

  const stateValidatorSchema = {
    firstName: {
      required: false,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    lastName: {
      required: false,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    secondLastName: {
      required: false,
      min2caracts: true,
      invalidtext: true,
      validator: formatSecondLastName(),
    },
    documentType: {
      required: false,
    },
    documentNumber: {
      required: false,
      validator: {
        func: (value: string) =>
          docPatterns[selectedDocumentType].test(value.replace(/\s/g, '')) &&
          !value.match(/00000000|12345678/),
        error: 'Formato inválido.',
      },
    },
    civilStatus: {
      required: false,
    },
    phone: {
      required: false,
      validator: formatPhone(),
      min6caracts: true,
    },
    country: {
      required: false,
    },
    department: {
      required: false,
    },
    province: {
      required: false,
    },
    district: {
      required: false,
    },
    email: {
      required: false,
      validator: formatEmail(),
    },
    gender: {
      required: false,
    },
    birthDate: {
      required: false,
      minAge: true,
      maxAge: true,
    },
  }

  const {
    firstName: initialFirstName,
    lastName: initialLastName,
    secondLastName: initialSecondLastName,
    documentType: initialDocumentType,
    documentNumber: initialDocumentNumber,
    email: initialEmail,
    phone: initialPhone,
    gender: initialGender,
    birthDay: initialBirthDay,
    birthMonth: initialBirthMonth,
    birthYear: initialBirthYear,
    country: initialCountry,
    department: initialDepartment,
    province: initialProvince,
    district: initialDistrict,
    civilStatus: initialCivilStatus,
  } = conformProfile(userProfile || {}) as ProfileWithAttributes

  const stateSchema = {
    firstName: {
      value: initialFirstName || '',
      error: '',
    },
    lastName: { value: initialLastName || '', error: '' },
    secondLastName: {
      value: initialSecondLastName || '',
      error: '',
    },
    documentType: {
      value: initialDocumentType || 'DNI',
      error: '',
    },
    documentNumber: {
      value: initialDocumentNumber || '',
      error: '',
    },
    civilStatus: {
      value: initialCivilStatus || '',
      error: '',
    },
    phone: { value: initialPhone || '', error: '' },
    country: { value: initialCountry || '', error: '' },
    department: {
      value: initialDepartment || '',
      error: '',
    },
    province: { value: initialProvince || '', error: '' },
    district: { value: initialDistrict || '', error: '' },
    email: { value: initialEmail || '', error: '' },
    gender: { value: initialGender || '', error: '' },
    birthDate: {
      value:
        (initialBirthDay &&
          initialBirthMonth &&
          initialBirthYear &&
          convertDateStringDate(
            initialBirthYear,
            initialBirthMonth,
            initialBirthDay
          )) ||
        null,
      error: '',
    },
  }

  React.useEffect(() => {
    if (initialCountry) {
      getUbigeo(initialCountry).then((listDepartaments) => {
        setDepartaments(listDepartaments)
      })
    }

    if (initialDepartment) {
      getUbigeo(initialDepartment).then((listProvinces) => {
        setProvices(listProvinces)
      })
    }

    if (initialProvince) {
      getUbigeo(initialProvince).then((listDistrics) => {
        setDisctricts(listDistrics)
      })
    }
  }, [])

  const setUbigeo = (value: string, type: string) => {
    getUbigeo(value).then((list) => {
      switch (type) {
        case 'country':
          setDepartaments(list)
          setProvices([])
          setDisctricts([])
          break
        case 'department':
          setProvices(list)
          setDisctricts([])
          break
        case 'province':
          setDisctricts(list)
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

  const handleUpdateProfile = (profile: ProfileWithAttributes) => {
    const user = {
      firstName: profile?.firstName || null,
      lastName: profile?.lastName || null,
      secondLastName: profile?.secondLastName || null,
      email: profile?.email,
      birthDay: profile?.birthDay || null,
      birthMonth: profile?.birthMonth || null,
      birthYear: profile?.birthYear || null,
      gender: profile?.gender || null,
      contacts:
        profile?.phone && profile.phone !== undefined
          ? [
              {
                phone: profile?.phone,
                type: 'PRIMARY',
              },
            ]
          : null,
      attributes: [],
      emailVerified: userProfile?.emailVerified || false,
    }

    const objCivilStatus = createAttribute('civilStatus', profile?.civilStatus)
    const objCountry = createAttribute('country', profile?.country)
    const objDepartment = createAttribute('department', profile?.department)
    const objProvince = createAttribute('province', profile?.province)
    const objDistrict = createAttribute('district', profile?.district)

    const objDocumentType = createAttribute(
      'documentType',
      profile?.documentType
    )

    const objDocumentNumber = createAttribute(
      'documentNumber',
      profile?.documentNumber
    )

    const clean = Array(attributes).filter(
      (attribute: { name: string }) =>
        attribute.name !== 'civilStatus' &&
        attribute.name !== 'country' &&
        attribute.name !== 'department' &&
        attribute.name !== 'province' &&
        attribute.name !== 'district' &&
        attribute.name !== 'documentType' &&
        attribute.name !== 'documentNumber'
    )

    const cleanAttributes: any = [
      ...clean,
      objCivilStatus,
      objCountry,
      objDepartment,
      objProvince,
      objDistrict,
      objDocumentNumber,
      objDocumentType,
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
        attribute.value !== null &&
        attribute.value !== undefined &&
        attribute.value !== 'default'
      ) {
        return {
          ...attribute,
        }
      }
    })

    user.attributes = cleanAttributes || []

    console.log('profile que se enviará:', user)

    setLoading(true)

    updateUserProfile(user, {
      onSuccess: () => {
        setSuccessMessage(true)
        setLoading(false)

        const modalConfirmPass = document.getElementById('profile-signwall')
        if (modalConfirmPass) {
          modalConfirmPass.scrollIntoView()
        }

        const textProfile = document.getElementById('name-user-profile')
        if (textProfile) {
          const name = profile?.firstName ? profile?.firstName : 'Usuario'
          const lName = profile?.lastName ? profile?.lastName : ''
          textProfile.textContent = `Hola ${name} ${lName}`
        }

        setTimeout(() => {
          setSuccessMessage(false)
        }, 5000)
      },
      onError: (errUpdate: any) => {
        const { code } = errUpdate
        setLoading(false)
        if (code === '100018') {
          setShowPassConfirmation(true)
        } else if (code === '3001001') {
          const message: string = getCodeError(code)
          setErrorMessage(message)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        } else {
          setErrorMessage(getCodeError(code))
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        }
      },
    })
  }

  const {
    values: {
      firstName,
      lastName,
      secondLastName,
      documentType,
      documentNumber,
      civilStatus,
      phone,
      country,
      department,
      province,
      district,
      email,
      gender,
      birthDate,
    },
    errors: {
      firstName: firstNameError,
      lastName: lastNameError,
      secondLastName: secondLastNameError,
      documentType: documentTypeError,
      documentNumber: documentNumberError,
      civilStatus: civilStatusError,
      phone: mobilePhoneError,
      country: countryError,
      department: departmentError,
      province: provinceError,
      district: districtError,
      email: emailError,
      gender: genderError,
      birthDate: dateBirthError,
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
    setErrorMessage('')
  }

  const handleOnChangeInputProfile = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (e.target.name === 'birthDate') {
      if (e.target.value === null) {
        setCountConverted(true)
        setAuxConvertedDate(true)
      } else {
        const per = new Date(e.target.value)
        if (
          birthDate === null &&
          auxConvertedDate === false &&
          countConverted === false
        ) {
          console.log('llego al caso 1')
          setCountConverted(true)
        } else if (
          (birthDate !== null &&
            auxConvertedDate === false &&
            countConverted === false) ||
          (birthDate !== null &&
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
        setAuxConvertedDate(true)
      }
    } else {
      const att = e.target.name
      const pe = att.substring(1, att.length)
      const aux = pe[0].toLowerCase() + pe.substring(1, pe.length)

      switch (aux) {
        case 'country':
          setProfile({
            ...profile,
            country: e.target.value,
            department: 'default',
            province: 'default',
            district: 'default',
          })
          break
        case 'department':
          setProfile({
            ...profile,
            department: e.target.value,
            province: 'default',
            district: 'default',
          })
          break
        case 'province':
          setProfile({
            ...profile,
            province: e.target.value,
            district: 'default',
          })
          break
        case 'district':
          setProfile({
            ...profile,
            district: e.target.value,
          })
          break
        default:
          setProfile({ ...profile, [aux]: e.target.value })
          break
      }
    }
  }

  const onPassConfirmationClose = () => {
    setShowPassConfirmation(false)
    const ModalProfile = document.getElementById('profile-signwall')
      ?.parentElement
    if (ModalProfile) {
      if (showPassConfirmation) {
        ModalProfile.style.overflow = 'auto'
      } else {
        ModalProfile.style.overflow = 'hidden'
      }
    }
  }

  const onPassConfirmationSuccess = () => {
    handleOnSubmit()
    setSuccessMessage(true)
    setTimeout(() => {
      setSuccessMessage(false)
    }, 5000)
  }

  const onPassConfirmationError = () => {
    setErrorMessage(
      'Ha ocurrido un error al actualizar. Contraseña Incorrecta.'
    )
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
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

        {successMessage && (
          <div className="sign-profile_update-message sign-profile_update-message-success">
            Tus datos de perfil han sido actualizados correctamente.
          </div>
        )}

        {errorMessage && (
          <div className="sign-profile_update-message sign-profile_update-message-failed">
            {errorMessage}
          </div>
        )}

        <div className="row three">
          <div className={styles.group}>
            <input
              type="text"
              autoComplete="given-name"
              name="firstName"
              value={firstName || ''}
              className={`input capitalize ${firstNameError ? 'error' : ''}`}
              placeholder="Nombres"
              maxLength={50}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              disabled={!stateSchema.email}
            />
            <label htmlFor="firstName" className="label">
              Nombres
            </label>
            {firstNameError && <span className="error">{firstNameError}</span>}
          </div>
          <div className={styles.group}>
            <input
              type="text"
              autoComplete="family-name"
              name="lastName"
              value={lastName || ''}
              className={`input capitalize ${lastNameError ? 'error' : ''}`}
              placeholder="Apellido Paterno"
              maxLength={50}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              disabled={!email}
            />
            <label htmlFor="lastName" className="label">
              Apellido Paterno
            </label>
            {lastNameError && <span className="error">{lastNameError}</span>}
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="secondLastName"
              value={secondLastName || ''}
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
              disabled={!email}
            />
            <label htmlFor="secondLastName" className="label">
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
                name="documentType"
                className={`input input-minimal ${
                  documentTypeError ? 'error' : ''
                }`}
                value={documentType || ''}
                onChange={(e) => {
                  handleChangeInput(e)
                  handleOnChangeInputProfile(e)
                  setSelectedDocumentType(e.target.value as UserDocumentType)
                }}
                disabled={!email}>
                <option disabled value="">
                  Seleccione
                </option>
                <option value="DNI">DNI</option>
                <option value="CEX">CEX</option>
                <option value="CDI">CDI</option>
              </select>
              <label htmlFor="documentType" className="label">
                Tipo Doc.
              </label>
              <TextMask
                mask={maskDocuments[documentType]}
                guide={false}
                type="text"
                name="documentNumber"
                value={documentNumber || ''}
                className={documentNumberError ? 'input error' : 'input'}
                placeholder="Num. Documento"
                maxLength={documentNumber === 'DNI' ? 8 : 15}
                minLength={documentNumber === 'DNI' ? 8 : 5}
                onChange={(e) => {
                  handleChangeInput(e)
                  handleOnChangeInputProfile(e)
                }}
                onBlur={handleOnChange}
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
              name="civilStatus"
              className={`input input-minimal ${
                civilStatusError ? 'error' : ''
              }`}
              value={civilStatus ? civilStatus.toUpperCase() : ''}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              disabled={!email}>
              <option value="">Seleccione</option>
              <option value="SO">Soltero(a)</option>
              <option value="CA">Casado(a)</option>
              <option value="DI">Divorciado(a)</option>
              <option value="VI">Viudo(a)</option>
            </select>
            <label htmlFor="civilStatus" className="label">
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
              name="phone"
              value={phone || ''}
              className={`input ${mobilePhoneError ? 'error' : ''}`}
              placeholder="Número de Celular"
              maxLength={12}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              disabled={!email}
            />
            <label htmlFor="phone" className="label">
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
              name="country"
              value={country || 'default'}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
                setUbigeo(e.target.value, 'country')
              }}
              disabled={!email}>
              <option value="default">Seleccione</option>
              <option value="260000">Perú</option>
            </select>
            <label htmlFor="country" className="label">
              País
            </label>
            {countryError && <span className="error">{countryError}</span>}
          </div>
          <div className={styles.group}>
            <select
              className="input input-minimal"
              name="department"
              value={department || 'default'}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
                setUbigeo(e.target.value, 'department')
              }}
              disabled={!email}>
              <option value="default">Seleccione</option>
              {departaments.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="department" className="label">
              Departamento
            </label>
            {departmentError && (
              <span className="error">{departmentError}</span>
            )}
          </div>
          <div className={styles.group}>
            <select
              className="input input-minimal"
              name="province"
              value={province || 'default'}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
                setUbigeo(e.target.value, 'province')
              }}
              disabled={!email}>
              <option value="default">Seleccione</option>
              {provinces.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="province" className="label">
              Provincia
            </label>
            {provinceError && <span className="error">{provinceError}</span>}
          </div>
        </div>

        <div className="row three">
          <div className={styles.group}>
            <select
              className="input input-minimal"
              name="district"
              value={district || 'default'}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              disabled={!email}>
              <option value="default">Seleccione</option>
              {districts.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="district" className="label">
              Distrito
            </label>
            {districtError && <span className="error">{districtError}</span>}
          </div>

          <div className={styles.group}>
            <input
              type="text"
              inputMode="email"
              autoComplete="email"
              name="email"
              value={email}
              className={emailError ? 'input error' : 'input'}
              placeholder="Correo electrónico"
              maxLength={30}
              disabled={email !== null}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
            />
            <label htmlFor="email" className="label">
              Correo electrónico
            </label>
            {emailError && <span className="error">{emailError}</span>}
          </div>

          <div className={styles.group}>
            <select
              className={`input input-minimal ${genderError ? 'error' : ''} `}
              name="gender"
              value={gender ? gender.toUpperCase() : ''}
              onChange={(e) => {
                handleChangeInput(e)
                handleOnChangeInputProfile(e)
              }}
              onBlur={handleOnChange}
              disabled={!email}>
              <option value="">Seleccione</option>
              <option value="MALE">Hombre</option>
              <option value="FEMALE">Mujer</option>
            </select>
            <label htmlFor="gender" className="label">
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
              id="birthDate"
              name="birthDate"
              className={dateBirthError ? 'input error' : 'input'}
              value={birthDate}
              onChange={(e) => {
                const ep: any = {
                  target: {
                    name: 'birthDate',
                    value: e,
                  },
                }
                handleChangeInput(ep)
                handleOnChangeInputProfile(ep)
              }}
              clearLabel="limpiar"
              cancelLabel="cancelar"
            />
            <label className="label" htmlFor="birthDate">
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
              disabled={disable || loading}>
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </form>

      {showPassConfirmation && (
        <ConfirmPass
          onClose={onPassConfirmationClose}
          onSuccess={onPassConfirmationSuccess}
          onError={onPassConfirmationError}
        />
      )}
    </>
  )
}

export default UpdateProfile
