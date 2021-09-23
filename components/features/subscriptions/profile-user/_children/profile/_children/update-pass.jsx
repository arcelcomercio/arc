import Identity from '@arc-publishing/sdk-identity'
import * as React from 'react'

import getCodeError, { formatPass } from '../../../../_dependencies/Errors'
import useForm from '../../../../_hooks/useForm'
import FormContainer from './form-container'

const UpdatePassword = () => {
  const [loading, setLoading] = React.useState()
  const [errorMessage, setErrorMessage] = React.useState()
  const [hasSuccessMessage, setHasSuccessMessage] = React.useState()

  const stateSchema = {
    newPassword: { value: '', error: '' },
    oldPassword: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    newPassword: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
    oldPassword: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
  }

  const submitConfirmPassword = ({ newPassword, oldPassword }) => {
    setLoading(true)
    Identity.updatePassword(oldPassword, newPassword)
      .then(() => {
        setLoading(false)
        setHasSuccessMessage(true)
      })
      .catch((err) => {
        setLoading(false)
        setErrorMessage(getCodeError(err.code))
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage(false)
          setHasSuccessMessage(false)
        }, 5000)
      })
  }

  const {
    values: { newPassword, oldPassword },
    errors: { newPassword: newPasswordError, oldPassword: oldPasswordError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, submitConfirmPassword)

  const handleChangeInput = (e) => {
    handleOnChange(e)
    setErrorMessage(false)
  }

  return (
    <FormContainer
      title="Cambiar contraseña"
      onSubmit={handleOnSubmit}
      successMessage={
        hasSuccessMessage
          ? 'Su contraseña ha sido actualizada exitosamente'
          : undefined
      }
      errorMessage={errorMessage}
      loading={disable || loading}>
      <div className="row three">
        <div className="sign-profile_update-form-group">
          <div hidden>
            <input type="password" />
          </div>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            className={newPasswordError ? 'input error' : 'input'}
            placeholder="Nueva contraseña"
            noValidate
            maxLength="50"
            onChange={handleChangeInput}
            onBlur={handleOnChange}
          />
          <label htmlFor="newPassword" className="label">
            Nueva contraseña
          </label>
          {newPasswordError && (
            <span className="error">{newPasswordError}</span>
          )}
        </div>
        <div className="sign-profile_update-form-group">
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            className={oldPasswordError ? 'input error' : 'input'}
            placeholder="Contraseña Actual"
            noValidate
            maxLength="50"
            onChange={handleChangeInput}
            onBlur={handleOnChange}
          />
          <label htmlFor="oldPassword" className="label">
            Contraseña Actual
          </label>
          {oldPasswordError && (
            <span className="error">{oldPasswordError}</span>
          )}
        </div>
      </div>
    </FormContainer>
  )
}

export default UpdatePassword
