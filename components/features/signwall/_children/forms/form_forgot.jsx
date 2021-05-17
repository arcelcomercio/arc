/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import getCodeError from '../../_dependencies/codes_error'
import Domains from '../../_dependencies/domains'
import Taggeo from '../../_dependencies/taggeo'
import useForm from '../../_dependencies/useForm'
import { ModalConsumer } from '../context'
import { Back, ForgotPass, MsgForgotPass } from '../iconos'
import { Input } from './control_input_select'
import * as S from './styles'

export const FormForgot = ({
  arcSite,
  siteProperties: {
    signwall: { mainColorBr, mainColorBtn, primaryFont },
  },
  typeDialog,
}) => {
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [registerLink, setRegisterLink] = useState()
  const [showVerify, setShowVerify] = useState()
  const [showSendEmail, setShowSendEmail] = useState(false)

  const stateSchema = {
    femail: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    femail: {
      required: true,
      validator: {
        func: (value) =>
          /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/.test(
            value
          ),
        error: 'Correo Electrónico Inválido',
      },
    },
  }

  const taggeoError = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_contrasena_error_boton`
    )
  }

  const taggeoSuccess = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_contrasena_success_boton`
    )
  }

  const onSubmitForm = (state) => {
    const { femail } = state
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.requestResetPassword(femail)
      .then(() => {
        setShowConfirm(!showConfirm)
        taggeoSuccess()
      })
      .catch((errForgot) => {
        setRegisterLink(errForgot.code === '300030')
        setShowVerify(errForgot.code === '130051')
        if (errForgot.code === '130051') {
          setShowError(getCodeError('verifyReset'))
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_contrasena_show_reenviar_correo`
          )
        } else {
          setShowError(getCodeError(errForgot.code))
          taggeoError()
        }
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const {
    values: { femail },
    errors: { femail: femailError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    window.Identity.requestVerifyEmail(femail)
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_contrasena_reenviar_correo`
    )
    let timeleft = 9
    const downloadTimer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(downloadTimer)
        setShowSendEmail(false)
      } else {
        const divCount = document.getElementById('countdown')
        if (divCount) divCount.innerHTML = ` ${timeleft} `
      }
      timeleft -= 1
    }, 1000)
  }

  return (
    <ModalConsumer>
      {(value) => (
        <>
          <S.Form
            onSubmit={(e) => {
              handleOnSubmit(e)
            }}
            typeDialog={typeDialog}>
            <S.ButtonBase
              type="button"
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_contrasena_link_volver`
                )
                switch (typeDialog) {
                  case 'relogemail':
                  case 'reloghash':
                    value.changeTemplate('relogin')
                    break
                  default:
                    value.changeTemplate('login')
                }
              }}>
              <Back /> Volver
            </S.ButtonBase>

            {!showConfirm ? (
              <>
                <div className="center block mb-10">
                  <ForgotPass bgcolor={mainColorBr} />
                </div>
                <S.Title
                  s="22"
                  className="center mb-10"
                  primaryFont={primaryFont}>
                  Olvidé mi contraseña
                </S.Title>
                <S.Text c="gray" s="14" lh="26" className="center">
                  Ingresa tu correo electrónico para <br /> cambiar tu
                  contraseña
                </S.Text>

                {showError && (
                  <S.Error type={showVerify ? 'warning' : ''}>
                    {` ${showError} `}
                    {showVerify && (
                      <>
                        {!showSendEmail ? (
                          <button type="button" onClick={sendVerifyEmail}>
                            Reenviar correo de activación
                          </button>
                        ) : (
                          <span>
                            Podrás reenviar nuevamente dentro de
                            <strong id="countdown"> 10 </strong> segundos
                          </span>
                        )}
                      </>
                    )}

                    {registerLink && (
                      <S.Link
                        href="#"
                        c="white"
                        fw="bold"
                        onClick={(e) => {
                          e.preventDefault()
                          value.changeTemplate('register')
                        }}>
                        Registrar
                      </S.Link>
                    )}
                  </S.Error>
                )}

                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  name="femail"
                  placeholder="Correo electrónico"
                  required
                  value={femail}
                  onChange={(e) => {
                    handleOnChange(e)
                    setShowError(false)
                  }}
                  error={femailError}
                />

                <S.Button
                  type="submit"
                  color={mainColorBtn}
                  className="mt-20 mb-10"
                  disabled={disable || showLoading}
                  onClick={() =>
                    Taggeo(
                      `Web_Sign_Wall_${typeDialog}`,
                      `web_sw${typeDialog[0]}_contrasena_boton_recuperar`
                    )
                  }>
                  {showLoading ? 'ENVIANDO...' : 'ENVIAR'}
                </S.Button>
              </>
            ) : (
              <>
                <div className="center block mb-20">
                  <MsgForgotPass bgcolor={mainColorBr} />
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
                  color={mainColorBtn}
                  onClick={() => {
                    Taggeo(
                      `Web_Sign_Wall_${typeDialog}`,
                      `web_sw${typeDialog[0]}_contrasena_boton_aceptar`
                    )
                    switch (typeDialog) {
                      case 'relogemail':
                      case 'reloghash':
                        value.changeTemplate('relogin')
                        break
                      default:
                        value.changeTemplate('login', '', femail)
                    }
                  }}>
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
