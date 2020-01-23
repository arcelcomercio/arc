/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as S from './styles'
import { ModalConsumer } from '../../../_children/context'
import { ForgotPass, MsgForgotPass, Back } from '../../../_children/iconos'
import { Input } from './control_input_select'
import getCodeError from '../../../_dependencies/codes_error'
import useForm from '../../../_dependencies/useForm'
import Domains from '../../../_dependencies/domains'
import Services from '../../../_dependencies/services'
import Taggeo from '../../../_dependencies/taggeo'

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

  const pushStatePass = email => {
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.requestResetPassword(email)
      .then(() => {
        setShowConfirm(!showConfirm)
        taggeoSuccess()
      })
      .catch(() => {
        taggeoError()
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const sendEmail = email => {
    setShowLoading(true)
    Services.reloginEcoID(email, '', 'forgotpass', arcSite, window)
      .then(resEco => {
        if (resEco.retry) {
          setTimeout(() => {
            pushStatePass(email)
          }, 1000)
        } else {
          setShowError(getCodeError('300030'))
          taggeoError()
        }
      })
      .catch(() => {
        setShowError(getCodeError('000000'))
        taggeoError()
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const onSubmitForm = state => {
    const { femail } = state
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.requestResetPassword(femail)
      .then(() => {
        setShowConfirm(!showConfirm)
        taggeoSuccess()
      })
      .catch(errForgot => {
        if (errForgot.code === '300030') {
          sendEmail(femail)
        } else {
          setShowError(getCodeError(errForgot.code))
          taggeoError()
        }
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
    <ModalConsumer>
      {value => (
        <>
          <S.Form
            onSubmit={e => {
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
                <div className="center block mb-20">
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

                {showError && <S.Error>{showError}</S.Error>}

                <Input
                  type="email"
                  name="femail"
                  placeholder="Correo electrónico"
                  autoComplete="on"
                  required
                  value={femail}
                  onChange={e => {
                    handleOnChange(e)
                    setShowError(false)
                  }}
                  error={errors.femail}
                />

                <S.Button
                  type="submit"
                  color={mainColorBtn}
                  className="mt-20"
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
                        value.changeTemplate('login')
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
