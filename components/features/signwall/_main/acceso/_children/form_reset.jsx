/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as S from './styles'
import { ModalConsumer } from '../../signwall/context'
import { ResetPass, MsgResetPass } from '../../common/iconos'
import { Input } from './control_input'

// eslint-disable-next-line import/prefer-default-export
export const FormReset = () => {
  const [showConfirm, setShowConfirm] = useState(false)
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalConsumer>
      {value => (
        <>
          <S.Form>
            {!showConfirm ? (
              <>
                <div className="center block mb-20">
                  <ResetPass bgcolor="#F4E0D2" />
                </div>
                <S.Title s="20" className="center mb-10">
                  Cambiar contraseña
                </S.Title>
                <S.Text c="gray" s="14" lh="28" className="mt-10 mb-10 center">
                  Ingresa una nueva contraseña para tu cuenta
                </S.Text>

                <Input
                  type="password"
                  name="rpass"
                  placeholder="Nueva contraseña"
                  autocomplete="off"
                />

                <Input
                  type="password"
                  name="rconfirmpass"
                  placeholder="Confirmar contraseña"
                  autocomplete="off"
                />

                <S.Button
                  type="button"
                  className="mt-20"
                  onClick={() => setShowConfirm(!showConfirm)}>
                  ACEPTAR
                </S.Button>
              </>
            ) : (
              <>
                <div className="center block mb-20">
                  <MsgResetPass bgcolor="#F4E0D2" />
                </div>

                <S.Title s="20" className="center mb-20 ">
                  Tu contraseña ha sido actualizada
                </S.Title>

                <S.Button
                  type="button"
                  onClick={() => value.changeTemplate('login')}>
                  CONTINUAR NAVEGANDO
                </S.Button>
              </>
            )}
          </S.Form>
        </>
      )}
    </ModalConsumer>
  )
}
