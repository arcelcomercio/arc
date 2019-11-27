/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as S from './styles'
import { ButtonSocial, ButtonEmail } from './control_social'
import { ModalConsumer } from '../../signwall/context'
import { Input } from './control_input'

// eslint-disable-next-line import/prefer-default-export
export const FormLogin = () => {
  const [showLoginEmail, setShowLoginEmail] = useState(false)
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalConsumer>
      {value => (
        <S.Form>
          <S.Text c="gray" s="20" className="mb-20 center">
            Ingresa con
          </S.Text>

          <ButtonSocial brand="facebook" size="full" />
          <ButtonSocial brand="google" size="full" />

          {!showLoginEmail && (
            <ButtonEmail
              size="full"
              onClick={() => setShowLoginEmail(!showLoginEmail)}
            />
          )}

          {showLoginEmail && (
            <>
              <Input
                type="email"
                name="lemail"
                placeholder="Correo electrónico"
                autocomplete="on"
              />

              <Input
                type="password"
                name="lpass"
                placeholder="Contraseña"
                autocomplete="off"
              />

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
            </>
          )}

          <S.Text c="black" s="12" className="mt-10 mb-10 center">
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
