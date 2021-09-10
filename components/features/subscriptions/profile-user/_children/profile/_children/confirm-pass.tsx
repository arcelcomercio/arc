import Identity from '@arc-publishing/sdk-identity'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { Close } from '../../../../../signwall/_children/icons'
import { Modal } from '../../../../../signwall/_children/modal/index'
import useForm from '../../../../_hooks/useForm'

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

  const [loading, setLoading] = React.useState(false)

  const handleClose = (e?: React.SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    onClose()
  }

  const onPasswordSubmit = ({ password }: { password: string }) => {
    // if (passwordError.trim.length === 0) {}
    setLoading(true)
    const { email: userEmail } = Identity.userProfile || {}

    Identity.login(userEmail || '', password, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        onSuccess()
      })
      .catch(() => {
        onError()
        // TODO: enviar error a Sentry
      })
      .finally(() => {
        // TODO: verificar si este evento debe estar aquí o debe estar en el then()
        setLoading(false)
        handleClose()
      })
  }

  const stateSchema = {
    password: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    password: {
      required: true,
      validator: {
        func: (value: string) => value.length < 8 && value.includes(' '),
        error: 'La contraseña debe tener mínimo 8 caracteres, sin espacios',
      },
    },
  }

  const {
    values: { password },
    errors: { password: passwordError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onPasswordSubmit)

  return (
    <Modal size="mini" position="middle" bgColor="white" arcSite={undefined}>
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
            name="currentPassword"
            autoComplete="current-password"
            className={passwordError.length > 0 ? 'input error' : 'input'}
            placeholder="Contraseña"
            maxLength={50}
            value={password}
            required
            disabled={disable || loading}
            onChange={handleOnChange}
          />
          <label htmlFor="currentPassword" className="label">
            Contraseña
          </label>
          {passwordError.length > 0 && (
            <span className="error">{passwordError}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={!(password.length > 7 && passwordError.length === 0)}
          className="signwall-inside_forms-btn"
          style={{ color: mainColorBtn, backgroundColor: mainColorLink }}>
          {disable || loading ? 'CONFIRMANDO...' : 'CONFIRMAR'}
        </button>
      </form>
    </Modal>
  )
}

export default ConfirmPass
