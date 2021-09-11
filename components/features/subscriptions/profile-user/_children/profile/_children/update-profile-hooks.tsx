import Identity from '@arc-publishing/sdk-identity'
import {
  BaseUserProfile,
  // UserProfile,
} from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
// import { getUserProfile } from '../../../../../../utilities/subscriptions/identity'
// import GetProfile from 'components/features/signwall/_dependencies/get-profile'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { UserDocumentType } from '../../../../../../../types/subscriptions'
import useProfile from '../../../../../../hooks/useProfile'
import getCodeError, {
  formatEmail,
  formatNames,
  formatPhone,
  formatSecondLastName,
} from '../../../../_dependencies/Errors'
import { docPatterns } from '../../../../_dependencies/Regex'
import {
  conformProfile /* ,
  getStorageProfile, */,
} from '../../../../_dependencies/Session'
// import { checkFbEmail,checkFormatPhone,checkUndefined} from '../../../../_dependencies/Utils'
import useForm from '../../../../_hooks/useForm'
import ConfirmPass from './confirm-pass'
import PersonalDetails from './personal-details'
import Ubigeo from './ubigeo'

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

  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState(false)
  const [showPassConfirmation, setShowPassConfirmation] = React.useState(false)

  const [
    selectedDocumentType,
    setSelectedDocumentType,
  ] = React.useState<UserDocumentType>('DNI')

  const convertDateStringDate = (year: string, month: string, day: string) => {
    const yearConverted = new Date(`${year}-${month}-${day}`)
    yearConverted.setDate(yearConverted.getDate() + 1)
    const newDate = new Date(yearConverted)
    return newDate
  }

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
    attributes,
  } = conformProfile(
    Identity.userProfile /* userProfile */ || {}
  ) as ProfileWithAttributes

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
    console.log('esquema recibido:', profile)

    let year = null
    let month = null
    let day = null
    if (profile?.birthDate !== null) {
      const restartDate = new Date(profile?.birthDate)
      const newDate = new Date(restartDate.setDate(restartDate.getDate() - 1))

      year = `${newDate.getFullYear()}`
      month =
        newDate.getMonth() + 1 < 10
          ? `0${newDate.getMonth() + 1}`
          : `${newDate.getMonth() + 1}`
      day =
        newDate.getUTCDate() < 10
          ? `0${newDate.getUTCDate()}`
          : `${newDate.getUTCDate()}`
    }

    console.log(year, month, day)

    const user = {
      firstName: profile?.firstName || null,
      lastName: profile?.lastName || null,
      secondLastName: profile?.secondLastName || null,
      email: profile?.email,
      birthDay: day,
      birthMonth: month,
      birthYear: year,
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
        attribute.value !== '' &&
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
      // country: countryError,
      // department: departmentError,
      // province: provinceError,
      // district: districtError,
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
    // handleOnSubmit()
    // handleUpdateProfile(stateSchema)
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

        <PersonalDetails
          email={email}
          firstName={firstName}
          lastName={lastName}
          secondLastName={secondLastName}
          documentType={documentType}
          documentNumber={documentNumber}
          civilStatus={civilStatus}
          phone={phone}
          gender={gender}
          birthDate={birthDate}
          firstNameError={firstNameError}
          lastNameError={lastNameError}
          secondLastNameError={secondLastNameError}
          documentTypeError={documentTypeError}
          documentNumberError={documentNumberError}
          civilStatusError={civilStatusError}
          mobilePhoneError={mobilePhoneError}
          emailError={emailError}
          genderError={genderError}
          dateBirthError={dateBirthError}
          setSelectedDocumentType={setSelectedDocumentType}
          handleChangeInput={handleChangeInput}
          handleOnChange={handleOnChange}
        />
        <Ubigeo
          handleChangeInput={handleChangeInput}
          country={country}
          department={department}
          province={province}
          district={district}
          email={email}
        />
        <div className="row three">
          <div className={styles.group} />
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
