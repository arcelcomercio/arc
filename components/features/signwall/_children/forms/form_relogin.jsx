/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { sha256 } from 'js-sha256'
import * as S from './styles'
import { ButtonSocial, AuthURL } from './control_social'
import { ModalConsumer } from '../context'
import { Input } from './control_input_select'
import useForm from '../../_dependencies/useForm'
import getCodeError from '../../_dependencies/codes_error'
import Domains from '../../_dependencies/domains'
import Cookies from '../../_dependencies/cookies'
import Taggeo from '../../_dependencies/taggeo'

export const FormRelogin = ({
  arcSite,
  siteProperties: {
    signwall: { mainColorLink, mainColorBtn, authProviders = [] },
    activeNewsletter = false,
    activeVerifyEmail = false,
  },
  onClose,
  typeDialog,
}) => {
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showVerify, setShowVerify] = useState()
  const [showSendEmail, setShowSendEmail] = useState(false)

  const stateSchema = {
    remail: { value: '', error: '' },
    rpass: { value: '', error: '' },
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
  }

  const taggeoError = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_email_login_error`
    )
  }

  const onSubmitForm = state => {
    const { remail, rpass } = state
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.login(remail, rpass, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
        window.Identity.getUserProfile().then(profile => {
          if (activeVerifyEmail && !profile.emailVerified) {
            setShowLoading(false)
            setShowError(getCodeError('130051'))
            setShowVerify(true)
            Taggeo(
              `Web_Sign_Wall_${typeDialog}`,
              `web_sw${typeDialog[0]}_email_login_show_reenviar_correo`
            )
            window.localStorage.removeItem('ArcId.USER_INFO')
            window.localStorage.removeItem('ArcId.USER_PROFILE')
            window.Identity.userProfile = null
            window.Identity.userIdentity = {}
          } else {
            Cookies.setCookie('arc_e_id', sha256(profile.email), 365)
            Taggeo(
              `Web_Sign_Wall_${typeDialog}`,
              `web_sw${typeDialog[0]}_email_login_success_ingresar`
            )
            onClose()
          }
        })
      })
      .catch(errLogin => {
        setShowError(getCodeError(errLogin.code))
        setShowVerify(errLogin.code === '130051')
        if (errLogin.code === '130051') {
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_email_login_show_reenviar_correo`
          )
        } else {
          taggeoError()
        }
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const {
    values: { remail, rpass },
    errors: { remail: remailError, rpass: rpassError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    window.Identity.requestVerifyEmail(remail)
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_email_login_reenviar_correo`
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

  const triggerShowVerify = () => {
    setShowError(getCodeError('verifySocial'))
    setShowVerify(false)
  }

  const sizeBtnSocial = authProviders.length === 1 ? 'full' : 'middle'

  return (
    <ModalConsumer>
      {value => (
        <S.Form onSubmit={handleOnSubmit}>
          <S.Text c="black" s="18" className="center">
            Ingresa con
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
            </S.Error>
          )}

          <Input
            type="email"
            name="remail"
            placeholder="Correo electrónico"
            autoComplete="on"
            required
            value={remail}
            onChange={e => {
              handleOnChange(e)
              setShowError(false)
            }}
            error={remailError}
          />

          <Input
            type="password"
            name="rpass"
            placeholder="Contraseña"
            autoComplete="off"
            required
            value={rpass}
            onChange={e => {
              handleOnChange(e)
              setShowError(false)
            }}
            error={rpassError}
          />

          <S.Link
            href="#"
            c="gray"
            className="mt-10 mb-20 inline f-right text-sm"
            onClick={e => {
              e.preventDefault()
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_contrasena_link_olvide`
              )
              value.changeTemplate('forgot')
            }}>
            Olvidé mi contraseña
          </S.Link>

          <S.Button
            type="submit"
            color={mainColorBtn}
            disabled={disable || showLoading}
            onClick={() =>
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_email_login_boton`
              )
            }>
            {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
          </S.Button>

          <S.Text c="gray" s="14" className="mt-20 mb-10 center">
            ó ingresa con tu cuenta de:
          </S.Text>

          {authProviders.map(item => (
            <ButtonSocial
              brand={item}
              size={sizeBtnSocial}
              onClose={onClose}
              typeDialog={typeDialog}
              arcSite={arcSite}
              typeForm="relogin"
              activeNewsletter={activeNewsletter}
              showMsgVerify={() => triggerShowVerify()}
            />
          ))}

          <AuthURL
            arcSite={arcSite}
            onClose={onClose}
            typeDialog={typeDialog}
            activeNewsletter={activeNewsletter}
            typeForm="relogin"
          />

          <S.Text c="black" s="12" className="mt-20 mb-10 center">
            ¿Aún no tienes una cuenta?
            <S.Link
              href="#"
              c={mainColorLink}
              fw="bold"
              className="ml-10"
              onClick={e => {
                e.preventDefault()
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_login_boton_registrate`
                )
                value.changeTemplate('register')
              }}>
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
