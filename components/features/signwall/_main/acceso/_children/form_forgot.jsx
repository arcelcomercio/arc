/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as S from './styles'
import { ModalConsumer } from '../../signwall/context'
import { ForgotPass, MsgForgotPass, Back } from '../../common/iconos'
import { InputForm } from './control_input'
import getCodeError from './codes_error'
import useForm from './useForm'

const API_ORIGIN = 'https://api-sandbox.gestion.pe'

// eslint-disable-next-line import/prefer-default-export
export const FormForgot = () => {
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const stateSchema = {
    femail: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    femail: {
      required: true,
      validator: {
        func: value =>
          /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/.test(
            value
          ),
        error: 'Correo Electrónico Inválido',
      },
    },
  }

  const onSubmitForm = state => {
    const { femail } = state
    setShowLoading(true)
    window.Identity.options({ apiOrigin: API_ORIGIN })
    window.Identity.requestResetPassword(femail)
      .then(() => {
        setShowConfirm(!showConfirm)
      })
      .catch(errLogin => {
        setShowError(getCodeError(errLogin.code))
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidatorSchema,
    onSubmitForm
  )

  const { femail } = values

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalConsumer>
      {value => (
        <>
          <S.Form
            onSubmit={e => {
              handleOnSubmit(e)
            }}>
            <S.ButtonBase
              type="button"
              className="mb-20"
              onClick={() => value.changeTemplate('login')}>
              <Back /> Volver
            </S.ButtonBase>

            {!showConfirm && (
              <>
                <div className="center block mb-20">
                  <ForgotPass bgcolor="#F4E0D2" />
                </div>
                <S.Title s="20" className="center mb-10">
                  Olvidé mi contraseña
                </S.Title>
                <S.Text c="gray" s="14" lh="28" className="mt-10 mb-10 center">
                  Ingresa tu correo electrónico para <br /> cambiar tu
                  contraseña
                </S.Text>

                {showError && <S.Error>{showError}</S.Error>}

                <InputForm
                  t="email"
                  n="femail"
                  ph="Correo electrónico"
                  ac="on"
                  valid
                  value={femail}
                  onChange={e => {
                    handleOnChange(e)
                    setShowError(false)
                  }}
                  onFocus={handleOnChange}
                  error={errors.femail}
                />

                <S.Button
                  type="submit"
                  className="mt-20"
                  disabled={disable || showLoading}>
                  {showLoading ? 'ENVIANDO...' : 'ENVIAR'}
                </S.Button>
              </>
            )}
            {showConfirm && (
              <>
                <div className="center block mb-20">
                  <MsgForgotPass bgcolor="#F4E0D2" />
                </div>

                <S.Title s="20" className="center mb-10">
                  Correo enviado
                </S.Title>

                <S.Text c="gray" s="14" lh="28" className="mt-10 mb-10 center">
                  Revisa tu correo electrónico para
                  <br /> cambiar tu contraseña
                </S.Text>

                <S.Button
                  type="button"
                  onClick={() => value.changeTemplate('login')}>
                  ACEPTAR
                </S.Button>
              </>
            )}
          </S.Form>
        </>
      )}
    </ModalConsumer>
  )
}
