/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import sha256 from 'crypto-js/sha256'
import * as S from './styles'
import { ButtonSocial, AuthURL } from './control_social'
import { ModalConsumer } from '../context'
import { FormStudents } from './form_students'
import { Input } from './control_input_select'
import useForm from '../../_dependencies/useForm'
import getCodeError from '../../_dependencies/codes_error'
import Domains from '../../_dependencies/domains'
import Cookies from '../../_dependencies/cookies'
import Taggeo from '../../_dependencies/taggeo'

export const FormLoginPaywall = ({ valTemplate, attributes }) => {
  const {
    typeDialog,
    onClose,
    onLogged,
    onLoggedFail,
    arcSite,
    siteProperties: {
      signwall: { mainColorLink, authProviders = [] },
      activeNewsletter = false,
    },
  } = attributes

  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showStudents, setShowStudents] = useState(false)
  const [showVerify, setShowVerify] = useState()
  const [showSendEmail, setShowSendEmail] = useState(false)

  const isFbBrowser =
    typeof window !== 'undefined' &&
    (window.navigator.userAgent.indexOf('FBAN') > -1 ||
      window.navigator.userAgent.indexOf('FBAV') > -1)

  const stateSchema = {
    lemail: { value: valTemplate || '', error: '' },
    lpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    lemail: {
      required: true,
      validator: {
        func: (value) =>
          /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/.test(
            value
          ),
        error: 'Correo Electrónico Inválido',
      },
    },
    lpass: {
      required: true,
      validator: {
        func: (value) => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
    },
  }

  const onSubmitForm = (state) => {
    const { lemail, lpass } = state
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_boton_ingresar`
    )
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.login(lemail, lpass, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
        window.Identity.getUserProfile().then((profile) => {
          if (!profile.emailVerified && profile.displayName === profile.email) {
            setShowError(getCodeError('130051'))
            setShowVerify(true)
            Taggeo(
              `Web_Sign_Wall_${typeDialog}`,
              `web_sw${typeDialog[0]}_login_show_reenviar_correo`
            )
            window.localStorage.removeItem('ArcId.USER_INFO')
            window.localStorage.removeItem('ArcId.USER_PROFILE')
            window.Identity.userProfile = null
            window.Identity.userIdentity = {}
          } else {
            Cookies.setCookie('arc_e_id', sha256(profile.email), 365)
            onLogged(profile) // para hendrul
            setShowVerify(false)
            Taggeo(
              `Web_Sign_Wall_${typeDialog}`,
              `web_sw${typeDialog[0]}_login_success_ingresar`
            )
            if (typeDialog === 'students') {
              setShowStudents(!showStudents)
            } else {
              onClose()
            }
          }
        })
      })
      .catch((errLogin) => {
        setShowError(getCodeError(errLogin.code))
        setShowVerify(errLogin.code === '130051')
        onLoggedFail(errLogin) // para hendrul
        if (errLogin.code === '130051') {
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_login_show_reenviar_correo`
          )
        } else {
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_login_error_ingresar`
          )
        }
      })
      .finally(() => {
        setShowLoading(false)
      })
  }

  const isLogged = () => {
    if (typeof window !== 'undefined') {
      return (
        window.localStorage.getItem('ArcId.USER_INFO') &&
        window.localStorage.getItem('ArcId.USER_INFO') !== '{}'
      )
    }
    return false
  }

  const {
    values: { lemail, lpass },
    errors: { lemail: lemailError, lpass: lpassError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    window.Identity.requestVerifyEmail(lemail)
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_reenviar_correo`
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
      {(value) => (
        <>
          {(!isLogged() || showVerify) && (
            <S.Form onSubmit={handleOnSubmit}>
              <S.Text c="gray" s="14" className="mb-10 mt-20 center">
                Ingresa con tus redes sociales
              </S.Text>

              {isFbBrowser ? (
                <ButtonSocial
                  brand="facebook"
                  size="full"
                  onLogged={onLogged}
                  onClose={onClose}
                  typeDialog={typeDialog}
                  onStudents={() => setShowStudents(!showStudents)}
                  arcSite={arcSite}
                  typeForm="login"
                  activeNewsletter={activeNewsletter}
                  showMsgVerify={() => triggerShowVerify()}
                />
              ) : (
                <>
                  {authProviders.map((item) => (
                    <ButtonSocial
                      brand={item}
                      size={sizeBtnSocial}
                      onLogged={onLogged}
                      onClose={onClose}
                      typeDialog={typeDialog}
                      onStudents={() => setShowStudents(!showStudents)}
                      arcSite={arcSite}
                      typeForm="login"
                      activeNewsletter={activeNewsletter}
                      showMsgVerify={() => triggerShowVerify()}
                    />
                  ))}
                </>
              )}

              <AuthURL
                arcSite={arcSite}
                onClose={onClose}
                typeDialog={typeDialog}
                activeNewsletter={activeNewsletter}
                typeForm="login"
                onLogged={onLogged}
              />

              <S.Text c="gray" s="14" className="mt-20 center">
                Ingresa con tu usuario
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
                inputMode="email"
                autoComplete="email"
                name="lemail"
                placeholder="Correo electrónico"
                clase="mb-10"
                required
                value={lemail}
                onChange={(e) => {
                  handleOnChange(e)
                  setShowError(false)
                  setShowVerify(false)
                }}
                error={lemailError}
              />

              <Input
                type="password"
                autoComplete="current-password"
                name="lpass"
                placeholder="Contraseña"
                required
                value={lpass}
                onChange={(e) => {
                  handleOnChange(e)
                  setShowError(false)
                  setShowVerify(false)
                }}
                error={lpassError}
              />

              <S.Link
                c="light"
                className="mt-10 mb-20 inline f-right text-sm"
                onClick={(e) => {
                  e.preventDefault()
                  Taggeo(
                    `Web_Sign_Wall_${typeDialog}`,
                    `web_sw${typeDialog[0]}_contrasena_link_olvide`
                  )
                  value.changeTemplate('forgot')
                }}>
                Olvidé mi contraseña
              </S.Link>

              <S.Button type="submit" disabled={disable || showLoading}>
                {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
              </S.Button>

              <S.Text c="black" s="12" className="mt-20 mb-10 center">
                ¿Aún no tienes una cuenta?
                <S.Link
                  c={mainColorLink}
                  fw="bold"
                  className="ml-10"
                  onClick={(e) => {
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

          {(showStudents || isLogged()) &&
            typeDialog === 'students' &&
            !showVerify && <FormStudents {...attributes} />}
        </>
      )}
    </ModalConsumer>
  )
}
