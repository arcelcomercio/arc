import React, { useState } from 'react'

import Modal from '../../../subscriptions/_children/modal'
import {
  formatCellphone,
  formatNames,
} from '../../../subscriptions/_dependencies/Errors'
import { pushCallOut } from '../../../subscriptions/_dependencies/Services'
import useForm from '../../../subscriptions/_hooks/useForm'
import { Input } from '../forms/control_input_select'
import { Close, MsgRegister } from '../icons'

const CallOut = ({ onClose, noBtnClose = false }) => {
  const [showConfirmCall, setShowConfirmCall] = useState(false)
  const [showRepeatCall, setShowRepeatCall] = useState(false)
  const [showErrorCall, setShowErrorCall] = useState(false)
  const [loading, setLoading] = useState()

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

  const msgFailedApi =
    'El numero de telefono ya ha sido registrado el dia de hoy'
  const msgFailed =
    'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.'

  const onFomrCallOut = ({ namecall, phonecall }) => {
    setLoading(true)
    pushCallOut(namecall, phonecall)
      .then((resCall) => {
        if (resCall.resultado || resCall.mensaje === msgFailedApi) {
          if (resCall.mensaje === msgFailedApi) {
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
        setShowErrorCall(msgFailed)
      })
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

        {showConfirmCall || showErrorCall || showRepeatCall ? (
          <form className="signwall-inside_forms-form">
            <div className="center block mb-20 mt-20">
              <MsgRegister bgcolor="#efdb96" />
            </div>

            {showConfirmCall && (
              <h4
                style={{ fontSize: '22px' }}
                className="signwall-inside_forms-title center mb-10">
                Tus datos han sido enviados correctamente
              </h4>
            )}

            {showRepeatCall && (
              <h4
                style={{ fontSize: '22px' }}
                className="signwall-inside_forms-title center mb-10">
                {showRepeatCall}
              </h4>
            )}

            {showErrorCall && (
              <h4
                style={{ fontSize: '22px' }}
                className="signwall-inside_forms-title center mb-10">
                Ocurrió un error
              </h4>
            )}

            {(showConfirmCall || showRepeatCall) && (
              <>
                <h4
                  style={{ fontSize: '16px', color: '#6a6a6a' }}
                  className="signwall-inside_forms-title center">
                  Uno de nuestros ejecutivos se pondrá en contacto contigo.
                </h4>
                <br />
                <p
                  style={{ fontSize: '12px', color: '#242424' }}
                  className="signwall-inside_forms-text center">
                  Horario de atención es de <br />
                  L-V: 9AM a 8PM y <br /> S: 9AM a 1PM
                </p>
              </>
            )}

            {showErrorCall && (
              <h4
                style={{ fontSize: '16px', color: '#6a6a6a' }}
                className="signwall-inside_forms-title center">
                {showErrorCall}
              </h4>
            )}
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
              onChange={(e) => {
                handleOnChange(e)
              }}
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
              onChange={(e) => {
                handleOnChange(e)
              }}
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
