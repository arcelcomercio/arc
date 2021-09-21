import { useContent } from 'fusion:content'
import * as React from 'react'

import { formatCellphone, formatNames } from '../../_dependencies/Errors'
import useForm from '../../_hooks/useForm'

type CallOutFormProps = {
  namecall: string
  phonecall: string
}

type DataCallProps = {
  name: string
  phone: string
}

const PaywallCallIn = (data: DataCallProps) => {
  const [loading, setLoading] = React.useState(true)
  const [showError, setShowError] = React.useState<string>()
  const [showSuccess, setShowSuccess] = React.useState<number>()

  const result =
    useContent({
      source: 'paywall-callin',
      query: data,
    }) || {}
  const { success, error } = result

  React.useEffect(() => {
    const msgError =
      'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.'

    if (success) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(success, 'text/xml')
      const parent = doc.getElementsByTagName('ws_EC_SuscripcionResult')[0]
      const child = parent.childNodes[0]
      if (parent && child) {
        const numOrderClear = Number(child.nodeValue)
        if (numOrderClear >= 0) {
          setShowSuccess(numOrderClear)
        } else {
          setShowError(msgError)
        }
        setLoading(false)
      } else {
        setShowError(msgError)
        setLoading(false)
      }
    }
    if (error) {
      setLoading(false)
    }
  }, [success, error])

  return (
    <div className="msg-confirmation">
      {loading ? (
        <div className="loading-call">
          <div />
          <div />
          <div />
          <div />
        </div>
      ) : (
        <>
          {showSuccess && (
            <>
              <h3>
                Tus datos han sido enviados correctamente - Orden: {showSuccess}
              </h3>
              <p>Uno de nuestros ejecutivos se pondrá en contacto contigo.</p>
              <p className="note-schedule">
                Horario de atención es de L-V: 9AM a 8PM y S: 9AM a 1PM
              </p>
            </>
          )}
          {(error || showError) && (
            <>
              <h3>Oh, oh, algo salió mal</h3>
              <p>{error || showError}</p>
            </>
          )}
        </>
      )}
    </div>
  )
}

const CallinCallout = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false)
  const [dataCallInn, setDataCallInn] = React.useState<DataCallProps>()

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
    setDataCallInn({ name: namecall, phone: phonecall })
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
        {dataCallInn ? (
          <PaywallCallIn name={dataCallInn.name} phone={dataCallInn.phone} />
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
