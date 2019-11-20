/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as S from './styles'
import { ButtonSocial } from './control_social'
import { ModalConsumer } from '../../signwall/context'
import { MsgRegister, Back } from '../../common/iconos'
import { CheckBox } from './control_checkbox'
import { InputForm } from './control_input'

// eslint-disable-next-line import/prefer-default-export
export const FormRegister = () => {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalConsumer>
      {value => (
        <S.Form>
          {!showConfirm && (
            <>
              <S.ButtonBase
                type="button"
                className="mb-20"
                onClick={() => value.changeTemplate('login')}>
                <Back /> Volver
              </S.ButtonBase>

              <S.Text c="gray" s="20" className="mb-20 center">
                Accede fácilmente con:
              </S.Text>

              <ButtonSocial brand="facebook" size="middle" />
              <ButtonSocial brand="google" size="middle" />

              <S.Text c="gray" s="14" className="mt-20 center">
                o completa tus datos para registrarte
              </S.Text>

              <InputForm
                t="email"
                n="remail"
                ph="Correo electrónico*"
                ac="on"
              />

              <InputForm t="password" n="rpass" ph="Contraseña*" ac="off" />

              <CheckBox />

              <S.Text c="black" s="10" fw="bold" className="mt-20 mb-20">
                * TODOS LOS CAMPOS SON OBLIGATORIOS
              </S.Text>

              <S.Button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}>
                REGISTRARME
              </S.Button>
            </>
          )}

          {showConfirm && (
            <>
              <div className="center block mb-20">
                <MsgRegister bgcolor="#F4E0D2" />
              </div>

              <S.Title s="22" className="center mb-10">
                Tu cuenta ha sido creada correctamente
              </S.Title>

              <S.Text c="gray" s="14" lh="28" className="mt-10 mb-20 center">
                Revisa tu bandeja de correo
                 para confirmar tu solicitud de registro
              </S.Text>

              <S.Button
                type="button"
                onClick={() => value.changeTemplate('login')}>
                CONTINUAR NAVEGANDO
              </S.Button>
            </>
          )}
        </S.Form>
      )}
    </ModalConsumer>
  )
}
