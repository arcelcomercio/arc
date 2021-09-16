/* eslint-disable jsx-a11y/label-has-associated-control */
import Identity from '@arc-publishing/sdk-identity'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import getCodeError, { formatPass } from '../../../../_dependencies/Errors'
import useForm from '../../../../_hooks/useForm'

const UpdatePassword = () => {
  const {
    siteProperties: {
      signwall: { mainColorLink, mainColorBtn },
    },
  } = useAppContext() || {}

  const [loading, setLoading] = React.useState()
  const [msgError, setMsgError] = React.useState()
  const [msgSuccess, setMsgSuccess] = React.useState()

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
        setMsgSuccess(true)
      })
      .catch((err) => {
        setLoading(false)
        setMsgError(getCodeError(err.code))
      })
      .finally(() => {
        setTimeout(() => {
          setMsgError(false)
          setMsgSuccess(false)
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
    setMsgError(false)
  }

  return (
    <>
      <form
        className="sign-profile_update-form-grid"
        onSubmit={handleOnSubmit}
        autoComplete="off">
        <div className="row">
          <h3 className="title">Cambiar contraseña</h3>
        </div>

        {msgSuccess && (
          <div className="sign-profile_update-message sign-profile_update-message-success">
            Tu contraseña ha sido actualizada correctamente.
          </div>
        )}

        {msgError && (
          <div className="sign-profile_update-message sign-profile_update-message-failed">
            {msgError}
          </div>
        )}

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
          <div className="sign-profile_update-form-group">
            <button
              className="signwall-inside_forms-btn"
              style={{ color: mainColorBtn, backgroundColor: mainColorLink }}
              type="submit"
              disabled={disable || loading}>
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default UpdatePassword
