import * as React from 'react'

import { formatCellphone, formatNames } from '../../_dependencies/Errors'
import useForm from '../../_hooks/useForm'
import { CallService } from './CallService'

type CallOutFormProps = {
  namecall: string
  phonecall: string
}

type DataCallProps = {
  name: string
  phone: string
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
      min2caracts: true,
      invalidtext: true,
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
          <CallService name={dataCallInn.name} phone={dataCallInn.phone} />
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
