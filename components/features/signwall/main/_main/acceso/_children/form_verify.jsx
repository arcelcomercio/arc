/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import * as S from './styles'
import { ModalConsumer } from '../../signwall/context'
import { MsgResetPass }  from '../../common/iconos'

// eslint-disable-next-line import/prefer-default-export
export const FormVerify = () => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalConsumer>
      {value => (
        <>
          <S.Form>
            <div className="center block mb-20">
              <MsgResetPass bgcolor="#F4E0D2" />
            </div>

            <S.Title s="20" className="center mb-10">
              ¡Bienvenido Usuario!
            </S.Title>

            <S.Text c="gray" s="14" lh="28" className="mt-10 mb-20 center">
              Tu correo electrónico ha sido validado
              <br />
              disfruta nuestro contenido sin límites
            </S.Text>

            <S.Button
              type="button"
              onClick={() => value.changeTemplate('login')}>
              CONTINUAR NAVEGANDO
            </S.Button>
          </S.Form>
        </>
      )}
    </ModalConsumer>
  )
}
