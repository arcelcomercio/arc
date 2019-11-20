/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as S from './styles'
import { ModalConsumer } from '../../signwall/context'
import { ForgotPass, MsgForgotPass, Back } from '../../common/iconos'
import { InputForm } from './control_input'

// eslint-disable-next-line import/prefer-default-export
export const FormForgot = () => {
  const [showConfirm, setShowConfirm] = useState(false)
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalConsumer>
      {value => (
        <>
          <S.Form>
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

                <InputForm
                  t="email"
                  n="femail"
                  ph="Correo electrónico"
                  ac="on"
                />

                <S.Button
                  type="button"
                  className="mt-20"
                  onClick={() => setShowConfirm(!showConfirm)}>
                  ENVIAR
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
