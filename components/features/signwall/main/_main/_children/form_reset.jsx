/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react'
import * as S from './styles'
import { ModalConsumer } from '../../../_children/context'
import { ResetPass, MsgResetPass } from '../../../_children/iconos'
import { Input } from './control_input_select'
import useForm from '../../../_dependencies/useForm'
import Domains from '../../../_dependencies/domains'
import getCodeError from '../../../_dependencies/codes_error'
import Taggeo from '../../../_dependencies/taggeo'

export const FormReset = ({
  arcSite,
  siteProperties: {
    signwall: { mainColorBr, mainColorBtn, primaryFont },
  },
  onClose,
  tokenReset,
  typeDialog,
}) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showBtnContinue, setShowBtnContinue] = useState(false)
  const [showFormatInvalidOne, setShowFormatInvalidOne] = useState('')
  const [showFormatInvalidTwo, setShowFormatInvalidTwo] = useState('')

  useEffect(() => {
    if (window.Identity.userProfile || window.Identity.userIdentity.uuid) {
      setShowBtnContinue(true)
    }
  }, [])

  const stateSchema = {
    rpass: { value: '', error: '' },
    rconfirmpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    rpass: {
      required: true,
      validator: {
        func: value => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
    },
    rconfirmpass: {
      required: true,
      validator: {
        func: value => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
    },
  }

  const onSubmitForm = state => {
    const { rpass } = state
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.resetPassword(tokenReset, rpass)
      .then(() => {
        setShowConfirm(true)
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_aceptar_success`
        )
      })
      .catch(errLogin => {
        setShowError(getCodeError(errLogin.code))
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_aceptar_error`
        )
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

  const { rpass, rconfirmpass } = values

  const checkFormatOne = e => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalidOne('No se permite espacios')
    } else if (rconfirmpass.length > 1 && rconfirmpass !== e.target.value) {
      setShowFormatInvalidOne('Las contraseñas no coinciden.')
    } else {
      setShowFormatInvalidOne('')
    }
  }

  const checkFormatTwo = e => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalidTwo('No se permite espacios.')
    } else if (rpass.length > 1 && rpass !== e.target.value) {
      setShowFormatInvalidTwo('Las contraseñas no coinciden.')
    } else {
      setShowFormatInvalidTwo('')
    }
  }

  return (
    <ModalConsumer>
      {value => (
        <>
          <S.Form onSubmit={handleOnSubmit}>
            {!showConfirm ? (
              <>
                <div className="center block mb-20">
                  <ResetPass bgcolor={mainColorBr} />
                </div>
                <S.Title
                  s="20"
                  primaryFont={primaryFont}
                  className="center mb-10">
                  Cambiar contraseña
                </S.Title>
                <S.Text c="gray" s="14" lh="28" className="mt-10 mb-10 center">
                  Ingresa una nueva contraseña para tu cuenta
                </S.Text>

                {showError && <S.Error>{showError}</S.Error>}

                <Input
                  type="password"
                  name="rpass"
                  placeholder="Nueva contraseña"
                  autoComplete="off"
                  required
                  value={rpass}
                  onChange={e => {
                    handleOnChange(e)
                    setShowError(false)
                    checkFormatOne(e)
                  }}
                  error={errors.rpass || showFormatInvalidOne}
                />

                <Input
                  type="password"
                  name="rconfirmpass"
                  placeholder="Confirmar contraseña"
                  autoComplete="off"
                  required
                  value={rconfirmpass}
                  onChange={e => {
                    handleOnChange(e)
                    setShowError(false)
                    checkFormatTwo(e)
                  }}
                  error={errors.rconfirmpass || showFormatInvalidTwo}
                />

                <S.Button
                  color={mainColorBtn}
                  type="submit"
                  className="mt-20"
                  disabled={
                    disable ||
                    showLoading ||
                    showFormatInvalidOne ||
                    showFormatInvalidTwo
                  }>
                  {showLoading ? 'CAMBIANDO...' : 'ACEPTAR'}
                </S.Button>
              </>
            ) : (
              <>
                <div className="center block mb-20">
                  <MsgResetPass bgcolor={mainColorBr} />
                </div>

                <S.Title s="20" className="center mb-20 ">
                  Tu contraseña ha sido actualizada
                </S.Title>

                {showBtnContinue ? (
                  <S.Button
                    type="button"
                    color={mainColorBtn}
                    onClick={() => {
                      Taggeo(
                        `Web_Sign_Wall_${typeDialog}`,
                        `web_sw${typeDialog[0]}_continuar_boton`
                      )
                      onClose()
                    }}>
                    CONTINUAR NAVEGANDO
                  </S.Button>
                ) : (
                  <S.Button
                    type="button"
                    color={mainColorBtn}
                    onClick={() => {
                      Taggeo(
                        `Web_Sign_Wall_${typeDialog}`,
                        `web_sw${typeDialog[0]}_continuar_boton`
                      )
                      value.changeTemplate('login')
                    }}>
                    CONTINUAR
                  </S.Button>
                )}
              </>
            )}
          </S.Form>
        </>
      )}
    </ModalConsumer>
  )
}
