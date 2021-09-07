import * as React from 'react'

import { formatCellphone, formatNames } from '../../_dependencies/Errors'
import { pushCallOut } from '../../_dependencies/Services'
import useForm from '../../_hooks/useForm'

type CallOutFormProps = {
  namecall: string
  phonecall: string
}

const CallinCallout = (): JSX.Element => {
  const [showConfirmCall, setShowConfirmCall] = React.useState(false)
  const [showRepeatCall, setShowRepeatCall] = React.useState<string>()
  const [showErrorCall, setShowErrorCall] = React.useState<string>()
  const [loading, setLoading] = React.useState(false)

  const stateSchema = {
    namecall: { value: '', error: '' },
    phonecall: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    namecall: {
      required: true,
      validator: formatNames(),
    },
    phonecall: {
      required: true,
      validator: formatCellphone(),
    },
  }

  const onFomrCallOut = ({ namecall, phonecall }: CallOutFormProps) => {
    setLoading(true)
    pushCallOut(namecall, phonecall)
      .then((resCall) => {
        if (
          resCall.resultado ||
          resCall.mensaje ===
            'El numero de telefono ya ha sido registrado el dia de hoy'
        ) {
          if (
            resCall.mensaje ===
            'El numero de telefono ya ha sido registrado el dia de hoy'
          ) {
            setLoading(false)
            setShowRepeatCall(resCall.mensaje)
          } else {
            setLoading(false)
            setShowConfirmCall(true)
          }
        } else {
          setShowErrorCall(resCall.mensaje || resCall.Message)
        }
      })
      .catch(() => {
        setLoading(false)
        setShowErrorCall(
          'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.'
        )
      })
  }

  const {
    values: { namecall, phonecall },
    errors: { namecall: namecallError, phonecall: phonecallError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFomrCallOut)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(e)
  }

  return (
    <section id="callin" className="callin">
      <div className="wrapper">
        {showConfirmCall || showErrorCall || showRepeatCall ? (
          <div className="msg-confirmation">
            {showConfirmCall && (
              <h3>Tus datos han sido enviados correctamente</h3>
            )}

            {showRepeatCall && <h3>{showRepeatCall} </h3>}

            {showErrorCall && <h3>Ocurrió un error</h3>}

            {(showConfirmCall || showRepeatCall) && (
              <>
                <p>Uno de nuestros ejecutivos se pondrá en contacto contigo.</p>
                <p className="note-schedule">
                  Horario de atención es de L-V: 9AM a 8PM y S: 9AM a 1PM
                </p>
              </>
            )}
            {showErrorCall && <p>{showErrorCall}</p>}
          </div>
        ) : (
          <form onSubmit={handleOnSubmit}>
            <input
              className={namecallError && 'input-error'}
              type="text"
              autoComplete="name"
              placeholder="Nombre"
              name="namecall"
              maxLength={80}
              required
              value={namecall}
              onBlur={handleOnChange}
              onChange={handleChangeInput}
              disabled={loading}
            />
            <input
              className={phonecallError && 'input-error'}
              type="text"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Celular"
              name="phonecall"
              maxLength={9}
              required
              value={phonecall}
              onBlur={handleOnChange}
              onChange={handleChangeInput}
              disabled={loading}
            />
            <button
              type="submit"
              className={loading ? 'icon-loading' : 'icon-send'}
              disabled={disable || loading}>
              {loading ? '...' : ' '}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default CallinCallout
