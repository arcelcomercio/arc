import * as React from 'react'
import TextMask from 'react-text-mask'
import {
  ComposedUserProfile,
  PersonalAttributes,
  UserProfile,
} from 'types/identity'
import { UserDocumentType } from 'types/subscriptions'
import { Nullable } from 'types/utils'

import { UpdateUserProfile } from '../../../../../../hooks/useProfile'
import { reduceWord } from '../../../../../../utilities/parse/strings'
import getCodeError, {
  formatDate,
  formatEmail,
  formatNames,
  formatPhone,
  formatSecondLastName,
} from '../../../../_dependencies/Errors'
import {
  birthDatePattern,
  docPatterns,
  maskDocuments,
} from '../../../../_dependencies/Regex'
import useForm from '../../../../_hooks/useFormRC'
import { Status } from '../_dependencies/types'
import ConfirmPass from './confirm-pass'
import FormContainer from './form-container'

const styles = {
  group: 'sign-profile_update-form-group',
  btn: 'signwall-inside_forms-btn',
}

interface UpdateProfileProps {
  userProfile: ComposedUserProfile
  updateUserProfile: UpdateUserProfile
}

type ProfileWithAttributes = Nullable<
  Pick<
    ComposedUserProfile,
    | 'firstName'
    | 'lastName'
    | 'secondLastName'
    | 'documentNumber'
    | 'civilStatus'
    | 'phone'
    | 'email'
    | 'gender'
  > & {
    documentType: UserDocumentType
    birthDate: string
  }
>

const convertDateStringDate = (day: string, month: string, year: string) =>
  `${day}-${month}-${year}`

const createAttribute = (name?: string, value?: string, type = 'String') => ({
  name,
  value,
  type,
})

