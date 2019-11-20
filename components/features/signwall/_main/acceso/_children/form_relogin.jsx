/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import * as S from './styles'
import { ButtonSocial } from './control_social'
import { ModalConsumer } from '../../signwall/context'
import { InputForm } from './control_input'

// eslint-disable-next-line import/prefer-default-export
export const FormRelogin = () => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalConsumer>
      {value => (
        <S.Form>
          <S.Text c="black" s="18" className="center">
            Ingresa con
          </S.Text>

          <InputForm t="email" n="lemail" ph="Correo electrónico" ac="on" />

          <InputForm t="password" n="lpass" ph="Contraseña" ac="off" />

          <S.Link
            href="#"
            c="light"
            className="mt-10 mb-20 block right text-sm"
            onClick={() => value.changeTemplate('forgot')}>
            Olvidé mi contraseña
          </S.Link>

          <S.Button
            type="button"
            onClick={() => value.changeTemplate('students')}>
            INICIA SESIÓN
          </S.Button>

          <S.Text c="gray" s="14" className="mt-20 mb-20 center">
            ó ingresa con tu cuenta de:
          </S.Text>

          <ButtonSocial brand="facebook" size="middle" />
          <ButtonSocial brand="google" size="middle" />

          <S.Text c="black" s="12" className="mt-20 mb-10 center">
            ¿Aún no tienes una cuenta?
            <S.Link
              href="#"
              c="blue"
              fw="bold"
              className="ml-10"
              onClick={() => value.changeTemplate('register')}>
              Regístrate
            </S.Link>
          </S.Text>

          <S.Text c="light" s="10" className="mt-10 center">
            CON TUS DATOS, MEJORAREMOS TU EXPERIENCIA DE <br /> NAVEGACIÓN Y
            NUNCA PUBLICAREMOS SIN TU PERMISO
          </S.Text>
        </S.Form>
      )}
    </ModalConsumer>
  )
}
