import Identity from '@arc-publishing/sdk-identity'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { Close } from '../../../../../signwall/_children/icons'
import { Modal } from '../../../../../signwall/_children/modal/index'
import useForm from '../../../../_hooks/useForm'
import { Status } from '../_dependencies/types'

interface ConfirmPassProps {
  onClose: () => void
  onSuccess: () => void
  onError: () => void
}

const styles = {
  group: 'sign-profile_update-form-group',
  btn: 'signwall-inside_forms-btn',
}

const ConfirmPass: React.FC<ConfirmPassProps> = ({
  onClose,
  onSuccess,
  onError,
}) => {
  const {
    siteProperties: {
      signwall: { mainColorLink, mainColorBtn },
    },
  } = useAppContext() || {}

  const [status, setStatus] = React.useState<Status>(Status.Loading)
  const disabled = status === Status.Loading

  React.useEffect(() => {
    setStatus(Status.Ready)
  }, [])

  const handleClose = (e?: React.SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    onClose()
  }

  const onPasswordSubmit = ({ password }: { password: string }) => {
    // if (passwordError.trim.length === 0) {}
    setStatus(Status.Loading)
    const { email: userEmail = '' } = Identity.userProfile || {}
    Identity.login(userEmail, password, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        setStatus(Status.Initial)
        onSuccess()
        handleClose()
      })
      .catch((error) => {
        setStatus(Status.Ready)
        console.log({ error })
        onError()
      })
  }

  const stateSchema = {
    password: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    password: {
      required: true,
      validator: {
        func: (value: string) => value.length > 7 && !value.includes(' '),
        error: 'La contraseña debe tener mínimo 8 caracteres, sin espacios',
      },
    },
  }

  const {
    values: { password },
    errors: { password: passwordError },
    handleOnChange,
    handleOnSubmit,
  } = useForm(stateSchema, stateValidatorSchema, onPasswordSubmit)

  return (
    <Modal size="mini" position="middle" bgColor="white">
      <div className="text-right">
        <button type="button" onClick={handleClose}>
          <Close />
        </button>
      </div>

      <form
        className="sign-profile_update-form-grid"
        onSubmit={handleOnSubmit}
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
            id="currentPassword"
            name="password"
            autoComplete="current-password"
            className={passwordError.length > 0 ? 'input error' : 'input'}
            placeholder="Contraseña"
            maxLength={50}
            value={password}
            required
            disabled={disabled}
            onChange={handleOnChange}
          />
          <label htmlFor="password" className="label">
            Contraseña
          </label>
          {passwordError.length > 0 && (
            <span className="error">{passwordError}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={
            !(password.length > 7 && passwordError.length === 0) || disabled
          }
          className="signwall-inside_forms-btn"
          style={{ color: mainColorBtn, backgroundColor: mainColorLink }}>
          {status === Status.Loading || status === Status.Initial
            ? 'CONFIRMANDO...'
            : 'CONFIRMAR'}
        </button>
      </form>
    </Modal>
  )
}

export default ConfirmPass