const UpdateProfile: React.FC<UpdateProfileProps> = ({
  userProfile,
  updateUserProfile,
}) => {
  const [status, setStatus] = React.useState<Status>(Status.Initial)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [hasSuccessMessage, setHasSuccessMessage] = React.useState(false)
  const [shouldConfirmPass, setShouldConfirmPass] = React.useState(false)
  const [
    selectedDocumentType,
    setSelectedDocumentType,
  ] = React.useState<UserDocumentType>('DNI')

  React.useEffect(() => {
    setStatus(Status.Ready)
  }, [])

  const disabled =
    status === Status.Loading ||
    status === Status.Initial ||
    !userProfile?.email

  const initialBirthDate =
    userProfile?.birthDay && userProfile?.birthMonth && userProfile?.birthYear
      ? convertDateStringDate(
          userProfile?.birthDay,
          userProfile?.birthMonth,
          userProfile?.birthYear
        )
      : ''

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
    email: {
      required: false,
      validator: formatEmail(),
    },
    gender: {
      required: false,
    },
    birthDate: {
      required: false,
      validator: formatDate(),
      minAge: true,
      maxAge: true,
    },
  }

  const stateSchema = {
    firstName: { value: null, error: '' },
    lastName: { value: null, error: '' },
    secondLastName: { value: null, error: '' },
    documentType: { value: null, error: '' },
    documentNumber: { value: null, error: '' },
    civilStatus: { value: null, error: '' },
    phone: { value: null, error: '' },
    email: { value: null, error: '' },
    gender: { value: null, error: '' },
    birthDate: { value: null, error: '' },
  }

  const handleUpdateProfile = async (profileValues: ProfileWithAttributes) => {
    const [day, month, year] = profileValues?.birthDate?.split('-') || []

    const personalAttributes: Array<PersonalAttributes> = [
      'civilStatus',
      'documentType',
      'documentNumber',
    ]

    const knownAttributes = [
      ...personalAttributes.map((attr) =>
        createAttribute(attr, profileValues?.[attr])
      ),
    ]

    const extraAttributes =
      userProfile?.attributes?.filter(
        (attr) =>
          ![...personalAttributes].includes(attr.name as PersonalAttributes)
      ) || []

    const validAttributes = [...extraAttributes, ...knownAttributes]
      .map((attribute) => {
        if (attribute.name === 'originReferer' && attribute.value) {
          return {
            ...attribute,
            value: attribute.value
              .split('&')[0]
              .replace(/(\/|=|#|\/#|#\/|=\/|\/=)$/, ''),
          }
        }
        if (
          !attribute.name ||
          !attribute.value ||
          attribute.value === 'default'
        ) {
          return null
        }

        return attribute
      })
      .filter((attribute) => attribute !== null)

    const profileToUpdate = {
      firstName: profileValues?.firstName || null,
      lastName: profileValues?.lastName || null,
      secondLastName: profileValues?.secondLastName || null,
      email: userProfile?.email,
      birthDay: day || null,
      birthMonth: month || null,
      birthYear: year || null,
      gender: profileValues?.gender || null,
      contacts:
        profileValues?.phone && profileValues.phone !== undefined
          ? [
              {
                phone: profileValues?.phone,
                type: 'PRIMARY',
              },
            ]
          : null,
      attributes: validAttributes || [],
    }

    setStatus(Status.Loading)

    updateUserProfile(profileToUpdate as any, {
      onSuccess: (updatedProfile: UserProfile) => {
        setHasSuccessMessage(true)
        setStatus(Status.Ready)

        const textProfile = document.getElementById('name-user-profile')
        if (textProfile) {
          const name = reduceWord(updatedProfile?.firstName || 'Usuario', 17)
          textProfile.textContent = `Hola ${name}`
        }
        window.scrollTo(0, 0)

        setTimeout(() => {
          setHasSuccessMessage(false)
        }, 5000)
      },
      onError: (error: Record<string, string>) => {
        const { code } = error || {}
        setStatus(Status.Ready)
        if (code === '100018' || code === '300040') {
          setShouldConfirmPass(true)
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
      email: emailError,
      gender: genderError,
      birthDate: dateBirthError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm<ProfileWithAttributes>(
    stateSchema,
    stateValidatorSchema,
    handleUpdateProfile
  )

  const handleChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    handleOnChange(e)
    setErrorMessage('')
  }

  const onPassConfirmationClose = () => {
    setShouldConfirmPass(false)
    const ModalProfile = document.getElementById('profile-signwall')
      ?.parentElement
    if (ModalProfile) {
      if (shouldConfirmPass) {
        ModalProfile.style.overflow = 'auto'
      } else {
        ModalProfile.style.overflow = 'hidden'
      }
    }
  }

  const onPassConfirmationSuccess = () => {}

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
      <FormContainer
        onSubmit={handleOnSubmit}
        title="Datos personales"
        errorMessage={errorMessage}
        successMessage={
          hasSuccessMessage
            ? 'Sus datos han sido actualizados correctamente'
            : undefined
        }
        disabled={disable}
        status={status}>
        <div className="row three">
          <div className={styles.group}>
            <input
              type="text"
              autoComplete="given-name"
              id="firstName"
              name="firstName"
              value={(firstName ?? userProfile?.firstName) || ''}
              className={`input capitalize ${firstNameError ? 'error' : ''}`}
              placeholder="Nombres"
              maxLength={50}
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              disabled={disabled}
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
              id="lastName"
              name="lastName"
              value={(lastName ?? userProfile?.lastName) || ''}
              className={`input capitalize ${lastNameError ? 'error' : ''}`}
              placeholder="Apellido Paterno"
              maxLength={50}
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              disabled={disabled}
            />
            <label htmlFor="lastName" className="label">
              Apellido Paterno
            </label>
            {lastNameError && <span className="error">{lastNameError}</span>}
          </div>
          <div className={styles.group}>
            <input
              type="text"
              id="secondLastName"
              name="secondLastName"
              value={(secondLastName ?? userProfile?.secondLastName) || ''}
              className={`input capitalize ${
                secondLastNameError ? 'error' : ''
              }`}
              placeholder="Apellido Materno"
              maxLength={50}
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              disabled={disabled}
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
                id="documentType"
                name="documentType"
                className={`input input-minimal ${
                  documentTypeError ? 'error' : ''
                }`}
                value={(documentType ?? userProfile?.documentType) || ''}
                onChange={(e) => {
                  handleChangeInput(e)
                  setSelectedDocumentType(e.target.value as UserDocumentType)
                }}
                disabled={disabled}>
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
                mask={
                  maskDocuments[
                    (documentType ??
                      (userProfile?.documentType as UserDocumentType)) ||
                      'DNI'
                  ]
                }
                guide={false}
                type="text"
                id="documentNumber"
                name="documentNumber"
                value={(documentNumber ?? userProfile?.documentNumber) || ''}
                className={documentNumberError ? 'input error' : 'input'}
                placeholder="Num. Documento"
                maxLength={
                  (documentNumber ?? userProfile?.documentNumber) === 'DNI'
                    ? 8
                    : 15
                }
                minLength={
                  (documentNumber ?? userProfile?.documentNumber) === 'DNI'
                    ? 8
                    : 5
                }
                onChange={handleChangeInput}
                onBlur={handleOnChange}
                disabled={disabled}
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
              id="civilStatus"
              name="civilStatus"
              className={`input input-minimal ${
                civilStatusError ? 'error' : ''
              }`}
              value={
                (civilStatus ?? userProfile?.civilStatus)?.toUpperCase() || ''
              }
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              disabled={disabled}>
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
              id="phone"
              name="phone"
              value={(phone ?? userProfile?.phone) || ''}
              className={`input ${mobilePhoneError ? 'error' : ''}`}
              placeholder="Número de Celular"
              maxLength={12}
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              disabled={disabled}
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
            <input
              type="text"
              inputMode="email"
              autoComplete="email"
              id="email"
              name="email"
              value={email || userProfile?.email || ''}
              className={emailError ? 'input error' : 'input'}
              placeholder="Correo electrónico"
              maxLength={30}
              disabled
            />
            <label htmlFor="email" className="label">
              Correo electrónico
            </label>
            {emailError && <span className="error">{emailError}</span>}
          </div>

          <div className={styles.group}>
            <select
              className={`input input-minimal ${genderError ? 'error' : ''} `}
              id="gender"
              name="gender"
              autoComplete="sex"
              value={(gender ?? userProfile?.gender)?.toUpperCase() || ''}
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              disabled={disabled}>
              <option value="">Seleccione</option>
              <option value="MALE">Hombre</option>
              <option value="FEMALE">Mujer</option>
              <option value="PREFER_NOT_TO_SAY">Prefiero no decirlo</option>
              <option value="NON_CONFORMING">Otro</option>
            </select>
            <label htmlFor="gender" className="label">
              Género
            </label>
          </div>
          <div className={styles.group}>
            <TextMask
              mask={birthDatePattern}
              id="birthDate"
              name="birthDate"
              inputMode="numeric"
              autoComplete="bday"
              disabled={disabled}
              className={dateBirthError ? 'input error' : 'input'}
              value={(birthDate ?? initialBirthDate) || ''}
              onChange={handleChangeInput}
              placeholder="Fecha de Nacimiento"
            />
            <label className="label" htmlFor="birthDate">
              Fecha de Nacimiento
            </label>
            {dateBirthError && <span className="error">{dateBirthError}</span>}
          </div>
        </div>
      </FormContainer>

      {shouldConfirmPass && (
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
