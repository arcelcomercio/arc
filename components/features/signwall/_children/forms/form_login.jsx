/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { sha256 } from 'js-sha256'
import * as S from './styles'
import { ButtonSocial, ButtonEmail, AuthURL } from './control_social'
import { MsgRegister } from '../iconos'
import { ModalConsumer } from '../context'
import { Input } from './control_input_select'
import useForm from '../../_dependencies/useForm'
import getCodeError from '../../_dependencies/codes_error'
import Domains from '../../_dependencies/domains'
import Cookies from '../../_dependencies/cookies'
import Taggeo from '../../_dependencies/taggeo'
import Services from '../../_dependencies/services'
import Loading from '../loading'

export const FormLogin = ({ valTemplate, attributes }) => {
  const {
    typeDialog,
    onClose,
    arcSite,
    isFia,
    handleCallToAction,
    siteProperties: {
      signwall: {
        mainColorLink,
        mainColorBtn,
        primaryFont,
        mainColorBr,
        authProviders = [],
      },
      activeNewsletter = false,
      activeVerifyEmail = false,
      activePaywall,
    },
    removeBefore = i => i,
    onLogged = i => i,
  } = attributes

  const [showLoginEmail, setShowLoginEmail] = useState(valTemplate)
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showUserWithSubs, setShowUserWithSubs] = useState(false)
  const [showCheckPremium, setShowCheckPremium] = useState(false)
  const [showLoadingPremium, setShowLoadingPremium] = useState(true)
  const [showFormatInvalid, setShowFormatInvalid] = useState('')
  const [showVerify, setShowVerify] = useState()
  const [showSendEmail, setShowSendEmail] = useState(false)

  const stateSchema = {
    lemail: { value: valTemplate || '', error: '' },
    lpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    lemail: {
      required: true,
      validator: {
        func: value =>
          /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/.test(
            value
          ),
        error: 'Correo Electrónico Inválido',
      },
    },
    lpass: {
      required: true,
      validator: {
        func: value => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
    },
  }

  const taggeoSuccess = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_success_ingresar`
    )
  }

  const taggeoError = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_login_error_ingresar`
    )
  }

  const getListSubs = () => {
    return window.Identity.extendSession().then(resExt => {
      const checkEntitlement = Services.getEntitlement(
        resExt.accessToken,
        arcSite
      )
        .then(res => {
          if (res.skus) {
            const result = Object.keys(res.skus).map(key => {
              return res.skus[key].sku
            })
            return result
          }
          return []
        })
        .catch(err => window.console.error(err))

      return checkEntitlement
    })
  }

  const handleSuscription = () => {
    if (typeDialog === 'premium') {
      window.sessionStorage.setItem(
        'paywall_last_url',
        window.location.pathname ? window.location.pathname : ''
      )
    } else {
      window.sessionStorage.setItem(
        'paywall_last_url',
        window.document.referrer
          ? window.document.referrer.split(window.location.origin)[1]
          : ''
      )
    }

    removeBefore() // dismount before
    window.location.href = Domains.getUrlPaywall(arcSite)
    window.sessionStorage.setItem('paywall_type_modal', typeDialog)
  }

  const checkUserSubs = () => {
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })

    if (typeDialog === 'premium' || typeDialog === 'paywall') {
      setShowCheckPremium(true) // no tengo subs

      getListSubs().then(p => {
        if (p && p.length === 0) {
          setShowUserWithSubs(false) // no tengo subs
          setShowLoadingPremium(false)
        } else {
          setShowUserWithSubs(true) // tengo subs
          setShowLoadingPremium(false)
          const divPremium = document.getElementById('contenedor')
          if (divPremium) {
            divPremium.classList.remove('story-content__nota-premium')
            divPremium.removeAttribute('style')
          }
        }
      })
    }
  }

  const handleGetProfile = profile => {
    setShowLoading(true)

    Cookies.setCookie('arc_e_id', sha256(profile.email), 365)

    const USER_IDENTITY = JSON.stringify(window.Identity.userIdentity || {})
    Cookies.setCookieDomain('ArcId.USER_INFO', USER_IDENTITY, 1, arcSite)

    if (typeDialog === 'premium' || typeDialog === 'paywall') {
      setShowCheckPremium(true) // no tengo subs

      getListSubs().then(p => {
        if (p && p.length === 0) {
          setShowUserWithSubs(false) // no tengo subs
          setShowLoadingPremium(false)
        } else {
          setShowUserWithSubs(true) // tengo subs
          setShowLoadingPremium(false)
          const divPremium = document.getElementById('contenedor')
          if (divPremium) {
            divPremium.classList.remove('story-content__nota-premium')
            divPremium.removeAttribute('style')
          }
        }
      })
    } else {
      const btnSignwall = document.getElementById('signwall-nav-btn')
      if (typeDialog === 'newsletter' && btnSignwall) {
        btnSignwall.textContent = `${profile.firstName ||
          'Bienvenido'} ${profile.lastName || ''}`
      }
      onClose()
    }
    setShowLoading(false)
  }

  const handleFia = () => {
    if (typeof window !== 'undefined' && isFia) {
      handleCallToAction(true)
    }
    return null
  }

  const onSubmitForm = state => {
    const { lemail, lpass } = state
    setShowLoading(true)
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
    window.Identity.login(lemail, lpass, {
      rememberMe: true,
      cookie: true,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
        window.Identity.getUserProfile().then(resProfile => {
          if (
            activeVerifyEmail &&
            !resProfile.emailVerified &&
            resProfile.displayName === resProfile.email
          ) {
            setShowLoading(false)
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
            handleGetProfile(resProfile)
            taggeoSuccess()
            onLogged()
            handleFia()
          }
        })
      })
      .catch(errLogin => {
        setShowLoading(false)
        setShowError(getCodeError(errLogin.code))
        setShowVerify(errLogin.code === '130051')
        if (errLogin.code === '130051') {
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_login_show_reenviar_correo`
          )
        } else {
          taggeoError()
        }
      })
  }

  const checkFormat = e => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalid('No se permite espacios')
    } else {
      setShowFormatInvalid('')
    }
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
    setShowLoginEmail(true)
    setShowError(getCodeError('verifySocial'))
    setShowVerify(false)
  }

  return (
    <ModalConsumer>
      {value => (
        <>
          {!showCheckPremium ? (
            <S.Form onSubmit={handleOnSubmit} typeDialog={typeDialog}>
              {activePaywall && typeDialog !== 'premium' && (
                <S.Title
                  s="22"
                  primaryFont={primaryFont}
                  className="center mb-20 mt-20 only-mobile-tablet">
                  Regístrate y mantente siempre informado con las noticias más
                  relevantes del Perú y el mundo
                </S.Title>
              )}

              <S.Text c="gray" s="18" className="mb-10 mt-10 center">
                Ingresa con
              </S.Text>

              {authProviders.map(item => (
                <ButtonSocial
                  brand={item}
                  size="middle"
                  c="mb-10"
                  onClose={onClose}
                  typeDialog={typeDialog}
                  arcSite={arcSite}
                  typeForm="login"
                  activeNewsletter={activeNewsletter}
                  checkUserSubs={checkUserSubs}
                  onLogged={onLogged}
                  showMsgVerify={() => triggerShowVerify()}
                />
              ))}

              <AuthURL
                arcSite={arcSite}
                onClose={onClose}
                typeDialog={typeDialog}
                activeNewsletter={activeNewsletter}
                typeForm="login"
                onLogged={onLogged}
                checkUserSubs={checkUserSubs}
              />

              {!showLoginEmail && (
                <ButtonEmail
                  size="full"
                  onClick={() => {
                    Taggeo(
                      `Web_Sign_Wall_${typeDialog}`,
                      `web_sw${typeDialog[0]}_open_login_boton_ingresar`
                    )
                    setShowLoginEmail(!showLoginEmail)
                  }}
                />
              )}

              {showLoginEmail && (
                <>
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
                    name="lemail"
                    placeholder="Correo electrónico"
                    autoComplete="on"
                    required
                    value={lemail}
                    onChange={e => {
                      handleOnChange(e)
                      setShowError(false)
                    }}
                    error={lemailError}
                  />

                  <Input
                    type="password"
                    name="lpass"
                    placeholder="Contraseña"
                    autoComplete="off"
                    required
                    value={lpass}
                    onChange={e => {
                      handleOnChange(e)
                      setShowError(false)
                      checkFormat(e)
                    }}
                    error={lpassError || showFormatInvalid}
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
                    disabled={disable || showLoading || showFormatInvalid}
                    onClick={() =>
                      Taggeo(
                        `Web_Sign_Wall_${typeDialog}`,
                        `web_sw${typeDialog[0]}_login_boton_ingresar`
                      )
                    }>
                    {showLoading ? 'CARGANDO...' : 'INICIA SESIÓN'}
                  </S.Button>
                </>
              )}

              <S.Text c="black" s="12" className="mt-10 mb-10 center">
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

              <S.Text c="light" s="10" className="mt-10 mb-10 center">
                CON TUS DATOS, MEJORAREMOS TU EXPERIENCIA DE <br /> NAVEGACIÓN Y
                NUNCA PUBLICAREMOS SIN TU PERMISO
              </S.Text>
            </S.Form>
          ) : (
            <>
              {showLoadingPremium ? (
                <Loading arcSite={arcSite} typeBg="wait" />
              ) : (
                <S.Form>
                  <div className="center block mb-20 mt-20">
                    <MsgRegister bgcolor={mainColorBr} />
                  </div>

                  <S.Title s="22" className="center mb-10">
                    {`Bienvenido(a) ${window.Identity.userProfile.firstName ||
                      'Usuario'} `}
                  </S.Title>
                  <S.Text
                    c="gray"
                    s="14"
                    lh="28"
                    className="mt-10 mb-20 center">
                    {showUserWithSubs
                      ? 'Sigue disfrutando del contenido exclusivo que tenemos para ti'
                      : 'Ahora puedes continuar con tu compra'}
                  </S.Text>

                  {showUserWithSubs ? (
                    <S.Button
                      id="btn-premium-continue"
                      type="button"
                      color={mainColorBtn}
                      onClick={() => {
                        Taggeo(
                          `Web_${typeDialog}_Hard`,
                          `web_${typeDialog}_boton_sigue_navegando`
                        )
                        if (
                          window.sessionStorage.getItem('paywall_last_url') &&
                          window.sessionStorage.getItem('paywall_last_url') !==
                            ''
                        ) {
                          window.location.href = window.sessionStorage.getItem(
                            'paywall_last_url'
                          )
                        } else {
                          onClose()
                        }
                      }}>
                      SIGUE NAVEGANDO
                    </S.Button>
                  ) : (
                    <S.Button
                      type="button"
                      color={mainColorBtn}
                      onClick={() => {
                        Taggeo(
                          `Web_${typeDialog}_Hard`,
                          `web_${typeDialog}_boton_ver_planes`
                        )
                        handleSuscription()
                      }}>
                      VER PLANES
                    </S.Button>
                  )}
                </S.Form>
              )}
            </>
          )}
        </>
      )}
    </ModalConsumer>
  )
}
