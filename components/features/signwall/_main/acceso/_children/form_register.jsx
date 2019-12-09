/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import ENV from 'fusion:environment'
import { sha256 } from 'js-sha256'
import * as S from './styles'
import { ButtonSocial } from './control_social'
import { ModalConsumer } from '../../signwall/context'
import { MsgRegister, Back } from '../../common/iconos'
import { CheckBox } from './control_checkbox'
import { Input } from './control_input'
import getCodeError from './codes_error'
import useForm from './useForm'
import getDevice from '../../utils/get-device'
import { FormStudents } from './form_students'
import Domains from '../../utils/domains'
import Cookies from '../../utils/new_cookies'
// eslint-disable-next-line import/prefer-default-export
export const FormRegister = props => {
  const { typeDialog, onClose, onLogged, onLoggedFail, arcSite } = props
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showStudents, setShowStudents] = useState(false)
  const [showChecked, setShowChecked] = useState(false)

  const stateSchema = {
    remail: { value: '', error: '' },
    rpass: { value: '', error: '' },
    rterms: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    remail: {
      required: true,
      validator: {
        func: value =>
          /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/.test(
            value
          ),
        error: 'Correo Electrónico Inválido',
      },
    },
    rpass: {
      required: true,
      validator: {
        func: value => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
    },
    rterms: {
      required: true,
      validator: {
        func: value => value !== '0',
        error: 'acepta pe mascota',
      },
    },
  }

  const handleGetProfile = () => {
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.getUserProfile().then(profile => {
      Cookies.setCookie('arc_e_id', sha256(profile.email), 365)
      setShowConfirm(!showConfirm)
      onLogged(profile)
    })
  }

  const onSubmitForm = state => {
    const { remail, rpass } = state
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.signUp(
      {
        userName: remail,
        credentials: rpass,
        grantType: 'password',
      },
      {
        displayName: remail,
        email: remail,
        attributes: [
          {
            name: 'originDomain',
            value: window.location.hostname || 'none',
            type: 'String',
          },
          {
            name: 'originReferer',
            value: window.location.href || 'none',
            type: 'String',
          },
          {
            name: 'originMethod',
            value: '1',
            type: 'String',
          },
          {
            name: 'originDevice',
            value: getDevice(window) || 'none',
            type: 'String',
          },
          {
            name: 'originAction',
            value: typeDialog,
            type: 'String',
          },
          {
            name: 'termsCondPrivaPoli', // Terms Conditions and Privacy Policy
            value: '1',
            type: 'String',
          },
        ],
      },
      { doLogin: true },
      { rememberMe: true }
    )
      .then(() => {
        handleGetProfile()
      })
      .catch(errLogin => {
        setShowError(getCodeError(errLogin.code))
        onLoggedFail(errLogin)
        setShowLoading(false)
      })
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidatorSchema,
    onSubmitForm
  )

  const { remail, rpass, rterms } = values

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalConsumer>
      {value => (
        <>
          {!showStudents && (
            <S.Form onSubmit={handleOnSubmit}>
              {!showConfirm && (
                <>
                  <S.ButtonBase
                    type="button"
                    className="mb-10"
                    onClick={() => value.changeTemplate('login')}>
                    <Back /> Volver
                  </S.ButtonBase>

                  <S.Text c="gray" s="18" className="mb-20 center">
                    Accede fácilmente con:
                  </S.Text>

                  {ENV.ENVIRONMENT === 'elcomercio' ? (
                    <ButtonSocial
                      brand="facebook"
                      size="full"
                      onLogged={onLogged}
                      onClose={onClose}
                      typeDialog={typeDialog}
                      onStudents={() => setShowStudents(!showStudents)}
                    />
                  ) : (
                    <>
                      <ButtonSocial
                        brand="facebook"
                        size="middle"
                        onLogged={onLogged}
                        onClose={onClose}
                        typeDialog={typeDialog}
                        onStudents={() => setShowStudents(!showStudents)}
                      />
                      <ButtonSocial brand="google" size="middle" />
                    </>
                  )}

                  <S.Text c="gray" s="14" className="mt-20 center">
                    o completa tus datos para registrarte
                  </S.Text>

                  {showError && <S.Error>{showError}</S.Error>}

                  <Input
                    type="email"
                    name="remail"
                    placeholder="Correo electrónico*"
                    autocomplete="on"
                    required
                    value={remail}
                    onChange={e => {
                      handleOnChange(e)
                      setShowError(false)
                    }}
                    error={errors.remail}
                  />

                  <Input
                    type="password"
                    name="rpass"
                    placeholder="Contraseña*"
                    autocomplete="off"
                    required
                    value={rpass}
                    onChange={e => {
                      handleOnChange(e)
                      setShowError(false)
                    }}
                    error={errors.rpass}
                  />

                  <CheckBox
                    type="checkbox"
                    checked={showChecked}
                    value={showChecked ? '1' : '0'}
                    // value={rterms}
                    name="rterms"
                    onChange={e => {
                      handleOnChange(e)
                      setShowChecked(!showChecked)
                    }}
                    valid
                    error={errors.rterms}
                    arcSite={arcSite}
                  />

                  <S.Text c="black" s="10" fw="bold" className="mt-10 mb-20">
                    * TODOS LOS CAMPOS SON OBLIGATORIOS
                  </S.Text>

                  <S.Button type="submit" disabled={disable || showLoading}>
                    {showLoading ? 'REGISTRANDO...' : 'REGISTRARME'}
                  </S.Button>
                </>
              )}

              {showConfirm && (
                <>
                  <div className="center block mb-20 mt-20">
                    <MsgRegister bgcolor="#F4E0D2" />
                  </div>

                  <S.Title s="22" className="center mb-10">
                    Tu cuenta ha sido creada correctamente
                  </S.Title>

                  <S.Text
                    c="gray"
                    s="14"
                    lh="28"
                    className="mt-10 mb-20 center">
                    Revisa tu bandeja de correo para confirmar tu solicitud de
                    registro
                  </S.Text>

                  <S.Button
                    type="button"
                    onClick={() => {
                      if (typeDialog === 'students') {
                        setShowStudents(!showStudents)
                      } else {
                        onClose()
                      }
                    }}>
                    CONTINUAR
                  </S.Button>
                </>
              )}
            </S.Form>
          )}

          {showStudents && typeDialog === 'students' && (
            <FormStudents {...props} />
          )}
        </>
      )}
    </ModalConsumer>
  )
}
