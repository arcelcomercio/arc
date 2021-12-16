import React, { useState } from 'react'

import { Input } from '../../../signwall/_children/forms/control_input_select'
import { Close, MsgRegister } from '../../../signwall/_children/icons'
import Modal from '../../_children/modal'
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

const CallOut = ({ onClose, noBtnClose = false }) => {
  const [loading, setLoading] = useState(false)
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

  return (
    <Modal
      onClose={() => {}}
      showClose="true"
      scrollable="true"
      allowEsc={false}>
      <div className="modal-container modal-form">
        {!noBtnClose && (
          <button
            type="button"
            className="close-button"
            onClick={() => {
              onClose()
            }}>
            <Close />
          </button>
        )}

        {dataCallInn ? (
          <form className="signwall-inside_forms-form">
            <div className="center block mb-20 mt-20">
              <MsgRegister bgcolor="#efdb96" />
            </div>
            <CallService name={dataCallInn.name} phone={dataCallInn.phone} />
          </form>
        ) : (
          <form
            className="signwall-inside_forms-form"
            onSubmit={handleOnSubmit}>
            <h4
              style={{ fontSize: '24px', color: '#404040' }}
              className="signwall-inside_forms-title mb-10 mt-40 center">
              Ingresa tus datos
            </h4>

            <Input
              type="text"
              autoComplete="name"
              name="namecall"
              placeholder="Nombre*"
              maxLength="80"
              required
              value={namecall}
              onBlur={handleOnChange}
              onChange={handleOnChange}
              error={namecallError}
              disabled={loading}
            />

            <Input
              type="text"
              inputMode="tel"
              autoComplete="tel"
              name="phonecall"
              placeholder="Celular*"
              maxLength="9"
              required
              value={phonecall}
              onBlur={handleOnChange}
              onChange={handleOnChange}
              error={phonecallError}
              disabled={loading}
            />

            <button
              type="submit"
              className="signwall-inside_forms-button-call mt-40 mb-10"
              disabled={disable || loading}>
              {loading ? 'Enviando...' : 'Te llamamos'}
            </button>
          </form>
        )}
      </div>
    </Modal>
  )
}

export default CallOut
