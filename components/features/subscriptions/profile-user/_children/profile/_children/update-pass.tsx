import Identity from '@arc-publishing/sdk-identity'
import * as React from 'react'

import getCodeError, { formatPass } from '../../../../_dependencies/Errors'
import useForm from '../../../../_hooks/useForm'
import { Status } from '../_dependencies/types'
import FormContainer from './form-container'

const UpdatePassword = () => {
  const [status, setStatus] = React.useState<Status>(Status.Initial)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [hasSuccessMessage, setHasSuccessMessage] = React.useState(false)

  const ref = React.createRef<HTMLButtonElement>()

  React.useEffect(() => {
    setStatus(Status.Ready)
  }, [])

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

  const submitConfirmPassword = ({
    newPassword,
    oldPassword,
  }: {
    newPassword: string
    oldPassword: string
  }) => {
    setStatus(Status.Loading)
    Identity.updatePassword(oldPassword, newPassword)
      .then(() => {
        setHasSuccessMessage(true)
        // se encarga de bloquear el botón cuando todo salio bien
        setStatus(Status.Restart)
      })
      .catch((err) => {
        setStatus(Status.Ready)
        setErrorMessage(getCodeError(err.code))
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage('')
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

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(e)
    setStatus(Status.Ready)
    setErrorMessage('')
  }

  return (
    <FormContainer
      reference={ref}
      title="Cambiar contraseña"
      onSubmit={handleOnSubmit}
      successMessage={
        hasSuccessMessage
          ? 'Su contraseña ha sido actualizada exitosamente'
          : undefined
      }
      errorMessage={errorMessage}
      disabled={disable}
      status={status}>
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
            formNoValidate
            maxLength={50}
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
            formNoValidate
            maxLength={50}
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
