import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { Status } from '../_dependencies/types'

interface FormContainerProps {
  reference: React.LegacyRef<HTMLButtonElement> | undefined
  title: string
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  errorMessage?: string
  successMessage?: string
  disabled?: boolean
  status: Status
}

const styles = {
  group: 'sign-profile_update-form-group',
  btn: 'signwall-inside_forms-btn',
}

const FormContainer: React.FC<FormContainerProps> = ({
  reference,
  title,
  children,
  onSubmit,
  errorMessage,
  successMessage,
  disabled = false,
  status = Status.Initial,
}) => {
  const {
    siteProperties: {
      signwall: { mainColorLink, mainColorBtn },
    },
  } = useAppContext() || {}

  let buttonText = ''
  switch (status) {
    case Status.Restart:
    case Status.Ready:
      buttonText = 'Guardar Cambios'
      break
    case Status.StandBy:
    case Status.Loading:
      buttonText = 'Guardando...'
      break
    default:
      break
  }

  return (
    <form
      onSubmit={onSubmit}
      className="sign-profile_update-form-grid"
      noValidate>
      <div className="row btw">
        <h3 className="title">{title}</h3>
      </div>

      {successMessage ? (
        <div className="sign-profile_update-message sign-profile_update-message-success">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="sign-profile_update-message sign-profile_update-message-failed">
          {errorMessage}
        </div>
      ) : null}
      {children}
      <div className="row three">
        <div className={styles.group} />
        <div className={styles.group} />
        <div className={styles.group}>
          <button
            className={styles.btn}
            ref={reference}
            type="submit"
            style={{
              color: mainColorBtn,
              backgroundColor: mainColorLink,
            }}
            disabled={
              status === Status.Initial ||
              status === Status.Loading ||
              // en caso se finalizó el proceso se pone Status.Restart
              status === Status.Restart ||
              disabled
            }>
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  )
}

export default FormContainer
