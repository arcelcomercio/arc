/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react'

import {
  formatCellphone,
  formatNames,
} from '../../../subscriptions/_dependencies/Errors'
import { pushCallOut } from '../../../subscriptions/_dependencies/Services'
import useForm from '../../../subscriptions/_hooks/useForm'
import Modal from '../../../subscriptions/payment/_children/Profile/children/modal'
import { Input } from '../forms/control_input_select'
import * as S from '../forms/styles'
import { Close, MsgRegister } from '../iconos'
import { CloseBtn, ContMiddle } from '../landing/styled'

const CallOut = ({ onClose, noBtnClose }) => {
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

  const onFomrCallOut = ({ namecall, phonecall }) => {
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

  return (
    <Modal
      onClose={() => {}}
      showClose="true"
      scrollable="true"
      allowEsc={false}>
      <div className="modal-container modal-form">
        <ContMiddle hm="400">
          {!noBtnClose && (
            <CloseBtn
              type="button"
              className="close-button"
              onClick={() => {
                onClose()
              }}>
              <Close />
            </CloseBtn>
          )}

          {showConfirmCall || showErrorCall || showRepeatCall ? (
            <S.Form>
              <div className="center block mb-20 mt-20">
                <MsgRegister bgcolor="#efdb96" />
              </div>

              {showConfirmCall && (
                <S.Title s="22" className="center mb-10">
                  Tus datos han sido enviados correctamente
                </S.Title>
              )}

              {showRepeatCall && (
                <S.Title s="22" className="center mb-10">
                  {showRepeatCall}
                </S.Title>
              )}

              {showErrorCall && (
                <S.Title s="22" className="center mb-10">
                  Ocurrió un error
                </S.Title>
              )}

              {(showConfirmCall || showRepeatCall) && (
                <>
                  <S.Title s="16" c="#6a6a6a" className="center">
                    Uno de nuestros ejecutivos se pondrá en contacto contigo.
                  </S.Title>
                  <br />
                  <S.Text s="12" c="#242424" className="center">
                    Horario de atención es de <br />
                    L-V: 9AM a 8PM y <br /> S: 9AM a 1PM
                  </S.Text>
                </>
              )}

              {showErrorCall && (
                <S.Title s="16" c="#6a6a6a" className="center">
                  {showErrorCall}
                </S.Title>
              )}
            </S.Form>
          ) : (
            <S.Form onSubmit={handleOnSubmit}>
              <S.Title c="#404040" s="24" className="mb-10 mt-40 center">
                Ingresa tus datos
              </S.Title>

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

              <S.ButtonCall
                type="submit"
                className="mt-40 mb-10"
                disabled={disable || loading}>
                {loading ? 'Enviando...' : 'Te llamamos'}
              </S.ButtonCall>
            </S.Form>
          )}
        </ContMiddle>
      </div>
    </Modal>
  )
}

export default CallOut
