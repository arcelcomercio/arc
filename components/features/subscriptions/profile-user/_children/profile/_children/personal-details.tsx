import { DatePicker } from '@material-ui/pickers'
import * as React from 'react'
import TextMask from 'react-text-mask'

import { UserDocumentType } from '../../../../../../../types/subscriptions'
import { maskDocuments } from '../../../../_dependencies/Regex'

const styles = {
  group: 'sign-profile_update-form-group',
  btn: 'signwall-inside_forms-btn',
}


interface PersonalDetailsProps {
  email: string | null
  firstName: string | null
  lastName: string | null
  secondLastName: string | null
  documentType: string | ''
  documentNumber: string | null
  civilStatus: string | null
  phone: string | null
  gender: string | null
  birthDate: Date | null | string
  firstNameError: string
  lastNameError: string
  secondLastNameError: string
  documentTypeError: string
  documentNumberError: string
  civilStatusError: string
  mobilePhoneError: string
  emailError: string
  genderError: string
  dateBirthError: string
  setSelectedDocumentType: (e: UserDocumentType) => void
  handleChangeInput: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void
  handleOnChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
}

const createTarget = (e: Date | null) => ({
  target: {
    name: 'birthDate',
    value: e,
  },
})

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  email,
  firstName,
  lastName,
  secondLastName,
  documentType,
  documentNumber,
  civilStatus,
  phone,
  gender,
  birthDate,
  firstNameError,
  lastNameError,
  secondLastNameError,
  documentTypeError,
  documentNumberError,
  civilStatusError,
  mobilePhoneError,
  emailError,
  genderError,
  dateBirthError,
  setSelectedDocumentType,
  handleChangeInput,
  handleOnChange,
}) => (
  <>
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
          }}
          onBlur={handleOnChange}
          disabled={!email}
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
          className={`input capitalize ${secondLastNameError ? 'error' : ''}`}
          placeholder="Apellido Materno"
          maxLength={50}
          onChange={(e) => {
            handleChangeInput(e)
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
          className={`input input-minimal ${civilStatusError ? 'error' : ''}`}
          value={civilStatus ? civilStatus.toUpperCase() : ''}
          onChange={(e) => {
            handleChangeInput(e)
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
        {civilStatusError && <span className="error">{civilStatusError}</span>}
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
          }}
          onBlur={handleOnChange}
          disabled={!email}
        />
        <label htmlFor="phone" className="label">
          Número de Celular
        </label>
        {mobilePhoneError && <span className="error">{mobilePhoneError}</span>}
      </div>
    </div>
    <div className="row three">
      <div className={styles.group}>
        <input
          type="text"
          inputMode="email"
          autoComplete="email"
          name="email"
          value={email || ''}
          className={emailError ? 'input error' : 'input'}
          placeholder="Correo electrónico"
          maxLength={30}
          disabled={email !== null}
          onChange={(e) => {
            handleChangeInput(e)
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
      </div>
      <div className={styles.group}>
        <DatePicker
          clearable
          format="dd MMM yyyy"
          id="birthDate"
          name="birthDate"
          disabled={!email}
          className={dateBirthError ? 'input error' : 'input'}
          value={birthDate}
          onChange={(e) => {
            const ep: unknown = createTarget(e)

            handleChangeInput(ep as React.ChangeEvent<HTMLInputElement>)
          }}
          clearLabel="limpiar"
          cancelLabel="cancelar"
        />
        <label className="label" htmlFor="birthDate">
          Fecha Cumpleaños
        </label>
        {dateBirthError && <span className="error">{dateBirthError}</span>}
      </div>
    </div>
  </>
)

export default PersonalDetails
